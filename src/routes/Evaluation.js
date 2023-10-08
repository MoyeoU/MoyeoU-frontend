import styled from "styled-components";
import Header from "../components/Header";
import EvaluateList from "../components/EvaluateList";
import { useState } from "react";
import { useEffect } from "react";
import data from "../data.json";

function Evaluation(props) {
  const MEMBERCNT = 3;
  const [evaluateMember, setEvaluateMember] = useState([]);
  const onClick = () => {
    if (evaluateMember.length === MEMBERCNT) {
      alert("평가가 완료되었습니다.");
      document.location.href = "/";
    } else {
      alert("평가를 모두 완료해주세요.");
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(evaluateMember);
  return (
    <>
      <Header />
      <Div>
        <Notice>
          <h1>토익 스터디 모임이 종료되었습니다.</h1>
          <h2>함께한 스터디원을 평가해주세요.</h2>
        </Notice>
        <List>
          {Object.values(data.evaluate).map((ev) => (
            <EvaluateList member={ev} key={ev} setData={setEvaluateMember} />
          ))}
        </List>
        <Close>
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
