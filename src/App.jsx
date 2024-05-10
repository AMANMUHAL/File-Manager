
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./assets/SignIn";
import SignUp from "./assets/SignUp";
import HomePage from "./assets/HomePage";

function App() {
  return (
    
      <BrowserRouter>
          <Routes>
            <Route path="/HomePage" element={<HomePage />}></Route>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
          </Routes>
      </BrowserRouter>
    
  );
}

export default App;