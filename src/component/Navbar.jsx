import { Row, Col } from "react-bootstrap";
import Navlogo from "../assets/images/Logo.png";
import { P } from "./Typography";
import { Spacer } from "./Spacer";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";
import ThemeSelect from "./ThemeSelect";
import SvgIcon from "@mui/material/SvgIcon";
// import DiscordIcon from "../assets/images/discord.svg";
// import TwitterIcon from "../assets/images/twitter.svg";
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Navbar({ tr, rr, fr }) {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <Spacer height={"20px"} />
      <Row
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: "0px",
          padding: "0px 20px 0px 20px",
        }}
      >
        <Col md={4} className="d-flex">
          <img width={"26px"} height={"26px"} src={Navlogo} alt="" />
          <P
            theme={theme}
            className="mx-2"
            onClick={() => tr.current.scrollIntoView()}
          >
            Bichi Mao
          </P>
        </Col>
        <Col
          md={4}
          className="d-flex justify-content-center align-items-center"
        >
          <P
            theme={theme}
            style={{ cursor: "pointer" }}
            className="mx-2"
            onClick={() => rr.current.scrollIntoView()}
          >
            Roadmap
          </P>

          <P theme={theme} style={{ cursor: "pointer" }} className="mx-2">
            Team
          </P>

          <P theme={theme} style={{ cursor: "pointer" }} className="mx-2">
            Rarity
          </P>

          <P
            theme={theme}
            style={{ cursor: "pointer" }}
            className="mx-2"
            onClick={() => fr.current.scrollIntoView()}
          >
            FAQ
          </P>
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-center">
        <TwitterIcon className="mx-2" sx={{color: theme === "dark" ? "#212529" : "#fff5dc"}}  />

          {/* <SvgIcon className="mx-2" style={{ cursor: "pointer" }}>
            <DiscordIcon fill={theme === "dark" ? "#212529" : "#fff5dc"} />
          </SvgIcon>
          <SvgIcon className="mx-2" style={{ cursor: "pointer" }}>
            <TwitterIcon fill={theme === "dark" ? "#212529" : "#fff5dc"} />
          </SvgIcon> */}
          <ThemeSelect />
        </Col>
      </Row>
    </>
  );
}
