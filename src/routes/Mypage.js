import styled from "styled-components";
import Header from "../components/Header";

function Mypage() {
  const s = 1;
  return (
    <>
      <Header />
      <Div>
        <p>hi {s}'s mypage</p>
      </Div>
    </>
  );
}

const Div = styled.div`
  height: auto;
  min-height: 70vh;
  overflow: auto;
`;

export default Mypage;
