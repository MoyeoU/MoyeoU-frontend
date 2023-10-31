import styled from "styled-components";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tagJson from "../tag.json";
import React from "react";
import commentLogo from "../img/commentLogo.jpg";
import { useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import loading from "../img/loading.png";

function Edit(props) {
  const [data, setData] = useState("");
  const [id, setId] = useState();
  const [intro, setIntro] = useState("");
  const [isTagVisible, setIsTagVisible] = useState([]);

  const [imagePath, setImagePath] = useState("");

  const [selectCategory, setselectCategory] = useState("어학");
  const [selectTag, setselectTag] = useState("토익");
  const [isImgVisible, setIsImgVisible] = useState("");
  const navigate = useNavigate();
  const imgRef = useRef();
  //const formData = new FormData();

  const getUser = () => {
    axios
      .get(
        `http://52.79.241.162:8080/members/me?accessToken=${localStorage.getItem(
          "accessToken"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setId(response.data.nickname);
        setIntro(response.data.introduction);
        setIsTagVisible(response.data.hashtags);
        if (response.data.imagePath !== null)
          setIsImgVisible(response.data.imagePath);
        setImagePath(response.data.imagePath);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const putUser = () => {
    axios
      .put(
        `http://52.79.241.162:8080/members/me`,
        {
          nickname: id,
          imagePath: imagePath,
          introduction: intro,
          hashtags: isTagVisible,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      /////// 여기까지!!!!
      .then((response) => {
        console.log(response.data);

        Swal.fire({
          icon: "success",
          title: "수정이 완료되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#385493",
        }).then(() => {
          localStorage.setItem("id", id);
          navigate(`/mypage/${id}`, { state: { state: id, memberId: 0 } });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveImgFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file === undefined) return;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setIsImgVisible(reader.result || "");
      //보이는거 따로 저장
    };
    e.target.value = "";
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(`http://52.79.241.162:8080/images`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setImagePath(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const removeImg = () => {
    setIsImgVisible("");
    setImagePath(null);
  };
  const onSubmit = () => {
    if (id !== "") {
      putUser();
    } else {
      Swal.fire({
        icon: "warning",
        text: "닉네임을 작성해주세요.",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };
  const withdrawAccount = () => {
    Swal.fire({
      title: "탈퇴하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      confirmButtonColor: "#385493",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://52.79.241.162:8080/members/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              icon: "success",
              title: "탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.",
              confirmButtonText: "확인",
              confirmButtonColor: "#385493",
            }).then(() => {
              localStorage.clear();
              navigate(`/`);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const changeId = (event) => {
    setId(event.target.value);
  };
  const changeIntro = (event) => {
    setIntro(event.target.value);
  };

  const changeCategory = (event) => {
    let categoryValue = event.target.value;
    setselectCategory(categoryValue);
    if (categoryValue === "어학") {
      setselectTag(tagJson.tag1[0][0]);
    } else if (categoryValue === "프로그래밍") {
      setselectTag(tagJson.tag2[0][0]);
    } else if (categoryValue === "팀프로젝트") {
      setselectTag(tagJson.tag3[0][0]);
    } else if (categoryValue === "자격증") {
      setselectTag(tagJson.tag4[0][0]);
    } else if (categoryValue === "취미/교양") {
      setselectTag(tagJson.tag5[0][0]);
    } else if (categoryValue === "고시/공무원") {
      setselectTag(tagJson.tag6[0][0]);
    } else {
      setselectTag("기타");
    }
  };
  const changeTag = (event) => {
    setselectTag(event.target.value);
  };
  const addTagBtn = () => {
    if (selectTag === "") {
      Swal.fire({
        icon: "warning",
        text: "해시태그를 선택해주세요.",
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    }
    if (isTagVisible.includes(selectTag)) {
      Swal.fire({
        icon: "warning",
        text: "이미 선택한 해시태그입니다.",
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    }
    setIsTagVisible((prevList) => [...prevList, selectTag]);
  };
  const removeTag = (event) => {
    const removeId = event.target.parentNode.id;
    setIsTagVisible(isTagVisible.filter((value, index) => value !== removeId));
    //event.target.parentNode.style.display = "inline-block";
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        isAlertCountChange={props.isAlertCountChange}
        setIsAlertCountChange={props.setIsAlertCountChange}
        alertCount={props.alertCount}
        setAlertCount={props.setAlertCount}
      />
      {data === "" ? (
        <Div>
          <LoadingImg>
            <img src={loading} alt="loading.."></img>
          </LoadingImg>
        </Div>
      ) : (
        <Div>
          <h1>내 정보 수정하기</h1>

          <Content>
            <Img>
              <img
                src={isImgVisible ? isImgVisible : commentLogo}
                alt="member"
              ></img>
              <div>
                <label className="profileImg-label" htmlFor="profileImg">
                  이미지 업로드
                </label>
                <input
                  className="profileImg-input"
                  type="file"
                  accept="image/*"
                  id="profileImg"
                  onChange={saveImgFile}
                  ref={imgRef}
                />
              </div>
              <button onClick={removeImg}>삭제</button>
            </Img>
            <Detail>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="nickname">닉네임</label>
                    </td>
                    <td>
                      <Name
                        defaultValue={data.nickname}
                        id="nickname"
                        onChange={changeId}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="intro">소개글</label>
                    </td>
                    <td>
                      <Intro
                        defaultValue={data.introduction}
                        id="intro"
                        onChange={changeIntro}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="tag">관심태그</label>
                    </td>
                    <td>
                      <TagSelect name="tag" id="tag" onChange={changeCategory}>
                        {tagJson.category.map((item) => (
                          <option value={item[0]} key={item[1]}>
                            {item[0]}
                          </option>
                        ))}
                      </TagSelect>

                      <TagSelect
                        name="secondTag"
                        id="secondTag"
                        onChange={changeTag}
                      >
                        {selectCategory === "프로그래밍" ? (
                          tagJson.tag2.map((item) => (
                            <option value={item[0]} key={item[1]}>
                              {item[0]}
                            </option>
                          ))
                        ) : selectCategory === "팀프로젝트" ? (
                          tagJson.tag3.map((item) => (
                            <option value={item[0]} key={item[1]}>
                              {item[0]}
                            </option>
                          ))
                        ) : selectCategory === "자격증" ? (
                          tagJson.tag4.map((item) => (
                            <option value={item[0]} key={item[1]}>
                              {item[0]}
                            </option>
                          ))
                        ) : selectCategory === "취미/교양" ? (
                          tagJson.tag5.map((item) => (
                            <option value={item[0]} key={item[1]}>
                              {item[0]}
                            </option>
                          ))
                        ) : selectCategory === "고시/공무원" ? (
                          tagJson.tag6.map((item) => (
                            <option value={item[0]} key={item[1]}>
                              {item[0]}
                            </option>
                          ))
                        ) : selectCategory === "기타" ? (
                          <option>기타</option>
                        ) : (
                          tagJson.tag1.map((item) => (
                            <option value={item[0]} key={item[1]}>
                              {item[0]}
                            </option>
                          ))
                        )}
                      </TagSelect>
                      <button className="addBtn" onClick={addTagBtn}>
                        추가
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      {data.hashtags === undefined
                        ? ""
                        : Object.values(isTagVisible).map((item) => (
                            <TagEdit id={item}>
                              {item} &nbsp;<span onClick={removeTag}>X</span>
                            </TagEdit>
                          ))}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Btn>
                <button type="button" onClick={withdrawAccount}>
                  탈퇴하기
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/mypage/${id}`, {
                      state: { state: id, memberId: 0 },
                    });
                  }}
                >
                  취소
                </button>
                <button type="submit" onClick={onSubmit}>
                  완료
                </button>
              </Btn>
            </Detail>
          </Content>
        </Div>
      )}
    </>
  );
}

const Div = styled.div`
  width: 80%;
  max-width: 80%;
  height: auto;
  min-height: 70vh;
  overflow: auto;
  margin: 0 auto;
  //float:left;
  h1 {
    //margin: 0 0 0 10vw;
    color: #385493;
    font-weight: bold;
    text-align: center;
    font-size: 2.5rem;
  }
`;

const LoadingImg = styled.div`
  text-align: center;
  padding: 5vh 5vw;
  img {
    width: 10vw;
  }
`;

const Content = styled.div`
  justify-content: center;
  display: flex;
  margin: 5vh 5vw;
`;
const Img = styled.div`
  padding: 5vh 5vw;
  text-align: center;
  img {
    width: 15vh;
    height: 15vh;
  }
  .profileImg-label {
    margin: 2vh 0;
    font-weight: bold;
    font-size: 1.5rem;
    color: #385493;
    display: inline-block;
    cursor: pointer;
  }
  .profileImg-input {
    display: none;
  }
`;
const Detail = styled.div`
  //margin: auto;
  label {
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1vw;
  }
  table,
  td,
  tr {
    padding: 1vh 1vw;
  }
  table {
    width: 45vw;
  }
  .addBtn {
    margin: 0 0.5vw;
    width: 3vw;
    height: 4.5vh;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    border-radius: 5px;
  }
`;

const TagEdit = styled.button`
  margin: 0.3vh 0.3vw;
  border-radius: 5px;
  //pointer-events: none;
  background-color: #dcdcdc;
  display: inline;
  padding: 0.5vh 0.5vw;
  font-size: 1.5rem;
  :hover {
    cursor: default;
  }
  span {
    color: gray;
    :hover {
      cursor: pointer;
      color: black;
    }
  }
`;

const Name = styled.input`
  border: 2px solid lightgray;
  font-size: 2vh;
  border-radius: 5px;
  width: 20vw;
  height: 2vw;
  padding: 1px 2px;
  text-indent: 0.5vw;
  // margin-top: 2vh;
  // margin-bottom: 2vh;
  :focus {
    border: 2px solid black;
  }
  ::placeholder {
    color: gray;
  }
`;

const Intro = styled.input`
  border: 2px solid lightgray;
  font-size: 2vh;
  border-radius: 5px;
  width: 20vw;
  min-height: 15vh;
  padding: 1px 2px;
  text-indent: 0.5vw;
  // margin-top: 2vh;
  // margin-bottom: 2vh;
  :focus {
    border: 2px solid black;
  }
  ::placeholder {
    color: gray;
  }
  // margin: 1vh 1.5vw;
  // margin-bottom: 2vh;
  // padding: 2%;
`;

const TagSelect = styled.select`
  box-sizing: content-box;
  border: 2px solid lightgray;
  font-size: 2vh;
  border-radius: 5px;
  width: 10vw;
  height: 2vw;
  padding: 1px 2px;
  text-indent: 0.5vw;
  margin: 0 0.5vh;
  // margin-top: 2vh;
  // margin-bottom: 2vh;
  :focus {
    border: 2px solid black;
  }
  ::placeholder {
    color: gray;
  }
`;

const Btn = styled.div`
  float: right;
  margin: 0 10vw 0 0;
  button {
    margin: 0.5em 0.5em;
    width: 8em;
    height: 3em;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    border-radius: 5px;
  }
  margin: 5vh 0;
`;

export default Edit;
