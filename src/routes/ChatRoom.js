import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
function Chat() {
  const { state } = useLocation();
  return (
    <>
      <Header />
      <Div>
        <p>{state}</p>
      </Div>
    </>
  );
}

const Div = styled.div`
  height: auto;
  min-height: 70vh;
  overflow: auto;
  //max-width: 90%;
  //margin: 0 auto;
`;

export default Chat;
