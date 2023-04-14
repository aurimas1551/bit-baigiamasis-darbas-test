import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRead } from "../Use/useRead";
import { useWrite } from "../Use/useWrite";

export const Global = createContext();

export const GlobalProvider = ({children}) => {

    const [listBox, listContainer, setUpdate] = useRead();
    const [response, setCreateBox, setDeleteBox, setEditBox, setCreateContainer, setDeleteContainer] = useWrite();
    const [route, setRoute] = useState('admin');
    const [authName, setAuthName] = useState(null);
    const [logged, setLogged] = useState(null);

    useEffect(() => {
        setUpdate(Date.now());
    }, [setUpdate, response]);

    const logOut = _ => {
        axios.post('http://localhost:3003/logout', {}, {withCredentials: true})
        .then(res => {
            setLogged(false);
            setAuthName(false);
        });
    }
    
    return (
        <Global.Provider value={{
            setUpdate,
            //crud box
            setCreateBox,
            setDeleteBox,
            setEditBox,
            listBox,
            //crud container
            listContainer,
            setCreateContainer,
            setDeleteContainer,
            //routes
            route, setRoute,
            //auth
            authName, setAuthName, logOut, logged, setLogged
        }}>
            {children}
        </Global.Provider>
    )
}