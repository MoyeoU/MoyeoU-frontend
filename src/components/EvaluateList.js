import styled from "styled-components";
import memberImg from "../img/member.jpg";
import member2 from "../img/image1.png";
import member3 from "../img/image2.png";
import { useState } from "react";
import { useEffect } from "react";
import EvaluateModal from "./Modal/EvaluateModal";
import commentLogo from "../img/commentLogo.jpg";
import Swal from "sweetalert2";

function EvaluateList(props) {
  const [evaluateModalIsOpen, setEvaluateModalIsOpen] = useState(false);
  //const [submit, setSubmit] = useState(false);
  const goEvaluate = () => {
    setEvaluateModalIsOpen(true);
  };
  const alreadyDone = () => {
    Swal.fire({
      title: "이미 완료된 평가입니다.",
      icon: "info",
      confirmButtonText: "확인",
      confirmButtonColor: "#385493"
    })
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluateModalIsOpen]);

  return (
    <>
      <Div>
        <Img>
          <img
            src={
              props.data.member.imagePath
                ? props.data.member.imagePath
                : commentLogo
            }
            alt="member"
          ></img>
        </Img>
        <Name>
          <h2>{props.data.member.nickname}</h2>
        </Name>
        <Btn>
          {props.data.evaluated ? (
            <button onClick={alreadyDone}>평가완료</button>
          ) : (
            <button onClick={goEvaluate}>평가하기</button>
          )}

          {evaluateModalIsOpen && (
            <EvaluateModal
              getMember={props.getMember}
              postId={props.postId}
              data={props.data}
              //setSubmit={setSubmit}
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
  height: 100%;
  margin-right: 1.5vw;
  img {
    float: left;
    width: 3.5vw;
    height: 6vh;
    margin: 0 1vw;
  }
`;
const Name = styled.div`
  width: 13vw;
  height: 100%;
  h2 {
    font-size: 1.7rem;
    color: black;
  }
`;
const Btn = styled.div`
  float: left;
  width: 10vw;
  height: 100%;
  button {
    float: left;
    width: 50%;
    height: 5vh;
    margin: 2% 28%;
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
