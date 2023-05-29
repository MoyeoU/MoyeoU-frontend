import styled from "styled-components";
import Header from "../components/Header";
import EvaluationList from "../components/EvaluateList";
import { useState } from "react";
import { useEffect } from "react";

function Evaluation() {
  const MEMBERCNT = 3;
  const [count, setCount] = useState(0);
  const onClick = () => {
    console.log(count);
    console.log(MEMBERCNT);
    if (Number(count) === MEMBERCNT) {
      alert("평가가 완료되었습니다.");
      localStorage.removeItem("count");
      localStorage.setItem("count", 0);
      document.location.href = "/";
    } else {
      alert("평가를 모두 완료해주세요.");
    }
  };
  useEffect(() => {
    setCount(localStorage.getItem("count"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <>
      <Header />
      <Div>
        <Notice>
          <h2>토익 스터디 모임이 종료되었습니다.</h2>
          <h3>함께한 스터디원을 평가해주세요.</h3>
        </Notice>
        <List>
          <EvaluationList />
          <EvaluationList />
          <EvaluationList />
        </List>
        <Close>
          <h4>{count} / 3</h4>
          <button onClick={onClick}>완료</button>
        </Close>
      </Div>
    </>
  );
}

const Div = styled.div`
  height: auto;
  min-height: 70vh;
  overflow: auto;
  max-width: 90%;
  margin: 0 auto;
  h3 {
    color: gray;
  }
`;

const Notice = styled.div`
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
    width: 10%;
    height: 3em;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    font-size: 80%;
    border-radius: 5px;
  }
`;

export default Evaluation;
