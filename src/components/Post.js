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
    <PostLayout onClick={onClick} key={id}>
      <CompleteBtn>
        <p>{{ complete } === "Y" ? `모집완료` : `모집중`}</p>
      </CompleteBtn>
      <h3>{title}</h3>
      <p>
        {presentMember}&nbsp;/&nbsp;{totalMember}
      </p>
      <TagBtn>
        {tag.map((tags) => (
          <p>{tags}</p>
        ))}
      </TagBtn>
      <hr />
      <Writer>{writer} 님</Writer>
    </PostLayout>
  );
}

const PostLayout = styled.div`
  //clear: both;
  width: 13em;
  height: 16em;
  border: 3px solid #385493;
  border-radius: 30px;
  float: left;
  margin: 0.8em;
  padding: 3em;
  transition: all 0.2s linear;
  :hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  p {
    font-weight: bold;
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
  }
`;

const Writer = styled.p`
  float: right;
  font-weight: bold;
`;

export default Post;
