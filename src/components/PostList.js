import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "./Modal/LoginModal";
import tagJson from "../tag.json";
import Search from "../components/Search";

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
  const [typeClicked, setTypeClicked] = useState("전체"); //클릭한 카테고리
  const [filteredTag, setFilteredTag] = useState(""); //해당 카테고리 태그들 리스트
  const [finalTag, setFinalTag] = useState(""); //클릭한 태그 리스트
  //final 없으면 그냥 filteredTag 보내기
  const [gatheringTag, setGatheringTag] = useState("모집중"); //모집여부버튼
  const [login, setLogin] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  const onShowTag = () => {
    if (typeClicked === "팀프로젝트") {
      setFilteredTag(tagJson.tag1);
    } else if (typeClicked === "어학") {
      setFilteredTag(tagJson.tag2);
    } else if (typeClicked === "프로그래밍") {
      setFilteredTag(tagJson.tag3);
    } else if (typeClicked === "자격증") {
      setFilteredTag(tagJson.tag4);
    } else if (typeClicked === "취미/교양") {
      setFilteredTag(tagJson.tag5);
    } else if (typeClicked === "고시/공무원") {
      setFilteredTag(tagJson.tag6);
    } else {
      setFilteredTag("");
    }
  };
  const typeFiltering = (event) => {
    setTypeClicked(event.target.innerText);
    setFinalTag("");
    onShowTag();
  };
  const chooseFinalTag = (event) => {
    setFinalTag((prevList) => [...prevList, event.target.innerText.slice(1)]);
  };
  const sendResult = () => {
    if (finalTag === "") {
      //console.log(typeClicked);
    } else {
      //console.log(finalTag);
    }
    //console.log(gatheringTag);
    //연결,,
  };
  const gathering = (event) => {
    if (event.target.innerText === "모집중") {
      setGatheringTag("모집중");
    } else {
      setGatheringTag("모집완료");
    }
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

  const resetTag = () => {
    setFinalTag("");
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
    onShowTag();
    sendResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginModalIsOpen, finalTag, typeClicked, gatheringTag]);

  return (
    <>
      <Search />
      <List>
        <ul>
          {data.map((item) => {
            return (
              <>
                <li
                  className={item === typeClicked ? "active" : ""}
                  onClick={typeFiltering}
                >
                  {item}
                </li>
              </>
            );
          })}
        </ul>
        <Detail>
          {Object.values(filteredTag).map((item) =>
            item !== "전체" ? (
              <button
                className={finalTag.includes(item) ? "active2" : ""}
                onClick={chooseFinalTag}
              >
                #{item}
              </button>
            ) : (
              <span></span>
            )
          )}
          <br />
          <p onClick={resetTag}>필터 초기화 X</p>
        </Detail>
      </List>

      <Gather>
        <Classification
          className={gatheringTag === "모집중" ? "active" : ""}
          onClick={gathering}
        >
          모집중
        </Classification>
        <Classification
          className={gatheringTag === "모집완료" ? "active" : ""}
          onClick={gathering}
        >
          모집완료
        </Classification>
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
  margin-bottom: 5vh;
  ul {
    padding-inline-start: 0;
  }
  li {
    display: inline-block;
    margin: 1vh 2vw;
    padding: 0 0 0.5vh 0;
    font-weight: 900;
    font-size: 2.4rem;
    color: #939393;
    :hover {
      color: #385493;
      cursor: pointer;
    }
    &.active {
      color: #385493;
      border-bottom: 0.4rem solid #385493;
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
  margin: 0 0 0 1vw;
  :hover {
    cursor: pointer;
    background-color: #deeaf6;
  }
  &.active {
    cursor: pointer;
    background-color: #deeaf6;
  }
`;

const WriteBtn = styled.button`
  float: right;
  //width: 10%;
  //height: 5%;
  border: none;
  margin: 0 1vw;
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
      color: #385493;
    }
  }
`;

const Detail = styled.div`
  width: 76vw;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  button {
    border: 0.3rem solid #c0c0c0;
    background-color: white;
    border-radius: 0.7rem;
    margin: 1vh 0.5vw;
    padding: 0.7vh 0.7vw;
    :hover {
      background-color: #e7e7e7;
    }
    &.active2 {
      background-color: #e7e7e7;
    }
  }
  p {
    display: inline-block;
    margin-left: 0.5vw;
    font-size: 1.5rem;
    font-weight: 550;
    color: #939393;
    //border: 0.3rem solid black;

    :hover {
      cursor: pointer;
      color: gray;
    }
  }
`;

export default PostList;
