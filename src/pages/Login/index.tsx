import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
//Componentes
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Image from 'react-bootstrap/Image';
import MsgErro from 'components/Modal/MsgErro';
import Loading from 'components/Loading';
import GoogleLogin,{GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';

//Imagens, Serviços, Estilos
import criancas from 'assets/criancas.png';
import './login.css';
import { realizarCadastro } from 'services/usuario';


const Login = ({ location }: { location?: string }) => {

    const [validatedLogin, setValidatedLogin] = useState(false);
    const [validatedCadastro, setValidatedCadastro] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [emailCadastro, setEmailCadastro] = useState('');
    const [senhaCadastro, setSenhaCadastro] = useState('');
    const [nomeCadastro, setNomeCadastro] = useState('');
    const [msgErro, setMsgErro] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msgErroText, setMsgErroText] = useState('');
    const { signIn, signInGoogle } = useAuth();
    const [key, setKey] = useState('login');
    let navigate = useNavigate();


    const handleCadastroUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidatedCadastro(true);

        if (!emailCadastro || !nomeCadastro || !senhaCadastro) {
            setMsgErroText(`Ocorreu um erro ao cadastrar o usuário. Verifique os dados inseridos`);
            setMsgErro(true);
            return;
        }

        try {
            setLoading(true);
            const response = await realizarCadastro(nomeCadastro, emailCadastro, senhaCadastro);
            if (response.status === 201) {
                await signIn(emailCadastro, senhaCadastro);
                navigate('/');
                window.location.href = window.location.href;
            }
        } catch (error:any) {
            setMsgErroText(`Ocorreu um erro ao cadastrar o usuário. ${error.response.data.mensagem}`);
            setMsgErro(true);
        } finally {
            setLoading(false);
        }
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidatedLogin(true);

        if (email && senha) {
            try {
                setLoading(true);
                await signIn(email, senha);
                navigate('/')
                window.location.href = window.location.href;
            } catch (error: any) {
                setMsgErroText(`Ocorreu um erro ao logar. E-mail ou senha inválidos`);
                setMsgErro(true);
                setEmail('');
                setSenha('');
            } finally {
                setLoading(false);
            }
        }

    }

    const responseGoogle = async(response:GoogleLoginResponse | GoogleLoginResponseOffline) =>{
        
       if('code' in response){
            throw new Error("Serviço offline!")
       }
       
        const {profileObj:{email, name, googleId}} = response;
        try {
            await signInGoogle(name, email, googleId );
            navigate('/');
            window.location.href = window.location.href;
        } catch (error:any) {
            setMsgErroText(`Ocorreu um erro ao logar.`);
            setMsgErro(true);
        }
    }

    const onFailure = (erro:any) =>{
       if(erro.error !== "popup_closed_by_user"){
        setMsgErroText(`Ocorreu um erro ao logar.`);
        setMsgErro(true);
       }
    }


    return (
        <div className='d-flex'>
            {
                !loading ?
                    <div className="d-flex align-items-center flex-column justify-content-center containerForm">
                        <Tabs
                            id="controlled-tab-example"
                            className="mb-3"
                            activeKey={key}
                            onSelect={(e) => {
                                ;
                                if (e === 'cadastro') {
                                    setValidatedCadastro(false);
                                    setKey('cadastro');
                                } else {
                                    setValidatedLogin(false);
                                     setKey('login');
                                }
                            }}
                            style={{ width: '80%' }}
                        >
                            <Tab eventKey="login" title="Login">
                            
                                <div className="w-100 mb-4 d-flex align-items-center flex-column  justify-content-center">
                                    <GoogleLogin
                                        clientId="626320080950-ldtkovf8hhlrq31a4jj2d4n8mcejhg8d.apps.googleusercontent.com"
                                        buttonText="LOGAR COM GOOGLE"
                                        onSuccess={responseGoogle}
                                        onFailure={onFailure}
                                    />
                                </div>
                                <Form
                                    style={{ width: '100%' }}
                                    noValidate
                                    validated={validatedLogin}
                                    onSubmit={handleLogin}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email*</Form.Label>
                                        <Form.Control
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            size='lg'
                                            type="email"
                                            placeholder="Insira seu email"
                                            autoFocus
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Campo email inválido. Digite um formato de email válido.</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Senha*</Form.Label>
                                        <Form.Control
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            size='lg'
                                            type="password"
                                            minLength={4}
                                            maxLength={16}
                                            placeholder="Insira sua senha"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Senha precisa ter no mínimo 4 caracteres e no máximo 16 caracteres</Form.Control.Feedback>
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type='submit'
                                    >
                                        Logar
                                    </Button>

                                </Form>
                            </Tab>
                            <Tab eventKey="cadastro" title="Cadastro">
                                <Form
                                    style={{ width: '100%' }}
                                    noValidate
                                    validated={validatedCadastro}
                                    onSubmit={handleCadastroUsuario}>
                                    <Form.Group className="mb-3" controlId="formCadastroNome">
                                        <Form.Label>Nome*</Form.Label>
                                        <Form.Control
                                            value={nomeCadastro}
                                            onChange={(e) => setNomeCadastro(e.target.value)}
                                            size='lg'
                                            minLength={4}
                                            type="text"
                                            placeholder="Insira seu nome completo"
                                            autoFocus
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Campo nome precisa ter no mínimo 4 caracteres </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formCadastroEmail">
                                        <Form.Label>Email*</Form.Label>
                                        <Form.Control
                                            value={emailCadastro}
                                            onChange={(e) => setEmailCadastro(e.target.value)}
                                            size='lg'
                                            type="email"
                                            placeholder="Insira seu email"
                                            autoFocus
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Campo email inválido. Digite um formato de email válido.</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formCadastroSenha">
                                        <Form.Label>Senha*</Form.Label>
                                        <Form.Control
                                            value={senhaCadastro}
                                            onChange={(e) => setSenhaCadastro(e.target.value)}
                                            size='lg'
                                            type="password"
                                            minLength={4}
                                            maxLength={16}
                                            placeholder="Insira sua senha"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Senha precisa ter no mínimo 4 caracteres e no máximo 16 caracteres</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type='submit'
                                    >
                                        Cadastrar
                                    </Button>
                                </Form>
                            </Tab>
                        </Tabs>

                    </div> : <Loading />

            }
            <div className="containerImagem">
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                    <Image fluid src={criancas} width={400} height={400} />
                </div>
            </div>
            <MsgErro
                show={msgErro}
                mensagem={msgErroText}
                onHide={() => setMsgErro(false)}
            />
        </div>
    )
}


export default Login;