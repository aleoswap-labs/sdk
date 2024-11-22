// The 'leo_program_v0_1' program.
program leo_program_v0_1.aleo {
    mapping m:  address => u32;

    async transition test_add(public a: u32, public b: u32) -> Future {
        let sum: u32 = a + b;
        return finalize_test(self.caller, sum);
    }

    async function finalize_test(
        addr: address,
        sum: u32,
    ){
        m.set(addr, sum);
    }
}
