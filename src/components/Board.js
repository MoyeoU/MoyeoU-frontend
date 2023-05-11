import { useNavigate } from "react-router-dom";
import { useState } from "react";
import dummy from "../data.json";
import Post from "./Post";
import styled from "styled-components";

function Board() {
  const [post, setPost] = useState(dummy.board);
  const navigate = useNavigate();
  console.log(typeof post);
  const onClick = (id) => {
    //navigate();
  };
  return (
    <>
      <Div>
        {Object.values(post).map((posts) => (
          <Post {...posts} onClick={onClick(posts.id)} />
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

export default Board;
