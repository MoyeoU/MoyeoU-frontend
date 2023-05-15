import styled from "styled-components";
import Header from "./Header";

function CreatePost() {
  const onSubmit = () => {
    //.
  };
  return (
    <>
      <Header />
      <Div>
        <form onSubmit={onSubmit}>
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
        </form>
      </Div>
    </>
  );
}

const Li = styled.li`
  float: left;
`;

const Ul = styled.ul``;

const Div = styled.div`
  height: auto;
  min-height: 70vh;
`;

export default CreatePost;
