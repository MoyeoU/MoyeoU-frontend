import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useOutSideClick from "../../hooks/useOutSideClick";
import ModalContainer from "./ModalContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Attend from "../Notification/Attend";
import Comment from "../Notification/Comment";
import Reject from "../Notification/Reject";
import Cancel from "../Notification/Cancel";
import End from "../Notification/End";
import Complete from "../Notification/Complete";
import Accept from "../Notification/Accept";
import { IoClose } from "react-icons/io5";

function NotificationModal({ onClose }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState(""); //불러온 알림 내용 저장
  const getNotification = () => {
    //알림내용 불러오기
    axios
      .get("http://52.79.241.162:8080/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    onClose?.();
  };

  useEffect(() => {
    getNotification();
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
        {data === ""
          ? ""
          : data.map((item, idx) =>
              item.type === "ATTEND" ? (
                <Attend
                  item={item}
                  getNotification={getNotification}
                  key={idx}
                />
              ) : item.type === "CANCEL" ? (
                <Cancel
                  item={item}
                  getNotification={getNotification}
                  key={idx}
                />
              ) : item.type === "ACCEPT" ? (
                <Accept
                  item={item}
                  getNotification={getNotification}
                  key={idx}
                />
              ) : item.type === "REJECT" ? (
                <Reject
                  item={item}
                  getNotification={getNotification}
                  key={idx}
                />
              ) : item.type === "COMPLETE" ? (
                <Complete
                  item={item}
                  getNotification={getNotification}
                  key={idx}
                />
              ) : item.type === "END" ? (
                <End item={item} getNotification={getNotification} key={idx} />
              ) : item.type === "COMMENT" ? (
                <Comment
                  item={item}
                  getNotification={getNotification}
                  key={idx}
                />
              ) : (
                <></>
              )
            )}
      </ModalWrap>
    </ModalContainer>
  );
}

const ModalWrap = styled.div`
  width: 30vw;
  min-height: 60vh;
  max-height: 60vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #ccc;
  }
  background-color: #fff;
  position: absolute;
  top: 9vh;
  right: 21vw;
  border-radius: 5px;
  box-shadow: 0 0.5rem 1rem gray;
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
  }
`;

export default NotificationModal;
