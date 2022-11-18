import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Aunthentication/Login';
import Register from './Components/Aunthentication/Register';
import Index from './Components/Index';
import Cart from './Components/Cart';



import Admin from './Components/Admin/Admin';
import AdminCart from './Components/Admin/Cart'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Index/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/cart' element={<Cart/>} />

          {/*Admin*/}
          <Route path='/Admin' element={<Admin/>} />
          <Route path='/Admin/Cart' element={<AdminCart/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
