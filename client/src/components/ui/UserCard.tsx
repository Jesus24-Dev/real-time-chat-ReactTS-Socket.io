import UserCardProps from "../../types/userType";
import Button from '../ui/Button';

export default function UserCard({username, status, id}: UserCardProps) {

    const addContact = async () => {
        const user = localStorage.getItem('user')
        const parsedUser = user ? JSON.parse(user) : null
        if(!parsedUser || !id) {
            return
        }

            try {
                const response = await fetch(`http://localhost:3030/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        id_user: parsedUser.id,
                        id_contact: id
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                console.log(errorMessage);
            } 

    }

    return (
      <div className="p-4 mb-3 border border-gray-200 rounded-lg transition-all duration-200 hover:border-amber-300 hover:shadow-md cursor-pointer bg-white flex justify-between">
            <h3 className="font-semibold text-lg text-gray-800 mb-1 flex items-center gap-2">
                {username} <span className="text-gray-600 text-sm">{status === 'online' ? '🟢' : '⚪'}</span>
            </h3>
            <Button label="Add" type="button" onClick={addContact}/>
        </div>
        
    );
}
