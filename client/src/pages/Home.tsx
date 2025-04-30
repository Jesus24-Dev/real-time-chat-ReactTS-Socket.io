import {useState} from 'react'
import ChatBox from '../components/ChatBox';
import CreateRoomForm from '../components/room/CreateRoomForm';
import RoomList from '../components/room/RoomList';
import UserRoomList from '../components/room/UserRoomList';
import UserProfile from '../components/UserProfile';

export default function Home() {
    const [error, setError] = useState<string | null>(null);
    
    const handleGlobalError = (errorMsg: string) => {
        setError(errorMsg);
        setTimeout(() => setError(null), 5000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header/Navbar */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-amber-600">Chat App</h1>
                    <UserProfile onError={handleGlobalError} />
                </div>
            </header>

            {/* Notificación de error global */}
            {error && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg flex items-start">
                        <span className="mr-2">⚠️</span>
                        <div>
                            <p className="font-medium">Error</p>
                            <p>{error}</p>
                        </div>
                        <button 
                            onClick={() => setError(null)}
                            className="ml-4 text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {/* Contenido Principal */}
            <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sección de Salas */}
                <div className="lg:col-span-1 space-y-6">
                    <CreateRoomForm />
                    <UserRoomList />
                    <RoomList />
                </div>

                {/* Chat Principal */}
                <div className="lg:col-span-2">
                    <ChatBox/>
                </div>
            </main>
        </div>
    );
}