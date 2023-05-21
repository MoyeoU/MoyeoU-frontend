import styled from "styled-components";

function Tag({ tag }) {
  return (
    <>
      <TagBtn>
        {tag.map((tags) => (
          <span>{tags}</span>
        ))}
      </TagBtn>
    </>
  );
}

const TagBtn = styled.div`
  span {
    background-color: #dcdcdc;
    margin: 0.5em;
    pointer-events: none;
    display: inline-block;
    padding: 0.3em 0.5em;
    border-radius: 0.5em;
    font-weight: normal;
  }
  padding: 1vh 1vw;
`;

export default Tag;
