import { Account, ProgramManager, AleoNetworkClient, AleoKeyProvider, NetworkRecordProvider, initThreadPool } from "sdk";

await initThreadPool()

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

console.log("build auths")

let res = await programManager.buildAuthorizations({
    programName: program_id,
    functionName: function_name,
    fee: fee,
    privateFee: false, // Assuming a value for privateFee
    inputs: ["9u64"], // Inputs matching the function definition
    keySearchParams: keySearchParams,
});

console.log(`result: ${res}`)



// // Create a temporary account for the execution of the program
// const account = new Account();
// programManager.setAccount(account);

// const functionName = "test_add"
// const inputs = ["1u32", "1024u32"]
// // Get the response and ensure that the program executed correctly
// const executionResponse = await programManager.run(programCode, functionName, inputs);
// const result = executionResponse.getOutputs();
// console.log(`result:
//     ${result}`)