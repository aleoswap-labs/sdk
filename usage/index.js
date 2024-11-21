import { Account } from "sdk";


const account = new Account();

const privateKey = account.privateKey().to_string();
const viewKey = account.viewKey().to_string();
const address = account.address().to_string();

console.log(
    privateKey, viewKey, address
);


