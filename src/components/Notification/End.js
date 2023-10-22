import { useNavigate } from "react-router-dom";
import styled from "styled-components";
function End(item) {
  const navigate = useNavigate();
  const onClick = (event) => {
    event.stopPropagation();
    navigate(`/evaluateMember`, { state: item.item.postId });
  };
  const moveToPost = () => {
    navigate(`/postView/${item.item.postId}`, {
      state: item.item.postId,
    });
  };

  return (
    <>
      <Contents onClick={moveToPost}>
        <span>
          '{item.item.postTitle}' 게시물의 스터디가 종료되었습니다. 스터디원을
          평가하세요.
        </span>
        <button onClick={onClick}>평가하기</button>
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
    height: 7vh;
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

export default End;
