import React from "react";
import styles from "./Transaction.module.scss";
import { converter } from "../../../helper/helper";
import { useContractRead } from "wagmi";
import contract_abi from "../../../assets/Users.json";
const { abi }: any = contract_abi;

const Transaction = ({ data }: any) => {
  console.log(data, "TRANSACTION");
  const {
    data: userData,
    isError,
    isLoading,
  } = useContractRead({
    address: `0x${process.env.REACT_APP_CONTRACT_ADDRESS_USER}` || "",
    abi: abi,
    functionName: "getUserInfo",
    args: [data.receiver],
  });

  return (
    <div className={styles.container}>
      <span>{converter(data?.amount)}</span>
      <span>{data?.message}</span>
      <span>{data?.receiver}</span>
    </div>
  );
};

export default Transaction;
