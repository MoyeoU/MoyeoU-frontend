import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";

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
      <CompleteBtn>{{ complete } === "Y" ? `모집완료` : `모집중`}</CompleteBtn>
      <Title>
        <h4>{title}</h4>
      </Title>
      <span>
        <BsPersonFill />
        &nbsp;
        {presentMember}&nbsp;/&nbsp;{totalMember}
      </span>
      <br />
      {tag.map((tags) => (
        <TagBtn>{tags}</TagBtn>
      ))}
      <hr />
      <Writer>{writer} 님</Writer>
    </PostLayout>
  );
}

const PostLayout = styled.div`
  width: 200px;
  margin: 1% 1%;
  min-height: 16em;
  max-height: 16em;
  border: 3px solid #385493;
  border-radius: 30px;
  float: left;
  //margin: 0.8em;
  padding: 3em;
  transition: all 0.2s linear;
  :hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  span {
    font-weight: bold;
  }
`;
const Title = styled.div`
  min-height: 5em;
  max-height: 5em;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const CompleteBtn = styled.p`
  background-color: #deeaf6;
  margin: 0.5em;
  pointer-events: none;
  display: inline-block;
  padding: 0.3em 0.5em;
  border-radius: 0.5em;
  color: #385493;
  font-size: 15px;
  font-weight: bold;
`;

const TagBtn = styled.p`
  background-color: #dcdcdc;
  margin: 1em 1em 0.5em 0;
  pointer-events: none;
  display: inline-block;
  padding: 0.3em 0.5em;
  border-radius: 0.5em;
  font-size: 15px;
`;

const Writer = styled.p`
  float: right;
  font-weight: bold;
`;

export default Post;
