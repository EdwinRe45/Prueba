import React, { useState, useCallback, ChangeEvent } from 'react';
import { analyzeImage, getComplexSuggestion, editImage, generateImage } from '../services/geminiService';
import GatoWise from './GatoWise';

const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1];
      resolve({ base64: base64String, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
  });

type Mode = 'IMAGE' | 'GENERATE';
type ImageTab = 'ANALYZE' | 'EDIT';
type LoadingState = 'analyze' | 'complex' | 'edit' | 'generate' | null;

const CreateScreen: React.FC = () => {
  const [mode, setMode] = useState<Mode>('IMAGE');
  const [imageTab, setImageTab] = useState<ImageTab>('ANALYZE');
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultIsImage, setResultIsImage] = useState(false);
  const [loading, setLoading] = useState<LoadingState>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleReset(true);
      setUploadedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleReset = (keepMode: boolean = false) => {
    if (!keepMode) setMode('IMAGE');
    setImageTab('ANALYZE');
    setUploadedFile(null);
    setImagePreview(null);
    setResult(null);
    setResultIsImage(false);
    setError(null);
    setPrompt('');
    setLoading(null);
  };

  const performAction = async (state: LoadingState, action: () => Promise<any>) => {
    setLoading(state);
    setError(null);
    setResult(null);
    setResultIsImage(false);
    try {
      const actionResult = await action();
      setResult(actionResult);
      if (state === 'edit' || state === 'generate') {
          setResultIsImage(true);
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      // FIX: The loading state should be set to null, not false, to match the `LoadingState` type.
      setLoading(null);
    }
  };
  
  const handleAnalyze = () => {
    if (!uploadedFile) return;
    performAction('analyze', async () => {
      const { base64, mimeType } = await fileToBase64(uploadedFile);
      return analyzeImage(base64, mimeType);
    });
  };
  
  const handleComplexSuggestion = () => {
    if (!uploadedFile) return;
    performAction('complex', async () => {
      const { base64, mimeType } = await fileToBase64(uploadedFile);
      return getComplexSuggestion(base64, mimeType);
    });
  };

  const handleEdit = () => {
    if (!uploadedFile || !prompt) return;
    performAction('edit', async () => {
      const { base64, mimeType } = await fileToBase64(uploadedFile);
      const editedImageBase64 = await editImage(base64, mimeType, prompt);
      const newImageUrl = `data:image/png;base64,${editedImageBase64}`;
      setImagePreview(newImageUrl); // Update preview with edited image
      setUploadedFile(null); // Invalidate original file
      return newImageUrl;
    });
  };

  const handleGenerate = () => {
    if (!prompt) return;
    handleReset(true);
    performAction('generate', async () => {
      const generatedImageBase64 = await generateImage(prompt);
      return `data:image/png;base64,${generatedImageBase64}`;
    });
  };
  
  const LoadingIndicator = () => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <GatoWise variant="thinking" className="w-24 h-24 mb-4 animate-pulse" />
        <p className="font-bold text-violet-600 text-lg">
            {loading === 'complex' ? 'Usando modo pensamiento...' : 'Procesando con IA...'}
        </p>
        <p className="text-gray-500">Esto puede tardar un momento.</p>
    </div>
  );

  return (
    <div className="p-6 space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-violet-800">Crear con IA</h1>
        <button onClick={() => handleReset(false)} className="text-sm text-red-500 font-semibold">Empezar de nuevo</button>
      </header>

      <div className="flex p-1 bg-gray-200 rounded-full">
        <button onClick={() => setMode('IMAGE')} className={`w-1/2 py-2 text-sm font-bold rounded-full transition-colors ${mode === 'IMAGE' ? 'bg-violet-600 text-white shadow' : 'text-gray-600'}`}>Trabajar con Imagen</button>
        <button onClick={() => setMode('GENERATE')} className={`w-1/2 py-2 text-sm font-bold rounded-full transition-colors ${mode === 'GENERATE' ? 'bg-violet-600 text-white shadow' : 'text-gray-600'}`}>Generar Nueva</button>
      </div>

      {mode === 'IMAGE' && (
        <div className="space-y-4">
          {!imagePreview ? (
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-slate-50">
              <h2 className="text-lg font-bold text-gray-700">Sube tu Dibujo</h2>
              <p className="text-gray-500 text-sm mb-4">Recibe feedback de la IA al instante.</p>
              <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
              <label htmlFor="file-upload" className="cursor-pointer bg-violet-600 text-white font-bold py-2 px-6 rounded-full inline-block hover:bg-violet-700 transition-colors">
                Elegir Archivo
              </label>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-2xl shadow-md space-y-4">
              <img src={imagePreview} alt="Preview" className="rounded-lg shadow-inner w-full h-64 object-contain bg-gray-100" />
              <div className="flex border-b">
                <button onClick={() => setImageTab('ANALYZE')} className={`flex-1 pb-2 font-semibold text-center ${imageTab === 'ANALYZE' ? 'border-b-2 border-violet-600 text-violet-600' : 'text-gray-500'}`}>Análisis IA</button>
                <button onClick={() => setImageTab('EDIT')} className={`flex-1 pb-2 font-semibold text-center ${imageTab === 'EDIT' ? 'border-b-2 border-violet-600 text-violet-600' : 'text-gray-500'}`}>Edición IA</button>
              </div>

              {imageTab === 'ANALYZE' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Obtén feedback sobre tu dibujo. Elige entre un análisis rápido o uno experto y detallado.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={handleAnalyze} disabled={!!loading} className="bg-violet-600 text-white font-bold py-3 px-4 rounded-full text-sm disabled:bg-gray-300">Análisis Rápido</button>
                    <button onClick={handleComplexSuggestion} disabled={!!loading} className="bg-purple-800 text-white font-bold py-3 px-4 rounded-full text-sm disabled:bg-gray-300">Análisis Experto</button>
                  </div>
                </div>
              )}

              {imageTab === 'EDIT' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Describe los cambios que quieres hacer en la imagen.</p>
                  <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ej: 'añade un filtro retro', 'hazlo más colorido'" className="w-full p-2 border border-gray-300 rounded-lg text-sm" rows={2}/>
                  <button onClick={handleEdit} disabled={!prompt || !!loading} className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-full text-sm disabled:bg-gray-300">Aplicar Edición</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {mode === 'GENERATE' && (
        <div className="bg-white p-4 rounded-2xl shadow-md space-y-3">
           <h3 className="font-bold">Generar Imagen desde Cero</h3>
           <p className="text-sm text-gray-600">Describe la imagen que quieres crear. Sé tan detallado como quieras para obtener los mejores resultados.</p>
           <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ej: 'un gato astronauta pintando la luna, estilo acuarela'" className="w-full p-2 border border-gray-300 rounded-lg" rows={4}/>
           <button onClick={handleGenerate} disabled={!prompt || !!loading} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-full disabled:bg-gray-300">Generar</button>
        </div>
      )}
      
      {(loading || error || result) && (
        <div className="bg-white p-4 rounded-2xl shadow-md">
            {loading ? <LoadingIndicator /> : null}
            {error ? <div className="p-4 text-red-600 bg-red-100 rounded-lg">{error}</div> : null}
            {result && (
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">Resultado de la IA</h3>
                    {resultIsImage ? (
                         <img src={result} alt="Generated or Edited Artwork" className="rounded-lg shadow-inner w-full h-64 object-contain bg-gray-100" />
                    ) : (
                        <div className="bg-violet-50 p-4 rounded-lg text-gray-700 whitespace-pre-wrap text-sm max-h-96 overflow-y-auto">{result}</div>
                    )}
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default CreateScreen;