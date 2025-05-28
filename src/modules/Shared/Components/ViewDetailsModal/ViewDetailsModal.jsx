
import { Children } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ViewDetailsModal({title,description,info,show, setShow,head,img, children}) {
    const handleClose = () => setShow(false);
  
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{head} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <div className="text-center"><img className="w-50 " src={img} alt="item image" /></div>
                <h5 className="text-center">{title}</h5>
                <p>{description}</p>
                <p>{info}</p>
                {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="transparent" className="border-danger text-danger fw-bold" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
