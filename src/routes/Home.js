import Header from "../components/Header";
import Ad from "../components/Ad";
import PostList from "../components/PostList";
import Post from "../components/Post";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Pagenation from "../components/Pagenation";
import axios from "axios";
import tagJson from "../tag.json";
import loading from "../img/loading.png";

function Home() {
  const [page, setPage] = useState(1); //현재 페이지 state
  const limit = 12;
  const offset = (page - 1) * limit;
  const [data, setData] = useState("");

  const [search, setSearch] = useState("");
  const [typeClicked, setTypeClicked] = useState(["전체", 0]); //클릭한 카테고리
  const [finalTag, setFinalTag] = useState(""); //클릭한 태그 리스트
  const [gatheringTag, setGatheringTag] = useState("PROGRESS"); //모집여부버튼

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  const getPost = () => {
    let input = "";
    input += "status=" + gatheringTag;
    if (search !== "") {
      input += "&title=" + search;
    }
    if (typeClicked[0] !== "전체") {
      input += "&categoryId=" + typeClicked[1];
    }
    if (finalTag.length !== 0) {
      input += "&hashTagIds=";
      const objectName = "tag" + typeClicked[1];
      for (let i = 0; i < finalTag.length; i++) {
        for (let j = 0; j < tagJson[objectName].length; j++) {
          if (finalTag[i] === tagJson[objectName][j][0]) {
            //input += "&hashTagId=" + tagJson[objectName][j][1];
            input += tagJson[objectName][j][1] + ",";
          }
        }
      }
      input = input.slice(0, -1);
    }
    //console.log(input);
    axios
      .get(`http://52.79.241.162:8080/posts?${input}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, typeClicked, finalTag, gatheringTag]);

  return (
    <>
      <Header />
      <Ad />
      <Div>
        <PostList
          getPost={getPost}
          search={search}
          setSearch={setSearch}
          typeClicked={typeClicked}
          setTypeClicked={setTypeClicked}
          finalTag={finalTag}
          setFinalTag={setFinalTag}
          gatheringTag={gatheringTag}
          setGatheringTag={setGatheringTag}
        />
        {data.length !== 0 ? (
          <>
            <Post info={postsData(data)} />
          </>
        ) : (
          <Img>
            <img src={loading} alt="loading.."></img>
          </Img>
        )}
        <Pagenation
          limit={limit}
          page={page}
          totalPosts={data.length}
          setPage={setPage}
        />
      </Div>
    </>
  );
}

const Div = styled.div`
  padding: 6vh 10vw 10vh;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  height: auto;
  overflow: auto;
  max-width: 100%;
`;

const Img = styled.div`
  text-align: center;
  padding: 5vh 5vw;
  img {
    width: 10vw;
  }
`;

export default Home;
