import { Routes, Route, useLocation } from "react-router-dom";
// import Overview from "./Component/Overview";
import "./App.css";
import Sidenav1 from "./Component/sidenav";
import Overview from "./Component/Overview";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
// import { Login } from "./Component/Login";

export default function App() {
  const location = useLocation();
  const excludeRoutes = ["/", "/Signup"];
  const shouldRenderSidenav = !excludeRoutes.includes(location.pathname);

  return (
    <>
      <div className="App">
        {shouldRenderSidenav && (
          <div className="sidenav-container">
            <Sidenav1 />
          </div>
        )}
        <main>
          <Routes>
             <Route path="/dashboard" element={<Overview />} />
             <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </main>{" "}
      </div>
    </>
  );
}
