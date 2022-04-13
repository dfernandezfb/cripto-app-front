import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../config/axiosClient';

const CoinDetail = () => {
  const [coin, setCoin] = useState({})
  const params = useParams();
  const id = params.id;
  console.log(id);
  const getCoin = async()=>{
    try {
      const {data} = await axiosClient.get('/coins/coin/'+id);
      setCoin(data.coin)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getCoin()
  },[])
  return ( 
    <>
      <h1>{coin.name}</h1>
      <p>{coin.abbreviation}</p>
    </>
  );
}
 
export default CoinDetail;