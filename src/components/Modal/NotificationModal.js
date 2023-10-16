import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutSideClick from "../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import jsonData from "../../data.json";
import axios from "axios";

function Modal({ onClose }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const getNotification = () => {
    axios
      .get("http://52.79.241.162:8080/notifications", {
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

  const handleClose = () => {
    onClose?.();
  };
  const [user, setUser] = useState("");
  const onClick = () => {
    //타입 비교 후 컴포넌트 할당
    //밑에 api는 각각의 컴포넌트 안에서 요청하기
    // axios
    //   .post(
    //     `http://52.79.241.162:8080/posts/${data[3].postId}/participations/${data[3].participationId}/accept`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    //navigate는 평가하라는 알림 컴포넌트에서만
    navigate(`/evaluateMember`, { state: user });
  };
  useEffect(() => {
    getNotification();
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
        <CloseButton>
          <p className="fa-solid fa-xmark" onClick={handleClose}>
            X
          </p>
        </CloseButton>
        {data === ""
          ? ""
          : Object.values(jsonData.note).map((item) => (
              <Contents>
                <span>{item.notify}</span>
                <button onClick={onClick}>{item.btn}</button>
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
  right: 18vw;
  box-shadow: 0 0.7rem 3rem gray;
`;

const CloseButton = styled.div`
  width: 100%;
  //height: auto;
  overflow: auto;
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

//const Div = styled.div``;

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
