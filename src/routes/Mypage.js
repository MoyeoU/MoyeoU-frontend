import styled from "styled-components";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StudyHistory from "../components/Mypage/StudyHistory";
import member from "../img/member.jpg";
import StarRate from "../components/Mypage/StarRate";
import CommentModal from "../components/Modal/CommentModal";
import data from "../data.json";
import Tag from "../components/Mypage/Tag";

function Mypage() {
  const [user, setUser] = useState("");
  const { state } = useLocation();
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [firstTypeClick, setFirstTypeClick] = useState("활동 내역");
  const [secondTypeClick, setSecondTypeClick] = useState("활동 중");
  const navigate = useNavigate();

  const firstFiltering = (event) => {
    setFirstTypeClick(event.target.innerText);
  };

  const secondFiltering = (event) => {
    setSecondTypeClick(event.target.innerText);
  };

  const sendState = () => {
    console.log(firstTypeClick);
    console.log(secondTypeClick);
    //백이랑연결
  };

  useEffect(() => {
    setUser(localStorage.getItem("id"));
    sendState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firstTypeClick, secondTypeClick]);

  const viewComment = () => {
    setCommentModalIsOpen(true);
  };

  const goEdit = () => {
    const id = localStorage.getItem("id");
    navigate(`/edit/${id}`);
  };

  const goChat = () => {
    navigate(`/chatRoom/${state}`, { state: state });
  };

  return (
    <>
      <Header />
      <Div>
        <Left>
          <img src={member} alt="member"></img>
          <h3>{state}</h3>
          <StarRate star={data.user[0].star} id="-1" />
          <p>
            {(data.user[0].star / 20).toFixed(1)} / 5.0{" "}
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
            <OneLiner>{data.user[0].intro}</OneLiner>
            <br />
            <hr />
            <br />
            <p>관심 태그</p>
            <Tag {...data.user[0]} key={data.user[0].id} />
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
          <Filtering>
            <MineOrNot>
              <h2
                className={firstTypeClick === "활동 내역" ? "active" : ""}
                onClick={firstFiltering}
              >
                활동 내역
              </h2>
              <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
              <h2
                className={firstTypeClick === "내가 쓴 글" ? "active" : ""}
                onClick={firstFiltering}
              >
                내가 쓴 글
              </h2>
              <br />
            </MineOrNot>
            <NowOrNot>
              <h3
                className={secondTypeClick === "활동 중" ? "active" : ""}
                onClick={secondFiltering}
              >
                활동 중
              </h3>
              <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
              <h3
                className={secondTypeClick === "활동 완료" ? "active" : ""}
                onClick={secondFiltering}
              >
                활동 완료
              </h3>
            </NowOrNot>
          </Filtering>
          <HistoryDiv>
            {Object.values(data.board).map((posts) => (
              <StudyHistory {...posts} key={posts.id} />
            ))}
          </HistoryDiv>
        </Right>
      </Div>
    </>
  );
}

const Div = styled.div`
  width: 90%;
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
  width: 25%;
  margin: 4vh 4vw;
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
  @media screen and (max-width: 750px) {
    float: none;
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
  margin: 1vh 1.5vw;
  margin-bottom: 2vh;
  padding: 2%;
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
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const Right = styled.div`
  float: left;
  width: 55%;
  margin: 4vh 4vw;
  h2,
  h3 {
    display: inline;
    :hover {
      cursor: pointer;
    }
  }
  @media screen and (max-width: 750px) {
    float: none;
  }
`;

const Filtering = styled.div`
  height: auto;
  min-height: 12vh;
  float: none;
`;

const MineOrNot = styled.div`
  margin-bottom: 2vh;
  h2 {
    color: #505050;
    :hover {
      color: #385493;
      cursor: pointer;
    }
    &.active {
      color: #385493;
      padding-bottom: 0.5vh;
      border-bottom: 0.3rem solid #385493;
    }
  }
`;

const NowOrNot = styled.div`
  float: right;
  margin-bottom: 2vh;
  h3 {
    color: #505050;
    :hover {
      color: #385493;
      cursor: pointer;
    }
    &.active {
      color: #385493;
      padding-bottom: 0.3vh;
      border-bottom: 0.2rem solid #385493;
    }
  }
`;

const HistoryDiv = styled.div`
  height: auto;
  //overflow: auto;
`;

export default Mypage;
