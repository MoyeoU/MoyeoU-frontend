import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { CiCircleRemove } from "react-icons/ci";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState, useEffect } from "react";

function Search(props) {
  //const [search, setSearch] = useState("");
  const goSearch = (event) => {
    props.setSearch(event.target.value);
  };
  const remove = () => {
    props.setSearch("");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.search]);
  return (
    <>
      <ParentDiv>
        <ChildDiv>
          {props.search !== "" ? (
            <AiFillCloseCircle
              onClick={remove}
              className="aifillclosecircle"
              size={20}
            />
          ) : (
            ""
          )}
          {/* <BiSearch className="bisearch" size={25} /> */}
        </ChildDiv>
        <input
          onChange={goSearch}
          className="parent"
          type="text"
          placeholder="스터디 제목으로 검색하세요"
          value={props.search}
        ></input>
      </ParentDiv>
    </>
  );
}

const ParentDiv = styled.div`
  position: relative;
  height: 2vh;
  min-width: 60vw;
  max-width: 60vw;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6vh;

  justify-content: space-between;
  align-items: center;
  input {
    outline: none;
    width: 100%;
    height: 100%;
    border: 0.3rem solid #939393;
    border-radius: 5rem;
    background-color: #deeaf6;
    padding: 2vh 1vw;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    :focus {
      border-color: #385493;
    }
    ::placeholder {
      color: #c0c0c0;
    }
  }
`;

const ChildDiv = styled.div`
  justify-content: space-between;
  align-items: center;
  .aifillclosecircle {
    position: absolute;
    right: 0%;
    top: 100%;
    float: right;
    color: #939393;
    :hover {
      cursor: pointer;
    }
    :active {
      color: #385493;
      .parent {
        border-bolor: #385493;
      }
    }
  }
  // .bisearch {
  //   position: absolute;
  //   right: 0%;
  //   top: 99%;
  //   float: right;
  //   color: #939393;
  //   :hover {
  //     cursor: pointer;
  //   }
  //   :active {
  //     color: #385493;
  //     .parent {
  //       border-bolor: #385493;
  //     }
  //   }
  // }
`;

export default Search;
