import styled from "styled-components";
import Header from "../components/Header";
import "../article/articledetail.css";
import leftArrow from "../img/leftArrow.jpg";
import userImg from "../img/userImg.jpg";
import commentImg from "../img/commentImg.jpg";
import commentLogo from "../img/commentLogo.jpg";
import send from "../img/send.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import PostCommentList from "../components/PostCommentList";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

function PostView() {
  const { state } = useLocation();
  const postId = state; //임시번호
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [comments, setComments] = useState("");
  let contentCode = data.content;

  const getPost = async () => {
    await axios
      .get(`http://52.79.241.162:8080/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modifyOrApply = () => {
    if (data.isHost) {
      //modify 화면 이동
    } else {
      navigate(`/applyForm`, {
        state: postId,
      });
    }
  };

  const removePost = () => {
    const removeOrNot = window.confirm("게시물을 삭제하시겠습니까?");
    if (removeOrNot) {
      //삭제 api
      axios
        .delete(`http://52.79.241.162:8080/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          alert("삭제가 완료되었습니다.");
          navigate(`/`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const uploadComment = () => {
    if (comments !== "") {
      axios
        .post(`http://52.79.241.162:8080/posts/${postId}/comments`, {
          content: comments,

          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          alert("댓글 작성이 완료되었습니다.");
          setComments("");
          getPost();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //댓글 업로드하면 리렌더링

  return (
    <>
      <Header />
      {data === "" ? (
        "로딩중"
      ) : (
        <div id="root">
          <div id="articlewrapper">
            <section id="studyPost_header">
              <div id="studyPost_headerIn">
                <a href="/">
                  <img className="leftArrow" src={leftArrow} alt="back"></img>
                </a>
                <div id="recruitTag">
                  {data.status === "PROGRESS" ? "모집중" : "모집완료"}
                </div>
              </div>
              <div id="studyPost_title">{data.title}</div>
              <div id="studyPost_user_date_comment">
                <div id="studyPost_user">
                  <a href="./articledetail.html">
                    <img
                      className="userImg"
                      src={userImg}
                      alt="userProfileImage"
                    ></img>
                  </a>
                  <div
                    id="userName"
                    onClick={() =>
                      navigate(`/mypage/${data.host.nickname}`, {
                        state: {
                          state: data.host.nickname,
                          memberId: data.host.id,
                        },
                      })
                    }
                  >
                    {data.host.nickname}
                  </div>
                </div>
                <div id="studyPost_date">{data.createdAt}</div>
                <div id="studyPost_commentNum">
                  <img
                    className="commentImg"
                    src={commentImg}
                    alt="commentLogo"
                  ></img>
                  <div id="numberOfComment">{data.comments.length}</div>
                </div>
              </div>
              <div id="studyPost_hashTag">
                <ul id="studyPost_hashtagList">
                  {Object.values(data.hashtags).map((tags) => (
                    <li className="hashTag" key={tags}>
                      {tags}
                    </li>
                  ))}
                </ul>
              </div>
              <section id="studyPost_info_wrap">
                <ul id="studyPost_info_grid">
                  <li className="studyPost_info_item">
                    <span id="studyPost_info_title">모집 현황</span>
                    <span id="studyPost_info_content">
                      {data.currentCount} / {data.headCount}
                    </span>
                  </li>
                  <li className="studyPost_info_item">
                    <span id="studyPost_info_title">예상 기간</span>
                    <span id="studyPost_info_content">
                      {data.estimatedDuration}
                    </span>
                  </li>
                  <li className="studyPost_info_item">
                    <span id="studyPost_info_title">진행 방식</span>
                    <span id="studyPost_info_content">{data.operationWay}</span>
                  </li>
                  <li className="studyPost_info_item">
                    <span id="studyPost_info_title">시작 예정</span>
                    <span id="studyPost_info_content">{data.expectedDate}</span>
                  </li>
                </ul>
              </section>
            </section>
            <div
              id="studyPost_content"
              dangerouslySetInnerHTML={{ __html: contentCode }}
            ></div>
            <div id="studyPost_applyBox">
              <button
                className="studyApplyButton"
                name="apply"
                onClick={modifyOrApply}
              >
                {data.isHost ? "수정하기" : "신청하기"}
              </button>
              {data.isHost ? (
                <button
                  className="studyApplyButton"
                  name="apply"
                  onClick={removePost}
                >
                  삭제하기
                </button>
              ) : (
                <></>
              )}
            </div>
            <div id="studyPost_commentWrap">
              <div id="studyPost_comment_title">댓글</div>
              <div id="studyPost_comment_container">
                <textarea
                  id="commentInput"
                  placeholder="댓글을 입력해주세요."
                  value={comments}
                  onChange={(event) => {
                    setComments(event.target.value);
                  }}
                ></textarea>
                <button id="sendButton" onClick={uploadComment}>
                  <img className="sendButtonimg" src={send} alt="comment"></img>
                </button>
              </div>
              <ul id="commentList">
                {data.comments.map((comment) => (
                  <PostCommentList
                    comment={comment}
                    key={comment.commentId}
                    getPost={getPost}
                    postId={postId}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Div = styled.div`
  height: auto;
  min-height: 70vh;
  overflow: auto;
`;

export default PostView;
