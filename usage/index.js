
// import {PrivateKey} from "../sdk/dist/testnet/wasm.js";
import { Account } from "sdk";


const account = new Account();

// Individual keys can then be accessed through the following methods
const privateKey = account.privateKey().to_string();
const viewKey = account.viewKey().to_string();
const address = account.address().to_string();

console.log(
    privateKey, viewKey, address
);


