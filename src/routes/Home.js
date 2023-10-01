import Header from "../components/Header";
import Ad from "../components/Ad";
import PostList from "../components/PostList";
import data from "../data.json";
import Post from "../components/Post";
import styled from "styled-components";
import { useState } from "react";
import Pagenation from "../components/Pagenation";

function Home() {
  const [page, setPage] = useState(1); //현재 페이지 state
  const limit = 12;
  const offset = (page - 1) * limit;

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  return (
    <>
      <Header />
      <Ad />
      <Div>
        <PostList />
        <Post info={postsData(data.board)} />
        {/* {Object.values(data.board).map((posts) => (
          //<Post {...posts} key={posts.id} />
        ))} */}
        <Pagenation
          limit={limit}
          page={page}
          totalPosts={data.board.length}
          setPage={setPage}
        />
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
