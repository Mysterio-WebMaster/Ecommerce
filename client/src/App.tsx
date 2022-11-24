import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Aunthentication/Login';
import Register from './Components/Aunthentication/Register';

import Index from './Components/User/Index';
import Cart from './Components/User/Cart';
import Orders from './Components/User/Orders';

import Admin from './Components/Admin/Admin';
import AdminCart from './Components/Admin/Cart'
import AdminOrders from './Components/Admin/Orders'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Index/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/orders' element={<Orders/>} />

          {/*Admin*/}
          <Route path='/Admin' element={<Admin/>} />
          <Route path='/Admin/Cart' element={<AdminCart/>} />
          <Route path='/Admin/Orders' element={<AdminOrders/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
