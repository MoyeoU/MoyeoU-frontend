import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutSideClick from "../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";

function Modal({ onClose }) {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };
  useEffect(() => {
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
        <Contents></Contents>
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
  // right: 280px;
  top: 10%;
  right: 18%;
  //right14%, 220px
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

export default Modal;
