import Header from "../components/Header";
import Ad from "../components/Ad";
import PostList from "../components/PostList";
import data from "../data.json";
import Post from "../components/Post";
import styled from "styled-components";

function Home() {
  return (
    <>
      <Header />
      <Ad />
      <Div>
        <PostList />
        <PostDiv>
          {Object.values(data.board).map((posts) => (
            <Post {...posts} key={posts.id} />
          ))}
        </PostDiv>
      </Div>
    </>
  );
}

const Div = styled.div`
  //clear: both;
  padding: 3em 5em;
  //justify-content: center;
  height: auto;
  min-height: 70vh;
  overflow: auto;
  max-width: 100%;
  margin: 0 auto;
`;

const PostDiv = styled.div`
  /*clear: both;
  width: 100%;
  max-width: 1300px;
  min-height: 60rem;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;*/
  //height: auto;
  //min-height: 100vh;
`;

export default Home;
