import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Mypage from "./routes/Mypage";
import Signup from "./routes/Signup";
import PostView from "./routes/PostView";
import CreatePost from "./routes/CreatePost";
import Evaluation from "./routes/Evaluation";
import PostViewWriter from "./routes/PostView_writer";
import Edit from "./routes/Edit";
import ChatRoom from "./routes/ChatRoom";
import Chat from "./routes/Chat";
import ScrollToTop from "./components/ScrollToTop";
import ApplyForm from "./routes/ApplyForm";
import EditPost from "./routes/EditPost";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
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
            path="/sign-up"
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
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //postView_writer 경로
            path="/writer"
            element={<PostViewWriter />}
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //edit 경로
            path="/edit/:id"
            element={<Edit />}
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //edit 경로
            path="/chatRoom/:state"
            element={<ChatRoom />}
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //edit 경로
            path="/chat"
            element={<Chat />}
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //edit 경로
            path="/applyForm"
            element={<ApplyForm />}
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //edit 경로
            path="/EditPost"
            element={<EditPost />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
