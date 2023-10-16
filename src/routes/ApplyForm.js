import styled from "styled-components";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function ApplyForm() {
  const { state } = useLocation();
  const [data, setData] = useState("");
  const [submitData, setSubmitData] = useState([]);
  const navigate = useNavigate();
  const getForm = () => {
    axios
      .get(`http://52.79.241.162:8080/posts/${state}/form`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        let newState = [];
        for (let i = 0; i < response.data.length; i++) {
          let temp = newState;
          let input = { itemId: response.data[i].itemId, answer: "" };
          newState = [...temp, input];
        }
        setSubmitData(newState);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setName = (e) => {
    let copiedData = [...submitData];

    let findIdx = -1;
    for (let m = 0; m < copiedData.length; m++) {
      if (Number(copiedData[m].itemId) === Number(e.target.id)) {
        findIdx = m;
        break;
      }
    }
    copiedData[findIdx].answer = e.target.value;
    setSubmitData(copiedData);
  };

  const apply = () => {
    //신청하기 api
    axios
      .post(
        `http://52.79.241.162:8080/posts/${state}/attend`,
        {
          answers: submitData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert("신청이 완료되었습니다.");
        navigate(`/postView/${state}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      {data === "" ? (
        <Div>로딩중</Div>
      ) : (
        <Div>
          <Content>
            <h1>새로운 스터디를 만나보세요!</h1>
            <table>
              <tbody>
                {data.map((item) => (
                  <tr key={item.itemId}>
                    <td>
                      <label htmlFor={item.itemId}>{item.itemName}</label>
                    </td>
                    <td>
                      <input id={item.itemId} required onChange={setName} />
                    </td>
                    <td></td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <Button onClick={apply}>신청하기</Button>
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

export default ApplyForm;
