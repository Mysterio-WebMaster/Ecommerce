import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Aunthentication/Login';
import Register from './Components/Aunthentication/Register';
import Index from './Components/Index';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Index/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
