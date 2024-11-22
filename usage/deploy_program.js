import { Account, AleoNetworkClient, NetworkRecordProvider, ProgramManager, AleoKeyProvider, initThreadPool } from 'sdk';
import { readFileSync } from "fs";
import path from 'path'

await initThreadPool()

const privateKey = 'APrivateKey1zkp2mYusCV1g2GTYJ1DeUUa4Twgc5Vqh59jYnajJv3Foskv'
const query_url = "http://hk2-6.s.filfox.io:60053"
const networkClient = new AleoNetworkClient(query_url);

const account = new Account({ privateKey });
// Create a key provider that will be used to find public proving & verifying keys for Aleo programs
const keyProvider = new AleoKeyProvider();
keyProvider.useCache(true);

// Create a record provider that will be used to find records and transaction data for Aleo programs
const recordProvider = new NetworkRecordProvider(account, networkClient);

// Initialize a program manager to talk to the Aleo network with the configured key and record providers
const programManager = new ProgramManager(query_url, keyProvider, recordProvider);
programManager.setAccount(account)

// Load the source code for the program to deploy
const programFilePath = path.join(import.meta.dirname, 'leo_program/build/main.aleo');
console.log(`program code file path: ${programFilePath}`)
const programCode = readFileSync(programFilePath, 'utf-8')

// Define a fee to pay to deploy the program
const fee = 3.8;

const tx_id = await programManager.deploy(programCode, fee);
console.log(`tx id of deployment: ${tx_id}`)