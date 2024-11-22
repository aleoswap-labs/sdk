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

const program_id = "son_program.aleo"
const function_name = "call_father"
const fee = 0.08133

const keySearchParams = { cacheKey: `${program_id}:${function_name}` };
console.log("Key search parameters set: ", keySearchParams);

// Execute the program using the options provided inline
const tx_id = await programManager.execute({
    programName: program_id,
    functionName: function_name,
    fee: fee,
    privateFee: false, // Assuming a value for privateFee
    inputs: ["9u64"], // Inputs matching the function definition
    keySearchParams: keySearchParams,
});

console.log(`tx id: ${tx_id}`)

