import React, { useState } from "react";
import styles from "./MakeTransaction.module.scss";
import contract_abi from "../../../assets/Transactions.json";
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { parseEther } from "viem";
const { abi }: any = contract_abi;

interface data {
  value: string;
  message: string;
  receiver: string;
}

const initialValue: data = {
  value: "",
  message: "",
  receiver: "0x64B9a8F7CC61DD98fa9a147e6034B3C855c11CE4",
};

const MakeTransaction = () => {
  console.log(process.env.REACT_APP_CONTRACT_ADDRESS_TRANSACTION);
  const { address } = useAccount();
  const [data, setData] = useState<data>(initialValue);
  const { config, error } = usePrepareContractWrite({
    address: `0x${process.env.REACT_APP_CONTRACT_ADDRESS_TRANSACTION}` || "",
    account: address,
    abi: abi,
    functionName: "sendTransaction",
    args: [data.receiver, parseEther(data.value), data.message], // Remove the extra parseEther call

    value: parseEther(data.value),
    onError(data) {
      console.log(data);
    },
  });
  const { write } = useContractWrite(config);

  const dataHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className={styles.container}>
      <input type="text" onChange={dataHandler} name="receiver" placeholder="address" value={data.receiver} />
      <input type="number" onChange={dataHandler} name="value" placeholder="eth amount" />
      <textarea name="message" onChange={dataHandler} placeholder="message" />
      <button onClick={() => write?.()}>SEND</button>
    </div>
  );
};

export default MakeTransaction;
