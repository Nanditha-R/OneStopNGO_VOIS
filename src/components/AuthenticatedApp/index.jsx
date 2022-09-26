import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from '../Landing';
import { ChatRoom } from '../ChatRoom';
import NavBar from '../Navbar/Navbar';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Home from '../pages/Home';

function AuthenticatedApp() {
    return (
        <BrowserRouter>
        <NavBar/>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path='/homepage' element={<Home/>}/>
                <Route path='/aboutpage' element={<About/>} />
                <Route path='/contactpage' element={<Contact/>} />
                <Route path="/room/:id" element={<ChatRoom />} />
            </Routes>
        </BrowserRouter>
    );
}

export { AuthenticatedApp };
