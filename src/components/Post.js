import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import Moyeou from "../img/MoyeoU.jpg";
import Swal from "sweetalert2";

function Post({ info }) {
  const navigate = useNavigate();
  const onClick = (postId) => {
    if (localStorage.getItem("id") !== null) {
      navigate(`/postView/${postId}`, {
        state: postId,
      });
    } else {
      Swal.fire({
        title: "로그인이 필요합니다.",
        icon: "info",
        confirmButtonText: "확인",
        confirmButtonColor: "#385493",
      });
    }
  };
  const goMypage = (e, host) => {
    e.stopPropagation();
    if (localStorage.getItem("id") !== null) {
      navigate(`/mypage/${host.nickname}`, {
        state: { state: host.nickname, memberId: host.id },
      });
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
              onClick={() => onClick(data.postId)}
              key={idx}
              id={idx + 1}
            >
              <CompleteBtn>
                {data.status === "PROGRESS" ? `모집중` : `모집완료`}
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
                  {data.currentCount}&nbsp;/&nbsp;{data.headCount}
                </span>
              </Person>
              <Hashtag>
                {data.hashtags.length > 3 ? (
                  <>
                    <TagBtn>{data.hashtags[0]}</TagBtn>
                    <TagBtn>{data.hashtags[1]}</TagBtn>
                    <TagBtn>{data.hashtags[2]}</TagBtn>
                    <TagBtn>..</TagBtn>
                  </>
                ) : (
                  data.hashtags.map((tags, idx) => (
                    <TagBtn key={idx}>{tags}</TagBtn>
                  ))
                )}
              </Hashtag>
              <hr />
              <Writer onClick={(e) => goMypage(e, data.host)}>
                {data.host.nickname}
              </Writer>
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
  min-height: 3.5rem;
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
