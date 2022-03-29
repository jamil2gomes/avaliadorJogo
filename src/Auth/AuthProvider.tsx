import { AuthContext } from "./AuthContext"
import { useEffect, useState } from "react"
import { Usuario } from "../interfaces";
import { realizarLogin } from "../services/usuario";

export const AuthProvider = ({children}:{children:JSX.Element})=>{
    const[usuario, setUsuario] = useState<Usuario|null>(null);
    
    useEffect(()=>{
        const recuperarDados = async() =>{
           
            const pegarUsuario = localStorage.getItem('usuario');
                if(pegarUsuario){
                    setUsuario(JSON.parse(pegarUsuario));
                }
        }

        recuperarDados();
    },[setUsuario])

    const signIn = async (email:string, senha:string) => {

        try {
            const response = await realizarLogin(email, senha);
            localStorage.setItem('usuario', JSON.stringify(response.data));
            return true;
        } catch (error:any) {
           throw new Error(error.response.data); 
        }
    }

    const signOut = ()=>{
        localStorage.removeItem("usuario");
        setUsuario(null);
    }


    return(
        <AuthContext.Provider value={{usuario, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}