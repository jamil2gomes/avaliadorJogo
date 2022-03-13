import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {ModalProps}  from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface PopOverPros extends ModalProps{
    id:Links;
    titulo: string;
    conteudo: string;
}

export enum Links {
    CORES= "https://gaia.wiki.br/vocabulario-visual-e-textual/cores",
    AUDIO = "https://gaia.wiki.br/multimidia/evite-sons-perturbadores",
    INTERFACE = "https://gaia.wiki.br/engajamento/interface-minimalista",
    NAVEGABILIDADE = "https://gaia.wiki.br/navegabilidade/navegacao-simples",
    FEEDBACK = "https://gaia.wiki.br/resposta-as-acoes/confirmacao-de-acoes"
}

const Dialog: React.FC<PopOverPros> = ({id, titulo, conteudo, ...rest}) => {

    return (
        <>
    <Modal
     {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {conteudo}
          <a href={id} target="_blank">Saiba mais.</a>
        </p>
      </Modal.Body>
    </Modal>
        </>
    )
}

export default Dialog;