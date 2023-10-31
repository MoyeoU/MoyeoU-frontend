import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Mypage from "./routes/Mypage";
import Signup from "./routes/Signup";
import PostView from "./routes/PostView";
import CreatePost from "./routes/CreatePost";
import Evaluation from "./routes/Evaluation";
import Edit from "./routes/Edit";
import ScrollToTop from "./components/ScrollToTop";
import ApplyForm from "./routes/ApplyForm";
import EditPost from "./routes/EditPost";
import FormCheck from "./routes/FormCheck";
import { useState } from "react";

function App() {
  const [isAlertCountChange, setIsAlertCountChange] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            //path={`${process.env.PUBLIC_URL}/hello`}
            path="/"
            element={
              <Home
                isAlertCountChange={isAlertCountChange}
                setIsAlertCountChange={setIsAlertCountChange}
                alertCount={alertCount}
                setAlertCount={setAlertCount}
              />
            }
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //마이페이지 경로
            path="/myPage/:id"
            element={
              <Mypage
                isAlertCountChange={isAlertCountChange}
                setIsAlertCountChange={setIsAlertCountChange}
                alertCount={alertCount}
                setAlertCount={setAlertCount}
              />
            }
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //회원가입 경로
            path="/sign-up"
            element={
              <Signup
                isAlertCountChange={isAlertCountChange}
                setIsAlertCountChange={setIsAlertCountChange}
                alertCount={alertCount}
                setAlertCount={setAlertCount}
              />
            }
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //postDetail 경로
            path="/postView/:id"
            element={
              <PostView
                isAlertCountChange={isAlertCountChange}
                setIsAlertCountChange={setIsAlertCountChange}
                alertCount={alertCount}
                setAlertCount={setAlertCount}
              />
            }
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //createPost 경로
            path="/createPost"
            element={
              <CreatePost
                isAlertCountChange={isAlertCountChange}
                setIsAlertCountChange={setIsAlertCountChange}
                alertCount={alertCount}
                setAlertCount={setAlertCount}
              />
            }
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //notice 경로
            path="/evaluateMember"
            element={
              <Evaluation
                isAlertCountChange={isAlertCountChange}
                setIsAlertCountChange={setIsAlertCountChange}
                alertCount={alertCount}
                setAlertCount={setAlertCount}
              />
            }
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //edit 경로
            path="/edit/:id"
            element={
              <Edit
                isAlertCountChange={isAlertCountChange}
                setIsAlertCountChange={setIsAlertCountChange}
                alertCount={alertCount}
                setAlertCount={setAlertCount}
              />
            }
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //edit 경로
            path="/applyForm"
            element={
              <ApplyForm
                isAlertCountChange={isAlertCountChange}
                setIsAlertCountChange={setIsAlertCountChange}
                alertCount={alertCount}
                setAlertCount={setAlertCount}
              />
            }
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //edit 경로
            path="/editPost"
            element={
              <EditPost
                isAlertCountChange={isAlertCountChange}
                setIsAlertCountChange={setIsAlertCountChange}
                alertCount={alertCount}
                setAlertCount={setAlertCount}
              />
            }
          ></Route>
          <Route
            //path={`${process.env.PUBLIC_URL}/movie/:id`}
            //edit 경로
            path="/formCheck"
            element={
              <FormCheck
                isAlertCountChange={isAlertCountChange}
                setIsAlertCountChange={setIsAlertCountChange}
                alertCount={alertCount}
                setAlertCount={setAlertCount}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
