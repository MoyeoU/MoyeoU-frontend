import styled from "styled-components";
import Header from "../components/Header";
import TextEditor from "../components/TextEditor";
import ApplyForm from "../components/ApplyForm";
import { useEffect, useState } from "react";

function CreatePost() {
  const onSubmit = (event) => {
    event.preventDefault();
    onClickWrite();
  };
  const onClickWrite = () => {
    alert("게시글 작성이 완료되었습니다.");
    document.location.href = "/postView/post1";
    //document.location.href = "../article.articledetail.html";
  };
  const goMain = () => {
    alert("게시글 작성이 취소되었습니다.");
    document.location.href = "/";
  };
  const [create, setCreate] = useState([1]);
  const onCreate = () => {
    setCreate((create) => ["2", ...create]);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [create]);

  const selectList = [
    "전체",
    "팀프로젝트",
    "어학",
    "프로그래밍",
    "자격증",
    "취미/교양",
    "고시/공무원",
    "기타",
  ];

  return (
    <>
      <Header />
      <CreateDiv>
        <form onSubmit={onSubmit}>
          <Div>
            <Ul>
              <TitleInput placeholder="제목을 입력해주세요." required />
            </Ul>
            <Ul>
              <Li>
                <P>모집 인원</P>
                <TextInput name="headCount" id="headCount" required />
              </Li>
              <Li>
                <P>운영 방식</P>
                <TextInput name="method" id="method" required />
              </Li>
            </Ul>
            <Ul>
              <Li>
                <P>시작 예정일</P>
                <TextInput
                  type="date"
                  name="startDate"
                  id="startDate"
                  required
                />
              </Li>
              <Li>
                <P>예상 기간</P>
                <TextInput name="duringTime" id="duringTime" required />
              </Li>
            </Ul>
            <Ul>
              <Li>
                <P>카테고리</P>
                <Select name="category" id="category" required>
                  {selectList.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Li>
              <Li>
                <P>해시태그</P>
                <TextInput name="hashtag" id="hashtag" required />
              </Li>
            </Ul>
          </Div>
          <Div>
            <Ul>
              <li>
                <P>스터디에 대해 설명해주세요.</P>
                <TextEditor required />
              </li>
            </Ul>
          </Div>
          <Div>
            <Ul>
              <li>
                <P>
                  신청 양식을 만들어주세요.
                  <button type="button" onClick={onCreate}>
                    +
                  </button>
                  <ApplyForm />
                </P>
                {/* <TextInput name="applyForm" id="applyForm" /> */}
                {create.map((number) => {
                  console.log(number);
                  <ApplyForm />;
                })}
              </li>
            </Ul>
          </Div>
          <Div>
            <Btn>
              <button type="button" onClick={goMain}>
                취소하기
              </button>
              <button type="submit">등록하기</button>
            </Btn>
          </Div>
        </form>
      </CreateDiv>
    </>
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
  border-bottom: 3px solid gray;
  width: 100%;
  height: 10vh;
  font-size: 2em;
  font-weight: bold;
`;

const Select = styled.select`
  border: 1px solid gray;
  font-size: 2.5vh;
  width: 20vw;
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
  border: 1px solid gray;
  font-size: 2.5vh;
  width: 20vw;
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

export default CreatePost;
