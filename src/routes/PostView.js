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

function PostView() {
  const postId = 1; //임시번호
  const [data, setData] = useState("");

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
  useEffect(() => {
    getPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                  <div id="userName">{data.host.nickname}</div>
                </div>
                <div id="studyPost_date">2023.03.01</div>
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
            <div id="studyPost_content">{data.content}</div>
            <div id="studyPost_applyBox">
              <button className="studyApplyButton" name="apply">
                {data.ishost ? "삭제하기" : "신청하기"}
              </button>
            </div>
            <div id="studyPost_commentWrap">
              <div id="studyPost_comment_title">댓글</div>
              <div id="studyPost_comment_container">
                <textarea
                  id="commentInput"
                  placeholder="댓글을 입력해주세요."
                ></textarea>
                <button id="sendButton">
                  <img className="sendButtonimg" src={send} alt="comment"></img>
                </button>
              </div>
              <ul id="commentList">
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
                      <div id="comment_userName">sEoYoungoes</div>
                    </section>
                    <div id="comment_dateAndTime">2023-03-02 오후 03:56</div>
                  </section>
                  <section id="comment_content">
                    <p id="comment_content_ex1">
                      스프링 기본지식 없어도 신청 가능한가요?
                    </p>
                  </section>
                </li>
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
                      <div id="comment_userName">zhzzang</div>
                    </section>
                    <div id="comment_dateAndTime">2023-03-02 오후 03:56</div>
                  </section>
                  <section id="comment_content">
                    <p id="comment_content_ex1">온라인은 안하나요? </p>
                  </section>
                </li>
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
