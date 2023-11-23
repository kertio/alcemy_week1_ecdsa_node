import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import * as keccak from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, pk, setPublicKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    const publicKey = secp.secp256k1.getPublicKey(privateKey);
    const address = toHex(keccak.keccak256(publicKey.slice(1)).slice(-20));

    setPrivateKey(privateKey);
    setAddress(address);
    setPublicKey(publicKey);
   
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input placeholder="Type an private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: 0x{String(address).slice(0, 4)}...{String(address).slice(-4)}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
