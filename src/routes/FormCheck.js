import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function FormCheck() {
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
        alert("수락되었습니다.");
        navigate(`/postView/${state.postId}`, { state: state.postId });
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
        alert("거절되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      {data === "" ? (
        <Div>로딩중</Div>
      ) : (
        <Div>
          <Content>
            <h1>{state.memberName}님의 신청폼입니다.</h1>
            <table>
              <tbody>
                {data.map((form, idx) => (
                  <tr key={idx}>
                    <td>
                      <label>{form.itemName}</label>
                    </td>
                    <td>
                      <input value={form.answer} disabled />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td>
                    <Button onClick={accept}>수락하기</Button>
                    <Button onClick={reject}>거절하기</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Content>
        </Div>
      )}
    </>
  );
}

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
    margin: 10vh auto;
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
  font-size: 1.7vh;
  border-radius: 5px;
  :hover {
    cursor: pointer;
    background-color: #003366;
    transition: 0.5s;
  }
`;

export default FormCheck;
