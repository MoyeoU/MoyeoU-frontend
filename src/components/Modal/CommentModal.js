import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutSideClick from "../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";
import data from "../../data.json";
import StarRate from "../Mypage/StarRate";

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
        <Contents>
          {data.comm.map((props, idx) => (
            <Div id={props.comments}>
              <StarRate star={props.star} id={idx} />
              <span>{props.comments}</span>
              <hr />
            </Div>
          ))}
        </Contents>
      </ModalWrap>
    </ModalContainer>
  );
}

const ModalWrap = styled.div`
  width: 25vw;
  //height: fit-content;
  min-height: 50vh;
  max-height: 50vh;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 45%;
  left: 24%;
  box-shadow: 0 5px 25px gray;
`;

const CloseButton = styled.div`
  width: 100%;
  height: auto;
  overflow: auto;
  //margin: 1vh 1vw;
  cursor: pointer;
  p {
    margin: 0.5vh 1vw;
    float: right;
    color: #5d5d5d;
    font-size: 3vh;
  }
`;

const Div = styled.div`
  margin: 1vh 0;
  height: auto;
  overflow: auto;
`;

const Contents = styled.div`
  margin: 0 1vw 2vh;
`;

export default Modal;
