import React, { useState } from "react";
import { Web3Button } from "@web3modal/react";

import { Web3NetworkSwitch } from "@web3modal/react";
import Settings from "./components/Settings";
import BasicModal from "../modal/Modal";
const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div>
        <Web3Button />
        <Web3NetworkSwitch />
        <span onClick={() => setOpen(!open)}>Setting</span>
      </div>
      <BasicModal open={open} setOpen={setOpen}>
        <Settings />
      </BasicModal>
    </>
  );
};

export default Navbar;
