import { useRef } from "react";
import "./App.css";
import styled from "styled-components";
import Navbar from "./component/Navbar";
import HeroSection from "./component/HeroSection";
import image from "../src/assets/images/background.svg";
import Accordion from "./component/Accordion";
import { Spacer } from "./component/Spacer";
import Footer from "./component/Footer";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
// import { useWeb3Modal } from "@web3modal/ethers/react";

const Wrapper = styled.div`
  height: auto;
`;
const Data = [
  {
    title: "What is an NFT?",
    content:
      "A non-fungible token is a unique digital identifier that is recorded on a blockchain, and is used to certify ownership and authenticity.",
  },
  {
    title: "What is Metamask?",
    content:
      "MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain. It allows users to access their Ethereum wallet through a browser extension or mobile app, which can then be used to interact with decentralized applications.",
  },
  {
    title: "What is Bichi Mao?",
    content: "https://www.instagram.com/bichi.mao/",
  },
];

function App() {
  const topRef = useRef(null);
  const roadmapRef = useRef(null);
  const faqRef = useRef(null);

  const { theme } = useContext(ThemeContext);
  // const { open } = useWeb3Modal();

  return (
    <div className="App">
      <Wrapper
        ref={topRef}
        style={{
          backgroundImage: `url(${image})`,
          backdropFilter: theme === "dark" ? "invert(100%)" : "invert(0%)",
        }}
      >
        {/* <button onClick={() => open()}>open Wallet</button> */}
        {/* <w3m-button /> */}
        <Navbar tr={topRef} rr={roadmapRef} fr={faqRef} />
        <HeroSection sectionRef={roadmapRef} />
        <div ref={faqRef}>
          {Data.map((item, index) => {
            return (
              <Accordion
                title={item.title}
                content={item.content}
                key={index}
              />
            );
          })}
        </div>
        <Spacer height="80px" />
        <Footer />
        <Spacer height="80px" />
      </Wrapper>
    </div>
  );
}

export default App;
