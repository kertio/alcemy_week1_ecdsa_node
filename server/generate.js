const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');


// Generate 1st keys

const privKey = "26f24571022bf23287bc378789d3205292af3ca35289764dbdfe653d5626ee07";
// const privKey = secp256k1.utils.randomPrivateKey();
// console.log("Private key: 1", privKey);
console.log("Private key hex: 1", privKey);
const publicKey = secp256k1.getPublicKey(privKey);
const addr = keccak256(publicKey.slice(1)).slice(-20);

console.log("Public key: 1", toHex(publicKey));
console.log(`Address 1: 0x${toHex(addr)}`);

/**
 * 
   38, 242,  69, 113,   2,  43, 242, 50,
  135, 188,  55, 135, 137, 211,  32, 82,
  146, 175,  60, 163,  82, 137, 118, 77,
  189, 254, 101,  61,  86,  38, 238,  7
]
Private key hex: 1 26f24571022bf23287bc378789d3205292af3ca35289764dbdfe653d5626ee07
Public key: 1 03666c3b292b8d077da05cc9efee7fda6bd977242fcda7ed17305ad1c1bae2a844
Address 1: 0x73d7674bcfea252ad5e711c392ea3178791c20cb
 */

const privKey2 = secp256k1.utils.randomPrivateKey();
console.log("Private key hex: 1", toHex(privKey2));

const publicKey2 = secp256k1.getPublicKey(privKey2);
const addr2 = keccak256(publicKey2.slice(1)).slice(-20);

console.log("Public key: 1", toHex(publicKey2));
console.log(`Address 1: 0x${toHex(addr2)}`);
/**
 * 
 * Private key hex: 1 54b3afa425e3719f77d172a71ec342f1009df3e21a6ec89dbc5135485fdbd1a9
Public key: 1 0330c010285a0a7215265b066acdf6a08c44cc4a22cbf5ff8739553390335b9a68
Address 1: 0x3c7b51a5a6d64bd2e90023963b49ef6134970465

Private key hex: 1 a22272cf1027fcc88fe53ea725c263f46c67624caccdc42b521dc200fd5ae42a
Public key: 1 0256af3f77d9af2bcd1716ddc4c34ab84e8242c58fb7c6b7a9685d3956382ddacb
Address 1: 0x5231dfd108a878ae3074ae56839ead809f679ea4
 */