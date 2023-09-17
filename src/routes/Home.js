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
        {Object.values(data.board).map((posts) => (
          <Post {...posts} key={posts.id} />
        ))}
      </Div>
    </>
  );
}

const Div = styled.div`
  padding: 5vh 10vw 10vh;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  height: auto;
  overflow: auto;
  max-width: 100%;
`;

export default Home;
