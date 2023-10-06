import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import Moyeou from "../img/MoyeoU.jpg";

function Post({ info }) {
  const navigate = useNavigate();
  const onClick = (e) => {
    //console.log(e.currentTarget.id);
    if (localStorage.getItem("id")) {
      navigate(`/postView/${e.currentTarget.id}`);
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  const goMypage = (event) => {
    event.stopPropagation();
    let writerName = event.target.innerText.slice(
      0,
      event.target.innerText.length - 2
    );
    console.log(typeof writerName);
    if (localStorage.getItem("id")) {
      navigate(`/mypage/${writerName}`, { state: writerName });
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <Div>
      {info !== undefined ? (
        info.map((data, idx) => {
          return (
            <PostLayout
              onClick={(e) => {
                onClick(e);
              }}
              key={idx}
              id={"post" + idx}
            >
              <CompleteBtn>
                {data.complete === "Y" ? `모집완료` : `모집중`}
              </CompleteBtn>
              <Title>
                <h2>
                  {data.title.length <= 30
                    ? data.title
                    : data.title.slice(0, 28) + "..."}
                </h2>
              </Title>
              <Person>
                <PersonImg>
                  <BsPersonFill />
                </PersonImg>
                <span>
                  &nbsp;
                  {data.presentMember}&nbsp;/&nbsp;{data.totalMember}
                </span>
              </Person>
              <br />
              {data.tag.length > 2 ? (
                <>
                  <TagBtn>{data.tag[0]}</TagBtn>
                  <TagBtn>{data.tag[1]}</TagBtn>
                  <TagBtn>..</TagBtn>
                </>
              ) : (
                data.tag.map((tags) => <TagBtn>{tags}</TagBtn>)
              )}
              <br />
              <br />
              <br />
              <hr />
              <Writer onClick={goMypage}>{data.writer} 님</Writer>
            </PostLayout>
          );
        })
      ) : (
        <div>
          <img src={Moyeou} alt="loadingImg" />
        </div>
      )}
    </Div>
  );
}

const Div = styled.div`
  min-height: 60vh;
  overflow: auto;
`;
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
