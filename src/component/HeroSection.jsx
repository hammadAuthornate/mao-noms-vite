import styled from "styled-components";
import { P, H1 } from "./Typography";
import { Spacer } from "./Spacer";
import { Button } from "./Button";
import art from "../assets/images/art1.png";
import rocket from "../assets/images/rocket.png";
import React, { useEffect, useState } from "react";
import ModalView from "./ModalView";
import { ethers } from "ethers";
import abi from "../contract.json";
import { wallets, getLeaf, getProof } from "../utils/merkler";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ConnectButton from "../utils/Web3Modal";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const CONTRACT_ADDRESS = "0xBde091A32c7563A9BEdC07578c37dCb2F442259b";

const Wrapper = styled.div``;

const Box = styled.div`
  background: #fff5dc;
  border: 7px solid #5c1a00;
  box-shadow: 10px 2px 0px #5c1a00;
  margin: 0px 100px 0px 100px;
  padding: 20px 20px 20px 20px;
  border-radius: 100px 40px 60px 20px;
  position: relative;
`;

const Input = styled.input`
  height: ${(props) => (props.height ? props.height : "50px")};
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid grey;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "3px"};
  padding: 15px;
  margin: ${(props) => (props.margin ? props.margin : "10px")};
  color: white;
  margin-left: ${(props) => (props.fright ? "auto" : "initial")};
  margin-right: ${(props) => (props.fleft ? "auto" : "initial")};
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function HeroSection({ sectionRef }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [prefetched, setPrefetched] = useState("");
  const { theme } = useContext(ThemeContext);

  const { address, isConnected, chainId } = useWeb3ModalAccount();

  const handleClose = () => {
    setOpen(false);
  };

  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      setOpen(true);
    } catch (error) {}
  };

  useEffect(() => {
    const asyncGet = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(address, abi, signer);

      const merkleLeaf = wallets.filter((el) => el.address === signer.address);
      let validWhitelist = false;
      if (merkleLeaf.length > 0) {
        const myProof = getProof(signer.address, merkleLeaf[0].amount);
        const myLeaf = getLeaf(signer.address, merkleLeaf[0].amount);
        const response = await contract.isEligibleForFreeMint(
          myProof,
          myLeaf,
          merkleLeaf[0].amount
        );
        if (response.isFree && response.isWhitelistClaim) {
          setAmount(merkleLeaf[0].amount);
          setPrefetched("WHITELIST");
          validWhitelist = true;
        }
      }
      if (!validWhitelist) {
        const response = await contract.isEligibleForFreeMint(
          [],
          ethers.encodeBytes32String(""),
          1
        );
        if (response.isFree && parseInt(response.freeAmount.toString()) > 0) {
          const free = parseInt(response.freeAmount.toString());
          const claimedAmount = await contract.claimedAmount(signer.address);
          const claimed = parseInt(claimedAmount.toString());
          if (claimed < free) {
            const difference = free - claimed;
            setAmount(difference);
            setPrefetched("HOLDER");
          }
        }
      }
    };

    if (open) {
      asyncGet();
    }
  }, [open]);

  async function mintNFTs() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);

    let value = ethers.parseEther((0.02 * amount).toString());
    if (prefetched !== "") {
      value = ethers.parseEther("0");
    }
    let quantity = amount;
    let leaf = ethers.encodeBytes32String("");
    let proof = [];

    if (prefetched === "WHITELIST") {
      const merkleLeaf = wallets.filter((el) => el.address === signer.address);
      proof = getProof(signer.address, merkleLeaf[0].amount);
      leaf = getLeaf(signer.address, merkleLeaf[0].amount);
    }

    try {
      setPrefetched("MINTING");
      const tx = await contract.mint(quantity, leaf, proof, {
        value: value,
      });
      await tx.wait();
      window.location.reload();
    } catch (error) {
      setPrefetched("ERRORED");
      console.log(error);
    }
  }

  return (
    <>
      <ModalView
        width={"500px"}
        height={"auto"}
        show={open}
        setshow={setOpen}
        onClose={handleClose}
        title="Mint Nfts"
      >
        <Input
          type="number"
          value={amount}
          min={0}
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
          disabled={prefetched !== ""}
          placeholder="Enter Amount of NFTs"
        />
        {prefetched === "WHITELIST" && (
          <P theme={theme}>You are eligible for free mint through Whitelist</P>
        )}
        {prefetched === "HOLDER" && (
          <P theme={theme}>
            You are eligible for free mint through holding eligible NFTs
          </P>
        )}
        {prefetched === "MINTING" && <P theme={theme}>Minting...</P>}
        {prefetched === "ERRORED" && (
          <P theme={theme}>An error occured, please refresh page</P>
        )}
        <div className="d-flex w-100 justify-content-center">
          <Button onClick={mintNFTs} disabled={prefetched === "MINTING"}>
            Mint
          </Button>
        </div>
      </ModalView>
      <Wrapper>
        <Spacer height={"80px"} />
        <div className="text-center">
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "50%" }}>
              <img src={art} alt="" />
            </div>
            <H1 theme={theme} fontSize="150px">
              Mao Noms
            </H1>
            <Spacer height={"35px"} />
          </div>
          <Spacer height={"35px"} />
          <div className="d-flex  justify-content-center">
          <ConnectButton />
          </div>
          <div className="d-flex w-100 justify-content-center">
            {Date.now() >= 1687363200000 ? (
              <Button
                onClick={() => {
                  connectWallet();
                }}
              >
                <P theme={theme} fontSize="16px">
                  Mint now
                </P>
                <ArrowOutwardIcon
                  // color={theme === "dark" ? "#fff5dc" : "#5c1a00"}
                  style={{
                    marginLeft: "10px",
                    color: theme === "dark" ? "#fff5dc" : "#5c1a00",
                  }}
                />
              </Button>
            ) : (
              <P theme={theme}>Mint starting at 12PM EST</P>
            )}
          </div>
          <Spacer height={"224px"} />
          <div ref={sectionRef}>
            <H1 theme={theme} fontSize="74px">
              Story
            </H1>
            <Spacer height={"56px"} />
            <Box>
              <div style={{ position: "absolute", right: "0%", top: "-60%" }}>
                <img width={"100%"} src={rocket} alt="" />
              </div>
              <P color="#5C1A00" fontSize="16px">
                Floating through the metaverse, the Mao's distress signal has
                made it to us, the race of people the Mao's know as 'hoomans'
                (Nobody correct them, that's adorable). The Mao's need tasty
                <br />
                treats to awaken them from their slumber. Maos also need hoomans
                to support them during their stay here in the metaverse, as well
                <br />
                as in their attempts to retake their home planet back from
                PUGGUS and the Blargs.
                <br />
              </P>
            </Box>
          </div>
          <Spacer height={"200px"} />
        </div>
      </Wrapper>
    </>
  );
}
