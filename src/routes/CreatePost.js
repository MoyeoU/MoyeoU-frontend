import styled from "styled-components";
import Header from "../components/Header";
import tagJson from "../tag.json";
import TextEditor from "../components/TextEditor";
import { useEffect, useState } from "react";
import React from "react";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router";
import axios from "axios";

function CreatePost() {
  const [selectCategory, setselectCategory] = useState("팀프로젝트");
  const [selectTag, setselectTag] = useState("");
  const [itemsValue, setItemsValue] = useState("");

  const [title, setTitle] = useState("");
  const [headCount, setHeadCount] = useState("");
  const [operationWay, setOperationWay] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [isTagVisible, setIsTagVisible] = useState([]);
  const [content, setContent] = useState("");
  const [items, setItems] = useState([]); //신청폼

  const navigate = useNavigate();

  const onSubmit = () => {
    // if (!items) {
    //   alert("신청폼을 하나 이상 작성해 주세요.");
    //   return;
    // }
    axios
      .post(
        "http://52.79.241.162:8080/posts",
        {
          title: title,
          headCount: Number(headCount),
          operationWay: operationWay,
          expectedDate: expectedDate,
          estimatedDuration: estimatedDuration,
          hashtags: isTagVisible,
          content: content,
          items: items,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert("게시글 작성이 완료되었습니다.");
        const words = response.headers.location.split("/");
        const postId = Number(words[words.length - 1]);
        navigate(`/postView/${postId}`, {
          state: postId,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "요청 파라미터가 잘못되었습니다.") {
          if (Number(headCount) < 2) {
            alert("모집 인원을 2명 이상으로 설정해주세요.");
            return;
          }
          alert("항목을 모두 채워주세요");
        }
      });
  };

  const goMain = () => {
    alert("게시글 작성이 취소되었습니다.");
    navigate(`/`);
  };
  const onCreateForm = () => {
    setItems((v) => [itemsValue, ...v]);
    setItemsValue("");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeCategory = (event) => {
    setselectCategory(event.target.value);
    setselectTag("");
  };

  const changeTag = (event) => {
    setselectTag(event.target.value);
  };
  const addTagBtn = () => {
    if (selectTag === "") {
      alert("해시태그를 선택해주세요");
      return;
    }
    if (isTagVisible.includes(selectTag)) {
      alert("이미 선택한 해시태그입니다.");
      return;
    }
    setIsTagVisible((prevList) => [...prevList, selectTag]);
  };
  const removeTag = (event) => {
    const removeId = event.target.parentNode.id;
    setIsTagVisible(isTagVisible.filter((value, index) => value !== removeId));
    //event.target.parentNode.style.display = "inline-block";
  };

  const removeItems = (e) => {
    //setItems에서 제거
    setItems(
      items.filter((element) => element !== e.target.previousSibling.innerText)
    );
    //console.log(e.target.previousSibling.innerText);
  };
  //console.log(isTagVisible);
  return (
    <div>
      <Header />
      <CreateDiv>
        <Div>
          <Ul>
            <TitleInput
              placeholder="제목을 입력해주세요."
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Ul>
          <Ul>
            <Li>
              <P>모집 인원</P>
              <TextInput
                type="number"
                required
                onChange={(e) => {
                  setHeadCount(e.target.value);
                }}
              />
            </Li>
            <Li>
              <P>운영 방식</P>
              <TextInput
                required
                onChange={(e) => {
                  setOperationWay(e.target.value);
                }}
              />
            </Li>
          </Ul>
          <Ul>
            <Li>
              <P>시작 예정일</P>
              <TextInput
                type="date"
                required
                onChange={(e) => {
                  setExpectedDate(e.target.value);
                }}
              />
            </Li>
            <Li>
              <P>예상 기간</P>
              <TextInput
                required
                onChange={(e) => {
                  setEstimatedDuration(e.target.value);
                }}
              />
            </Li>
          </Ul>
          <Ul>
            <Li>
              <P>카테고리</P>
              <TagSelect name="tag" id="tag" onChange={changeCategory}>
                {tagJson.category.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </TagSelect>
            </Li>
            <Li>
              <P>해시태그</P>
              <TagSelect name="secondTag" id="secondTag" onChange={changeTag}>
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
            </Li>
          </Ul>
          <Ul>
            <Li></Li>
            <Li>
              {Object.values(isTagVisible).map((item) => (
                <TagEdit id={item}>
                  {item} &nbsp;<span onClick={removeTag}>X</span>
                </TagEdit>
              ))}
            </Li>
          </Ul>
        </Div>
        <Div>
          <Ul>
            <li>
              <P>스터디에 대해 설명해주세요.</P>
              <TextEditor required content={content} setContent={setContent} />
            </li>
          </Ul>
        </Div>
        <Div>
          <Ul>
            <li>
              <P>
                신청 양식을 만들어주세요.
                <ItemButton onClick={onCreateForm}>등록</ItemButton>
              </P>
              <TextInput
                value={itemsValue}
                onChange={(e) => {
                  setItemsValue(e.target.value);
                }}
              />
              {items.map((v) => (
                <ItemDiv>
                  <p key={v}>{v}</p>
                  <button onClick={removeItems}>삭제</button>
                </ItemDiv>
              ))}
            </li>
          </Ul>
        </Div>
        <Div>
          <Btn>
            <button type="button" onClick={goMain}>
              취소하기
            </button>
            <button onClick={onSubmit}>등록하기</button>
          </Btn>
        </Div>
      </CreateDiv>
    </div>
  );
}

const Li = styled.li`
  float: left;
  width: 50%;
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

const Ul = styled.ul`
  display: flex;
  max-width: 100%;
`;

const TitleInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 3px solid #0d47a1;
  width: 100%;
  height: 10vh;
  font-size: 3em;
  font-weight: bold;
  text-indent: 0.5vw;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: lightgray;
  }
`;

const TagSelect = styled.select`
  box-sizing: content-box;
  border: 2px solid lightgray;
  font-size: 2vh;
  border-radius: 5px;
  width: 20vw;
  height: 2vw;
  padding: 1px 2px;
  text-indent: 0.5vw;
  :focus {
    border: 2px solid black;
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

const ItemButton = styled.button`
  size: 0.2rem;
`;

const P = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
  button {
    //border:2px solid gray;
    //border-radius:15px;
    background-color:white;
    font-size:25px;
    color:gray;
    margin 0 1vw;
    :hover{
      cursor:pointer;
      color:black;
    }
  }
`;

const TextInput = styled.input`
  border: 2px solid lightgray;
  font-size: 2vh;
  border-radius: 5px;
  width: 20vw;
  height: 2vw;
  padding: 1px 2px;
  text-indent: 0.5vw;
`;

const CreateDiv = styled.div`
  padding: 5vh 10vw;
  height: auto;
  min-height: 70vh;
  overflow: auto;
  max-width: 100%;
`;

const Div = styled.div`
  max-width: 100%;
  height: auto;
  margin: 0 10vw;
`;

const Btn = styled.div`
  float: right;
  button {
    margin: 0.5em 0.5em;
    width: 8em;
    height: 3em;
    border: 1px solid #385493;
    background-color: #385493;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;

const ItemDiv = styled.div`
  p {
    display: inline;
  }
`;

export default CreatePost;
