import { Button, Modal } from 'react-bootstrap'


const GenericModal = ({ title, show, onHide, children }) => {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            style={{ opacity: 1 }}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>סגירה</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GenericModal;