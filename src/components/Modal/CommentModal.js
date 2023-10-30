import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutSideClick from "../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";
import data from "../../data.json";
import StarRate from "../Mypage/StarRate";
import axios from "axios";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

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
        <CloseButton>
          <p onClick={handleClose}>
            <IoClose size="30" />
          </p>
        </CloseButton>

        {data === "" ? (
          ""
        ) : (
          <>
            {data.map((props, idx) => (
              <Contents key={props.content}>
                <div>
                  <StarRate star={props.point} id={idx} />
                </div>
                <div>{props.content}</div>
              </Contents>
            ))}
          </>
        )}
      </ModalWrap>
    </ModalContainer>
  );
}

const ModalWrap = styled.div`
  width: 30vw;
  //height: fit-content;
  min-height: 45vh;
  max-height: 45vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #ccc;
  }
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 25%;
  box-shadow: 0 0.5rem 1rem gray;
`;

const CloseButton = styled.div`
  width: 100%;
  overflow: auto;
  p {
    cursor: pointer;
    :hover {
      color: black;
    }
    margin: 1vh 1vw;
    float: right;
    color: #5d5d5d;
  }
`;

const Contents = styled.div`
  //margin: 0 1vw 2vh;
  border-bottom: 0.1rem solid lightgray;
  margin: 0vh 1vw;
  display: flex;
  align-items: center;
  max-height: 12vh;
  min-height: 12vh;
  div {
    font-size: 1.3rem;
    font-weight: bold;
    align-items: center;
    margin: 0 0.5vw;
    display: flex;
  }
`;

export default Modal;
