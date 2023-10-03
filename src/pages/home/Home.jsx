import NavBar from './../../Components/sections/NavBar';
import Category from '../../Components/Category/Category';
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <>
    <NavBar/>
    <Container>
    <Category/>
    </Container>
    </>
  )
}

export default Home;



