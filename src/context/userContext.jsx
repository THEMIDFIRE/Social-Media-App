import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import ServerAPI from "../components/shared/ServerAPI";

export const userContext = createContext(null);


export default function UserContextProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const quit = useNavigate()

    async function getUserData() {
        try {
            const { data } = await ServerAPI('users/profile-data')
            setUserData(data?.user)
        } catch (error) {
            console.log(error);
        }
    }

    function signOut() {
        localStorage.clear()
        setUserData(null)
        quit('/login')
    }


    const value = { userData, setUserData, getUserData, signOut };

    return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
