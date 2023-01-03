import React from "react";
import "./Navbar.css";
import { allEvents } from "../features/events/eventsSlice";
import { useSelector, useDispatch } from "react-redux";
import { getPlaceFilter, getCategoryFilter, getSearchFilter } from "../features/navbar/filterSlice";
import { allFilters } from "../features/navbar/filterSlice";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filters = useSelector(allFilters);
    console.log(filters)
  const events = useSelector(allEvents);
  const places = events.map((event) => {
    return event.place.toLowerCase();
  });


function removeDuplicates(arr) {
return arr.filter((item,
  index) => arr.indexOf(item) === index);
}

const placesWithoutDuplicates = removeDuplicates(places);


  const filteredPlaces = placesWithoutDuplicates.map((place, index) => {
    return <option key={index} value={place}>{place}</option>;
  });

  const category = events.map((event) => {
    return event.category;
  });

  const categoryWithoutDuplicates = removeDuplicates(category);
  const filteredCategories = categoryWithoutDuplicates.map((category,index) => {
    return <option key={index} value={category}>{category}</option>;
  });

  const setPlaceFilter=(e)=>{
    dispatch(getPlaceFilter(e.target.value))
  }

  const setCategoryFilter=(e)=>{
    dispatch(getCategoryFilter(e.target.value))
  }

  const setSearchFilter=(e)=>{
    dispatch(getSearchFilter(e.target.value))
  }

  const search = ()=>{
    if(!filters.search) return
    navigate('/search')
  }

  const login = ()=>{
    navigate('/login');
  }

  const home = ()=>{
    navigate('/')
  }

  return (
    <div className="navbar">
      <div className="navleft">
        <h1 onClick={home}>EVENTSIFY</h1>
        <select name="place" id="place" value={filters.place}  onChange={setPlaceFilter} >
            <option value="">all places</option>
          
          {filteredPlaces}
        </select>

        <select name="category" id="category" value={filters.category}  onChange={setCategoryFilter} >
        <option value="">all events</option>

            {filteredCategories}
          </select>
      </div>
      <div className="navright">
        <div className="search">
          <input type="text" placeholder="search events" value={filters.search} onChange={setSearchFilter} />
          
          <button onClick={search}>
            <span>search</span>
          </button>
        </div>
        <div className="loginbtn">
          <button onClick={login}>login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
