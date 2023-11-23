import { useState } from "react";
import server from "./server";
import * as keccak from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes, bytesToUtf8 } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";

function getAddressFromPrivateKey(publicKey) {
  const address = keccak.keccak256(publicKey.slice(1)).slice(-20);
  return address;
}

function Transfer({ address, setBalance, pk, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const txHash = toHex(keccak.keccak256(utf8ToBytes(recipient + parseInt(sendAmount))));
    const sign = secp.secp256k1.sign(txHash, privateKey);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: toHex(getAddressFromPrivateKey(pk)),
        recipient: recipient,
        amount: parseInt(sendAmount),
        txHash: txHash,
        sign: toHex(sign.toCompactRawBytes()),
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
