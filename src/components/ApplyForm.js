import styled from "styled-components";

function ApplyForm() {
  return (
    <Div>
      <label for="formInput">항목 &nbsp; </label>
      <input type="text" id="formInput" required />
    </Div>
  );
}

const Div = styled.div`
  margin: 2vh 0;
  label {
    font-weight: bold;
    color: gray;
    font-size: 2.5vh;
  }
  input {
    border: 2px solid lightgray;
    font-size: 2.5vh;
    width: 20vw;
    height: 2vw;
    border-radius: 5px;
    text-indent: 0.5vw;
    font-size: 2vh;
    box-sizing: content-box;
    padding: 1px 2px;
  }
`;

export default ApplyForm;
