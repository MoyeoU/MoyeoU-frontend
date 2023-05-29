import styled from "styled-components";

function ApplyForm() {
  return (
    <Div>
      <label for="formInput">항목 &nbsp; </label>
      <input type="text" id="formInput" required />
      <button>삭제</button>
    </Div>
  );
}

const Div = styled.div`
  margin: 1vh 0;
  label {
    font-weight: bold;
    color: gray;
  }
  input {
    border: 1px solid #dcdcdc;
    font-size: 2.5vh;
    width: 20vw;
  }
  button {
    margin: 0 1vh;
  }
`;

export default ApplyForm;
