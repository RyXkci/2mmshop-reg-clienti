import { useState } from "react";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const [admin, setAdmin] = useState(null)

    const login = async(username, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:4000/api/admin/login", {
            method: "POST",
            headers: {
              "Content-Type": "Application/JSON",
            },
            body: JSON.stringify({username, password}),
        })
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem('admin', JSON.stringify(json));
            setAdmin(json)
            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}