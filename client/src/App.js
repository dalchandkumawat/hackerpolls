import React,{useState} from 'react';
import {Switch,BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import AddCandidate from './Components/AddCandidate';
import Candidate from './Components/Candidate';
const Routing = (props) => {
  return (
    <Switch>
      <Route exact path='/'><Home isAdmin={props.isAdmin}></Home></Route>
      <Route path='/Candidate/AddCandidate'><AddCandidate></AddCandidate></Route>
      <Route path='/AddCandidate'><AddCandidate></AddCandidate></Route>
      <Route path='/Candidate'><Candidate isAdmin={props.isAdmin}></Candidate></Route>
    </Switch>
  )
}
function App() {
  const [isAdmin,setIsAdmin] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Navbar isAdmin={isAdmin} onChange={(val)=>setIsAdmin(val)}></Navbar>
        <Routing isAdmin={isAdmin}></Routing>
      </BrowserRouter>
    </>
  );
}

export default App;
