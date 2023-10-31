import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdPlaylistRemove } from "react-icons/md";
import axios from "axios";

function Complete(props) {
  const navigate = useNavigate();
  const moveToPost = () => {
    navigate(`/postView/${props.item.postId}`, {
      state: props.item.postId,
    });
  };
  const removeList = (e) => {
    e.stopPropagation();
    axios
      .post(
        `http://52.79.241.162:8080/notifications/${props.item.notificationId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        props.getNotification();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {props.item.deleted ? (
        ""
      ) : (
        <Contents onClick={moveToPost}>
          <div>
            '{props.item.postTitle}' 게시물 모집이 완료되었습니다. 스터디를
            시작하세요.
          </div>
          <div className="remove" onClick={removeList}>
            <MdPlaylistRemove size="30" className="removeIcon" />
          </div>
        </Contents>
      )}
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
    &.remove {
      margin-left: 1vw;
    }
    .removeIcon {
      pointer-events: none;
    }
  }
  button {
    width: 4.7vw;
    height: 6vh;
    background-color: #deeaf6;
    margin: 0.5vw;
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
    color: gray;
  }
`;

export default Complete;
