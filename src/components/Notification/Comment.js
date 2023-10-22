import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Comment(item) {
  const navigate = useNavigate();
  const moveToPost = () => {
    navigate(`/postView/${item.item.postId}`, {
      state: item.item.postId,
    });
  };
  return (
    <>
      <Contents onClick={moveToPost}>
        <span>'{item.item.postTitle}' 게시물에 댓글이 달렸습니다.</span>
      </Contents>
    </>
  );
}

const Contents = styled.div`
  border-bottom: 0.1rem solid lightgray;
  margin: 0vh 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  button {
    width: 5vw;
    height: 5vh;
    margin: 2vh 0;
    border: 1px solid #dcdcdc;
    background-color: #dcdcdc;
    color: black;
    font-weight: bold;
    border-radius: 5px;
    :hover {
      background-color: darkgray;
      cursor: pointer;
    }
    &:active {
      opacity: 0.5;
    }
  }
  span {
    font-size: 1.2rem;
  }
  :hover {
    cursor: pointer;
  }
`;

export default Comment;
