import styled from "styled-components";
import { P } from "./Typography";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";
import SvgIcon from "@mui/material/SvgIcon";
// import DiscordIcon from "../assets/images/discord.svg";
// import TwitterIcon from "../assets/images/twitter.svg";
import TwitterIcon from '@mui/icons-material/Twitter';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
const Wrapper = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Wrapper>
        <div>
          <P color="#5C1A00">© 2o23 Bichi Mao. All rights reserved.</P>
        </div>
        <div>
          <TwitterIcon className="mx-2" sx={{color: theme === "dark" ? "#fff5dc" : "#5c1a00"}}  />
          <ChatBubbleIcon className="mx-2" sx={{color: theme === "dark" ? "#fff5dc" : "#5c1a00"}}  />
          {/* <img color="white" src={TwitterIcon} alt="Twitter" /> */}
          {/* <SvgIcon className="mx-2" style={{ cursor: "pointer" }}>
            <DiscordIcon fill={theme === "dark" ? "#fff5dc" : "#5c1a00"} />
          </SvgIcon>
          <SvgIcon className="mx-2" style={{ cursor: "pointer" }}>
            <TwitterIcon fill={theme === "dark" ? "#fff5dc" : "#5c1a00"} />
          </SvgIcon> */}
        </div>
      </Wrapper>
    </>
  );
}
