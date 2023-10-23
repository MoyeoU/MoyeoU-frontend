import styled from "styled-components";
import logo from "../img/MoyeoU-removebg.png";

function Footer() {
  return (
    <>
      <Div>
        <ImgDiv>
          <img
            style={{ width: "11em", height: "7.5em" }}
            src={logo}
            alt="logo"
          ></img>
        </ImgDiv>
        <TextDiv>
          <p>이용 약관</p>
          <p>개인정보 처리 방침</p>
          <p>이용 안내</p>
          <p>문의 사항 moyeou@gmail.com</p>
        </TextDiv>
      </Div>
    </>
  );
}

const Div = styled.div`
  background-color: #deeaf6;
  //position: absolute;
  //position: relative;
  width: 100%;
  height: 20vh;
`;

const ImgDiv = styled.div`
  float: left;
  margin-left: 1.5vw;
  margin-top: 2vh;
`;

const TextDiv = styled.div`
  margin-top: 5vh;
  margin-right: 3vw;
  float: right;
  color: gray;
  p {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export default Footer;
