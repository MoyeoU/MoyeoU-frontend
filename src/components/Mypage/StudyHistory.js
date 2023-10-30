import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

function StudyHistory(props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/postView/${props.posts.postId}`, { state: props.posts.postId });
  };

  const getHistory = () => {};

  useEffect(() => {
    getHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(props);
  return (
    <>
      {props.firstTypeClick === false ? (
        props.secondTypeClick === props.posts.status ? (
          <Div onClick={onClick}>
            <TitleDiv>
              <h3>{props.posts.title}</h3>
              <CompleteBtn>
                <p>
                  {props.posts.status === "PROGRESS" ? `모집중` : `모집완료`}
                </p>
              </CompleteBtn>
            </TitleDiv>

            <TagBtn>
              {props.posts.hashtags.length > 5 ? (
                <>
                  <p>{props.posts.hashtags[0]}</p>
                  <p>{props.posts.hashtags[1]}</p>
                  <p>{props.posts.hashtags[2]}</p>
                  <p>{props.posts.hashtags[3]}</p>
                  <p>{props.posts.hashtags[4]}</p>
                  <p>..</p>
                </>
              ) : (
                props.posts.hashtags.map((tags) => <p>{tags}</p>)
              )}
              <span>{props.posts.date}</span>
            </TagBtn>
          </Div>
        ) : (
          <></>
        )
      ) : props.firstTypeClick === props.posts.isHost ? (
        props.secondTypeClick === props.posts.status ? (
          <Div onClick={onClick}>
            <TitleDiv>
              <h3>{props.posts.title}</h3>
              <CompleteBtn>
                <p>
                  {props.posts.status === "PROGRESS" ? `모집중` : `모집완료`}
                </p>
              </CompleteBtn>
            </TitleDiv>

            <TagBtn>
              {props.posts.hashtags.length > 5 ? (
                <>
                  <p>{props.posts.hashtags[0]}</p>
                  <p>{props.posts.hashtags[1]}</p>
                  <p>{props.posts.hashtags[2]}</p>
                  <p>{props.posts.hashtags[3]}</p>
                  <p>{props.posts.hashtags[4]}</p>
                  <p>..</p>
                </>
              ) : (
                props.posts.hashtags.map((tags) => <p>{tags}</p>)
              )}
              <span>{props.posts.date}</span>
            </TagBtn>
          </Div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
}

const Div = styled.div`
  border: 3px solid #b4c7e7;
  border-radius: 2em;
  background-color: #dfe7f5;
  height: 13vh;
  margin-top: 1%;
  margin-bottom: 4%;
  padding: 1vh 1vw 1.3vh;
  //height: auto;
  //overflow: auto;
  :hover {
    cursor: pointer;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 0.5vw;
  margin-top: 1.3vh;
  margin-bottom: 3.7vh;
  h3 {
    font-size: 1.8rem;
    color: #595959;
    margin: 0;
  }
`;

const CompleteBtn = styled.div`
  float: right;
  background-color: #ffffff;
  border-radius: 0.7em;
  height: 4.1vh;
  padding: 0.005vh 0.6vw;
  p {
    pointer-events: none;
    display: inline-block;
    color: #767171;
    font-weight: bold;
    font-size: 1rem;
  }
`;

const TagBtn = styled.div`
  p {
    background-color: #b4c7e7;
    color: #525252;
    margin: 0.5em;
    pointer-events: none;
    display: inline-block;
    padding: 0.3em 0.8em;
    border-radius: 0.4em;
    font-weight: bold;
    font-size: 1.1rem;
  }
  span {
    float: right;
    margin: 1.2vh 0.5vw 0;
    font-size: 1.1rem;
    color: #767171;
  }
`;

export default StudyHistory;
