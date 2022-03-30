import { createContext } from "react";
import { Usuario } from "../interfaces";

export interface AuthContextType{
    usuario:Usuario|null;
    signIn:(email:string, senha:string) => Promise<boolean>;
    signOut:()=>void;
}

export const AuthContext = createContext<AuthContextType>(null!);