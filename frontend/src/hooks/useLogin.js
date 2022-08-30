import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();
        if(response.ok){
            // store user and jwt token in local storage
            localStorage.setItem('user', JSON.stringify(json));
            // update auth context
            dispatch({type: 'LOGIN', payload: json})
        }else{
            setError(json.error);
        }
        setIsLoading(false);
    }

    return {login, isLoading, error};

}


export default useLogin;