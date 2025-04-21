import {useState, useEffect} from 'react'

interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default function Home(){

    const [user, setUser] = useState<UserAttributes | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if(userId){
            fetch(`http://localhost:3030/api/user/me/${userId}`)
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success'){
                    setUser(data.user)
                } else {
                    setError(data.error || 'An error ocurred')
                }
            })
        }
    }, [])

    return (
        <>
            {error && <div>{error}</div>}
            <div>
                <h1>Welcome, {user?.username}</h1>
                <h2>Your email is: {user?.email}</h2>
            </div>
        </>
    )
}