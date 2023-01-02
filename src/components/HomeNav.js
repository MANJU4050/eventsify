import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import  {useNavigate} from 'react-router-dom'
import { useEffect,useState } from "react";
import axios from "axios";

const HomeNav = ({getFilterValue}) => {

  const [category,setCategory]= useState([]);
  const [filter,setFilter] = useState("allevents");
  const getFilter = (e)=>{
    setFilter(()=>{
return e.target.value;
    })
getFilterValue(e.target.value);
  }


  useEffect(() => {
    const getAllCategories = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/viewallevents"
      );

      const cat = response.data.map(item=>{
        return item.category;
      })

      setCategory(() => {
        return cat;
      });
    };
    getAllCategories();
  }, []);



  const navigate = useNavigate();
  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Eventsify</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

            <Form.Select className="mx-2" onChange={getFilter} value={filter} >
              <option value="allevents">AllEvents</option>
              {category.map((item,index)=>{
                return <option key={index} value={item}>{item}</option>
              })}
            </Form.Select>
          </Nav>

          <Nav navbarScroll>
            <Button onClick={()=>{
              navigate('/login')
            }}>Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeNav;
