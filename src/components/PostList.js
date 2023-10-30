import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "./Modal/LoginModal";
import tagJson from "../tag.json";
import Search from "../components/Search";

function PostList(props) {
  const [filteredTag, setFilteredTag] = useState(""); //해당 카테고리 태그들 리스트

  const [login, setLogin] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  const typeFiltering = (event) => {
    const temp = event.target.innerText;
    props.setFinalTag("");

    if (temp === "어학") {
      setFilteredTag(tagJson.tag1);
      props.setTypeClicked([temp, 1]);
    } else if (temp === "프로그래밍") {
      setFilteredTag(tagJson.tag2);
      props.setTypeClicked([temp, 2]);
    } else if (temp === "팀프로젝트") {
      setFilteredTag(tagJson.tag3);
      props.setTypeClicked([temp, 3]);
    } else if (temp === "자격증") {
      setFilteredTag(tagJson.tag4);
      props.setTypeClicked([temp, 4]);
    } else if (temp === "취미/교양") {
      setFilteredTag(tagJson.tag5);
      props.setTypeClicked([temp, 5]);
    } else if (temp === "고시/공무원") {
      setFilteredTag(tagJson.tag6);
      props.setTypeClicked([temp, 6]);
    } else {
      setFilteredTag("");
      props.setTypeClicked([temp, 7]);
    }
  };
  const chooseFinalTag = (event) => {
    let chosenTag = event.target.innerText.slice(1);
    if (props.finalTag.includes(chosenTag)) {
      const filtered = props.finalTag.filter(
        (element) => element !== chosenTag
      );
      props.setFinalTag(filtered);
      return;
    }
    props.setFinalTag((prevList) => [...prevList, chosenTag]);
  };

  const gathering = (event) => {
    if (event.target.innerText === "모집중") {
      props.setGatheringTag("PROGRESS");
    } else {
      props.setGatheringTag("COMPLETED&END");
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
    props.setFinalTag("");
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
  }, [login, loginModalIsOpen]);

  return (
    <>
      <Search
        getPost={props.getPost}
        search={props.search}
        setSearch={props.setSearch}
      />
      <List>
        <ul>
          <li
            className={"전체" === props.typeClicked[0] ? "active" : ""}
            onClick={typeFiltering}
          >
            전체
          </li>
          {tagJson.category.map((item) => {
            return (
              <>
                <li
                  className={item[0] === props.typeClicked[0] ? "active" : ""}
                  onClick={typeFiltering}
                >
                  {item[0]}
                </li>
              </>
            );
          })}
        </ul>
        <Detail>
          {Object.values(filteredTag).map((item) =>
            item !== "전체" ? (
              <button
                className={props.finalTag.includes(item[0]) ? "active2" : ""}
                onClick={chooseFinalTag}
              >
                #{item[0]}
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
          className={props.gatheringTag === "PROGRESS" ? "active" : ""}
          onClick={gathering}
        >
          모집중
        </Classification>
        <Classification
          className={props.gatheringTag === "COMPLETED&END" ? "active" : ""}
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
    margin-top: 10vh;
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
  margin: 0 1vw 2vh;
  overflow: auto;
`;

const Classification = styled.button`
  width: 8%;
  height: 10%;
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
  margin: 0 3vw 0 1vw;
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
    font-weight: 400;
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
