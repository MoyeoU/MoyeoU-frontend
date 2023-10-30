import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Attend(item) {
  const navigate = useNavigate();
  const onClick = (event) => {
    event.stopPropagation();
    navigate(`/formCheck`, {
      state: {
        postId: item.item.postId,
        memberId: item.item.memberId,
        memberName: item.item.memberNickname,
        participationId: item.item.participationId,
      },
    });
  };
  const moveToPost = () => {
    navigate(`/postView/${item.item.postId}`, {
      state: item.item.postId,
    });
  };

  return (
    <>
      <Contents onClick={moveToPost}>
        <div>
          {item.item.memberNickname}님이 '{item.item.postTitle}' 게시물에 참여를
          신청하였습니다.
        </div>
        <button onClick={onClick}>
          신청폼
          <br />
          확인
        </button>
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
  max-height: 12vh;
  min-height: 12vh;
  div {
    max-height: 10vh;
    min-height: 10vh;
    font-size: 1.3rem;
    font-weight: bold;
    align-items: center;
    display: flex;
  }
  button {
    max-width: 4.7vw;
    min-width: 4.7vw;
    height: 6vh;
    background-color: #deeaf6;
    margin-left: 0.5vw;
    color: black;
    font-weight: bold;
    font-size: 1.2rem;
    border-radius: 10px;
    :hover {
      //background-color: #c0c0c0;
      cursor: pointer;
    }
    &:active {
      opacity: 0.8;
    }
  }
  :hover {
    cursor: pointer;
  }
`;

export default Attend;
