import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import AddModal from "../AddModal/AddModal";
import EditModal from "../EditModal/EditModal";
import "./CoinManagement.css"

const CoinManagement = () => {
  const [coins, setCoins] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const getCoins = async () => {
    try {
      const response = await axiosClient.get("/coins");
      setCoins(response.data.coins);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCoin = async()=>{
    try {
      await axiosClient.delete('coins/'+selected);
      setCoins(coins.filter(coin=>coin._id!=selected))
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCoins();
  }, []);
  return (
    <Container className="right-block">
      <Button variant="success" onClick={handleShow} className='m-3'>
        Agregar coin
      </Button>
      <Button variant="warning" onClick={handleShowEdit} className='m-3'>Editar coin</Button>
      <Button variant="danger" onClick={deleteCoin} className='m-3'>Borrar coin</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Abreviación</th>
            <td>Ver</td>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            coin._id==selected?
            <tr key={coin._id} onClick={()=>setSelected(coin._id)} className='selected coins'> 
              <td>{coin._id}</td>
              <td>{coin.name}</td>
              <td>{coin.abbreviation}</td>
              <td><Link to={`/coin/${coin._id}`}>Ir a detalle</Link></td>
            </tr>:
            <tr key={coin._id} onClick={()=>setSelected(coin._id)} className='coins'> 
            <td>{coin._id}</td>
            <td>{coin.name}</td>
            <td>{coin.abbreviation}</td>
            <td><Link to={`/coin/${coin._id}`}>Ir a detalle</Link></td>
          </tr>
          ))}
        </tbody>
      </Table>
      <AddModal show={show} handleClose={handleClose} setCoins={setCoins} coins={coins}/>
      <EditModal show={showEdit} handleClose={handleCloseEdit} selected={selected} getCoins={getCoins}/>
    </Container>
  );
};

export default CoinManagement;
