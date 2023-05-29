import styled from "styled-components";
import member from "../img/member.jpg";
import { useState } from "react";
import { useEffect } from "react";
import EvaluateModal from "./Modal/EvaluateModal";

function EvaluateList() {
  const [evaluateModalIsOpen, setEvaluateModalIsOpen] = useState(false);
  const goEvaluate = () => {
    setEvaluateModalIsOpen(true);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluateModalIsOpen]);

  return (
    <>
      <Div>
        <Img>
          <img src={member} alt="member"></img>
        </Img>
        <Name>
          <h3>hyeong</h3>
        </Name>
        <Btn>
          <button onClick={goEvaluate}>평가하기</button>
          {evaluateModalIsOpen && (
            <EvaluateModal
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
  margin: 3vh auto;
`;

const Img = styled.div`
  float: left;
  width: 20%;
  height: 100%;
  img {
    width: 50%;
    height: 50%;
  }
`;
const Name = styled.div`
  float: left;
  width: 60%;
  height: 100%;
  h3 {
    justify-content: center;
    color: black;
  }
`;
const Btn = styled.div`
  float: left;
  width: 20%;
  height: 100%;
  button {
    float: right;
    width: 50%;
    height: 3em;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    font-size: 80%;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;

export default EvaluateList;
