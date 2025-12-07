import MovieRoutes from "./frontend/routes/routes";
import Navbar from "./frontend/components/Navbar/Navbar.jsx";
import "./App.css";
import { IoMdMenu } from "react-icons/io";

const App = () => {
  return (
      <div className="main">
      <div className="nav">
        <Navbar />
      </div>
      <div className="content">
        <div className="heading">
          <button><IoMdMenu /></button>
          <img src="./public/logo.png" alt="" />
          <h1>Movie Portal</h1>
        </div>
        <div className="bodyContent">
          <MovieRoutes />
        </div>
      </div>
    </div>
  );
};

export default App;
