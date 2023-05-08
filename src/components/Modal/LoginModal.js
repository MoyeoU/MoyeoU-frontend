import styled from "styled-components";
import image from "../../img/MoyeoU.jpg";
import Modal from "./Modal";
import { useState } from "react";

function LoginModal({ onClose }) {
  // const [id, setId] = useState("");
  // const [pw, setPw] = useState("");
  const [formValue, setFormValue] = useState({
    id: "",
    pw: "",
  });
  console.log(formValue);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };
  // const onChange = (key, value) => {
  //   setFormValue((state) => ({
  //     ...state,
  //     key:value,
  //   }));
  // }
  return (
    <Modal onClose={onClose}>
      <Div>
        <img src={image} alt="logo" />
        <form onSubmit={onSubmit}>
          <input
            id="id"
            value={formValue.id}
            setValue={(value) => {
              setFormValue((state) => ({
                // name을 제외한 나머지 값들도 얕은복사로 가져오기.
                ...state,
                id: value,
              }));
            }}
            placeholder="학교 이메일"
          />
          <br />
          <br />
          <input
            id="pw"
            value={formValue.pw}
            setValue={(value) => {
              setFormValue((state) => ({
                // name을 제외한 나머지 값들도 얕은복사로 가져오기.
                ...state,
                pw: value,
              }));
            }}
            placeholder="비밀번호"
          />
          <br />
          <br />
          <button type="submit">로그인</button>
        </form>
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
    width: 9em;
    height: 6em;
  }
`;

export default LoginModal;
