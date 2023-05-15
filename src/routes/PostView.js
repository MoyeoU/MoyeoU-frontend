import styled from "styled-components";
import Header from "../components/Header";

function PostView() {
  return (
    <>
      <Header />
      <Div>
        <p>hi</p>
      </Div>
    </>
  );
}

const Div = styled.div`
  height: auto;
  min-height: 70vh;
`;

export default PostView;
