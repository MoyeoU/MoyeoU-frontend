import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "./Modal/LoginModal";

function PostList() {
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
      <div>
        <Tag>
          <Ul>
            {data.map((item, idx) => {
              return (
                <>
                  <Li
                    key={idx}
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
        </Tag>
        <Gather>
          <button>모집중</button>
          <button>모집완료</button>
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
      </div>
    </>
  );
}

const Tag = styled.div`
  //text-align: center;
  //margin: 3em;
  //clear: both;
  //justify-content: center;
`;

const Gather = styled.div`
  clear: both;
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  float: left;
  margin: 0 2vw;
  padding: 2vw 0;
  font-weight: 900;
  font-size: 30px;
  font-family: "Noto Sans KR", sans-serif;
  color: gray;
  :hover {
    color: #385493;
    cursor: pointer;
  }
  &.active {
    color: #385493;
  }
`;

const WriteBtn = styled.button`
  border: none;
  background-color: white;
  font-size: 20px;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
  p {
  }
`;

export default PostList;
