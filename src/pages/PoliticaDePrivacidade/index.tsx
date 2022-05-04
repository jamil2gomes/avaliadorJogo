import { Container } from "react-bootstrap"
import Footer from "components/Footer"
import NavBar from "components/NavBar"
import './politica.css';


const PoliticaPrivacidade = () => {

    return (
        <>
        <NavBar  exibirPesquisa={false}/>
        <Container className="container">
        <h2>Política de Privacidade</h2>
        <p className="paragrafoIndentado">O AutGamesFinder deseja que o usuário sinta-se seguro que todas as informações fornecidas estão sendo protegidas com cuidado por nosso site.</p>
        <h3>Coleta de Informações</h3>
        <p className="paragrafoIndentado">Afim do usuário poder interagir  em nosso site, avaliando e escrevendo análises para os jogos, retemos informações através do registro voluntário. Ou seja, o usuário é convidado a preencher um cadastro onde informa alguns dados pessoais, como nome e email. O usuário deverá informar dados verdadeiros sobre si mesmo ao se cadastrar no AutGamesFinder.</p>
        <p className="paragrafoIndentado">Caso um usuário opte por não se registrar no AutGamesFinder, o acesso a avaliação da comunidade e análises de outros usuários permanecerão disponíveis normalmente nas páginas dos jogos.</p>
        <h3>Uso das Informações</h3>
        <p className="paragrafoIndentado">Seus dados são utilizados para nos ajudar a prover o melhor serviço possível no tangente a avaliação dos jogos perante julgamente da comunidade de gamers.</p>
        <p className="paragrafoIndentado"><b>O e-mail é confidencial</b> e só o usuário poderá visualizar em qualquer circunstância, exceto quando solicitado por ordem judicial.</p>
        <p className="paragrafoIndentado"><b>Sua senha é criptografada</b> e apenas é utilizada para o usuário fazer login no site. Recomendamos que sua senha não seja compartilhada com qualquer outra pessoa pois é a forma de garantir a identidade do usuário ao utilizar o sistema.</p>
        <h3>Tratamento das Informações</h3>
        <p className="paragrafoIndentado">Quando um usuário se registra, a informação coletada é armazenada unicamente nos servidores do AutGamesFinder. A informação é utilizada com o único propósito de adaptar a sua experiência no site para o seu próprio benefício, além de prover ao público, avaliações fiéis dos jogos, sem comprometer sua privacidade.</p>
        <br/> <br/>
            <p className="paragrafoIndentado">
                <i>Atenciosamente,</i>

            </p >
            <p className="paragrafoIndentado"><i>equipe AutGamesFinder.</i></p>
        </Container>
        <Footer/>
        </>
    )
}

export default PoliticaPrivacidade;