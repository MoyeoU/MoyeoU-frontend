import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function StudyHistory({ id, title, complete, tag, date }) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/postView/${id}`);
  };
  return (
    <>
      <Div onClick={onClick}>
        <CompleteBtn>
          <p>{{ complete } === "Y" ? `모집완료` : `모집중`}</p>
        </CompleteBtn>
        <TitleDiv>
          <h3>{title}</h3>
        </TitleDiv>

        <TagBtn>
          {tag.map((tags) => (
            <p>{tags}</p>
          ))}
          <span>{date}</span>
        </TagBtn>
      </Div>
    </>
  );
}

const Div = styled.div`
  border: 3px solid darkgray;
  border-radius: 1em;
  margin-top: 1%;
  margin-bottom: 3%;
  padding: 1vh 1vw;
  //height: auto;
  //overflow: auto;
  :hover {
    cursor: pointer;
  }
`;

const TitleDiv = styled.div`
  margin: 2vh 0.5vw;
`;

const CompleteBtn = styled.div`
  height: 30%;
  p {
    background-color: #deeaf6;
    margin: 0.5em;
    pointer-events: none;
    display: inline-block;
    padding: 0.3em 0.5em;
    border-radius: 0.5em;
    color: #385493;
    font-weight: bold;
    font-size: 0.8em;
  }
`;

const TagBtn = styled.div`
  height: 30%;
  p {
    background-color: #dcdcdc;
    margin: 0.5em;
    pointer-events: none;
    display: inline-block;
    padding: 0.3em 0.5em;
    border-radius: 0.5em;
    font-weight: normal;
    font-size: 0.8em;
  }
  span {
    float: right;
  }
`;

export default StudyHistory;
