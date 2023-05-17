import styled from "styled-components";
import image from "../img/MoyeoU.jpg";
import Header from "../components/Header";

function Signup() {
  return (
    <>
      <Header />
      <Div>
        {/* <ImgDiv>
          <img src={image} alt="logo" />
        </ImgDiv> */}
        <H1Div>
          <h1>MoyeoU에 오신 것을 환영합니다!</h1>
        </H1Div>
        <form>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="id">이메일(학교)</label>
                </td>
                <td>
                  <input name="id" id="id" placeholder="example@o.cnu.ac.kr" />
                </td>
                <td>
                  <button type="button" id="sendCode">
                    인증번호 전송
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input name="receivedCode" id="receivedCode" />
                </td>
                <td>
                  <button type="button" id="sendCode">
                    인증하기
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="major">학과</label>
                </td>
                <td>
                  <input name="major" id="major" />
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="studentNum">학번</label>
                </td>
                <td>
                  <input name="studentNum" id="studentNum" />
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="nickname">닉네임</label>
                </td>
                <td>
                  <input name="nickname" id="nickname" />
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="pw">비밀번호</label>
                </td>
                <td>
                  <input name="pw" id="pw" />
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <hr />
          <Btn>
            <button type="button">취소하기</button>
            <button type="submit">가입하기</button>
          </Btn>
        </form>
      </Div>
    </>
  );
}

// const ImgDiv = styled.div`
//   float: left;
//   padding: 0 1em;
// `;
const H1Div = styled.div`
  padding: 0 0 3vh 0;
`;
const Div = styled.div`
  height: auto;
  min-height: 70vh;
  overflow: auto;
  padding: 5vh 10vw;
  table,
  tr,
  td {
    border: none;
    width: 100%;
  }
  input {
    width: 20em;
    height: 3em;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
  button {
    margin: 0.5em;
    width: 8em;
    height: 2.5em;
    border: 1px solid lightgray;
    background-color: lightgray;
    color: black;
    border-radius: 5px;
  }
  img {
    display: block;
    padding: 0em 0em 1em 0em;
    width: 9em;
    height: 6em;
  }
`;

const Btn = styled.div`
  float: right;
  button {
    margin: 0.5em 0.5em;
    width: 8em;
    height: 3em;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    border-radius: 5px;
  }
`;

export default Signup;
