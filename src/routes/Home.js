import Header from "../components/Header";
import Add from "../components/Add";
import PostList from "../components/PostList";
import PostMain from "../components/PostMain";
import styled from "styled-components";

function Home() {
  return (
    <>
      <Header />
      <Add />
      <Div>
        <PostList />
        <PostMain />
      </Div>
    </>
  );
}

const Div = styled.div`
  //display: flex;
  flex-wrap: wrap;
`;

export default Home;
