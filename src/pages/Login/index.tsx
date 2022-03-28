import { FormEventHandler, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import criancas from '../../assets/criancas.png';
import './login.css';
const Login = () => {

    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

   

    return(
        <div className='d-flex'>
            <div className ="d-flex align-items-center flex-column justify-content-center containerForm">
                <h1>Login</h1>
            <Form 
            style={{width:'80%'}} 
            noValidate 
            validated={validated} 
            onSubmit={(e)=>{
                 const form = e.currentTarget;
                 if (form.checkValidity() === false) {
                   e.preventDefault();
                   e.stopPropagation();
                 }
             
                 setValidated(true);
            }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  size='lg' 
                  type="email" 
                  placeholder="Insira seu email" 
                  autoFocus 
                  required 
                  />
                  <Form.Control.Feedback type="invalid">Campo email inválido. Digite um formato de email válido.</Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control 
                  value={senha} 
                  onChange={(e)=>setSenha(e.target.value)} 
                  size='lg' 
                  type="password" 
                  minLength={4} 
                  maxLength={8}  
                  placeholder="Insira sua senha" 
                  required 
                  />
                  <Form.Control.Feedback type="invalid">Senha precisa ter no mínimo 4 caracteres e no máximo 8 caracteres</Form.Control.Feedback>
              </Form.Group>
              <Button 
              variant="primary" 
              type='submit'
              >
                Logar
              </Button>
          </Form>
        </div>
        <div className ="containerImagem">
            <div className ="d-flex align-items-center justify-content-center">
                <Image fluid src={criancas} width={400} height={400} />
            </div>
        </div>
        </div>
    )
}


export default Login;