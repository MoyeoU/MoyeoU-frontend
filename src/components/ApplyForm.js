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
    border: 1px solid #dcdcdc;
    font-size: 2.5vh;
    width: 20vw;
  }
`;

export default ApplyForm;
