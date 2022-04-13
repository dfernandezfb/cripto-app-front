import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import axiosClient from "../../config/axiosClient";
import { ADD_COIN_VALUES } from "../../constants";
import useForm from "../../hooks/useForm";

const AddModal = ({show, handleClose, setCoins, coins}) => {
  const addCoin = async (info) =>{
    try {
      const response = await axiosClient.post('/coins',info);
      setCoins([...coins,response.data.coinAdded])
    } catch (error) {
      console.log(error);
    }
  }
  const {handleSubmit, handleKeyUp} = useForm(ADD_COIN_VALUES,addCoin)
  return ( 
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Coin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Nombre de la coin"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Pepito"
              className=""
              onKeyUp={handleKeyUp}
              name="name"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Abreviación">
            <Form.Control
              type="text"
              placeholder="PEP"
              className=""
              onKeyUp={handleKeyUp}
              name="abbreviation"
            />
          </FloatingLabel>
          <Button className="primary-button" type="submit" onClick={handleClose}> Agregar</Button>
        </form>
        </Modal.Body>
      </Modal>
  );
}
 
export default AddModal;