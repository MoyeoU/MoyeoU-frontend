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
  //position: absolute;
  //position: relative;
  width: 100%;
  height: 20vh;
`;

const ImgDiv = styled.div`
  float: left;
`;

const TextDiv = styled.div`
  float: right;
  color: gray;
  p {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export default Footer;
