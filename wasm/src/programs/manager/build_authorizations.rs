use super::{wasm_bindgen, ProgramManager, ProvingKey, VerifyingKey};

use js_sys::{Array, Object};

use crate::{log, OfflineQuery, PrivateKey, RecordPlaintext};

#[wasm_bindgen]
impl ProgramManager {
    #[wasm_bindgen(js_name = buildAuthorizations)]
    #[allow(clippy::too_many_arguments)]
    pub async fn build_authorizations(
        private_key: &PrivateKey,
        program: &str,
        function: &str,
        inputs: Array,
        fee_credits: f64,
        fee_record: Option<RecordPlaintext>,
        url: Option<String>,
        imports: Option<Object>,
        proving_key: Option<ProvingKey>,
        verifying_key: Option<VerifyingKey>,
        fee_proving_key: Option<ProvingKey>,
        fee_verifying_key: Option<VerifyingKey>,
        offline_query: Option<OfflineQuery>,
    ) {
        log("enter wasm.ProgramManger.build_authorizations()");
    }
}
