import { useState } from "react";
import dummy from "../data.json";
import Post from "./Post";
import styled from "styled-components";

function Board() {
  const [post, setPost] = useState([dummy.board]);
  console.log(post);
  return (
    <>
      {/* {post.map(())} */}
      <Post />
      <Div>hi</Div>
    </>
  );
}

const Div = styled.div`
  //clear: both;
`;

export default Board;
