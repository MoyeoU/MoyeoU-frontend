import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutSideClick from "../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";
import data from "../../data.json";
import { useNavigate } from "react-router-dom";

function Modal({ onClose }) {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };
  const navigate = useNavigate();

  const onClick = (event) => {
    //navigate(`/chat/`, { state: user });
    const state = event.target.getAttribute("data-msg");
    navigate(`/chat/${state}`, { state: state });
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
        {Object.values(data.chat).map((item) => (
          <Contents>
            <span>'{item.notify}' 님이 메시지를 보냈습니다.</span>
            <button data-msg={item.notify} onClick={onClick}>
              {item.btn}
            </button>
          </Contents>
        ))}
      </ModalWrap>
    </ModalContainer>
  );
}

const ModalWrap = styled.div`
  width: 25vw;
  min-height: 60vh;
  max-height: 60vh;
  overflow-y: scroll;
  background-color: #fff;
  position: absolute;
  top: 10vh;
  right: 22vw;
  box-shadow: 0 0.7rem 3rem gray;
`;

const CloseButton = styled.div`
  width: 100%;
  //height: auto;
  overflow: auto;
  //margin: 1vh 1vw;
  p {
    cursor: pointer;
    :hover {
      color: black;
    }
    margin: 1vh 1vw;
    float: right;
    color: #5d5d5d;
    font-size: 2rem;
  }
`;

const Contents = styled.div`
  border-bottom: 0.1rem solid lightgray;
  margin: 0vh 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 5vw;
    height: 5vh;
    margin: 2vh 0;
    border: 1px solid #dcdcdc;
    background-color: #dcdcdc;
    color: black;
    font-weight: bold;
    border-radius: 5px;
    :hover {
      background-color: darkgray;
      cursor: pointer;
    }
    &:active {
      opacity: 0.5;
    }
  }
  span {
    font-size: 1.2rem;
  }
`;

export default Modal;
