import styled from "styled-components";
import Header from "../components/Header";
import member from "../img/member.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data.json";
import tagJson from "../tag.json";
import React from "react";

function Edit() {
  const [id, setId] = useState(localStorage.getItem("id"));
  const [intro, setIntro] = useState(data.user[0].intro);
  const [selectCategory, setselectCategory] = useState("팀프로젝트");
  const [selectTag, setselectTag] = useState("전체");
  const [isTagVisible, setIsTagVisible] = useState(data.user[0].tag);
  const navigate = useNavigate();

  const onSubmit = () => {
    if (id !== "" && intro !== "") {
      alert("수정이 완료되었습니다.");
      localStorage.setItem("id", id);
      navigate(`/mypage/${id}`, { state: id });
      //document.location.href = `/mypage/${id}`;
      //api 연동, state(이미지, 닉네임, 한줄이름, isTagVisible)들 전달하기
    } else if (id === "") {
      alert("닉네임을 작성해주세요");
    } else if (intro === "") {
      alert("소개글을 작성해주세요");
    }
  };

  const withdrawAccount = () => {
    const withdrawOrNot = window.confirm("탈퇴하시겠습니까?");
    if (withdrawOrNot) {
      alert("탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.");
      localStorage.removeItem("id");
      document.location.href = "/";
    }
  };

  const changeId = (event) => {
    setId(event.target.value);
  };
  const changeIntro = (event) => {
    setIntro(event.target.value);
  };

  const changeCategory = (event) => {
    setselectCategory(event.target.value);
    setselectTag("전체");
  };
  const changeTag = (event) => {
    setselectTag(event.target.value);
  };
  const addTagBtn = () => {
    if (selectTag === "전체") {
      setIsTagVisible((prevList) => [...prevList, selectCategory]);
    } else {
      setIsTagVisible((prevList) => [...prevList, selectTag]);
    }
  };
  const removeTag = (event) => {
    const removeId = event.target.parentNode.id;
    setIsTagVisible(isTagVisible.filter((value, index) => value !== removeId));

    //event.target.parentNode.style.display = "inline-block";
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, intro, selectCategory, selectTag, isTagVisible]);

  return (
    <>
      <Header />
      <Div>
        <h1>내 정보 수정하기</h1>

        <Content>
          <Img>
            <img src={member} alt="member"></img>
          </Img>
          <Detail>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="id">닉네임</label>
                  </td>
                  <td>
                    <Name defaultValue={id} name="id" onChange={changeId} />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="intro">소개글</label>
                  </td>
                  <td>
                    <Intro
                      defaultValue={intro}
                      name="intro"
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
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </TagSelect>

                    <TagSelect
                      name="secondTag"
                      id="secondTag"
                      onChange={changeTag}
                    >
                      {selectCategory === "어학" ? (
                        tagJson.tag2.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))
                      ) : selectCategory === "프로그래밍" ? (
                        tagJson.tag3.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))
                      ) : selectCategory === "자격증" ? (
                        tagJson.tag4.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))
                      ) : selectCategory === "취미/교양" ? (
                        tagJson.tag5.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))
                      ) : selectCategory === "고시/공무원" ? (
                        tagJson.tag6.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))
                      ) : selectCategory === "기타" ? (
                        <option>기타</option>
                      ) : (
                        tagJson.tag1.map((item) => (
                          <option value={item} key={item}>
                            {item}
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
                    {Object.values(isTagVisible).map((item) => (
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
              <button type="submit" onClick={onSubmit}>
                완료
              </button>
            </Btn>
          </Detail>
        </Content>
      </Div>
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

const Content = styled.div`
  justify-content: center;
  display: flex;
  margin: 5vh 5vw;
`;
const Img = styled.div`
  padding: 5vh 5vw;
  img {
    width: 15vh;
    height: 15vh;
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
