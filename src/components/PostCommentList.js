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

function PostCommentList({ comment, getPost, postId }) {
  const [modifyTrueOrNot, setModifyTrueOrNot] = useState(false);
  const [modifyContent, setModifyContent] = useState(comment.content);

  const changeToModify = () => {
    //오떻게
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
  console.log(modifyContent);
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
  console.log(modifyContent);
  return (
    <>
      <li className="comment_item">
        <section id="comment_item_header">
          <section id="comment_userInfo">
            <a href="./articledetail.html">
              <img
                className="commentLogo"
                src={commentLogo}
                alt="commentLogo"
              ></img>
            </a>
            <div id="comment_userName">{comment.nickname}</div>
          </section>
          <div id="comment_dateAndTime">
            {comment.time.substring(0, 10)} {comment.time.substring(11, 16)}
          </div>
        </section>
        <section id="comment_content">
          {modifyTrueOrNot ? (
            <input
              defaultValue={modifyContent}
              onChange={(e) => setModifyContent(e.target.value)}
            ></input>
          ) : (
            <span id="comment_content_ex1">{comment.content}</span>
          )}
          {comment.isAuthor ? (
            modifyTrueOrNot ? (
              <>
                <DeleteCommentButton
                  onClick={() => {
                    setModifyTrueOrNot(false);
                    setModifyContent(comment.content);
                  }}
                >
                  취소
                </DeleteCommentButton>
                <DeleteCommentButton onClick={modifyComment}>
                  완료
                </DeleteCommentButton>
              </>
            ) : (
              <>
                <DeleteCommentButton
                  onClick={() => removeComment(comment.commentId)}
                >
                  삭제
                </DeleteCommentButton>
                <DeleteCommentButton onClick={changeToModify}>
                  수정
                </DeleteCommentButton>
              </>
            )
          ) : (
            <></>
          )}
        </section>
      </li>
    </>
  );
}
const DeleteCommentButton = styled.button`
  float: right;
  margin: 0 0.5vw;
`;

export default PostCommentList;
