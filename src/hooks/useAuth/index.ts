import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../Auth/AuthContext";

export default function useAuth():AuthContextType{
  const context = useContext(AuthContext);

  if(!context){
      throw new Error('Erro ao criar contexto. É preciso criar dentro do AuthProvider ');
  }

  return context;
}
