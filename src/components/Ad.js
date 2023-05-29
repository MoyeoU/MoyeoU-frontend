//import { useState, useEffect } from "react";
import styled from "styled-components";
import images from "../img/image.png";

const AddDiv = styled.img`
  width: 100%;
  //height: 35vh;
`;

function Add() {
  return (
    <div>
      <AddDiv src={images} alt="i"></AddDiv>
    </div>
  );
}

export default Add;
