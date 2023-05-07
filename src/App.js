//import logo from "./logo.svg";
//import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Mypage from "./routes/Mypage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          //path={`${process.env.PUBLIC_URL}/hello`}
          path="/"
          element={<Home />}
        ></Route>
        <Route
          //path={`${process.env.PUBLIC_URL}/movie/:id`}
          //마이페이지 경로
          path="/myPage/:id"
          element={<Mypage />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
