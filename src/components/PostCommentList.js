import styled from "styled-components";
import "../article/articledetail.css";
import leftArrow from "../img/leftArrow.jpg";
import userImg from "../img/userImg.jpg";
import commentImg from "../img/commentImg.jpg";
import commentLogo from "../img/commentLogo.jpg";
import send from "../img/send.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function PostCommentList({ comment, getPost, postId }) {
  const [modifyTrueOrNot, setModifyTrueOrNot] = useState(false);
  const [modifyContent, setModifyContent] = useState(comment.content);
  const [image, setImage] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const getImage = () => {
    //댓글 작성자 이미지 호출
    axios
      .get(`http://52.79.241.162:8080/members/${comment.authorId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        //setImage(response.data.imagePath);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeToModify = () => {
    setModifyTrueOrNot(true);
  };

  const modifyComment = () => {
    //수정..
    axios
      .put(
        `http://52.79.241.162:8080/posts/${postId}/comments/${comment.commentId}`,
        {
          content: modifyContent,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("수정이 완료되었습니다.");
        setModifyTrueOrNot(false);
        getPost();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const removeComment = (commentId) => {
    const removeCommentOrNot = window.confirm("댓글을 삭제하시겠습니까?");
    if (removeCommentOrNot) {
      axios
        .delete(
          `http://52.79.241.162:8080/posts/${postId}/comments/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert("댓글이 삭제되었습니다.");
          getPost();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const goMemberPage = () => {
    let MEMBERID = 0;
    if (!comment.isAuthor) MEMBERID = comment.authorId;
    navigate(`/mypage/${data.nickname}`, {
      state: {
        state: data.nickname,
        memberId: MEMBERID,
      },
    });
  };
  useEffect(() => {
    getImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {data ? (
        <Div>
          <Header>
            <Info onClick={goMemberPage}>
              <img
                src={data.imagePath ? data.imagePath : commentLogo}
                alt="commentLogo"
              ></img>
              <h2>{comment.nickname}</h2>
            </Info>
            <p>
              {comment.time.substring(0, 10)} {comment.time.substring(11, 16)}
            </p>
          </Header>
          <Content>
            <Comment>
              {modifyTrueOrNot ? (
                <input
                  defaultValue={modifyContent}
                  onChange={(e) => setModifyContent(e.target.value)}
                ></input>
              ) : (
                <span>{comment.content}</span>
              )}
            </Comment>
            <Button>
              {comment.isAuthor ? (
                modifyTrueOrNot ? (
                  <>
                    <button onClick={modifyComment}>완료</button>
                    <button
                      onClick={() => {
                        setModifyTrueOrNot(false);
                        setModifyContent(comment.content);
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => removeComment(comment.commentId)}>
                      삭제
                    </button>
                    <button onClick={changeToModify}>수정</button>
                  </>
                )
              ) : (
                <></>
              )}
            </Button>
          </Content>
        </Div>
      ) : (
        ""
      )}
    </>
  );
}

const Div = styled.div`
  margin-bottom: 4vh;
  padding: 1vh 1vw;
  display: flex;
  flex-direction: column;
  border-left: 3px solid #939393;
`;

const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vh;
  p {
    font-size: 1.5rem;
    color: #717171;
  }
`;

const Info = styled.section`
  display: flex;
  align-items: center;
  //position: relative;
  img {
    //border: 2px solid #385493;
    //display: block;
    width: 6vh;
    height: 6vh;
    margin: 0 1vw;
    object-fit: cover;
  }
`;

const Content = styled.section`
  margin-left: 1vw;
  display: flex;
  justify-content: space-between;
  input {
    font-size: 1.5rem;
    width: 60rem;
    border: none;
    border-bottom: solid #717171 1px;
    :focus {
      outline: none;
    }
  }
  span {
    font-size: 1.7rem;
  }
`;

const Comment = styled.div`
  max-width: 60rem;
  y-overflow: auto;
`;
const Button = styled.div`
  width: 20vw;
  button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    float: right;
    color: #717171;
    :hover {
      color: black;
    }
  }
`;

export default PostCommentList;
