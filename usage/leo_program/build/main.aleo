program leo_program_v0_1.aleo;



mapping m:
	key as address.public;
	value as u32.public;


function test_add:
    input r0 as u32.public;
    input r1 as u32.public;
    add r0 r1 into r2;
    async test_add self.caller r2 into r3;
    output r3 as leo_program_v0_1.aleo/test_add.future;

finalize test_add:
    input r0 as address.public;
    input r1 as u32.public;
    set r1 into m[r0];

