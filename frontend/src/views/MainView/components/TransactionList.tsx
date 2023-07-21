import React from "react";
import styles from "./TransactionList.module.scss";
import contract_abi from "../../../assets/Transactions.json";

import { useAccount, useContractRead } from "wagmi";
import Transaction from "./Transaction";
const { abi }: any = contract_abi;

const TransactionList = () => {
  const { address } = useAccount();
  const {
    data: transactions,
    isError,
    isLoading,
  }: any = useContractRead({
    address: `0x${process.env.REACT_APP_CONTRACT_ADDRESS_TRANSACTION}` || "",
    abi: abi,
    functionName: "myTransactions",
    account: address,
    watch: true,
  });

  // console.log(transactions, isError, "transaction");

  return (
    <div className={styles.container}>
      TransactionList
      {transactions?.map((el: any) => (
        <Transaction data={el} />
      ))}
    </div>
  );
};

export default TransactionList;
