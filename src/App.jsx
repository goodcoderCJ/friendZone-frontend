import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Suspense, lazy } from "react";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


import Loader from "./components/Loader"
const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Userslist = lazy(()=>import("./pages/Userslist"));
const Signin = lazy(()=>import("./pages/Signin"));
const Signup = lazy(()=>import("./pages/Signup"));
const Profile= lazy(()=>import("./pages/Profile"));
const EditProfile= lazy(()=>import("./pages/EditProfile"));




function App() {
  

  
  return (
    <>
      <Suspense fallback={<Loader/>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Userslist />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/user/:userId" element={<Profile />} />
              <Route path="/user/edit/:userId" element={<EditProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </Suspense>
    </>
  );
}

export default App;
