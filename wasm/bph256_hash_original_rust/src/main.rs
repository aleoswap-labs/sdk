use snarkvm::circuit::AleoV0;
use snarkvm_circuit_program::Literal;
use snarkvm_console_network::{TestnetV0, ToBits};
use snarkvm_console_program::{LiteralType, Network, Value};
use std::str::FromStr;

#[derive(Debug, PartialEq)]
enum Errors {
    ErrParseFromJsonString,
    ErrHashBhp256,
    ErrHashToGroupBhp256,
    ErrGroupToLiteral,
    ErrLiteralToU128,
    ErrNoDotInTruncation,
    ErrInTruncation,
}

fn bhp256_hash_to_field(data: &str) -> Result<String, Errors> {
    let v = Value::<TestnetV0>::from_str(data).map_err(|_| Errors::ErrParseFromJsonString)?;
    Ok(TestnetV0::hash_bhp256(&v.to_bits_le()).map_err(|_| Errors::ErrHashBhp256)?.to_string())
}

fn bhp256_hash_to_u128(data: &str) -> Result<String, Errors> {
    let v = Value::<TestnetV0>::from_str(data).map_err(|_| Errors::ErrParseFromJsonString)?;
    let group = TestnetV0::hash_to_group_bhp256(&v.to_bits_le()).map_err(|_| Errors::ErrHashToGroupBhp256)?;
    let literal = Literal::<AleoV0>::from_str(&group.to_string()).map_err(|_| Errors::ErrGroupToLiteral)?;

    let truncation = literal.cast_lossy(LiteralType::U128).map_err(|_| Errors::ErrLiteralToU128)?.to_string();
    let index = truncation.find('.').ok_or(Errors::ErrNoDotInTruncation)?;
    Ok(truncation.get(0..index).ok_or(Errors::ErrInTruncation)?.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bhp256_hash_to_field() {
        let input_msg =  "{base:aleo1qdtufktf3xj78qdxh9s9jerelrmjukt7rn5l04nx8nhr7k8spcpsyf9eye,creator:aleo1qdtufktf3xj78qdxh9s9jerelrmjukt7rn5l04nx8nhr7k8spcpsyf9eye,salt:1u128}";
        let expect_field_string =
            "2898017615106732785313906870732724998551332966063696887058209753231147472995field".to_owned();
        assert_eq!(bhp256_hash_to_field(input_msg), Ok(expect_field_string));

        let invalid_msg =  "base:aleo1qdtufktf3xj78qdxh9s9jerelrmjukt7rn5l04nx8nhr7k8spcpsyf9eye,creator:aleo1qdtufktf3xj78qdxh9s9jerelrmjukt7rn5l04nx8nhr7k8spcpsyf9eye,salt:1u128}";
        assert_eq!(bhp256_hash_to_field(invalid_msg), Err(Errors::ErrParseFromJsonString));
    }

    #[test]
    fn test_bhp256_hash_to_u128() {
        let input_msg = "{token_a: 1024field,token_b: 2048field}";
        let expect_u128_string = "267978147488879875654732292248484772718u128".to_owned();
        assert_eq!(bhp256_hash_to_u128(input_msg), Ok(expect_u128_string));

        let invalid_msg = "token_a: 1024field,token_b: 2048field}";
        assert_eq!(bhp256_hash_to_u128(invalid_msg), Err(Errors::ErrParseFromJsonString));
    }
}
