import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
}

interface UserProfileProps {
    onError: (error: string) => void;
}

export default function UserProfile({ onError }: UserProfileProps) {
    const [user, setUser] = useState<UserAttributes | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = localStorage.getItem('user');
                const userId = user ? JSON.parse(user).id : null;

                if (!userId) {
                    onError("No se encontró sesión activa");
                    navigate('/');
                    return;
                }

                const response = await fetch(`http://localhost:3030/api/user/me/${userId}`);
                if (!response.ok) throw new Error("Error al obtener datos del usuario");
                
                const data = await response.json();
                if (data.status === 'success') {
                    setUser(data.user);
                } else {
                    onError(data.error || "Error desconocido");
                }
            } catch (err) {
                onError(err instanceof Error ? err.message : "Error al cargar perfil");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate, onError]);

    const handleLogout = () => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('roomId');
            navigate('/');
        } catch (err) {
            onError(`Error al cerrar sesión: ${err}`);
        }
    };

    if (loading) return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>;

    return (
        <div className="flex items-center space-x-4">
            {user ? (
                <>
                    <div className="text-right hidden sm:block">
                        <p className="font-medium text-gray-800">{user.username}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}