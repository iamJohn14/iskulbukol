// React boostrap components
import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
// react-router
import { Link } from 'react-router-dom';


export default function AppNavbar() {

    // Store the user information (email) in the state
    // getItem gets the key property in the localStorage
    const [user, setUser] = useState(localStorage.getItem('email'))
    console.log(user)

    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="mb-5">
            <Navbar.Brand className="ms-3">Zuitt</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='me-3' xs={12} />
            <Navbar.Collapse id="basic-navbar-nav" className='mx-3'>
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {/* Sample */}
                    {/* <Link to=""></Link> */}
                    <Nav.Link as={Link} to="/courses">Courses</Nav.Link>


                    {(user !== null) ?
                        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        :
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>


        </Navbar>

    )
}

