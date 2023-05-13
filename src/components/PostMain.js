import { useState } from "react";
import dummy from "../data.json";
import Post from "./Post";
import styled from "styled-components";

function PostMain() {
  const [post, setPost] = useState(dummy.board);

  return (
    <>
      <Div>
        {Object.values(post).map((posts) => (
          <Post {...posts} key={posts.id} />
        ))}
      </Div>
    </>
  );
}

const Div = styled.div`
  clear: both;
  padding: 3em;
  justify-content: center;
`;

export default PostMain;
