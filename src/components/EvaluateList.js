import styled from "styled-components";
import member from "../img/member.jpg";
import member2 from "../img/image1.png";
import member3 from "../img/image2.png";
import { useState } from "react";
import { useEffect } from "react";
import EvaluateModal from "./Modal/EvaluateModal";

function EvaluateList(props) {
  const [evaluateModalIsOpen, setEvaluateModalIsOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const goEvaluate = () => {
    setEvaluateModalIsOpen(true);
  };
  const alreadyDone = () => {
    alert("이미 완료된 평가입니다.");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluateModalIsOpen, submit]);

  return (
    <>
      <Div>
        <Img>
          <img
            src={
              props.member === "hsy"
                ? member
                : props.member === "zhzzang"
                ? member2
                : member3
            }
            alt="member"
          ></img>
        </Img>
        <Name>
          <h2>{props.member}</h2>
        </Name>
        <Btn>
          {submit ? (
            <button onClick={alreadyDone}>평가완료</button>
          ) : (
            <button onClick={goEvaluate}>평가하기</button>
          )}

          {evaluateModalIsOpen && (
            <EvaluateModal
              member={props.member}
              setData={props.setData}
              setSubmit={setSubmit}
              open={evaluateModalIsOpen}
              onClose={() => {
                setEvaluateModalIsOpen(false);
              }}
            />
          )}
        </Btn>
      </Div>
    </>
  );
}

const Div = styled.div`
  overflow: auto;
  margin: 5vh auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.div`
  width: 20vw;
  height: 100%;
  img {
    float: left;
    width: 50%;
    height: 50%;
    margin: 2% 20%;
  }
`;
const Name = styled.div`
  float: left;
  width: 60vw;
  height: 100%;
  h2 {
    //justify-content: center;
    color: black;
  }
`;
const Btn = styled.div`
  float: left;
  width: 20vw;
  height: 100%;
  //display: flex;
  //justify-content: center;
  button {
    float: left;
    width: 50%;
    height: 5vh;
    margin: 2% 20%;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;

export default EvaluateList;
