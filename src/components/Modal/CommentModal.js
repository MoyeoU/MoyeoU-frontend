import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutSideClick from "../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";
import data from "../../data.json";
import StarRate from "../Mypage/StarRate";
import axios from "axios";
import { useState } from "react";

function Modal({ onClose, memberId }) {
  const modalRef = useRef(null);
  const [data, setData] = useState("");
  const handleClose = () => {
    onClose?.();
  };
  const getStar = () => {
    axios
      .get(`http://52.79.241.162:8080/members/${memberId}/evaluations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getStar();
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useOutSideClick(modalRef, handleClose);

  return (
    <ModalContainer>
      <ModalWrap ref={modalRef}>
        <CloseButton onClick={handleClose}>
          <p className="fa-solid fa-xmark">X</p>
        </CloseButton>

        {data === "" ? (
          ""
        ) : (
          <Contents>
            {data.map((props, idx) => (
              <Div id={props.content}>
                <StarRate star={props.point} id={idx} />
                <span>{props.content}</span>
                <hr />
              </Div>
            ))}
          </Contents>
        )}
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
  top: 38%;
  left: 23%;
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
