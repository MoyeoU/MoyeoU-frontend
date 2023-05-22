import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutSideClick from "../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";

function Modal({ onClose, children }) {
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
      <Overlay>
        <ModalWrap ref={modalRef}>
          <CloseButton onClick={handleClose}>
            <i className="fa-solid fa-xmark">X</i>
          </CloseButton>
          <Contents>{children}</Contents>
        </ModalWrap>
      </Overlay>
    </ModalContainer>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 10vw;
  //background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 30vw;
  height: fit-content;
  border-radius: 15px;
  border: 2px solid #5d5d5d;
  background-color: #fff;
  position: fixed;
  top: 43vh;
  left: 39vw;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.div`
  float: right;
  //width: 40px;
  //height: 40px;
  margin: 1vh 1vw;
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 3vh;
  }
`;

const Contents = styled.div`
  //margin: 80px 10px 80px 10px;
  text-align: center;
  //   h1 {
  //     font-size: 30px;
  //     font-weight: 600;
  //     margin-bottom: 60px;
  //   }
`;

export default Modal;
