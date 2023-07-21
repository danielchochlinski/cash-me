import React, { useState, ChangeEvent } from "react";
import styles from "./Settings.module.scss";
import { create as ipfsClient } from "ipfs-http-client";
import axios from "axios";
import { Buffer } from "buffer";

interface TData {
  username: string;
  avatar?: File;
}

const initialValues: TData = {
  username: "",
  avatar: undefined,
};
const Settings: React.FC = () => {
  const [data, setData] = useState<TData>(initialValues);

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "file" && e.target.files) {
      const file = e.target.files[0];

      // Check if the file size is within the limit (0.5 MB)
      if (file.size > 512000) {
        alert("File size exceeds the limit of 0.5 MB.");
        return;
      }

      setData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const auth =
    "Basic " +
    Buffer.from(process.env.REACT_APP_IPFS_INFURA_KEY + ":" + process.env.REACT_APP_IPFS_INFURA_SECRETE_KEY).toString(
      "base64"
    );

  const uploadToIPFS = async () => {
    const ipfs = ipfsClient({
      url: "https://ipfs.infura.io:5001",
      headers: {
        authorization: auth,
      },
    });

    if (!data.avatar) {
      alert("Please select a file before uploading to IPFS.");
      return;
    }

    try {
      // Upload the file to IPFS
      const added = await ipfs.add(data.avatar);

      // Get the CID of the uploaded file
      const cid = added.cid.toString();
      console.log("CID:", cid);
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
    }

    setData(initialValues);
  };

  console.log(data);

  return (
    <div>
      <input type="text" name="username" onChange={(e) => handleData(e)} />
      <input type="file" name="file" onChange={(e) => handleData(e)} />
      <button onClick={uploadToIPFS}>add ipfs</button>
    </div>
  );
};

export default Settings;
