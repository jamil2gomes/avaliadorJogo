import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import criancas from '../../assets/criancas.png'
const Login = () => {

    return(
        <div className='d-flex'>
            <div className ="d-flex align-items-center justify-content-center" style={{width:425, height:'100vh'}}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Insira seu email" autoFocus />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Insirua sua senha" />
              </Form.Group>
              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
        </div>
        <div className ="d-flex align-items-center justify-content-center" style={{width:'100%', backgroundColor:'#6500B0'}}>
            <Image fluid src={criancas} width={400} height={400} />
        </div>
        </div>
    )
}


export default Login;