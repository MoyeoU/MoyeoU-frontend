import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

function Search() {
  return (
    <>
      <ParentDiv>
        <ChildDiv>
          <button>
            <BiSearch size={25} color="#939393" />
          </button>
        </ChildDiv>
        <input type="text" placeholder="스터디 제목을 입력해주세요"></input>
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
    :focus {
      border: 0.3rem solid #385493;
    }
    ::placeholder {
      color: #c0c0c0;
    }
  }
`;
const ChildDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  text-align: right;
  button {
    //align-items: center;
    background-color: #deeaf6;
  }
`;

export default Search;
