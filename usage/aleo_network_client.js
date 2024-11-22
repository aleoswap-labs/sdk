import { AleoNetworkClient } from "sdk"

const client = new AleoNetworkClient("http://hk2-6.s.filfox.io:60053")

// console.log(`lastest height: ${await client.getLatestHeight()}
// `)

// console.log(`lastest block: ${await client.getLatestBlock()}
// `)

// get program code (string)
let programId = 'son_program.aleo'
// const programCode = await client.getProgram(programId)
// console.log(`program: ${programCode}`)

// get program object
// const program = await client.getProgramObject(programId)
// console.log(`program address: ${program.address().to_string()}
// program imports: ${program.getImports()}
// `)

// // get program imports names
// const importsNames = await client.getProgramImportNames(programId)
// console.log(`imports names: ${importsNames}`)

// // get program mapping names
// const mappingNames = await client.getProgramMappingNames('credits.aleo')
// console.log(`mapping names: ${mappingNames}`)

// // get program mapping value
// programId = 'credits.aleo'
// const mappingName = 'account'
// const key = 'aleo1rpsftkqyqcehfnk5hjxq3ppp8dczf4nzx4snrhcgpv5kl9meauzsftf5rs'
// const value = await client.getProgramMappingValue(programId, mappingName, key)
// console.log(`value: ${value}`)

// get transaction
let tx_id = 'at1zmwww63gyhjxx0p2cyepxe8jhlqggsvaga99ekjpajlkw90mnszsadh29z'
const tx = await client.getTransaction(tx_id)
console.log(`transaction: 
    type: ${tx.type}
    id: ${tx.id}
    execution: 
        edition: ${tx.execution.edition}
        transistions:
`)

for (const transition of tx.execution.transitions) {
    console.log(`
        transistion:
            id: ${transition.id}
            program: ${transition.program}
            inputs: ${transition.inputs}
            output: ${transition.outputs}
            proof: ${transition.proof}
            tpk: ${transition.tpk}
            tcm: ${transition.tcm}
            fee: ${transition.number}
`) 
}




