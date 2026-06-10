import { useState, useEffect } from 'react'
import { Link, Route, Routes, useLocation} from 'react-router-dom'
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import About from './pages/About'
import Home from './pages/Home'
import Automaton from './pages/Automaton';
import Code from './pages/Code';
import Contact from './pages/Contact';
import './App.css'

function App() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="primary" data-bs-theme="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand className={location.pathname === "/" ? "brand-active brand me-2 ms-2" : "brand me-2 ms-2"} as={Link} to="/" onClick={() => setActive("/")}>בית</Navbar.Brand>
          {/* <Navbar.Text>Signed in as: </Navbar.Text> */}
          <Navbar.Text>האתר בהרצה ואינו מוכן</Navbar.Text>
          
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav
              variant="underline" defaultActiveKey="home"
              className="me-auto"
              onSelect={(selectedKey) => setActive(selectedKey)}
              activeKey={active}>
              <Nav.Link as={Link} eventKey='code' to="/code">קוד</Nav.Link>
              <Nav.Link as={Link} eventKey='automaton' to="/automaton">אוטומטים</Nav.Link>
              <Nav.Link as={Link} eventKey='about' to="/about">אודות</Nav.Link>
              <Nav.Link as={Link} eventKey='contact' to="/contact">צרו קשר</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Check
                type="switch"
                id="theme-switch"
                label={dark ? 'switch to light' : 'switch to dark'}
                checked={dark}
                onChange={() => setDark(prev => !prev)}
                className="text-light"
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="px-3 px-md-4 flex-grow-1 d-flex flex-column">
        <Routes>

          <Route path="/about" element={<About />} />
          <Route path="/automaton" element={<Automaton />} />
          <Route path="/code" element={<Code />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
