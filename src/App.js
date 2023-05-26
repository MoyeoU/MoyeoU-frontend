import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Mypage from "./routes/Mypage";
import Signup from "./routes/Signup";
import PostView from "./routes/PostView";
import CreatePost from "./components/CreatePost";
import Evaluation from "./routes/Evaluation";

function App() {
  return (
    <>
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
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //회원가입 경로
            path="/signup"
            element={<Signup />}
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //postDetail 경로
            path="/postView/:id"
            element={<PostView />}
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //createPost 경로
            path="/createPost"
            element={<CreatePost />}
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //notice 경로
            path="/evaluateMember"
            element={<Evaluation />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
