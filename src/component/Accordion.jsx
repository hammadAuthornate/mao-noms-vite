import React, { useState } from "react";
import styled from "styled-components";
import downArrow from "../assets/images/downArrow.png";

const AccordionWrapper = styled.div`
  margin-top: 20px;
  margin-left: 100px;
  margin-right: 100px;
  max-width: 900px;
  width: 80%;
`;

const AccordionHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #f7f7f7;
  border: none;
  cursor: pointer;
  width: 100%;
  background: #fff5dc;
  /* Brown */

  border: 7px solid #5c1a00;
  box-shadow: 10px 2px 0px #5c1a00;
  border-radius: 50px 40px 60px 20px;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const AccordionContent = styled.div`
  padding: 10px;
  max-width: max-content;
  text-align: center;
  font-size: larger;
`;

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionWrapper>
      <AccordionHeader onClick={handleAccordion}>
        {title}
        <img src={downArrow} alt="" />
      </AccordionHeader>
      {isOpen && <AccordionContent>{content}</AccordionContent>}
    </AccordionWrapper>
  );
};

export default Accordion;
