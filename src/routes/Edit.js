import styled from "styled-components";
import Header from "../components/Header";
import member from "../img/member.jpg";

function Edit() {
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const id = localStorage.getItem("id");
  const intro = "연동해서 가져올거";
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
      <Div>
        <h2>내 정보 수정하기</h2>
        <form onSubmit={onSubmit}>
          <img src={member} alt="member"></img>
          <label htmlFor="id">닉네임</label>
          <input placeholder={id} name="id" />
          <br />
          <br />
          <label htmlFor="intro">소개글</label>
          <input placeholder={intro} name="intro" />
          <br />
          <br />
          <label htmlFor="tag">관심태그</label>
          <select name="tag" id="tag">
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <button type="button">탈퇴하기</button>
          <button type="submit">완료</button>
        </form>
      </Div>
    </>
  );
}

const Div = styled.div`
  width: 90%;
  max-width: 90%;
  height: auto;
  min-height: 70vh;
  overflow: auto;
  margin: 0 auto;
  //float:left;
`;

export default Edit;
