import { useNavigate } from "react-router-dom";
import logo from "../img/MoyeoU.jpg";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LoginModal from "./Modal/LoginModal";
import { BsChat, BsHeart, BsHeartFill } from "react-icons/bs";
import { BiChat, BiHeart } from "react-icons/bi";
import NotificationModal from "../components/Modal/NotificationModal";
import ChatModal from "../components/Modal/ChatModal";
import axios from "axios";

function Header() {
  //const userId = data.words.filter(word => (word.day === day));
  const [user, setUser] = useState("");
  const [login, setLogin] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);
  const [chatModalIsOpen, setChatModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const getLoginOrNot = () => {
    //로그인 여부 체크, 나중에는 문자열 있는지없는지
    setUser(localStorage.getItem("id"));
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  const goHome = () => {
    navigate(`/`);
  };
  const goLogout = () => {
    axios
      .post(
        `http://52.79.241.162:8080/logout?refreshToken=${localStorage.getItem(
          "refreshToken"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.clear();
        setUser("");
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });

    //getLoginOrNot(); 새로고침?
  };
  const goLogin = () => {
    setLoginModalIsOpen(true);
  };
  const goSignup = () => {
    navigate(`/sign-up`);
  };
  const goChat = () => {
    navigate(`/chat`, { state: user });
    //setChatModalIsOpen(true);
  };
  const goAlert = () => {
    setNotificationModalIsOpen(true);
  };

  useEffect(() => {
    getLoginOrNot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loginModalIsOpen]);

  return (
    <HeaderBar>
      <Img onClick={goHome}>
        {/* <a href={navigate=(`/`)}> */}
        <img
          style={{ width: "8rem", height: "4rem" }}
          src={logo}
          alt="logo"
        ></img>
        {/* </a> */}
      </Img>
      <RightDiv>
        {login ? (
          //채팅
          <Btn>
            <BiChat size="25" onClick={goChat} />
            {/* {chatModalIsOpen && (
              <ChatModal
                open={chatModalIsOpen}
                onClose={() => {
                  setChatModalIsOpen(false);
                }}
              />
            )} */}
          </Btn>
        ) : null}
        {login ? (
          //알림
          <Btn>
            <BiHeart size="25" onClick={goAlert} />
            {notificationModalIsOpen && (
              <NotificationModal
                open={notificationModalIsOpen}
                onClose={() => {
                  setNotificationModalIsOpen(false);
                }}
              />
            )}
          </Btn>
        ) : null}

        {login ? (
          <Btn>
            <p onClick={() => navigate(`/mypage/${user}`, { state: user })}>
              {user} 님
            </p>
          </Btn>
        ) : (
          <Btn>
            <p onClick={goSignup}>회원가입</p>
          </Btn>
        )}
        {login ? (
          <Btn onClick={goLogout}>
            <p>로그아웃</p>
          </Btn>
        ) : (
          <Btn>
            <p onClick={goLogin}>로그인</p>
            {loginModalIsOpen && (
              <LoginModal
                open={loginModalIsOpen}
                setLoginModalIsOpen={setLoginModalIsOpen}
                onClose={() => {
                  setLoginModalIsOpen(false);
                }}
              />
            )}
          </Btn>
        )}
      </RightDiv>
    </HeaderBar>
  );
}

const HeaderBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
`;
const Img = styled.div`
  :hover {
    cursor: pointer;
  }
  margin: 0 7vw;
`;
const RightDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0 6vw;
`;
const Btn = styled.div`
  color: #333;
  background-color: white;
  border: none;
  margin: 0 1vw;
  display: flex;
  :hover {
    color: #385493;
    cursor: pointer;
  }
  p {
    font-weight: bold;
    font-size: 1.75rem;
    margin: 1vh 0;
  }
`;

export default Header;
