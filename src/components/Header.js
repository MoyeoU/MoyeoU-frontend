import { useNavigate } from "react-router-dom";
import logo from "../img/MoyeoU.jpg";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LoginModal from "./Modal/LoginModal";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import NotificationModal from "../components/Modal/NotificationModal";
import axios from "axios";

function Header(props) {
  const [user, setUser] = useState("");
  const [login, setLogin] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);
  const [alertData, setAlertData] = useState("");
  const navigate = useNavigate();
  const getLoginOrNot = () => {
    //로그인 여부 체크, 나중에는 문자열 있는지없는지
    if (localStorage.getItem("id") === null) {
      setLogin(false);
    } else {
      setLogin(true);
      setUser(localStorage.getItem("id"));
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
        getLoginOrNot();
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

  const goAlert = () => {
    setNotificationModalIsOpen(true);
    props.setIsAlertCountChange(false);
    props.setAlertCount(alertData.length);
  };
  const getAlertCount = () => {
    axios
      .get("http://52.79.241.162:8080/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (response.data.length !== props.alertCount) {
          //변화가 존재
          props.setIsAlertCountChange(true);
        }

        setAlertData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //console.log(props.alertCount);
  //console.log(props.isAlertCountChange); //true
  useEffect(() => {
    getLoginOrNot();

    const timer = setInterval(() => {
      if (localStorage.getItem("id") !== null) {
        getAlertCount();
      }
    }, 3000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loginModalIsOpen, props.alertCount]);

  return (
    <HeaderBar>
      <Img onClick={goHome}>
        <img
          style={{ width: "8rem", height: "4rem" }}
          src={logo}
          alt="logo"
        ></img>
      </Img>
      <RightDiv>
        {login ? (
          //알림
          <Btn>
            <FaRegHeart
              className={
                props.isAlertCountChange & !notificationModalIsOpen
                  ? "heart"
                  : ""
              }
              size="25"
              onClick={goAlert}
            />
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
            <p
              onClick={() =>
                navigate(`/mypage/${user}`, {
                  state: { state: user, memberId: 0 },
                })
              }
            >
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
                isAlertCountChange={props.isAlertCountChange}
                setIsAlertCountChange={props.setIsAlertCountChange}
                alertCount={props.alertCount}
                setAlertCount={props.setAlertCount}
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
  .heart {
    color: red;
  }
`;

export default Header;
