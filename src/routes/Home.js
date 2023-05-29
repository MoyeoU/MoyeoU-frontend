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
  padding: 3% 5%;
  justify-content: center;
  min-height: 70vh;
  height: auto;
  overflow: auto;
  max-width: 100%;
  margin: 0 auto;
`;

export default Home;
