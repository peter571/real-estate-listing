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

function App() {
  return (
    <div className="bg-[#F9FCFB] px-10 py-4">
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/upload-property' element={<UploadProperty />} />
          <Route path='/register' element={<Register />} />
          <Route path='/:id' element={<PropertyDetails price={''} rentFrequency={''} rooms={0} title={''} baths={''} area={0} agency={''} isVerified={false} externalID={0} description={''} type={''} purpose={''} furnishingStatus={false} amenities={''} photos={[]} contact={''} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
