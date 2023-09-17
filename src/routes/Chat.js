import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import ChatList from "../components/ChatList";
import data from "../data.json";

function Chat() {
  const { state } = useLocation();
  return (
    <>
      <Header />
      <Div>
        {Object.values(data.chat).map((chats) => (
          <ChatList {...chats} key={chats.name} />
        ))}
        {/* <EvaluationList member={data.user[0].id} /> */}
      </Div>
    </>
  );
}

const Div = styled.div`
  height: auto;
  min-height: 60vh;
  overflow: auto;
  margin: 5vh auto;
`;

export default Chat;
