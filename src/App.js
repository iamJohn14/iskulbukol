import { useState } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { Container } from 'react-bootstrap';
import Home from './pages/Home'
import CoursePage from './pages/CoursePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import SpecificCourse from './pages/SpecificCourse';
import { UserProvider } from './UserContext';


// react-router
// BrowserRouter as Router(alternative)
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// <>..</> (Fragment) needs to add if we added multiple components/html tags
function App() {

  // state hook for the user state that defined here for global scope
  // This will be used to store the user information and will be used for validating if a user is logged in on the app or not.

  const [user, setUser] = useState({
    accessToken: localStorage.getItem('accessToken'),
    isAdmin: localStorage.getItem('isAdmin') === 'true'
  })

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }


  return (

    <UserProvider value={{ user, setUser, unsetUser }}>
      <BrowserRouter>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<CoursePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/courses/:courseId' element={<SpecificCourse />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter >
    </UserProvider>
  );
}





export default App;
