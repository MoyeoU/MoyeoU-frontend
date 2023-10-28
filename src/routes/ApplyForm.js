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
        navigate(`/postView/${state}`, { state: state });
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
            <P>새로운 스터디를 만나보세요!</P>
            <Table>
              <tbody>
                {data.map((item) => (
                  <tr key={item.itemId}>
                    <td>
                      <Label htmlFor={item.itemId}>{item.itemName}</Label>
                    </td>
                    <td>
                      <TextInput id={item.itemId} required onChange={setName} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button onClick={apply}>신청하기</Button>
          </Content>
        </Div>
      )}
    </>
  );
}

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 2vh;
  font-size: 1.8vh;
  font-weight: bold;
  border-bottom: 2px solid lightgray;
`;

const Label = styled.label`
  padding-left: 2vw;
`;

const TextInput = styled.input`
  border: 2px solid lightgray;
  font-size: 1.5vh;
  border-radius: 5px;
  width: 20vw;
  height: 2vw;
  padding: 1px 2px;
  text-indent: 0.5vw;
  margin-left: 2vw;
  margin-right: 3vw;
`;

const P = styled.p`
  font-size: 2.8vh;
  font-weight: bold;
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
    margin: 6vh auto 4vh auto;
    padding-bottom: 6vh;
  }
`;

const Button = styled.button`
  width: 7em;
  height: 3em;
  border: 1px solid #385493;
  background-color: #385493;
  color: white;
  font-weight: bold;
  font-size: 1.5vh;
  border-radius: 5px;
  :hover {
    cursor: pointer;
    background-color: #003366;
    transition: 0.5s;
  }
`;

export default ApplyForm;
