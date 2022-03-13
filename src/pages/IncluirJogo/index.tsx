import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import "./incluirJogo.css";

const IncluirJogo = () => {

    return (
        <>
            <Container className="container">
                <h2 className="my-3">Incluir jogo</h2>
                <Form className="" style={{width:"95%"}}>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Insira o nome do jogo" size="lg"	/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={4} size="lg" style={{ resize: 'none' }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dataLancamento">
                        <Form.Label>Data Lançamento</Form.Label>
                        <Form.Control type="date" size="lg" placeholder="Insira o nome do jogo" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="plataformas">
                    <Form.Label>Plataformas</Form.Label>
                        <Form.Select multiple size="lg">
                            <option>Selecione uma plataforma</option>
                            <option value="1">Playstation 4</option>
                            <option value="2">Xbox One</option>
                            <option value="3">Nintendo Switch</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Container>

        </>
    )
}

export default IncluirJogo;