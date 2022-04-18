import { useEffect } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import axiosClient from "../../config/axiosClient";
import { ADD_COIN_VALUES } from "../../constants";
import useForm from "../../hooks/useForm";

const EditModal = ({show, handleClose,selected, getCoins}) => {
  
  const getCoin = async () =>{
    try {
      const response = await axiosClient.get('/coins/coin/'+selected);
      setValues(response.data.coin);
    } catch (error) {
      console.log(error);
    }
  }
  const updateCoin = async (info) =>{
    try {
      //? Una forma alternativa de hacerlo
      // const response = await axiosClient.put('/coins/'+selected,info);
      // setCoins([...coins.filter(coin=>coin._id!=selected),response.data.coinUpdated]);
      await axiosClient.put('/coins/'+selected,info);
      getCoins();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getCoin();
  },[selected])
  const {values, setValues, handleSubmit, handleKeyUp} = useForm(ADD_COIN_VALUES,updateCoin)
  return ( 
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Coin</Modal.Title>
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
              defaultValue={values.name}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Abreviación">
            <Form.Control
              type="text"
              placeholder="PEP"
              className=""
              onKeyUp={handleKeyUp}
              name="abbreviation"
              defaultValue={values.abbreviation}
            />
          </FloatingLabel>
          <Button className="primary-button" type="submit" onClick={handleClose}> Editar</Button>
        </form>
        </Modal.Body>
      </Modal>
  );
}
 
export default EditModal;