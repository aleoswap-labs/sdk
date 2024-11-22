import { Account, ProgramManager, initThreadPool } from 'sdk';
import { readFileSync } from "fs";
import path from 'path'

await initThreadPool()

const programFilePath = path.join(import.meta.dirname, 'leo_program/build/main.aleo');
console.log(`program code file path: ${programFilePath}`)

// Load the source code for the program
const programCode = readFileSync(programFilePath, 'utf-8')
const programManager = new ProgramManager();

// Create a temporary account for the execution of the program
const account = new Account();
programManager.setAccount(account);

const functionName = "test_add"
const inputs = ["1u32", "1024u32"]
// Get the response and ensure that the program executed correctly
const executionResponse = await programManager.run(programCode, functionName, inputs);
const result = executionResponse.getOutputs();
console.log(`result:
    ${result}`)