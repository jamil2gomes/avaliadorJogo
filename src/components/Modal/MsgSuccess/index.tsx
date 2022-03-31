import React from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface MsgSuccessProps extends ModalProps {
    mensagem: string;
}

const MsgSuccess: React.FC<MsgSuccessProps> = ({ mensagem, onHide, ...rest }) => {


    return (
        <>
            <Modal
                centered
                aria-labelledby="contained-modal-title-vcenter"
                onHide={onHide}
                {...rest}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Sucesso!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{mensagem}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MsgSuccess;