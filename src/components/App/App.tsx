import React, { useEffect } from 'react';
import Home from '../Home/Home';
import {
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import PropertyDetails from '../PropertyDetails/PropertyDetails';
import Search from '../Search/Search';
import Nav from '../Nav/Nav';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import UploadProperty from '../UploadProperty/UploadProperty';
import ImagesInput from '../Inputs/ImagesInput';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authActions } from '../../store';
import { authVerify } from '../Auth/AuthVerify';
import ProtectedRoute from '../ProtectedRoute';
import { RootState } from '../../store/reducers';

function App() {

  const dispatch = useAppDispatch()
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.user)

  const logout = () => {
    dispatch(authActions.logout());
  }

  let func = logout;

  useEffect(() => {
    const authenticate = authVerify(func);
    localStorage.setItem('isAuthenticated', JSON.stringify(authenticate));
  }, [location])

  return (
    <div className="bg-[#F9FCFB] px-10 py-4 min-h-screen">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<Login />} />
        <Route path='/upload-property'
          element={
            <ProtectedRoute
              user={isAuthenticated}
              redirectPath={'/login'}
            />}>
          <Route path='/upload-property/images' element={<ImagesInput />} />
          <Route path='/upload-property/details' element={<UploadProperty />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/:id' element={<PropertyDetails />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
