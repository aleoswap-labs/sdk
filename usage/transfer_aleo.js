import { Account, ProgramManager, AleoNetworkClient, AleoKeyProvider, NetworkRecordProvider } from "sdk";


const privateKey = 'APrivateKey1zkp2mYusCV1g2GTYJ1DeUUa4Twgc5Vqh59jYnajJv3Foskv'
const account = new Account({ privateKey });
console.log(`account address: ${account.address().to_string()}`)

const queryURL = "http://hk2-6.s.filfox.io:60053"
const networkClient = new AleoNetworkClient(queryURL)
const keyProvider = new AleoKeyProvider()
keyProvider.useCache = true

const recordProvider = new NetworkRecordProvider(account, networkClient);
const programManager = new ProgramManager(queryURL, keyProvider, recordProvider);
programManager.setAccount(account)

const amount = 10.1
const recipient = "aleo1rpsftkqyqcehfnk5hjxq3ppp8dczf4nzx4snrhcgpv5kl9meauzsftf5rs"
const fee = 0.05106
const tx_id = await programManager.transfer(amount, recipient, "public", fee)
console.log(`public transfer tx id: ${tx_id}`)

