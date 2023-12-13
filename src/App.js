import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/home/Home";
import NavigationMenu from "./layouts/navbar/NavigationMenu";
import Topbar from "./layouts/topbar/Topbar";
import Profile from "./pages/profile/Profile";
import Societies from "./pages/societies/Societies";
import Ts from "./utils/Ts";
import SocietyPage from "./features/societies/components/societyPage/SocietyPage";
import { useSelector } from "react-redux";
import { selectAllUser } from "./services/user/reducers/userSlice";

function App() {
  // const currentUser = useSelector(selectAllUser);
  // console.log(currentUser);
  return (
    <>
      <Routes>
        <Route path="landing" element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="otp" element={<OTP />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route
          element={
            <div className="app-container">
              <NavigationMenu />
              <div className="flex">
                <Topbar />
                <Outlet />
              </div>
            </div>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/:id" element={<h1>Profile</h1>} />
          </Route>
          <Route path="/societies" element={<Societies />}></Route>
          <Route path="/societies/:id" element={<SocietyPage />} />
        </Route>
        <Route path="/ts" element={<Ts />} />
      </Routes>
    </>
  );
}

export default App;
