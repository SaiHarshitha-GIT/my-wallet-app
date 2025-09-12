"use client";

import React, { useState } from "react";
import { BrowserProvider } from "ethers";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleWalletConnect = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask not detected");
      return;
    }
    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (error) {
      alert("Failed to connect wallet");
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Connect Your Wallet
        </h1>
        <button
          onClick={handleWalletConnect}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
        >
          Connect Wallet
        </button>
        {walletAddress && (
          <p className="break-all text-sm text-gray-700 dark:text-gray-300">
            Connected address: <strong>{walletAddress}</strong>
          </p>
        )}
      </div>
    </main>
  );
}
