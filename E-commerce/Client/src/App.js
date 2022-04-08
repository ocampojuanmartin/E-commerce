import './App.css';
import React from "react";
import Detail from './Components/Detail';
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/navBar/navBar'
import Login from './Components/Login';
import ResultSearch from './Components/ResultSearch';
import CreatePage from './Components/CreatePage';
import Favorites from './Components/Favorites';
import { ThemeProvider } from '@mui/material';
import ControlPanel from './Components/ControlPanel';
import { Container } from '@mui/material';
import CreateUser from './Components/CreateUser';
import Carrito from './Components/Carrito';
import CustomTheme from './assets/CustomTheme';
import Stock from './Components/Stock';
import Users from './Components/Users';
import Orders from './Components/Orders';
import Success from './Components/Success';
import Profile from './Components/Profile';
import EmailActivate from './Components/emailActivate';
import ResetPassword from './Components/ResetPassword'
import ForgotPassword from './Components/ForgotPassword'
import { Review } from './Components/Reviews';
import Categories from './Components/Categories';
import Newsletter from './Components/Newsletter'
import Footer from './Components/Footer'



function App() {
  return (
    <ThemeProvider theme={CustomTheme}>

      <div className="App">
        <NavBar />
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product/:_id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/result" element={<ResultSearch />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/CreateUser' element={<CreateUser />} />
            <Route path='/admin' element={<ControlPanel />} />
            <Route exact path='/success' element={<Success />} />
            <Route path="/admin/stock" element={<Stock />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/createproduct" element={<CreatePage />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path='/me/:me' element={<Profile />} />
            <Route path='/api/auth/email-activate/:token' element={<EmailActivate />} />
            <Route path='/resetpassword/:token' element={<ResetPassword />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path="/review/:productId" element={<Review />} />
            <Route path="/admin/Newsletter" element={<Newsletter />} />
          </Routes>
        </Container>
        <Footer/>
      </div>
    </ThemeProvider>

  );
}

export default App;

