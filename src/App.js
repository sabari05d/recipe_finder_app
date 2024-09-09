
import Landing from './components/Landing';
import { useState } from 'react';
import { Button, Container, Form, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function App() {

  const [search, setSearch] = useState(null)

  const dataHandle = (event) => {
    event.preventDefault();
    let dishName = document.getElementById('searchDish').value;
    console.log(dishName);
    setSearch(dishName);
  }



  return (
    <Container fluid className='p-0  bg-gradient-1 min-vh-100'>
      <Navbar expand="lg" className="bg-black fixed-top">
        <Container fluid className='justify-content-center'>
          <Navbar.Brand href="/" className='landing-font text-light fs-3' >Recipe Finder App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className='p-0'>
        <Container fluid className='row m-0 p-4 align-content-center justify-content-center' >
          <Form className='col-md-4 w-auto mt-5'>
            <InputGroup className='mt-4 border rounded-5 border-black'>
              <Form.Control
                placeholder="Search for recipe..."
                aria-label="Search for Recipe"
                aria-describedby="basic-addon2"
                id='searchDish'
                className='shadow-none border-0 ps-4 ps-md-3 py-3 py-md-2 outline-none bg-transparent'
              />
              <Button variant="outline-dark" className='fw-semibold search-btn text-black border-0 border-start border-black rounded-5 rounded-start-0 px-3 ' id="button-addon2" type='submit'
                onClick={dataHandle} >
                Search
              </Button>
            </InputGroup>
          </Form>
        </Container>
        <Landing dishName={search} />
      </Container>
    </Container>
  );
}

export default App;
