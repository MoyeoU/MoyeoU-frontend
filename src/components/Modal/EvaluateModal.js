import styled from "styled-components";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

function EvaluateModal(props) {
  const submit = () => {
    if (formValue.comment === "") {
      alert("평가 메시지를 입력하세요.");
    } else {
      const newItem = {
        member: props.member,
        star: formValue.star,
        comment: formValue.comment,
      };
      props.setData((data) => [...data, newItem]);
      props.setSubmit(true);
      props.onClose();
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked]);

  const ARRAY = [0, 1, 2, 3, 4];
  console.log(clicked.filter(Boolean).length);
  return (
    <>
      <Modal onClose={props.onClose}>
        <Div>
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
            <textarea
              placeholder="평가 메시지를 입력하세요."
              value={formValue.comment}
              onChange={(e) =>
                setFormValue({
                  ...formValue,
                  star: clicked.filter(Boolean).length,
                  comment: e.target.value,
                })
              }
              required
            />
            <br />
          </Comment>
          <Btn>
            <button onClick={submit}>등록</button>
          </Btn>
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
    font-size: 2rem;
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
  textarea {
    resize: none;
    padding: 1vh 1vw;
    width: 25vw;
    height: 20vh;
    border: 1px solid gray;
    border-radius: 1em;
  }
`;

const Btn = styled.div`
  button {
    width: 8vw;
    height: 5vh;
    background-color: #385493;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;

export default EvaluateModal;
