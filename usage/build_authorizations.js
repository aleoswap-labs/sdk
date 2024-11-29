import { Account, ProgramManager, AleoNetworkClient, AleoKeyProvider, NetworkRecordProvider, initThreadPool } from "sdk";

await initThreadPool()

const privateKey = 'APrivateKey1zkp2mYusCV1g2GTYJ1DeUUa4Twgc5Vqh59jYnajJv3Foskv'
const account = new Account({ privateKey });
console.log(`account address: ${account.address().to_string()}`)

const queryURL = "http://hk2-6.s.filfox.io:60053"
const networkClient = new AleoNetworkClient(queryURL)

const programManager = new ProgramManager(queryURL);
programManager.setAccount(account)

const programId = "son_program.aleo"
const functionName = "call_father"
const fee = 0.08133

// get program
const program = await networkClient.getProgramObject(programId)

// get program imports
let importPrograms;
if (program.getImports().length > 0) {
    importPrograms = await networkClient.getProgramImports(programId)
}




let authorizations_json = await programManager.buildAuthorizations({
    program: program,
    imports: importPrograms,
    functionName: functionName,
    fee: fee,
    inputs: ["3u64"], // Inputs matching the function definition
});

console.log(`result: ${authorizations_json}`)