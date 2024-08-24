use crate::utils::env_values::get_crypto_compare_api_key;
use reqwest;
use serde_json::Value;

pub async fn get_bitcoin_price() -> Result<Value, Box<dyn std::error::Error>> {
    let api_key = get_crypto_compare_api_key();
    let uri = format!(
        "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR&api_key={}",
        api_key
    );

    let resp = reqwest::get(&uri).await?;

    if resp.status().is_success() {
        let json: Value = resp.json().await?;
        Ok(json)
    } else {
        Err(format!("Request failed with status: {}", resp.status()).into())
    }
}
