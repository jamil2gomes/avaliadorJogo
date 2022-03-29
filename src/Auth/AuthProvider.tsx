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
                    console.log('entrei aki', pegarUsuario)
                    setUsuario(JSON.parse(pegarUsuario));
                }
        }

        recuperarDados();
    },[])

    const signIn = async (email:string, senha:string) => {

        try {
            const response = await realizarLogin(email, senha);
            localStorage.setItem('usuario', JSON.stringify(response.data));
        } catch (error:any) {
           throw new Error(error.response.data); 
        }
    }

    const signOut = ()=>{
        setUsuario(null);
        localStorage.removeItem("usuario");
    }


    return(
        <AuthContext.Provider value={{usuario, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}