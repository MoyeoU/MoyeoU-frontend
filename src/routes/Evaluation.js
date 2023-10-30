import styled from "styled-components";
import Header from "../components/Header";
import EvaluateList from "../components/EvaluateList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import evaluationImg from "../img/evaluation.png";

function Evaluation(props) {
  const { state } = useLocation();
  const postId = state.state;
  const postTitle = state.title;
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const getMember = () => {
    axios
      .get(`http://52.79.241.162:8080/posts/${postId}/evaluations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClick = () => {
    let cnt = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].evaluated === true) {
        cnt += 1;
      }
    }
    if (cnt === data.length) {
      alert("평가가 완료되었습니다.");
      //document.location.href = "/";
      navigate(`/`);
    } else {
      alert("평가를 모두 완료해주세요.");
    }
  };
  useEffect(() => {
    getMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      {data === "" ? (
        <Div>로딩중</Div>
      ) : (
        <Div>
          <Notice>
            <Img
              style={{ width: "10rem", height: "10rem" }}
              src={evaluationImg}
              alt="evaluationImg"
            ></Img>
            <h1>{postTitle}</h1>
            <h1>스터디가 종료되었습니다.</h1>
          </Notice>
          <List>
            {data.map((ev) => (
              <EvaluateList
                getMember={getMember}
                postId={postId}
                data={ev}
                key={ev.id}
              />
            ))}
          </List>
          <Close>
            <button onClick={onClick}>완료</button>
          </Close>
        </Div>
      )}
    </>
  );
}

const Img = styled.img`
  margin-top: 2.5vh;
  margin-bottom: 2vh;
`;

const Div = styled.div`
  height: auto;
  min-height: 70vh;
  overflow: auto;
  max-width: 90%;
  margin: 0 auto;
`;

const Notice = styled.div`
  margin: 3vh 0;
  text-align: center;
  h1 {
    font-size: 2.5rem;
  }
`;

const List = styled.div`
  max-width: 40%;
  margin: 7vh auto 0 auto;
  padding-bottom: 4vh;
  overflow: auto;
  border-bottom: 2px solid lightgray;
`;

const Close = styled.div`
  margin: 5vh auto 10vh auto;
  text-align: center;
  button {
    width: 6vw;
    height: 5.4vh;
    background-color: #385493;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    border-radius: 5px;
  }
`;

export default Evaluation;
