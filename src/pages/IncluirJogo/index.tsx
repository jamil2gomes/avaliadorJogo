import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Select from "react-select";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import "./incluirJogo.css";
;
interface OptionProp {
    readonly value: number;
    readonly label: string;
}

const dataPlataformas: readonly OptionProp[] = [
    { value: 1, label: "Playstation 4" },
    { value: 2, label: "Xbox One" },
    { value: 3, label: "Nintendo Switch" },
    { value: 4, label: "Web" },
]

const dataGeneros: readonly OptionProp[] = [
    { value: 1, label: "Ação" },
    { value: 2, label: "Corrida" },
    { value: 3, label: "Estratégia" },
    { value: 4, label: "Plataforma" },
    { value: 5, label: "Simulação" },
    { value: 6, label: "Cotidiano" },
]

const IncluirJogo = () => {

    const [plataformas, setPlataformas] = useState<OptionProp[]>([]);
    const [generos, setGeneros] = useState<OptionProp[]>([]);
    const [file, setFile] = useState<any>();

    useEffect(() => { console.log(generos) }, [generos]);

    function handleInput(event: any) {
        const target = event.target as HTMLInputElement;
        if (target && target.files)
            console.log(target.files[0]);
    }

    return (
        <>
            <style type="text/css">
            {`
                .btn-indigo {
                background-color: indigo;
                color: white;
                }

                .btn-indigo:hover {
                color: white;
                background-color: #8000DE;
                }
           `}
            </style>
            <Container className="container">
                <h2 className="my-3">Incluir jogo</h2>
                <Form className="" style={{ width: "95%" }}>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Insira o nome do jogo" size="lg" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={4} size="lg" style={{ resize: 'none' }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dataLancamento">
                        <Form.Label>Data Lançamento</Form.Label>
                        <Form.Control type="date" size="lg" placeholder="Insira o nome do jogo" />
                    </Form.Group>
                    <div className="mb-3" >
                        <label className="mb-2" htmlFor="plataformas">Plataformas</label>
                        <Select
                            placeholder=""
                            id="plataformas"
                            onChange={(_, action) => {
                                if (action.removedValue) {
                                    let index = plataformas.findIndex(item => item === action.removedValue)
                                    plataformas!.splice(index, 1);
                                    setPlataformas([...plataformas]);
                                } else if (action.removedValues) {
                                    setPlataformas([]);
                                } else {
                                    setPlataformas([...plataformas, action.option!])

                                }
                            }}
                            isMulti
                            name="colors"
                            options={dataPlataformas}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="mb-3" >
                        <label className="mb-2" htmlFor="generos">Gêneros</label>
                        <Select
                            placeholder=""
                            id="generos"
                            onChange={(_, action) => {
                                if (action.removedValue) {
                                    let index = generos.findIndex(item => item === action.removedValue)
                                    generos!.splice(index, 1);
                                    setGeneros([...generos]);
                                } else if (action.removedValues) {
                                    setGeneros([]);
                                } else {
                                    setGeneros([...generos, action.option!])

                                }
                            }}
                            isMulti
                            name="colors"
                            options={dataGeneros}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>

                    <Form.Group className="mb-3" controlId="desenvolvedor">
                        <Form.Label>Desenvolvedora</Form.Label>
                        <Form.Control type="text" size="lg" placeholder="Insira a desenvolvedora" />
                    </Form.Group>

                    <Form.Group controlId="capaJogo" className="mb-3">
                        <Form.Label>Capa do jogo</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="Insira a url da imagem da capa do jogo" />
                    </Form.Group>

                    <Button variant="indigo" className="mb-3">Concluir</Button>
                </Form>
                
            </Container>

        </>
    )
}

export default IncluirJogo;