import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import Moyeou from "../img/MoyeoU.jpg";
import Swal from "sweetalert2";


function Post({ info }) {
  const navigate = useNavigate();
  const onClick = (e) => {
    if (localStorage.getItem("id")) {
      navigate(`/postView/${e.currentTarget.id}`, {
        state: e.currentTarget.id,
      });
      //state가 postId가 되어야 함
    } else {
      Swal.fire({
        title: "로그인이 필요합니다.",
        icon: "info",
        confirmButtonText: "확인",
        confirmButtonColor: "#385493",
      });
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
      Swal.fire({
        title: "로그인이 필요합니다.",
        icon: "info",
        confirmButtonText: "확인",
        confirmButtonColor: "#385493",
      });
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
              id={idx + 1}
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
                  <BsPersonFill size="30" color="#828282" />
                </PersonImg>
                <span>
                  &nbsp;
                  {data.presentMember}&nbsp;/&nbsp;{data.totalMember}
                </span>
              </Person>
              <Hashtag>
                {data.tag.length > 3 ? (
                  <>
                    <TagBtn>{data.tag[0]}</TagBtn>
                    <TagBtn>{data.tag[1]}</TagBtn>
                    <TagBtn>{data.tag[2]}</TagBtn>
                    <TagBtn>..</TagBtn>
                  </>
                ) : (
                  data.tag.map((tags, idx) => <TagBtn key={idx}>{tags}</TagBtn>)
                )}
              </Hashtag>
              <hr />
              <Writer onClick={goMypage}>{data.writer}</Writer>
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
  padding-left: 0.5vw;
  display: flex;
  margin-bottom: 1vh;
  align-items: center;
  span {
    margin-left: 0.5vw;
    font-size: 1.5rem;
  }
`;
const Hashtag = styled.div`
  margin: 1.5vh 0vh 1vh 0.1vw;
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
  max-height: 38vh;
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
  margin: 0.8em 0.8em 4.5em 0.8em;
  min-height: 3em;
  max-height: 3em;
  font-size: 1.1rem;
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
  margin: 0.8em 0em 0.5em 0.5em;
  pointer-events: none;
  display: inline-block;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  color: #385493;
  font-size: 1.4rem;
  font-weight: bold;
`;

const TagBtn = styled.p`
  background-color: #dcdcdc;
  margin: 0em 0.5em 0.5em 0;
  pointer-events: none;
  display: inline-block;
  padding: 0.5em 0.5em;
  border-radius: 0.5em;
  font-size: 1.3rem;
`;

const Writer = styled.p`
  float: right;
  font-weight: bold;
  font-size: 1.5rem;
  margin-right: 0.5em;
`;

export default Post;
