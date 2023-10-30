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
    margin: 0.4em;
    pointer-events: none;
    display: inline-block;
    padding: 0.5em 0.6em;
    border-radius: 0.5em;
    font-weight: normal;
    font-size: 1.3rem;
  }
  padding: 1vh 1vw;
`;

export default Tag;
