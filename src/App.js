import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home1 from "./components/Home1";
import Search from "./components/Search";
import Login1 from "./components/Login1";
import Registration1 from "./components/Registration1";
import AddEvents from "./components/AddEvents";

library.add(fas);
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/registration" element={<Registration1 />} />
          <Route path="/login" element={<Login1 />} />
          <Route path="/" element={<Home />}>
            <Route index element={<Home1 />} />
            <Route path="addevent" element={<AddEvents />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
