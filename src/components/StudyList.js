import styled from "styled-components";

function StudyList({ title, complete, tag, date }) {
  return (
    <>
      <Div>
        <CompleteBtn>
          <p>{{ complete } === "Y" ? `모집완료` : `모집중`}</p>
        </CompleteBtn>
        <h3>{title}</h3>
        <TagBtn>
          {tag.map((tags) => (
            <p>{tags}</p>
          ))}
        </TagBtn>
        <Date>{date}</Date>
      </Div>
    </>
  );
}

const Div = styled.div`
  border: 1px solid gray;
  border-radius: 1em;
  margin-bottom: 1vh;
  padding: 1vh 1vw;
  :hover {
    cursor: pointer;
  }
`;

const CompleteBtn = styled.div`
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
`;

const Date = styled.div`
  float: right;
`;

export default StudyList;
