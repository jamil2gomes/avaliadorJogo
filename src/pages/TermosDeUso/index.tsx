import { Container } from "react-bootstrap";
import Footer from "components/Footer";
import NavBar from "components/NavBar";

import './termos.css';

const TermosDeUso = () => {

    return (
        <>
        <NavBar exibirPesquisa={false} />
        <Container className="container">
           <h2>Termos de Uso</h2>
           <p className="paragrafoIndentado">Ao se cadastrar na plataforma AutGamesFinder, você está concordando com esses Termos de Uso em sua integralidade.</p>
           <h3>Uso aceitável</h3>
           <p className="paragrafoIndentado">O usuário declara que é o único responsável pelas avaliações e análises que vier a realizar nas 
               páginas de jogos no AutGamesFinder. O AutGamesFinder não possui qualquer responsabilidade por dados falsos que porventura venham a ser publicados por qualquer usuário. O AutGamesFinder declara que não apóia, bem como não garante a veracidade e exatidão de qualquer informação, opinião ou feedback que tenha sido postado por qualquer usuário.
            </p>
            <p className="paragrafoIndentado">
            O AutGamesFinder poderá, assim que tiver conhecimento, independente de aviso ou notificação prévia, excluir a conta do usuário em razão de violação de leis e regulamentos municipais, estaduais e federais, bem como violar a moral, a ordem pública e os bons costumes.
            </p>
            <h3>Conteúdo aceitável</h3>
            <p className="paragrafoIndentado">O usuário se compromete a obedecer as seguintes regras:</p>
            <ul>
            <li>Realizar análises de jogos relevantes e que tenham relação com o respectivo jogo.</li>
            <li>Não utilizar qualquer tipo de informação que envolvam conteúdo difamatório, discriminatório, vexatório, ofensivo, pornográfico adulto e infantil, conteúdo que envolva insultos, provocações ou ameaças de forma geral.</li>
            <li>Não cometer fraude, em especial falsidade ideológica, assumindo identidade de outra pessoa.</li>
            <li>Não publicar qualquer tipo de material que provoque ou incentive a violência, criminalidade, bem como a pirataria de produtos.</li>
            <li>Não publicar comentários ou insinuações preconceituosas ou racistas.</li>
            <li>Não realizar propaganda política.</li>
            <li>Não publicar materiais, idéias, textos, ilustrações, ou qualquer documento que esteja sob a proteção da Lei de Propriedade Intelectual.</li>
            <li>Não publicar qualquer comentário ou conteúdo que em sua essência gere danos à AutGamesFinder e a terceiros.</li>
            <li>Não fazer SPAM, divulgar links, propagandas e anúncios.</li>
            <li>Não fazer denúncias infundadas ou sem informações suficientes para comprovar o fato questionado.</li>
            <li>Não divulgar dados pessoais, como por exemplo, numero do seu telefone, e-mail pessoal, endereço, entre outros.</li>
            </ul>
            <h3>Direitos autorais e marcas registradas</h3>
            <p className="paragrafoIndentado"><b>Utilizamos imagens de capa de jogo únicamente para prover informação visual 
                indispensável à compreensão do usuário</b>. Por este motivo <b>utilizamos imagens em pequenas dimensões</b>. As imagens de capa de jogo são legalmente reconhecidos pela desenvolvedora / publicadora do respectivo jogo.
            </p>
            <p className="paragrafoIndentado">
            As marcas registradas, nomes, logotipos e marcas de serviço mostrados são, legalmente reconhecidos ou não, do AutGamesFinder. Nada contido nesse site deve ser entendido como uma forma de conceder licença ou direito de usar qualquer marca registrada sem a autorização prévia escrita do AutGamesFinder. O conteúdo textual apresentado nesse site é propriedade de seu respectivo autor e não pode ser reproduzido total ou parcialmente sem sua expressa permissão escrita.
            </p>
            <h3>Legislação vigente</h3>
            <p className="paragrafoIndentado">
              Esse acordo deve ser regido em todos os aspectos pelas leis da República Federativa do Brasil e do Estado do Maranhão. Todas as partes irrevogavelmente se submetem à exclusiva jurisdição pessoal dos tribunais federais e estaduais localizados no Estado do Maranhão, sempre que aplicável, para qualquer assunto decorrente ou relacionado a esse acordo, exceto aqueles que envolvem ordens ou julgamentos desses mesmos tribunais, caso em que as jurisdições pessoais não devem ser exclusivas.
            </p>
            <h3>Modificação</h3>
            <p className="paragrafoIndentado">
             O AutGamesFinder reserva a si o direito de reexaminar e corrigir os termos e condições desse acordo a qualquer momento. O usuário cadastrado recebe uma notificação por email quando os termos são atualizados. Qualquer correção será obrigatória e válida imediatamente após a postagem do acordo modificado em nosso site. A continuidade do uso do site implica em concordância com qualquer alteração nos termos e condições.
            </p> <br/> <br/>
            <p>
                <i>Atenciosamente,</i>

            </p>
            <p className="paragrafoIndentado"><i>equipe AutGamesFinder.</i></p>
            
        </Container>
        <Footer/>
        </>
    )
}

export default TermosDeUso;