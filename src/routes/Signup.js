import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(`/`);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://52.79.241.162:8080/sign-up", {
        email: email,
        password: password,
        nickname: nickname,
        department: department,
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "회원가입이 완료되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
          confirmButtonColor: "#385493",
        }).then(() => {
          navigate(`/`);
        });
        //document.location.href = "/";
      })
      .catch((err) => {
        //setMessage(err.response.data.message)
        console.log(err);
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        isAlertCountChange={props.isAlertCountChange}
        setIsAlertCountChange={props.setIsAlertCountChange}
        alertCount={props.alertCount}
        setAlertCount={props.setAlertCount}
      />
      <Div>
        <H1Div>
          <h1>
            <span>모여유</span>에 오신 것을 환영합니다!
          </h1>
        </H1Div>
        {/* <form onSubmit={onSubmit}> */}
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">이메일(학교)</label>
              </td>
              <td>
                <input
                  id="email"
                  type="email"
                  placeholder="example@o.cnu.ac.kr"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </td>
              <td>
                <button type="button" id="sendCode">
                  인증번호 전송
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input id="receivedCode" required />
              </td>
              <td>
                <button type="button" id="sendCode">
                  인증
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="department">학과</label>
              </td>
              <td colSpan="2">
                <input
                  id="department"
                  required
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="nickname">닉네임</label>
              </td>
              <td colSpan="2">
                <input
                  id="nickname"
                  required
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">비밀번호</label>
              </td>
              <td colSpan="2">
                <input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <Btn>
          <button type="button" onClick={onCancel}>
            취소하기
          </button>
          <button onClick={onSubmit}>가입하기</button>
        </Btn>
        {/* </form> */}
      </Div>
    </>
  );
}
const H1Div = styled.div`
  padding: 0 0 3vh 0;
  span {
    color: #385493;
  }
  h1 {
    text-align: center;
    letter-spacing: 0.5px;
  }
`;
const Div = styled.div`
  height: auto;
  min-height: 70vh;
  overflow: auto;
  padding: 3vh 5vw;
  margin: 0 15vw;
  table,
  tr,
  td {
    border: none;
    width: auto;
    text-align: center;
    margin: 0 auto;
    padding: 5px 5px 5px 1px;
  }
  input {
    width: 23em;
    height: 3em;
    border: 1px solid lightgray;
    border-radius: 5px;
    text-indent: 0.5vw;
  }
  button {
    margin: 3%;
    width: 7em;
    height: 3em;
    font-size: 1.5vh;
    font-weight: 500;
    border: 1px solid lightgray;
    background-color: lightgray;
    color: black;
    border-radius: 5px;
    :hover {
      cursor: pointer;
      background-color: #c0c0c0;
      transition: 0.5s;
    }
  }
  img {
    display: block;
    padding: 0em 0em 1em 0em;
    width: 9em;
    height: 6em;
  }
  label {
    font-weight: 600;
  }
  #department,
  #nickname,
  #password {
    width: 30em;
  }
  hr {
    margin-top: 5vh;
  }
`;

const Btn = styled.div`
  float: right;
  button {
    margin: 0.5em 0.5em;
    width: 8em;
    height: 3em;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    font-size: 1.7vh;
    border-radius: 5px;
    :hover {
      cursor: pointer;
      background-color: #003366;
      transition: 0.5s;
    }
  }
`;

export default Signup;
