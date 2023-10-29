import styled from "styled-components";
import Header from "../components/Header";
import TextEditor from "../components/TextEditor";
import { useState, useEffect } from "react";
import { IoIosAddCircle, IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import tagJson from "../tag.json";
import axios from "axios";
import Swal from "sweetalert2";

function EditPost() {
  const [selectCategory, setselectCategory] = useState("팀프로젝트");
  const [selectTag, setselectTag] = useState("공과대학");
  const [itemsValue, setItemsValue] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const postId = state;
  const [data, setData] = useState("");

  const [title, setTitle] = useState("");
  const [headCount, setHeadCount] = useState("");
  const [operationWay, setOperationWay] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [isTagVisible, setIsTagVisible] = useState([]);
  const [content, setContent] = useState("");
  const [items, setItems] = useState(""); //신청폼

  const getPost = () => {
    axios
      .get(`http://52.79.241.162:8080/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTitle(response.data.title);
        setHeadCount(response.data.headCount);
        setOperationWay(response.data.operationWay);
        setExpectedDate(response.data.expectedDate);
        setEstimatedDuration(response.data.estimatedDuration);
        setIsTagVisible(response.data.hashtags);
        setContent(response.data.content);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://52.79.241.162:8080/posts/${postId}/form`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        let responseItem = [];
        for (let i = 0; i < response.data.length; i++) {
          responseItem = [...responseItem, response.data[i].itemName];
        }
        setItems(responseItem);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    axios
      .put(
        `http://52.79.241.162:8080/posts/${postId}`,
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
        Swal.fire({
          icon: "success",
          title: "게시글 수정이 완료되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#385493",
        }).then(() => {
          navigate(`/postView/${postId}`, { state: postId });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goMain = () => {
    alert("게시글 수정이 취소되었습니다.");
    navigate(`/postView/${postId}`, { state: postId });
  };
  const onCreateForm = () => {
    if (items.includes(itemsValue)) {
      Swal.fire({
        icon: "warning",
        text: "이미 존재하는 신청 양식입니다.",
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    }
    if (itemsValue !== "") {
      setItems((v) => [...v, itemsValue]);
      setItemsValue("");
    }
  };

  const changeCategory = (event) => {
    let categoryValue = event.target.value;
    setselectCategory(categoryValue);
    if (categoryValue === "팀프로젝트") {
      setselectTag(tagJson.tag1[0]);
    } else if (categoryValue === "어학") {
      setselectTag(tagJson.tag2[0]);
    } else if (categoryValue === "프로그래밍") {
      setselectTag(tagJson.tag3[0]);
    } else if (categoryValue === "자격증") {
      setselectTag(tagJson.tag4[0]);
    } else if (categoryValue === "취미/교양") {
      setselectTag(tagJson.tag5[0]);
    } else if (categoryValue === "고시/공무원") {
      setselectTag(tagJson.tag6[0]);
    } else {
      setselectTag("기타");
    }
  };

  const removeItems = (e) => {
    //setItems에서 제거
    const filtered = items.filter(
      (element) => element !== e.target.previousSibling.innerText
    );
    setItems(filtered);
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
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      {data === "" ? (
        "로딩중"
      ) : (
        <>
          <CreateDiv>
            <Div>
              <TitleUl>
                <TitleInput
                  placeholder="제목을 입력해주세요."
                  required
                  defaultValue={data.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </TitleUl>
              <Ul>
                <Li>
                  <P>모집 인원</P>
                  <TextInput
                    type="number"
                    required
                    defaultValue={data.headCount}
                    onChange={(e) => {
                      setHeadCount(e.target.value);
                    }}
                  />
                </Li>
                <Li>
                  <P>운영 방식</P>
                  <TextInput
                    required
                    defaultValue={data.operationWay}
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
                    defaultValue={data.expectedDate}
                    onChange={(e) => {
                      setExpectedDate(e.target.value);
                    }}
                  />
                </Li>
                <Li>
                  <P>예상 기간</P>
                  <TextInput
                    required
                    defaultValue={data.estimatedDuration}
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
                </Li>
              </Ul>
              <Ul>
                <Li></Li>
                <Li>
                  {data.hashtags === undefined
                    ? ""
                    : Object.values(isTagVisible).map((item) => (
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
                  <TextEditor
                    required
                    content={content}
                    setContent={setContent}
                  />
                </li>
              </Ul>
            </Div>
            <Div>
              <Ul>
                <li>
                  <FormMaker>
                    신청 양식을 만들어주세요.
                    <IoIosAddCircle
                      size="30"
                      className="addIcon"
                      onClick={onCreateForm}
                    />
                  </FormMaker>
                  <TextInput
                    value={itemsValue}
                    onChange={(e) => {
                      setItemsValue(e.target.value);
                    }}
                  />
                  {items === ""
                    ? ""
                    : items.map((v) => (
                        <ItemDiv>
                          <p key={v}>{v}</p>
                          <span onClick={removeItems}>
                            <IoIosCloseCircleOutline
                              size="25"
                              className="deleteIcon"
                            />
                          </span>
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
        </>
      )}
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

const TitleUl = styled.ul`
  display: flex;
  max-width: 100%;
  margin-bottom: 6vh;
`;

const Ul = styled.ul`
  display: flex;
  max-width: 100%;
  margin-bottom: 3vh;
`;

const TitleInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 3px solid #0d47a1;
  width: 100%;
  height: 10vh;
  font-size: 2em;
  font-weight: bold;
  text-indent: 0.5vw;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: lightgray;
  }
`;

const ItemButton = styled.button`
  size: 0.2rem;
`;

const P = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
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

const FormMaker = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
  display: flex;
  align-items: center;
  .addIcon {
    margin-left: 2vw;
    color: lightgray;
    :hover {
      cursor: pointer;
    }
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
margin-top: 1.5vh;
padding-left: 1.5vw;
height: 5em;
background-color: #ecf1f3;
border-radius: 5px;
font-weight: bold;
display: flex;
position: relative;
align-items: center;
p {
  display: inline;
  font-size: 1.85vh;
  margin: auto;
  color: gray;
}
.deleteIcon {
  float: right;
  margin: 0 1vh 0 0.2vh;
  color: gray;
  pointer-events: none;
}
}
`;

export default EditPost;
