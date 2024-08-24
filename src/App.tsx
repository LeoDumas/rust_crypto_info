import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

interface BitcoinPrice {
  success: boolean;
  data?: {
    USD: number;
    JPY: number;
    EUR: number;
  };
  error?: string;
}

function App() {
  const [btcPrice, setBtcPrice] = useState<BitcoinPrice | null>(null);
  const [loading, setLoading] = useState(false);

  async function getBtcPrice() {
    setLoading(true);
    try {
      const result = await invoke<BitcoinPrice>("fetch_btc_price");
      setBtcPrice(result);
    } catch (error) {
      console.error(error);
      setBtcPrice({ success: false, error: "Failed to fetch Bitcoin price" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6 text-center mx-auto">
            Bitcoin Price Checker
          </h2>
          <div className="flex justify-center">
            <button
              className={`btn btn-primary btn-lg ${loading ? "loading" : ""}`}
              onClick={getBtcPrice}
              disabled={loading}
            >
              {loading ? "Fetching..." : "Get Latest Price"}
            </button>
          </div>
          {btcPrice && (
            <div className="mt-8 ">
              {btcPrice.success ? (
                <div className="space-y-4">
                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">USD</div>
                      <div className="stat-value text-primary">
                        ${btcPrice.data?.USD.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">EUR</div>
                      <div className="stat-value text-secondary">
                        €{btcPrice.data?.EUR.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">JPY</div>
                      <div className="stat-value text-accent">
                        ¥{btcPrice.data?.JPY.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-error shadow-lg mt-4">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Error: {btcPrice.error}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
