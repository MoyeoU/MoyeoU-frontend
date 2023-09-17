import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import commentLogo from "../img/commentLogo.jpg";
import { FiMoreVertical } from "react-icons/fi";

function ChatList({ name, msg, date, num }) {
  //const { state } = useLocation();
  const navigate = useNavigate();
  const state = name;

  const onClick = () => {
    navigate(`/chatRoom/${state}`, { state: state });
  };

  const showDetail = (event) => {
    event.stopPropagation();
    alert("모달 띄워");
  };

  const goMypage = (event) => {
    event.stopPropagation();
    navigate(`/mypage/${state}`, { state: state });
  };

  return (
    <>
      <Div onClick={onClick}>
        <Img>
          <img src={commentLogo} alt="chatMember" onClick={goMypage}></img>
        </Img>
        <Middle>
          <NameDate>
            <h2 onClick={goMypage}>{name}</h2>
            <p>{date}</p>
          </NameDate>
          <Msg>
            <p>{msg}</p>
            <button>{num}</button>
          </Msg>
        </Middle>
        <More>
          <p onClick={showDetail}>
            <FiMoreVertical size={25} />
          </p>
        </More>
      </Div>
    </>
  );
}

const Div = styled.div`
  overflow: auto;
  margin: 0vh auto;
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: lightgray;
    cursor: pointer;
  }
  :active {
    background-color: darkgray;
  }
`;

const Img = styled.div`
  width: 10vw;
  height: 100%;
  img {
    float: left;
    width: 50%;
    height: 50%;
    margin: 1vh 2vw;
  }
`;
const Middle = styled.div`
  width: 48vw;
  align-items: center;
`;
const NameDate = styled.div`
  //background-color: blue;
  justify-content: space-between;
  align-items: center;
  display: flex;
  h2 {
    margin: 0vh;
  }
  p {
    color: gray;
  }
`;
const Msg = styled.div`
  //background-color: red;
  color: gray;
  justify-content: space-between;
  align-items: center;
  display: flex;
  button {
    border-radius: 50%;
    font-size: 0.5rem;
    width: 2rem;
    height: 2rem;
    color: white;
    background-color: #385493;
    :hover {
      cursor: default;
    }
  }
  p {
    margin: 0;
  }
`;
const More = styled.div`
  width: 2vw;
  text-align: right;
  margin: 1vh 2vw;
  color: gray;
  p {
    :hover {
      cursor: pointer;
    }
    :active {
      color: black;
    }
  }
`;

export default ChatList;
