import React, { Children, useState } from 'react'

const ProtectedRoute = ({ children }) => {

    const [authorized, setAuthorized] = useState(null);  // State to track authorization
    const [loading, setLoading] = useState(true);  // State for loading


    useEffect(() => {
        axios.get("http://localhost:3004/checkCreds", {
            withCredentials: true,  // Send cookies for session management
        })
            .then(res => {
                if (res.status === 200) setAuthorized(true);
            })
            .catch(() => setAuthorized(false))
            .finally(() => setLoading(false));  // Ensure loading is set to false after check
    }, []);


    if (loading) return <p>Loading/....</p>
    if (authorized === false) return <Navigate to="/login" />;  // Redirect to login if unauthorized
    return children;  // Return children (protected page) if authorized

}

export default ProtectedRoute