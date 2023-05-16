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
      <Div>
        <form onSubmit={onSubmit}>
          <div>
            <Ul>
              <input placeholder="제목을 입력해주세요." />
            </Ul>
            <Ul>
              <Li>
                <label htmlFor="headCount">모집 인원</label>
                <input name="headCount" id="headCount" />
              </Li>
              <Li>
                <label htmlFor="method">운영 방식</label>
                <input name="method" id="method" />
              </Li>
            </Ul>
            <Ul>
              <Li>
                <label htmlFor="startDate">시작 예정일</label>
                <input name="startDate" id="startDate" />
              </Li>
              <Li>
                <label htmlFor="duringTime">예상 기간</label>
                <input name="duringTime" id="duringTime" />
              </Li>
            </Ul>
            <Ul>
              <Li>
                <label htmlFor="category">카테고리</label>
                <input name="category" id="category" />
              </Li>
            </Ul>
            <Ul>
              <Li>
                <label htmlFor="hashtag">해시태그</label>
                <input name="hashtag" id="hashtag" />
              </Li>
            </Ul>
          </div>
          <div>
            <Ul>
              <Li>
                <label htmlFor="editor">스터디에 대해 설명해주세요.</label>
                <TextEditor />
              </Li>
            </Ul>
          </div>
          <div>
            <Ul>
              <Li>
                <label htmlFor="applyForm">신청 양식을 만들어주세요.</label>
                <input name="applyForm" id="applyForm" />
              </Li>
            </Ul>
          </div>
          <Btn>
            <button type="button">취소하기</button>
            <button type="submit">등록하기</button>
          </Btn>
        </form>
      </Div>
    </>
  );
}

const Li = styled.li`
  //float: left;
`;

const Ul = styled.ul`
  //float:
`;

const Div = styled.div`
  margin: 5vh 5vw;
  height: auto;
  min-height: 70vh;
  overflow: auto;
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
  }
`;

export default CreatePost;
