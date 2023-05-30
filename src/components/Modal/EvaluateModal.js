import styled from "styled-components";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

function EvaluateModal(props) {
  const onSubmit = (event) => {
    const count = localStorage.getItem("count");
    localStorage.removeItem("count");
    localStorage.setItem("count", Number(count) + 1);
    event.preventDefault();
    console.log(localStorage.getItem("count"));
  };

  const [formValue, setFormValue] = useState({
    star: "",
    comment: "",
  });

  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  useEffect(() => {
    sendReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked]);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
  };
  const ARRAY = [0, 1, 2, 3, 4];

  return (
    <>
      <Modal onClose={props.onClose}>
        <Div>
          <form onSubmit={props.onClose}>
            <Name>
              <h2>
                <span>{props.member}</span> 님에 대한 평가
              </h2>
            </Name>
            <Star>
              {ARRAY.map((el, idx) => {
                return (
                  <FaStar
                    key={idx}
                    size="35"
                    onClick={() => handleStarClick(el)}
                    className={clicked[el] && "yellowStar"}
                  />
                );
              })}
            </Star>
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
  height: 50vh;
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

const Star = styled.div`
  & svg {
    color: #cacaca;
    cursor: pointer;
  }
  .yellowStar {
    color: #385493;
  }
`;

const Comment = styled.div`
  margin: 2vh auto;
  text-align: center;
  overflow: auto;
  input {
    width: 80%;
    height: 20vh;
    border: 1px solid gray;
    border-radius: 1em;
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
