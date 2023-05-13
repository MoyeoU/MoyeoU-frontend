import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Post({
  id,
  title,
  complete,
  totalMember,
  presentMember,
  tag,
  type,
  writer,
}) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/postView/${id}`);
  };

  return (
    <PostLayout onClick={onClick}>
      <CompleteBtn>
        <button>{{ complete } === "Y" ? `모집완료` : `모집중`}</button>
      </CompleteBtn>
      <h1>{title}</h1>
      <p>
        {presentMember}/{totalMember}
      </p>
      {tag.map((tags) => (
        <TagBtn>{tags}</TagBtn>
      ))}
      <hr />
      <Writer>{writer} 님</Writer>
    </PostLayout>
  );
}

const PostLayout = styled.div`
  //clear: both;
  width: 15em;
  height: 20em;
  border: 3px solid #385493;
  border-radius: 30px;
  float: left;
  margin: 1em;
  padding: 3em;
  transition: all 0.2s linear;
  :hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const CompleteBtn = styled.div`
  button {
    margin: 0.5em;
    pointer-events: none;
  }
`;

const TagBtn = styled.button`
  margin: 0.5em;
  pointer-events: none;
`;

const Writer = styled.p`
  float: right;
  font-weight: bold;
`;

export default Post;
