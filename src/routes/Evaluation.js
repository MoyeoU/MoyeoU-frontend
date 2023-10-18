import styled from "styled-components";
import Header from "../components/Header";
import EvaluateList from "../components/EvaluateList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Evaluation(props) {
  const { state } = useLocation();
  const postId = state;
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
            <h1>토익 스터디 모임이 종료되었습니다.</h1>
            <h2>함께한 스터디원을 평가해주세요.</h2>
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

const Div = styled.div`
  height: auto;
  min-height: 70vh;
  overflow: auto;
  max-width: 90%;
  margin: 0 auto;
  h2 {
    color: gray;
  }
`;

const Notice = styled.div`
  margin: 3vh 0;
  text-align: center;
`;

const List = styled.div`
  margin: 0 auto;
  padding: 1vh 20vw;
  overflow: auto;
`;

const Close = styled.div`
  margin: 0 auto 5vh auto;
  text-align: center;
  button {
    width: 7vw;
    height: 6vh;
    background-color: #385493;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    border-radius: 5px;
  }
`;

export default Evaluation;
