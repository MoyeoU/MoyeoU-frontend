import styled from "styled-components";
import image from "../../img/MoyeoU.jpg";
import Modal from "./Modal";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../article/swal.css";

function LoginModal({ onClose, setLoginModalIsOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };
  const onSubmit = (event) => {
    //event.preventDefault();
    axios
      .post("http://52.79.241.162:8080/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        axios.defaults.headers.common["RefreshToken"] =
          response.data.refreshToken;
        localStorage.clear();
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("id", response.data.nickname);
        console.log(response);
        setLoginModalIsOpen((e) => !e);
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "warning",
          text: err.response.data.message,
          showConfirmButton: false,
          timer: 1200,
          customClass: {
            overlay: "swal-overlay",
          },
        });
      });
  };

  return (
    <Modal onClose={onClose}>
      <Div>
        <img src={image} alt="logo" />
        <br />
        {/* <form onSubmit={onSubmit}> */}
        <input
          placeholder="학교 이메일"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          required
        />
        <br />
        <br />
        <input
          placeholder="비밀번호"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          required
        />
        <br />
        <br />
        <button type="submit" onClick={onSubmit}>
          로그인
        </button>
        {/* </form> */}
      </Div>
    </Modal>
  );
}

const Div = styled.div`
  input {
    width: 20em;
    height: 3em;
    border: 1px solid #a0a0a0;
    border-radius: 5px;
    text-indent: 0.5vw;
  }
  button {
    width: 20em;
    height: 3em;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    border-radius: 5px;
  }
  img {
    padding: 0em 0em 1em 0em;
    width: 10em;
    height: 5em;
  }
`;

export default LoginModal;
