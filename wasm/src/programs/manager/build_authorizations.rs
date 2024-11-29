use super::{wasm_bindgen, ProcessNative, ProgramManager, ProgramNative};
use crate::{
    build_authorization,
    build_public_fee_authorization,
    log,
    process_inputs,
    types::native::{CurrentAleo, IdentifierNative},
    PrivateKey,
};

use js_sys::{Array, Object};
use rand::{rngs::StdRng, SeedableRng};
use std::str::FromStr;

#[wasm_bindgen]
impl ProgramManager {
    #[wasm_bindgen(js_name = buildAuthorizations)]
    pub async fn build_authorizations(
        private_key: &PrivateKey,
        program: &str,
        function: &str,
        inputs: Array,
        fee_credits: f64,
        imports: Option<Object>,
    ) -> Result<String, String> {
        log(&format!("Build authorization for function: {function}"));
        let fee_microcredits = (fee_credits * 1_000_000.0) as u64;
        let mut process_native = ProcessNative::load_web().map_err(|err| err.to_string())?;
        let process = &mut process_native;

        log("Check program imports are valid and add them to the process");
        let program_native = ProgramNative::from_str(program).map_err(|e| e.to_string())?;
        ProgramManager::resolve_imports(process, &program_native, imports)?;
        let rng = &mut StdRng::from_entropy();

        // build authorization
        let authorization = build_authorization!(
            process,
            process_inputs!(inputs),
            program,
            function,
            private_key,
            rng
        );

        // build fee authorization
        let execution_id = authorization.to_execution_id().map_err(|e| e.to_string())?;
        let fee_authorization = build_public_fee_authorization!(
            process,
            private_key,
            fee_microcredits,
            execution_id,
            rng
        );

        let authorizations_json =
            serde_json::to_string(&[authorization, fee_authorization]).map_err(|e| e.to_string())?;
        return Ok(authorizations_json);
    }
}
