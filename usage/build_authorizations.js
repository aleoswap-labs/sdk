import { Account, ProgramManager, AleoNetworkClient, initThreadPool } from "sdk";

const privateKey = 'APrivateKey1zkp2mYusCV1g2GTYJ1DeUUa4Twgc5Vqh59jYnajJv3Foskv'
const queryURL = "http://hk2-6.s.filfox.io:60053"
const programId = "son_program.aleo"
const functionName = "call_father"
// const programId = "father_program.aleo"
// const functionName = "father_here"
// const programId = "credits.aleo"
// const functionName = "transfer_public"
const inputs = ["4u64"];
const fee = 0.08132

await initThreadPool()

const account = new Account({ privateKey });
console.log(`account address: ${account.address().to_string()}`)

const networkClient = new AleoNetworkClient(queryURL)
const programManager = new ProgramManager();
programManager.setAccount(account)

// Get program
const program = await networkClient.getProgramObject(programId)

// Get program imports
let importPrograms;
if (program.getImports().length > 0) {
    importPrograms = await networkClient.getProgramImports(programId)
}
// Build anthorization and public fee authorization in json
let authorizations_json = await programManager.buildAuthorizations({
    program,
    imports: importPrograms,
    functionName,
    fee,
    inputs,
});

console.log(`result: ${authorizations_json}`)