import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const {logout} = useContext(UserContext)
  return ( <button onClick={logout}>cerrar sesion</button> );
}
 
export default Home;