import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "./Modal/LoginModal";

function PostList() {
  let data = [
    "전체",
    "전공/팀플",
    "어학",
    "프로그래밍",
    "자격증",
    "취미/교양",
    "고시/공무원",
    "기타",
  ];
  const [typeClick, setTypeClick] = useState("");
  const [login, setLogin] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  const filtering = (event) => {
    setTypeClick((prev) => {
      return event.target.value;
    });
    //정렬 어떻게?
    console.log(event.target.value);
  };
  const navigate = useNavigate();
  const goCreatePost = () => {
    if (login) {
      navigate(`/createPost`);
    } else {
      alert("로그인이 필요합니다.");
      setLoginModalIsOpen(true);
    }
  };

  const getLoginOrNot = () => {
    //로그인 여부 체크, 나중에는 문자열 있는지없는지
    if (localStorage.getItem("id")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  useEffect(() => {
    getLoginOrNot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginModalIsOpen]);

  return (
    <>
      <List>
        <ul>
          {data.map((item, idx) => {
            return (
              <>
                <li
                  key={idx}
                  value={idx}
                  className={idx === typeClick ? "active" : ""}
                  onClick={filtering}
                >
                  {item}
                </li>
              </>
            );
          })}
        </ul>
      </List>
      <Gather>
        <Classification>모집중</Classification>
        <Classification>모집완료</Classification>
        <WriteBtn>
          <p onClick={goCreatePost}>글쓰기</p>
          {loginModalIsOpen && (
            <LoginModal
              open={loginModalIsOpen}
              onClose={() => {
                setLoginModalIsOpen(false);
              }}
            />
          )}
        </WriteBtn>
      </Gather>
    </>
  );
}

const List = styled.div`
  min-width: 100%;
  max-width: 100%;
  text-align: center;
  margin-bottom: 10vh;
  ul {
    padding-inline-start: 0;
  }
  li {
    display: inline;
    margin: 2.5%;
    font-weight: 900;
    font-size: 25px;
    color: gray;
    :hover {
      color: #385493;
      cursor: pointer;
    }
    &.active {
      color: #385493;
    }
  }
`;

const Gather = styled.div`
  clear: both;
  margin: 0 1vw 1vh;
  overflow: auto;
`;

const Classification = styled.button`
  width: 8%;
  height: 5%;
  background-color: white;
  padding: 1vh 1vw;
  border-radius: 0.5em;
  color: gray;
  border: 3px solid #deeaf6;
  font-weight: bold;
  margin: 0 0.5vw;
  :hover {
    cursor: pointer;
    background-color: #deeaf6;
  }
`;

const WriteBtn = styled.button`
  float: right;
  //width: 10%;
  //height: 5%;
  border: none;
  margin: 0vh 4vw;
  background-color: white;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
  p {
    font-size: 1.5em;
    margin: 0;
    color: gray;
    :hover {
      color: black;
    }
  }
`;

export default PostList;
