import React from 'react';
import Home from '../Home/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import PropertyDetails from '../PropertyDetails/PropertyDetails';
import Search from '../Search/Search';
import Nav from '../Nav/Nav';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import UploadProperty from '../UploadProperty/UploadProperty';
import ImagesInput from '../Inputs/ImagesInput';

function App() {
  return (
    <div className="bg-[#F9FCFB] px-10 py-4 min-h-screen">
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/upload-property'>
            <Route path='/upload-property/images' element={<ImagesInput />} />
            <Route path='/upload-property/details' element={<UploadProperty />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/:id' element={<PropertyDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
