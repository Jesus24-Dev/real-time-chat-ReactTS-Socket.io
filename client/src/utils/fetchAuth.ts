import { FormData } from "../types/formDataType";

interface AuthResponse {
    status: string;
    message?: string;
    error?: string;
    token?: string;
}

export async function fetchAuth(isRegister: boolean = false, form: FormData){
    const url = isRegister ? 'http://localhost:3030/api/auth/register' : 'http://localhost:3030/api/auth/login'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
    })
    const data = await response.json();
    if(data.status === 'success'){
        if(!isRegister){
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
        }
        const response: AuthResponse = {
            status: data.status,
            message: data.message,
            token: data.token
        }
        return response;
    } else if (data.status === 'error'){
        const response: AuthResponse = {
            status: data.status,
            error: data.error,
        }
        return response;
    }               
}