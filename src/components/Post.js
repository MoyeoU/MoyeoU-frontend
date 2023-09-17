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
  const goMypage = (event) => {
    event.stopPropagation();
    navigate(`/mypage/${writer}`, { state: writer });
  };

  return (
    <PostLayout onClick={onClick} key={id}>
      <CompleteBtn>{complete === "Y" ? `모집완료` : `모집중`}</CompleteBtn>
      <Title>
        <h2>{title.length <= 30 ? title : title.slice(0, 28) + "..."}</h2>
      </Title>
      <Person>
        <PersonImg>
          <BsPersonFill />
        </PersonImg>
        <span>
          &nbsp;
          {presentMember}&nbsp;/&nbsp;{totalMember}
        </span>
      </Person>

      <br />
      {tag.map((tags) => (
        <TagBtn>{tags}</TagBtn>
      ))}
      <br />
      <br />
      <br />
      <hr />
      <Writer onClick={goMypage}>{writer} 님</Writer>
    </PostLayout>
  );
}
const Person = styled.div`
  display: flex;
  align-items: center;
`;
const PersonImg = styled.div`
  float: left;
  display: flex;
  justify-content: flex-end;
`;
const PostLayout = styled.div`
  width: 15vw;
  margin: 1vh 1vw;
  padding: 1.5vh 1vw;
  min-height: 35vh;
  max-height: 35vh;
  border: 3px solid #385493;
  border-radius: 30px;
  float: left;
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
  min-height: 4em;
  max-height: 4em;
  // h3 {
  //   width: 15.4vw;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  // }
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
  font-size: 1.3rem;
  font-weight: bold;
`;

const TagBtn = styled.p`
  background-color: #dcdcdc;
  margin: 1em 1em 0.5em 0;
  pointer-events: none;
  display: inline-block;
  padding: 0.3em 0.5em;
  border-radius: 0.5em;
  font-size: 1.3rem;
`;

const Writer = styled.p`
  float: right;
  font-weight: bold;
`;

export default Post;
