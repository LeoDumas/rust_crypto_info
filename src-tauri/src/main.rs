// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod tools;
mod utils;
use crate::tools::bitcoin::get_bitcoin_price;

use serde_json::{self, json, Value};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_btc_price])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn fetch_btc_price() -> Result<Value, String> {
    match get_bitcoin_price().await {
        Ok(btc_price) => Ok(json!({
            "success": true,
            "data": btc_price
        })),
        Err(e) => Ok(json!({
            "success": false,
            "error": format!("Error fetching Bitcoin price: {}", e)
        })),
    }
}
