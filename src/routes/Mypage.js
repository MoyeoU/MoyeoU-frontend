import styled from "styled-components";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StudyList from "../components/StudyList";
import member from "../img/member.jpg";
import UserScore from "../components/Mypage/UserScore";
import CommentModal from "../components/Modal/CommentModal";
import dummy from "../data.json";
import Tag from "../components/Tag";

function Mypage() {
  const [user, setUser] = useState("");
  const { state } = useLocation();
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);

  useEffect(() => {
    setUser(localStorage.getItem("id"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const viewComment = () => {
    setCommentModalIsOpen(true);
  };

  const goEdit = () => {};

  const goChat = () => {};

  return (
    <>
      <Header />
      <Div>
        <Left>
          <img src={member} alt="member"></img>
          <h3>{state}</h3>
          <UserScore />
          <p>
            {dummy.user[0].star} / 5.0{" "}
            <button onClick={viewComment}>{">"}</button>
            {commentModalIsOpen && (
              <CommentModal
                open={commentModalIsOpen}
                onClose={() => {
                  setCommentModalIsOpen(false);
                }}
              />
            )}
          </p>
          <br />
          <hr />
          <br />
          <More>
            <p>소개</p>
            <OneLiner>{dummy.user[0].intro}</OneLiner>
            <br />
            <hr />
            <br />
            <p>관심 태그</p>
            <Tag />
          </More>
          <Btn>
            {user === state ? (
              <button onClick={goEdit}>수정하기</button>
            ) : (
              <button onClick={goChat}>채팅하기</button>
            )}
          </Btn>
        </Left>
        <Middle> </Middle>
        <Right>
          <StudyList />
        </Right>
      </Div>
    </>
  );
}

const Div = styled.div`
  width: 80%;
  max-width: 90%;
  height: auto;
  min-height: 70vh;
  overflow: auto;
  margin: 0 auto;
  //float:left;
`;

const Left = styled.div`
  float: left;
  text-align: center;
  width: 35%;
  h3 {
    font-weight: bold;
    font-size: 4vh;
    margin: 1vh 0;
  }
  img {
    width: 7em;
    height: 7em;
  }
  button {
    border: none;
    background-color: white;
    border-radius: 2em;
    :hover {
      cursor: pointer;
    }
  }
`;

const More = styled.div`
  text-align: left;
  p {
    margin-top: 0;
    padding: 0 0 0 2vw;
    color: gray;
    font-weight: bold;
  }
`;
const OneLiner = styled.div`
  border: 2px solid darkgray;
  min-height: 15vh;
  border-radius: 10px;
  padding: 2vh 2vw;
  margin-bottom: 2vh;
`;

const Btn = styled.div`
  button {
    margin: 0.5em 0.5em;
    width: 8em;
    height: 3em;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
  margin: 5vh 0;
`;

const Middle = styled.div`
  float: left;
  border: 1px solid #dcdcdc;
  height: 100vh;
  margin: 3vh 5vw;
`;

const Right = styled.div`
  width: 65%;
`;

export default Mypage;
