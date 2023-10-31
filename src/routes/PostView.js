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
import Swal from "sweetalert2";
import loading from "../img/loading.png";

function PostView(props) {
  const { state } = useLocation();
  const postId = state; //임시번호
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [comments, setComments] = useState("");
  const [image, setImage] = useState("");
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

        if (response.data.isHost) {
          axios
            .get(`http://52.79.241.162:8080/members/me`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            })
            .then((responsee) => {
              console.log(responsee.data);
              setImage(responsee.data.imagePath);
              console.log(image);
            })
            .catch((errorr) => {
              console.log(errorr);
            });
        } else {
          axios
            .get(`http://52.79.241.162:8080/members/${response.data.host.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            })
            .then((responsee) => {
              console.log(responsee.data);
              setImage(responsee.data.imagePath);
            })
            .catch((errorr) => {
              console.log(errorr);
            });
        }
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modifyOrApply = () => {
    if (data.isHost) {
      //modify 화면 이동
      if (data.status !== "PROGRESS") {
        Swal.fire({
          title: "스터디원 모집이 종료되어 수정할 수 없습니다.",
          icon: "info",
          confirmButtonText: "확인",
          confirmButtonColor: "#385493",
        }).then(() => {
          navigate(`/postView/${postId}`, { state: postId });
        });
      } else {
        navigate(`/editPost`, { state: postId });
      }
    } else {
      if (!data.attended) {
        if (data.status !== "PROGRESS") {
          Swal.fire({
            icon: "info",
            title: "모집이 완료되었습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#385493",
          });
        } else {
          navigate(`/applyForm`, {
            state: postId,
          });
        }
      } else {
        if (data.status !== "PROGRESS") {
          Swal.fire({
            title: "모집이 완료되어 취소할 수 없습니다.",
            icon: "info",
            confirmButtonText: "확인",
            confirmButtonColor: "#385493",
          });
        } else {
          axios
            .post(`http://52.79.241.162:8080/posts/${postId}/cancel`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            })
            .then((response) => {
              console.log(response);
              Swal.fire({
                title: "스터디 신청이 취소되었습니다.",
                icon: "info",
                confirmButtonText: "확인",
                confirmButtonColor: "#385493",
              }).then(() => {
                getPost();
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };

  const completeProgress = () => {
    //모집 완료 버튼 누르는
    axios
      .post(`http://52.79.241.162:8080/posts/${postId}/complete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response);

        Swal.fire({
          title: "스터디원 모집이 완료되었습니다.",
          icon: "info",
          confirmButtonText: "확인",
          confirmButtonColor: "#385493",
        }).then(() => {
          getPost();
        });

        getPost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completeStudy = () => {
    //스터디완료 버튼 누르는
    axios
      .post(`http://52.79.241.162:8080/posts/${postId}/end`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "스터디원 모집이 완료되었습니다.",
          icon: "info",
          confirmButtonText: "확인",
          confirmButtonColor: "#385493",
        }).then(() => {
          getPost();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removePost = () => {
    Swal.fire({
      title: "게시물을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      confirmButtonColor: "#385493",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://52.79.241.162:8080/posts/${postId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            Swal.fire({
              title: "삭제가 완료되었습니다.",
              icon: "success",
              confirmButtonText: "확인",
              confirmButtonColor: "#385493",
            }).then(() => {
              navigate(`/`);
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("게시물 삭제 중 오류가 발생했습니다.", "error");
          });
      }
    });
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

          Swal.fire({
            icon: "success",
            title: "댓글 작성이 완료되었습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#385493",
          }).then(() => {
            setComments("");
            getPost();
          });
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
      <Header
        isAlertCountChange={props.isAlertCountChange}
        setIsAlertCountChange={props.setIsAlertCountChange}
        alertCount={props.alertCount}
        setAlertCount={props.setAlertCount}
      />
      {data === "" ? (
        <div>
          <LoadingImg>
            <img src={loading} alt="loading.."></img>
          </LoadingImg>
        </div>
      ) : (
        <div id="root">
          <div id="articlewrapper">
            <section id="studyPost_header">
              <div id="studyPost_headerIn" onClick={() => navigate("/")}>
                <img className="leftArrow" src={leftArrow} alt="back"></img>

                <div id="recruitTag">
                  {data.status === "PROGRESS" ? "모집중" : "모집완료"}
                </div>
              </div>
              <div id="studyPost_title">{data.title}</div>
              <div id="studyPost_user_date_comment">
                <div
                  id="studyPost_user"
                  onClick={() =>
                    navigate(`/mypage/${data.host.nickname}`, {
                      state: {
                        state: data.host.nickname,
                        memberId: data.host.id,
                      },
                    })
                  }
                >
                  <img
                    className="userImg"
                    src={image ? image : commentLogo}
                    alt="userProfileImage"
                  ></img>

                  <div id="userName">{data.host.nickname}</div>
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
              <button className="studyApplyButton" onClick={modifyOrApply}>
                {data.isHost
                  ? "수정하기"
                  : data.attended
                  ? "취소하기"
                  : "신청하기"}
              </button>
              {data.isHost ? (
                <>
                  <button className="studyApplyButton" onClick={removePost}>
                    삭제하기
                  </button>
                  {data.status === "PROGRESS" ? (
                    <button
                      className="studyApplyButton"
                      onClick={completeProgress}
                    >
                      모집완료하기
                    </button>
                  ) : data.status === "COMPLETED" ? (
                    <button
                      className="studyApplyButton"
                      onClick={completeStudy}
                    >
                      스터디 종료하기
                    </button>
                  ) : (
                    <></>
                  )}
                </>
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

const LoadingImg = styled.div`
  text-align: center;
  padding: 5vh 5vw;
  img {
    width: 10vw;
  }
`;

export default PostView;
