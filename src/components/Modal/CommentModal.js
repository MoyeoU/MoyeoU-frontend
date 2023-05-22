import styled from "styled-components";
import image from "../../img/MoyeoU.jpg";
import Modal from "./Modal_ver2";
import { useState } from "react";
import dummy from "../../data.json";

function CommentModal({ onClose }) {
  {
    /*  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [formValue, setFormValue] = useState({
    id: "",
    pw: "",
  });
  const onSubmit = (event) => {
    event.preventDefault();
    setId(formValue.id);
    setPw(formValue.pw);
    onClickLogin();
  };
  const onClickLogin = () => {
    //db 연동
    localStorage.clear();
    localStorage.setItem("id", dummy.user[0].id);
    document.location.href = "/";
  };*/
  }

  return (
    <Modal onClose={onClose}>
      {/* <Div>
        <img src={image} alt="logo" />
        <form onSubmit={onSubmit}>
          <input
            placeholder="학교 이메일"
            type="email"
            value={formValue.id}
            onChange={(e) => setFormValue({ ...formValue, id: e.target.value })}
            required
          />
          <br />
          <br />
          <input
            placeholder="비밀번호"
            type="password"
            value={formValue.pw}
            onChange={(e) => setFormValue({ ...formValue, pw: e.target.value })}
            required
          />
          <br />
          <br />
          <button type="submit">로그인</button>
        </form>
  </Div>*/}
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

export default CommentModal;
