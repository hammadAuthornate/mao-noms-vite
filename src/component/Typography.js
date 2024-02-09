import styled from "styled-components";

export const H1 = styled.h1`
  font-style: normal;
  font-weight: ${(props) => props.weight && props.weight};
  line-height: ${(props) => props.lHeight && props.lHeight};
  font-size: ${(props) => props.fontSize && props.fontSize};
  color: ${(props) =>
    props.color ? props.color : props.theme === "dark" ? "#212529" : "#ffffff"};
  margin-bottom: 0px;
  text-shadow: 6px 6px #5c1a00;
`;

export const P = styled.p`
  font-style: normal;
  font-weight: ${(props) => (props.weight ? props.weight : "400")};
  line-height: ${(props) => (props.lHeight ? props.lHeight : "24px")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "13px")};
  color: ${(props) =>
    props.color ? props.color : props.theme === "dark" ? "#212529" : "#ffffff"};
  margin-bottom: 0px;
`;
export const H2 = styled.h2``;
