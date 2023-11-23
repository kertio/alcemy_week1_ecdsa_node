const express = require("express");
const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const keccak = require('ethereum-cryptography/keccak');
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());


const balances = {
  "73d7674bcfea252ad5e711c392ea3178791c20cb": 100,
  "3c7b51a5a6d64bd2e90023963b49ef6134970465": 50,
  "5231dfd108a878ae3074ae56839ead809f679ea4": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, txHash, sign } = req.body;
  
  const signature = secp256k1.Signature.fromCompact(sign);
  signature.recovery = 1;
  const publicKey = signature.recoverPublicKey(txHash);
  const txHashVerif = toHex(keccak.keccak256(utf8ToBytes(recipient + parseInt(amount))));

  if (secp256k1.verify(signature, txHash, publicKey.toHex()) && txHash === txHashVerif) {
    setInitialBalance(sender);
    setInitialBalance(recipient);
    
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
      console.log(`server: sender = ${sender}`);
      console.log(`server: recipient = ${recipient}`);
    }
  } else {
    res.status(400).send({ message: "Broken key or hash" });
  }
  

});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
