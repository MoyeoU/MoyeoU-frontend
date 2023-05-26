import { useNavigate } from "react-router-dom";
import logo from "../img/MoyeoU.jpg";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LoginModal from "./Modal/LoginModal";
import data from "../data.json";
import { BsChat, BsHeart, BsHeartFill } from "react-icons/bs";

function Header() {
  //const userId = data.words.filter(word => (word.day === day));
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
  // const goMypage = (user) => {
  //   navigate(`/mypage/${user}`, { state: user });
  // };

  useEffect(() => {
    getLoginOrNot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loginModalIsOpen]);

  return (
    <HeaderBar>
      <a href="/">
        <img
          style={{ width: "8em", height: "4em" }}
          src={logo}
          alt="logo"
        ></img>
      </a>
      <Div>
        {login ? (
          //채팅
          <Btn>
            <BsChat size="25" />
          </Btn>
        ) : null}
        {login ? (
          //알림
          <Btn>
            <BsHeart
              size="25"
              onClick={() => navigate(`/evaluateMember`, { state: user })}
            />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
`;
const Div = styled.div`
  //display: inline-block;
  float: right;
  //gap: 30px;
  //align-items: center;
  //margin: 1vh 1vw 1vh 5vw;
`;
const Btn = styled.div`
  float: left;
  color: #333;
  background-color: #fff;
  border: none;
  margin: 0 1vw;
  display: flex;
  justify-content: center;
  :hover {
    color: #385493;
    cursor: pointer;
  }
  p {
    list-style: none;
    font-weight: bold;
    font-size: 2.5vh;
    font-family: "Noto Sans KR", sans-serif;
    margin: 1vh 0;
  }
  img {
    margin: auto;
    width: 1.5em;
    height: 1.5em;
  }
`;

export default Header;
