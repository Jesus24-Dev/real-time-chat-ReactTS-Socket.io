import {useState} from 'react'
import FormField from '../components/ui/FormField';
import { FormData } from '../types/formDataType';
import { fetchAuth } from '../utils/fetchAuth';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [formData, setFormData] = useState<FormData>({email: '', password: '', username: ''})
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, isRegister: boolean) => {
        event.preventDefault();
        fetchAuth(isRegister, formData).then((response) => {
            if(response?.status === 'error'){
                setError(response.error || 'An error occurred')
                setMessage(null)
            } else {
                setMessage(response?.message || 'User logged successfully')
                setError(null)
                if(!isRegister){
                    navigate('/home')
                }
            }
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({...prevData, [name]: value}))
    }

    return (
        <div>
            <h1>Auth page</h1>
            {error && <div>{error}</div>}
            {message && <div>{message}</div>}
            <div>
                <h2>Login form</h2>
                <form onSubmit={(event => handleSubmit(event, false))}>
                    <FormField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
                    <FormField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
                    <button type="submit">Log in</button>
                </form>
            </div>
            <div>
                <h2>Register Form</h2>
                <form onSubmit={(event => handleSubmit(event, true))}>
                    <FormField label="Username" type="username" name="username" value={formData.username} onChange={handleChange} />
                    <FormField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
                    <FormField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
