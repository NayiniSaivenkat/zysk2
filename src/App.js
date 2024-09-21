import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  const [signupData, setSignupData] = useState(null);
  
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Signup setSignupData={setSignupData} />}
        />
        <Route
          path="/login"
          element={<Login signupData={signupData} />}
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  
  );
};

export default App;

