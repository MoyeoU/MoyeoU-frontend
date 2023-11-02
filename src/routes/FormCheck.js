import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import studentImg from "../img/student.png";
import Swal from "sweetalert2";
import loading from "../img/loading.png";

function FormCheck(props) {
  const { state } = useLocation();
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const getForm = () => {
    axios
      .get(
        `http://52.79.241.162:8080/participations/${state.participationId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const accept = () => {
    //수락 api
    axios
      .post(
        `http://52.79.241.162:8080/posts/${state.postId}/participations/${state.participationId}/accept`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "수락되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#385493",
        }).then(() => {
          navigate(`/postView/${state.postId}`, { state: state.postId });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const reject = () => {
    //거절 api
    axios
      .post(
        `http://52.79.241.162:8080/posts/${state.postId}/participations/${state.participationId}/reject`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "거절되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#385493",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <Header
        isAlertCountChange={props.isAlertCountChange}
        setIsAlertCountChange={props.setIsAlertCountChange}
        alertCount={props.alertCount}
        setAlertCount={props.setAlertCount}
      />
      {data === "" ? (
        <Div>
          <LoadingImg>
            <img src={loading} alt="loading.."></img>
          </LoadingImg>
        </Div>
      ) : (
        <Div>
          <Content>
            <Title
              className="hoverName"
              onClick={() =>
                navigate(`/mypage/${state.memberName}`, {
                  state: { state: state.memberName, memberId: state.memberId },
                })
              }
            >
              {state.memberName}님이
            </Title>
            <Title>스터디를 신청했어요 :)</Title>
            <Img
              style={{ width: "13rem", height: "12rem" }}
              src={studentImg}
              alt="studentImg"
            ></Img>
            <Table>
              <tbody>
                {data.map((form, idx) => (
                  <tr key={idx}>
                    <td>
                      <FormItem>{form.itemName}</FormItem>
                      {/* <Item>{form.itemName}</Item> */}
                    </td>
                    <td>
                      <FormAnswer>{form.answer}</FormAnswer>
                      {/* <input value={form.answer} disabled /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <BtnBox>
              <Button onClick={accept}>수락하기</Button>
              <Button onClick={reject}>거절하기</Button>
            </BtnBox>
          </Content>
        </Div>
      )}
    </>
  );
}
const FormItem = styled.div`
  margin-left: 2vw;
  font-size: 1.5vh;
  font-weight: bold;
  height: 0.8vh;
  border-radius: 5px;
  background-color: #d3def1;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1vw;
`;

const FormAnswer = styled.div`
  min-width: 15vw;
  margin: 0 2vw;
  height: 0.8vh;
  font-size: 1.5vh;
  font-weight: bold;
  border-radius: 5px;
  background-color: #a5bbe3;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1vw;
`;

const BtnBox = styled.div``;

const Table = styled.table`
  min-width: 25vw;
  border-collapse: separate;
  border-spacing: 0 2vh;
  padding-bottom: 3vh;
  border-bottom: 2px solid lightgray;
`;

const LoadingImg = styled.div`
  text-align: center;
  padding: 5vh 5vw;
  img {
    width: 10vw;
  }
`;

const Img = styled.img`
  margin-top: 2.5vh;
`;
const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 1vh;
  &.hoverName {
    :hover {
      cursor: pointer;
    }
  }
`;

const Div = styled.div`
  height: auto;
  min-height: 70vh;
  overflow: auto;
`;

const Content = styled.div`
  max-width: 80%;
  text-align: center;
  margin: 10vh auto;
  table {
    margin: 2vh auto;
  }
`;

const Button = styled.button`
  margin: 0.5em 0.5em;
  width: 8em;
  height: 3em;
  border: 1px solid #385493;
  background-color: #385493;
  color: white;
  font-weight: bold;
  font-size: 1.6vh;
  border-radius: 5px;
  :hover {
    cursor: pointer;
    background-color: #003366;
    transition: 0.5s;
  }
`;

export default FormCheck;
