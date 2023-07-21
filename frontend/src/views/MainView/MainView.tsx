import React from "react";
import styles from "./MainView.module.scss";
import MakeTransaction from "./components/MakeTransaction";
import TransactionList from "./components/TransactionList";

const MainView = () => {
  return (
    <div className={styles.container}>
      <TransactionList />
      <MakeTransaction />
    </div>
  );
};

export default MainView;
