import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './components/Registration'
import Login from "./components/Login"
import AddEvent from "./components/AddEvent";
import Home from "./components/Home";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addevent' element={<AddEvent />} />
      </Routes>
    </Router>

    </>
    
  );
}

export default App;
