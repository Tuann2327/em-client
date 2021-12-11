import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Home from './home';
import StorePage from './store';
import Detail from './detail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const server_url = 'http://localhost:5050'

const App = ()=>{
  const [currentUser,setUser] =useState(null)
  
  useEffect(()=>{
    
  },[currentUser])

  const SetUser = (id)=>{
    setUser(id)
  }
  
  return(
    <Router>
      {/* <Detail User={currentUser} SetUser={SetUser}></Detail> */}
      {/* <Home User={currentUser} SetUser={SetUser}/>
      <StorePage User={currentUser} SetUser={SetUser}/> */}
      <Routes>
        <Route exact path="/" element={<Home User={currentUser} SetUser={SetUser}/>}/>
        <Route exact path="/shop" element={<StorePage User={currentUser} SetUser={SetUser}/>}/>
        <Route path="/item/:id" element={<Home User={currentUser} SetUser={SetUser}/>}/>
      </Routes>
    </Router>
  )
}
export {server_url};
ReactDOM.render(
    <App />,
  document.getElementById('root')
);
