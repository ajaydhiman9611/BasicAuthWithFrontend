import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import Login from "./Components/Auth/Login"
import AppWrapper from "./AppWrapper"
import Dashboard from "./Components/Dashboard";
import { isLoggedIn } from "./helper/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AppWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


const ProtectedRoute  =({children})=>{
  if (!isLoggedIn()) {
    return <Navigate to={'/login'} replace />;
  }
  return children ? children : <Outlet />;
}