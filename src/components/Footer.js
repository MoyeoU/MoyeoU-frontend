import styled from "styled-components";
import logo from "../img/MoyeoU-removebg.png";

function Footer() {
  return (
    <>
      <Div>
        <ImgDiv>
          <img
            style={{ width: "6em", height: "4em" }}
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
  position: absolute;
  width: 100%;
  p {
    color: gray;
  }
  height: 20vh;
`;

const ImgDiv = styled.div`
  float: left;
  margin: 2vw;
`;

const TextDiv = styled.div`
  float: right;
  margin: 1vw;
`;

export default Footer;
