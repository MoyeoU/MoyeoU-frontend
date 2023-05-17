import styled from "styled-components";
import Header from "./Header";
import TextEditor from "./TextEditor";

function CreatePost() {
  const onSubmit = () => {
    //.
  };
  return (
    <>
      <Header />
      <CreateDiv>
        <form onSubmit={onSubmit}>
          <Div>
            <Ul>
              <TitleInput placeholder="제목을 입력해주세요." />
            </Ul>
            <Ul>
              <Li>
                <P>모집 인원</P>
                <TextInput name="headCount" id="headCount" />
              </Li>
              <Li>
                <P>운영 방식</P>
                <TextInput name="method" id="method" />
              </Li>
            </Ul>
            <Ul>
              <Li>
                <P>시작 예정일</P>
                <TextInput type="date" name="startDate" id="startDate" />
              </Li>
              <Li>
                <P>예상 기간</P>
                <TextInput name="duringTime" id="duringTime" />
              </Li>
            </Ul>
            <Ul>
              <Li>
                <P>카테고리</P>
                <TextInput name="category" id="category" />
              </Li>
              <Li>
                <P>해시태그</P>
                <TextInput name="hashtag" id="hashtag" />
              </Li>
            </Ul>
          </Div>
          <Div>
            <Ul>
              <li>
                <P>스터디에 대해 설명해주세요.</P>
                <TextEditor />
              </li>
            </Ul>
          </Div>
          <Div>
            <Ul>
              <li>
                <P>신청 양식을 만들어주세요.</P>
                <TextInput name="applyForm" id="applyForm" />
              </li>
            </Ul>
          </Div>
          <Div>
            <Btn>
              <button type="button">취소하기</button>
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

const P = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
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
