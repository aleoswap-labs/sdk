import { Account } from "sdk";


// 1. recover account with seed: 8bit * 32 = 256
const seed = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
let account = new Account({ seed })

console.log(`private key: ${account.privateKey().to_string()}
view key: ${account.viewKey().to_string()}
address: ${account.address().to_string()}
`)

// 2. recover account with private key string
const privateKey = "APrivateKey1zkp2mYusCV1g2GTYJ1DeUUa4Twgc5Vqh59jYnajJv3Foskv"
account = new Account({ privateKey })
console.log(`private key: ${account.privateKey().to_string()}
view key: ${account.viewKey().to_string()}
address: ${account.address().to_string()}
`)

// 3. sign a message
const message = Uint8Array.from(Buffer.from('This is Michael.W'))
const signature = account.sign(message)
console.log(`signature: ${signature.to_string()}
`)

// 4. verify a signature
const res = account.verify(message, signature)
console.log(`result: ${res}
`)

// 5. encrypt the account's private key with a password
const password = "12345678"
const ciphertext = account.encryptAccount(password)
console.log(`ciphertext: ${ciphertext}
`)

// 6. recover the account from ciphertext and password
let newAccount = Account.fromCiphertext(ciphertext, password)
console.log(`private key: ${newAccount.privateKey().to_string()}
view key: ${newAccount.viewKey().to_string()}
address: ${newAccount.address().to_string()}
`)

// 7. decrypt a record in ciphertext form into plaintext
const recordCiphertext = 'record1qyqsq62hcehwh8pq9yp56ctlgts3werhdkxw3jj7slrxvp87gkveg3q9qyxx66trwfhkxun9v35hguerqqpqzqqewer5vdd733tdcvml9wzczpwx3p9jmzqavsq2pugc7q8lsrn8pfw8853tn00678kf4sxwyxkahunv08rawfnlxn2txcn76e24wcfs2d486rl'
const record = account.decryptRecord(recordCiphertext)
console.log(`record: ${record}
`)

// 8. decrypt an array of records in ciphertext form into plaintext
const recordCiphertexts = [
    'record1qyqsq62hcehwh8pq9yp56ctlgts3werhdkxw3jj7slrxvp87gkveg3q9qyxx66trwfhkxun9v35hguerqqpqzqqewer5vdd733tdcvml9wzczpwx3p9jmzqavsq2pugc7q8lsrn8pfw8853tn00678kf4sxwyxkahunv08rawfnlxn2txcn76e24wcfs2d486rl',
    'record1qyqsqaudwsnuwhxezajkf07d2qmeryn4wy4crl6svgttp350cjj8k0c3qyxx66trwfhkxun9v35hguerqqpqzqzp49t6qhfz4jn4vsjul9w02ghhwmwcj2m0jhpu4wup5c8mgzp2plkausjt570jnlecltnrhcuvdmxj37wpqy4rjgry7lp9pyqgcdfq22yp3am'
]
const records = account.decryptRecords(recordCiphertexts)
console.log(`records: ${records}
`)

// 9. check whether the account owns a ciphertext record
console.log(`owns: ${account.ownsRecordCiphertext(recordCiphertext)}
owns: ${(new Account()).ownsRecordCiphertext(recordCiphertext)}
`)





