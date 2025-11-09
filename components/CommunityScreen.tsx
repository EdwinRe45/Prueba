import React from 'react';
import GatoWise from './GatoWise';

const CommunityPost: React.FC<{ id: number, user: string }> = ({ id, user }) => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img src={`https://picsum.photos/400/300?random=${id + 20}`} alt={`Artwork by ${user}`} className="w-full h-40 object-contain bg-gray-100" />
        <div className="p-4">
            <div className="flex items-center mb-3">
                <img src={`https://picsum.photos/50/50?random=${id + 30}`} alt={user} className="w-10 h-10 rounded-full mr-3" />
                <span className="font-bold text-gray-800">{user}</span>
            </div>
             <button className="w-full bg-violet-100 text-violet-700 font-bold py-2 rounded-full hover:bg-violet-200 transition-colors duration-300 text-sm">
                Dar feedback
            </button>
        </div>
    </div>
);

const CommunityScreen: React.FC = () => {
    const posts = [
        { id: 1, user: 'ArtistaCreativo' },
        { id: 2, user: 'Dibu_Amante' },
        { id: 3, user: 'Colorin' },
        { id: 4, user: 'SketchMaster' },
        { id: 5, user: 'PixelPerfect' },
        { id: 6, user: 'TrazoFirme' },
        { id: 7, user: 'ArteDigital' },
        { id: 8, user: 'LaPintora' },
    ];

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-violet-800">Comunidad</h1>
            <div className="bg-violet-600 text-white p-4 rounded-2xl shadow-md flex items-center space-x-4">
                 <img src="https://i.imgur.com/dT1vMi8.png" alt="GatoWise en la comunidad" className="w-20 h-20 flex-shrink-0 object-contain" />
                <p className="font-semibold text-sm">Aprende observando a otros artistas 🐾</p>
            </div>
            <div className="space-y-6">
                {posts.map(post => <CommunityPost key={post.id} id={post.id} user={post.user} />)}
            </div>
        </div>
    );
};

export default CommunityScreen;