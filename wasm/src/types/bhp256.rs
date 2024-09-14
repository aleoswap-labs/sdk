use wasm_bindgen::prelude::wasm_bindgen;

use snarkvm::circuit::AleoV0;
use snarkvm_circuit_program::Literal;
use snarkvm_console_network::{TestnetV0, ToBits};
use snarkvm_console_program::{LiteralType, Network, Value};
use std::str::FromStr;

#[wasm_bindgen]
#[derive(Debug)]
pub struct Bhp256;

enum Errors {
    ErrParseFromJsonString,
    ErrHashBhp256,
    ErrHashToGroupBhp256,
    ErrGroupToLiteral,
    ErrLiteralToU128,
    ErrNoDotInTruncation,
    ErrInTruncation,
}

impl Errors {
    fn to_string(&self) -> String {
        match self {
            Self::ErrParseFromJsonString => String::from("error: parse from json string"),
            Self::ErrHashBhp256 => String::from("error: hash with bph256"),
            Self::ErrHashToGroupBhp256 => String::from("error: hash to group with bhp256"),
            Self::ErrGroupToLiteral => String::from("error: group to literal"),
            Self::ErrLiteralToU128 => String::from("error: literal to u128"),
            Self::ErrNoDotInTruncation => String::from("error: no dot in truncation"),
            Self::ErrInTruncation => String::from("error: truncation"),
        }
    }
}

#[wasm_bindgen]
impl Bhp256 {
    #[wasm_bindgen(js_name = "hashToFieldString")]
    pub fn hash_to_field_string(data: &str) -> Result<String, String> {
        let v = Value::<TestnetV0>::from_str(data).map_err(|_| Errors::ErrParseFromJsonString.to_string())?;
    Ok(TestnetV0::hash_bhp256(&v.to_bits_le()).map_err(|_| Errors::ErrHashBhp256.to_string())?.to_string())
    }

    #[wasm_bindgen(js_name = "hashToU128String")]
    pub fn hash_to_u128_string(data: &str) -> Result<String, String> {
        let v = Value::<TestnetV0>::from_str(data).map_err(|_| Errors::ErrParseFromJsonString.to_string())?;
        let group = TestnetV0::hash_to_group_bhp256(&v.to_bits_le()).map_err(|_| Errors::ErrHashToGroupBhp256.to_string())?;
        let literal = Literal::<AleoV0>::from_str(&group.to_string()).map_err(|_| Errors::ErrGroupToLitera.to_string()l)?;
    
        let truncation = literal.cast_lossy(LiteralType::U128).map_err(|_| Errors::ErrLiteralToU128.to_string())?.to_string();
        let index = truncation.find('.').ok_or(Errors::ErrNoDotInTruncation.to_string())?;
        Ok(truncation.get(0..index).ok_or(Errors::ErrInTruncation.to_string())?.to_string())
    }
}
