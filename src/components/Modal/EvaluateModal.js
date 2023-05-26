import styled from "styled-components";
import Modal from "./Modal";
import { useState } from "react";

function EvaluateModal({ onClose }) {
  const onSubmit = (event) => {
    event.preventDefault();
  };

  const [formValue, setFormValue] = useState({
    star: "",
    comment: "",
  });

  return (
    <>
      <Modal onClose={onClose}>
        <Div>
          <form onSubmit={onSubmit}>
            <Name>
              <h2>
                <span>Hyeong2e</span> 님에 대한 평가
              </h2>
            </Name>
            <Star></Star>
            <Comment>
              <input
                placeholder="평가 메시지를 입력하세요."
                value={formValue.comment}
                onChange={(e) =>
                  setFormValue({ ...formValue, comment: e.target.value })
                }
                required
              />
              <br />
            </Comment>
            <Btn>
              <button type="submit">등록</button>
            </Btn>
          </form>
        </Div>
      </Modal>
    </>
  );
}

const Div = styled.div`
  margin: 1vh 1vw;
  height: 45vh;
  overflow: auto;
`;

const Name = styled.div`
  h2 {
    color: gray;
  }
  span {
    color: black;
  }
`;

const Star = styled.div``;

const Comment = styled.div`
  margin: 2vh auto;
  text-align: center;
  overflow: auto;
  input {
    width: 80%;
    height: 20vh;
  }
`;

const Btn = styled.div`
  button {
    width: 40%;
    height: 3em;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    font-size: 80%;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;

export default EvaluateModal;
