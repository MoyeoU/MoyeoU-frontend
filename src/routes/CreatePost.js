import styled from "styled-components";
import Header from "../components/Header";
import TextEditor from "../components/TextEditor";
import { useEffect, useState } from "react";
import React from "react";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router";
import axios from "axios";

function CreatePost() {
  const [selectedCategory, setSelectedCategory] = useState([]); //선택한 카테고리 리스트
  const [hashtags, setHashtags] = useState([]); //해시태그 리스트
  const [itemsValue, setItemsValue] = useState("");

  const [selectedHashtag, setSelectedHashtag] = useState([]); //카테고리에 맞는 해시태그 리스트
  const [title, setTitle] = useState("");
  const [headCount, setHeadCount] = useState("");
  const [operationWay, setOperationWay] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [content, setContent] = useState("");
  const [items, setItems] = useState([]); //신청폼

  const navigate = useNavigate();

  const onSubmit = () => {
    let totalHashTags = [];
    for (let i = 0; i < selectedHashtag.length; i++) {
      totalHashTags.push(selectedHashtag[i].name);
    }
    axios
      .post(
        "http://52.79.241.162:8080/posts",
        {
          title: title,
          headCount: Number(headCount),
          operationWay: operationWay,
          expectedDate: expectedDate,
          estimatedDuration: estimatedDuration,
          hashtags: totalHashTags,
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
        //document.location.href = "/writer";
        //document.location.href = "../article.articledetail.html";
        navigate(`/`);
        //원래는 작성된 게시글로 이동..
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goMain = () => {
    alert("게시글 작성이 취소되었습니다.");
    navigate(`/`);
  };
  const onCreateForm = () => {
    setItems((v) => [itemsValue, ...v]);
    setItemsValue("");
    //console.log(items);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryOptions = [
    { id: "팀프로젝트", name: "팀프로젝트" },
    { id: "어학", name: "어학" },
    { id: "프로그래밍", name: "프로그래밍" },
    { id: "취미/교양", name: "취미/교양" },
    { id: "고시/공무원", name: "고시/공무원" },
    { id: "기타", name: "기타" },
  ];
  const hashtagOptions = [
    {
      name: "팀프로젝트",
      options: [
        { id: "공과대학", name: "공과대학" },
        { id: "사회과학대학", name: "사회과학대학" },
        { id: "인문대학", name: "인문대학" },
        { id: "자연과학대학", name: "자연과학대학" },
        { id: "경상대학", name: "경상대학" },
        { id: "약학대학", name: "약학대학" },
        { id: "농업생명과학대학", name: "농업생명과학대학" },
        { id: "간호대학", name: "간호대학" },
        { id: "사범대학", name: "사범대학" },
        { id: "생활과학대학", name: "생활과학대학" },
        { id: "예술대학", name: "예술대학" },
        { id: "수의과대학", name: "수의과대학" },
      ],
    },
    {
      name: "어학",
      options: [
        { id: "토익", name: "토익" },
        { id: "토익 스피킹", name: "토익 스피킹" },
        { id: "토플", name: "토플" },
        { id: "일본어", name: "일본어" },
        { id: "중국어", name: "중국어" },
        { id: "한자", name: "한자" },
        { id: "영어회화", name: "영어회화" },
      ],
    },
    {
      name: "프로그래밍",
      options: [
        { id: "프론트엔드", name: "프론트엔드" },
        { id: "백엔드", name: "백엔드" },
        { id: "코딩테스트", name: "코딩테스트" },
        { id: "모바일 앱", name: "모바일 앱" },
        { id: "보안/네트워크", name: "보안/네트워크" },
        { id: "게임", name: "게임" },
        { id: "하드웨어", name: "하드웨어" },
        { id: "데이터/AI", name: "데이터/AI" },
      ],
    },
    {
      name: "자격증",
      options: [
        { id: "컴활", name: "컴활" },
        { id: "정보처리기사", name: "정보처리기사" },
        { id: "전기기사", name: "v" },
        { id: "건축기사", name: "건축기사" },
        { id: "조리기능사", name: "조리기능사" },
        { id: "한능검", name: "한능검" },
      ],
    },
    {
      name: "취미/교양",
      options: [
        { id: "독서", name: "독서" },
        { id: "음악", name: "음악" },
        { id: "그림", name: "그림" },
        { id: "운동", name: "운동" },
      ],
    },
    {
      name: "고시/공무원",
      options: [
        { id: "임용고시", name: "임용고시" },
        { id: "간호사", name: "간호사" },
        { id: "의사", name: "의사" },
        { id: "행정고시", name: "행정고시" },
        { id: "외무고시", name: "외무고시" },
        { id: "공무원", name: "공무원" },
      ],
    },
    {
      name: "기타",
      options: [{ id: "기타", name: "기타" }],
    },
  ];

  const changeCategory = (e) => {
    setSelectedCategory(e); //선택한 카테고리 값 set
    e.map((d) =>
      setHashtags(hashtagOptions.find((ctg) => ctg.name === d.id).options)
    ); //카테고리에 맞는 해시태그 set
  };

  const changeHashtag = (e) => {
    setSelectedHashtag(e); //선택한 해시태그 값 set
    console.log(selectedHashtag);
  };

  const removeItems = (e) => {
    //setItems에서 제거
    setItems(
      items.filter((element) => element !== e.target.previousSibling.innerText)
    );
    //console.log(e.target.previousSibling.innerText);
  };

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
              <Select
                style={{
                  //css 수정필요
                  width: 395,
                  height: 40,
                  fontSize: 15,
                }}
                options={categoryOptions}
                multiple={false}
                labelField="id"
                valueField="name"
                onChange={changeCategory}
                styles={{}}
                required
              ></Select>
            </Li>
            <Li>
              <P>해시태그</P>
              {/* <TextInput name="hashtag" id="hashtag" required /> */}
              <Select
                style={{
                  //css 수정필요
                  width: 395,
                  height: 40,
                  fontSize: 15,
                }}
                options={hashtags}
                labelField="id"
                valueField="name"
                multi
                onChange={changeHashtag}
                required
              ></Select>
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

// const Select = styled.select`
//   border: 2px solid lightgray;
//   font-size: 2vh;
//   border-radius: 5px;
//   width: 20vw;
//   height: 2vw;
//   box-sizing: content-box;
//   padding: 1px 2px;
//   text-indent: 0.5vw;
// `;

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
