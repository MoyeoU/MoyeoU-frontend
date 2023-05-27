import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutSideClick from "../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Modal({ onClose }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const handleClose = () => {
    onClose?.();
  };
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.getItem("id"));
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  useOutSideClick(modalRef, handleClose);

  return (
    <ModalContainer>
      <ModalWrap ref={modalRef}>
        <CloseButton onClick={handleClose}>
          <p className="fa-solid fa-xmark">X</p>
        </CloseButton>
        <Contents>
          <Div>
            <span>'토익' 스터디가 종료되었습니다.</span>
            <button
              onClick={() => navigate(`/evaluateMember`, { state: user })}
            >
              평가하기
            </button>
          </Div>
        </Contents>
      </ModalWrap>
    </ModalContainer>
  );
}

const ModalWrap = styled.div`
  width: 25vw;
  //height: fit-content;
  min-height: 60vh;
  max-height: 60vh;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  // top: 65px;
  // right: 220px;
  top: 10%;
  right: 14%;
  box-shadow: 0 5px 25px gray;
`;

const CloseButton = styled.div`
  width: 100%;
  height: auto;
  overflow: auto;
  //margin: 1vh 1vw;
  cursor: pointer;
  p {
    margin: 1vh 1vw;
    float: right;
    color: #5d5d5d;
    font-size: 3vh;
  }
`;

const Contents = styled.div`
  //margin: 80px 10px 80px 10px;
  text-align: center;
`;

const Div = styled.div`
  button {
    margin: auto 1vw;
    width: 5vw;
    height: 5vh;
    border: 1px solid #dcdcdc;
    background-color: #dcdcdc;
    color: black;
    font-weight: bold;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;

export default Modal;
