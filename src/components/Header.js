import { useNavigate } from "react-router-dom";
import logo from "../img/MoyeoU.jpg";
import chat from "../img/chat.png";
import heart from "../img/heart.png";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LoginModal from "./Modal/LoginModal";
import dummy from "../data.json";

function Header() {
  //const userId = dummy.words.filter(word => (word.day === day));
  const [user, setUser] = useState("");
  const [login, setLogin] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
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
  const goLogout = () => {
    localStorage.removeItem("id");
    setUser(""); //나중에는 쿠키 삭제
    document.location.href = "/";
    //getLoginOrNot(); 새로고침?
  };
  const goLogin = () => {
    setLoginModalIsOpen(true);
  };
  const goSignup = () => {
    navigate(`/signup`);
  };
  const goMypage = () => {
    navigate(`/mypage/${user}`);
  };

  useEffect(() => {
    getLoginOrNot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loginModalIsOpen]);

  return (
    <HeaderBar>
      <a href="/">
        <img
          style={{ width: "9em", height: "6em" }}
          src={logo}
          alt="logo"
        ></img>
      </a>
      <Div>
        {login ? (
          //채팅
          <Btn>
            <img src={chat} className="chatImg" alt="chat"></img>
          </Btn>
        ) : null}
        {login ? (
          //알림
          <Btn>
            <img src={heart} className="heartImg" alt="heart"></img>
          </Btn>
        ) : null}

        {login ? (
          <Btn>
            <p onClick={goMypage}>{user} 님</p>
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
                onClose={() => {
                  setLoginModalIsOpen(false);
                }}
              />
            )}
          </Btn>
        )}
      </Div>
    </HeaderBar>
  );
}

const HeaderBar = styled.nav`
  //margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 1vw;
  height: 10vh;
  img {
    margin: 1vh 1vw;
  }
`;
const Div = styled.div`
  display: inline-block;
  float: right;
  //grid-gap: 30px;
  gap: 30px;
  align-items: center;
  margin: 1vh 1vw 1vh 5vw;
`;
const Btn = styled.button`
  color: #333;
  background-color: #fff;
  border: none;
  margin: 0 1vw;
  p {
    list-style: none;
    font-weight: bold;
    font-size: 2.5vh;
    font-family: "Noto Sans KR", sans-serif;
  }
  :hover {
    color: #385493;
    cursor: pointer;
  }
  .chatImg,
  .heartImg {
    width: 2em;
    height: 2em;
  }
`;

export default Header;
