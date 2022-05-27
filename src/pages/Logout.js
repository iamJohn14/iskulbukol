import { Navigate } from 'react-router-dom';


export default function Logout() {

    // to delete the items in the localStorage
    localStorage.clear()

    return (
        <Navigate to="/" />

    )
}