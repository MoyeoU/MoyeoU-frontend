//import { useState, useEffect } from "react";
import styled from "styled-components";
import images from "../img/images.jpg";

const AddDiv = styled.img`
  width: 100%;
  height: 20vh;
`;

function Add() {
  return (
    <div>
      <AddDiv src={images} alt="i"></AddDiv>
    </div>
  );
}

export default Add;
