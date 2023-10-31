import styled from "styled-components";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";
import likeImg from "../../img/like.png";
import Swal from "sweetalert2";
import "../../article/swal.css";

function EvaluateModal(props) {
  const submit = () => {
    if (formValue.comment === "") {
      Swal.fire({
        icon: "warning",
        text: "평가 메시지를 입력하세요.",
        showConfirmButton: false,
        timer: 1200,
        customClass: {
          overlay: "swal-overlay",
        },
      });
    } else {
      axios
        .post(
          `http://52.79.241.162:8080/posts/${props.postId}/evaluations/${props.data.id}`,
          {
            point: Number(formValue.star) * 20,
            content: formValue.comment,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          props.getMember();
        })
        .catch((err) => {
          console.log(err);
        });
      // const newItem = {
      //   member: props.data.member.nickname,
      //   star: formValue.star,
      //   comment: formValue.comment,
      // };
      //props.setSubmit(true);
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
  }, []);
  console.log(formValue);
  const ARRAY = [0, 1, 2, 3, 4];
  console.log(clicked.filter(Boolean).length);
  return (
    <>
      <Modal onClose={props.onClose}>
        <Div>
          <Img
            style={{ width: "8rem", height: "8.5rem" }}
            src={likeImg}
            alt="likeImg"
          ></Img>
          <Name>
            <h2>
              <span>{props.data.member.nickname}</span> 님에 대한 평가
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

const Img = styled.img`
  margin-bottom: 2vh;
`;

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
    font-size: 1.5rem;
    resize: none;
    padding: 2vh 1vw;
    width: 25vw;
    height: 12vh;
    border: 1px solid gray;
    border-radius: 1em;
    line-height: 150%;
  }
`;

const Btn = styled.div`
  button {
    width: 8vw;
    height: 5vh;
    background-color: #385493;
    color: white;
    font-weight: bold;
    margin-bottom: 2vh;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;

export default EvaluateModal;
