import Header from "../components/Header";
import Add from "../components/Add";
import BoardType from "../components/BoardType";
import Board from "../components/Board";
import styled from "styled-components";

function Home() {
  return (
    <>
      <Header />
      <Add />
      <Div>
        <BoardType />
        <Board />
      </Div>
    </>
  );
}

const Div = styled.div`
  //display: flex;
  flex-wrap: wrap;
`;

export default Home;
