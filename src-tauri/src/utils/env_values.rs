extern crate dotenv;
use dotenv::dotenv;
use std::env;

pub fn get_crypto_compare_api_key() -> String {
    dotenv().ok();
    let api_key = env::var("CRYPTOCOMPARE_API_KEY").expect("Failed to get api key");
    return api_key;
}
