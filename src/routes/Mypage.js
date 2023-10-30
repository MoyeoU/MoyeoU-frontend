import styled from "styled-components";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StudyHistory from "../components/Mypage/StudyHistory";
import member from "../img/commentLogo.jpg";
import StarRate from "../components/Mypage/StarRate";
import CommentModal from "../components/Modal/CommentModal";
import Tag from "../components/Mypage/Tag";
import axios from "axios";

function Mypage() {
  const [user, setUser] = useState(localStorage.getItem("id"));
  const { state } = useLocation();
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [firstTypeClick, setFirstTypeClick] = useState(false);
  const [secondTypeClick, setSecondTypeClick] = useState("COMPLETED");
  const navigate = useNavigate();
  const [dataa, setDataa] = useState("");

  const getUser = () => {
    if (user === state.state) {
      axios
        .get(`http://52.79.241.162:8080/members/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setDataa(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //member 가져오기
      axios
        .get(`http://52.79.241.162:8080/members/${state.memberId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setDataa(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const firstFiltering = (event) => {
    let text = event.target.innerText;
    if (text === "활동 내역") {
      setFirstTypeClick(false);
    } else {
      setFirstTypeClick(true);
    }
  };

  const secondFiltering = (event) => {
    let text = event.target.innerText;
    if (text === "활동 중") {
      setSecondTypeClick("COMPLETED");
    } else {
      setSecondTypeClick("END");
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewComment = () => {
    setCommentModalIsOpen(true);
  };

  const goEdit = () => {
    const id = localStorage.getItem("id");
    navigate(`/edit/${id}`);
  };

  const goChat = () => {
    navigate(`/chatRoom/${state.state}`, { state: state.state });
  };
  //console.log(dataa.imagePath);
  return (
    <>
      <Header />
      {dataa === "" ? (
        <Div>로딩중</Div>
      ) : (
        <Div>
          <Left>
            <img
              src={dataa.imagePath ? dataa.imagePath : member}
              alt="member"
            ></img>
            <h3>{dataa.nickname}</h3>
            <StarRate
              star={dataa.point === null ? 0 : Number(dataa.point)}
              id="-1"
            />
            <br />
            <starText>
              {(dataa.point === null ? 0 : Number(dataa.point) / 20).toFixed(1)}{" "}
              / 5.0 <button onClick={viewComment}>{">"}</button>
              {commentModalIsOpen && (
                <CommentModal
                  open={commentModalIsOpen}
                  onClose={() => {
                    setCommentModalIsOpen(false);
                  }}
                  memberId={dataa.id}
                />
              )}
            </starText>
            <br />
            <br />
            <hr />
            <br />
            <More>
              <p>소개</p>
              <OneLiner>{dataa.introduction}</OneLiner>
              <br />
              <hr />
              <br />
              <p>관심 태그</p>
              <Tag
                tag={dataa.hashtags === undefined ? [] : dataa.hashtags}
                key={dataa.id}
              />
            </More>
            <Btn>
              {user === state.state ? (
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
                  className={firstTypeClick === false ? "active" : ""}
                  onClick={firstFiltering}
                >
                  활동 내역
                </h2>
                <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                <h2
                  className={firstTypeClick === true ? "active" : ""}
                  onClick={firstFiltering}
                >
                  내가 쓴 글
                </h2>
                <br />
              </MineOrNot>
              <NowOrNot>
                <h3
                  className={secondTypeClick === "COMPLETED" ? "active" : ""}
                  onClick={secondFiltering}
                >
                  활동 중
                </h3>
                <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                <h3
                  className={secondTypeClick === "END" ? "active" : ""}
                  onClick={secondFiltering}
                >
                  활동 완료
                </h3>
              </NowOrNot>
            </Filtering>
            <HistoryDiv>
              {dataa.activityList.map((posts) => (
                <StudyHistory
                  posts={posts}
                  key={posts.postId}
                  firstTypeClick={firstTypeClick}
                  secondTypeClick={secondTypeClick}
                />
              ))}
            </HistoryDiv>
          </Right>
        </Div>
      )}
    </>
  );
}

const Div = styled.div`
  width: 90%;
  max-width: 90%;
  height: auto;
  min-height: 70vh;
  overflow: auto;
  margin: 0 auto 4vh auto;
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
    margin: 1vh 0 2vh 0;
  }
  starText {
    font-weight: bold;
    font-size: 1.8rem;
  }
  img {
    width: 15em;
    height: 15em;
    border-radius: 30%;
    margin-bottom: 1.5vh;
  }
  button {
    border: none;
    font-size: 2.2rem;
    background-color: white;
    margin-left: 0.5vw;
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
    margin-bottom: 0.5vh;
    padding: 0 0 0 2vw;
    color: gray;
    font-weight: bold;
    font-size: 1.8rem;
  }
`;
const OneLiner = styled.div`
  border: 2px solid lightgray;
  min-height: 12vh;
  border-radius: 10px;
  margin: 2vh 1.5vw 2vh;
  // background-color: #d3def1;
  padding: 5%;
  font-size: 1.6rem;
  font-weight: light;
  line-height: 120%;
`;

const Btn = styled.div`
  button {
    padding: 1vh 1vw;
    width: 7em;
    height: 3em;
    font-size: 1.7rem;
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
    font-size: 2rem;
    color: #505050;
    :hover {
      color: #385493;
      cursor: pointer;
    }
    &.active {
      color: #385493;
      padding-bottom: 0.5vh;
      border-bottom: 0.4rem solid #385493;
    }
  }
  span {
    margin: 0.4vw;
    font-size: 2rem;
  }
`;

const NowOrNot = styled.div`
  float: right;
  margin-bottom: 2vh;
  h3 {
    font-size: 1.5rem;
    color: #505050;
    :hover {
      color: #385493;
      cursor: pointer;
    }
    &.active {
      color: #385493;
      padding-bottom: 0.3vh;
      border-bottom: 0.25rem solid #385493;
    }
  }
  span {
    margin: 0.2vw;
    font-size: 1rem;
  }
`;

const HistoryDiv = styled.div`
  height: auto;
  //overflow: auto;
`;

export default Mypage;
