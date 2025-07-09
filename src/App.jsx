import "./App.css";
import {Footer, Header} from ".";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default App;
