import styled from "styled-components";
import Header from "../components/Header";
import "../article/articledetail.css";
import leftArrow from "../img/leftArrow.jpg";
import userImg from "../img/userImg.jpg";
import commentImg from "../img/commentImg.jpg";
import commentLogo from "../img/commentLogo.jpg";
import send from "../img/send.jpg";

function PostView() {
  return (
    <>
      <Header />
      <div id="root">
        <div id="articlewrapper">
          <section id="studyPost_header">
            <div id="studyPost_headerIn">
              <a href="/">
                <img className="leftArrow" src={leftArrow} alt="back"></img>
              </a>
              <div id="recruitTag">모집 중</div>
            </div>
            <div id="studyPost_title">스프링 스터디원 구합니다</div>
            <div id="studyPost_user_date_comment">
              <div id="studyPost_user">
                <a href="./articledetail.html">
                  <img
                    className="userImg"
                    src={userImg}
                    alt="userProfileImage"
                  ></img>
                </a>
                <div id="userName">luvNY</div>
              </div>
              <div id="studyPost_date">2023.03.01</div>
              <div id="studyPost_commentNum">
                <img
                  className="commentImg"
                  src={commentImg}
                  alt="commentLogo"
                ></img>
                <div id="numberOfComment">2</div>
              </div>
            </div>
            <div id="studyPost_hashTag">
              <ul id="studyPost_hashtagList">
                <li className="hashTag">Spring</li>
                <li className="hashTag">MySQL</li>
              </ul>
            </div>
            <section id="studyPost_info_wrap">
              <ul id="studyPost_info_grid">
                <li className="studyPost_info_item">
                  <span id="studyPost_info_title">모집 현황</span>
                  <span id="studyPost_info_content">2 / 4</span>
                </li>
                <li className="studyPost_info_item">
                  <span id="studyPost_info_title">예상 기간</span>
                  <span id="studyPost_info_content">3개월</span>
                </li>
                <li className="studyPost_info_item">
                  <span id="studyPost_info_title">진행 방식</span>
                  <span id="studyPost_info_content">대면</span>
                </li>
                <li className="studyPost_info_item">
                  <span id="studyPost_info_title">시작 예정</span>
                  <span id="studyPost_info_content">2023.03.05</span>
                </li>
              </ul>
            </section>
          </section>
          <div id="studyPost_content">
            <p>안녕하세요! 스프링 함께 공부하실 분 모집합니다.</p>
            <p>
              열심히 참여할 수 있고, 👉책임감 있는 분이 오셨으면 좋겠습니다.
              😉신청 폼 작성 부탁드립니다.
            </p>
            <p>
              <br />
            </p>
            <p>
              매주 토요일 저녁에 시간 맞춰서 스터디룸에서 스터디 진행할
              예정입니다!
            </p>
            <p>
              <br />
            </p>
          </div>
          <div id="studyPost_applyBox">
            <button className="studyApplyButton" name="apply">
              신청 하기
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
    </>
  );
}

const Div = styled.div`
  height: auto;
  min-height: 70vh;
  overflow: auto;
`;

export default PostView;
