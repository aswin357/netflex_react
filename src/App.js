import React from "react";
import NavBar from "./components/NavBar/NavBar";
import {originals,action,horror} from './urls'
import "./App.css"
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";

function App() {
  return (
    <div className="App">
     <NavBar/>
     <Banner/>
     <RowPost url={originals} title="Netflix Originals"/>
     <RowPost  url={action} title="Action" isSmall/>
     <RowPost  url={horror} title="HorrorMovies" isSmall/>
    </div>
  );
}

export default App;