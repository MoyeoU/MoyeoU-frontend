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
        <span>
          {item.item.memberNickname}님이 '{item.item.postTitle}' 게시물에 참여를
          신청하였습니다.
        </span>
        <button onClick={onClick}>신청폼 확인</button>
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

export default Attend;
