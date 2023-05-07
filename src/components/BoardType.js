import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`
  background-color: gray;
  display: block;
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  float: left;
  margin: 0 3vw;
  padding: 2vw 0;
  font-weight: 900;
  font-size: 30px;
  font-family: "Noto Sans KR", sans-serif;
  color: gray;
  :hover {
    color: darkblue;
    cursor: pointer;
  }
  :onclick {
    color: red;
  }
  &.active {
    color: darkblue;
  }
`;

function BoardType() {
  let data = [
    "전체",
    "팀프로젝트",
    "어학",
    "프로그래밍",
    "자격증",
    "취미/교양",
    "고시/공무원",
    "기타",
  ];
  const [typeClick, setTypeClick] = useState("");
  const navigate = useNavigate();

  const filtering = (event) => {
    setTypeClick((prev) => {
      return event.target.value;
    });
    //정렬 어떻게?
    console.log(event.target.value);
  };
  return (
    <Section>
      <Ul>
        {data.map((item, idx) => {
          return (
            <>
              <Li
                value={idx}
                className={idx === typeClick ? "active" : ""}
                onClick={filtering}
              >
                {item}
              </Li>
            </>
          );
        })}
      </Ul>
    </Section>
  );
}
export default BoardType;
