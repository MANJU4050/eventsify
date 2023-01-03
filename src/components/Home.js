import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import LoggedNav from "./LoggedNav";


const Home = () => {
  const [logState, setLogState] = useState(false);
  const changeLogState = ()=>{
    setLogState(()=>{
      return !logState;
    })
  }

  const token = localStorage.getItem('token')
 
  return (
    <>
      {token?<LoggedNav logState={changeLogState}/>:<Navbar />}
      <Outlet />
    </>
  );
};

export default Home;
