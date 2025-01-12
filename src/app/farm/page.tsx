"use client";
import React from "react";
import AmmImpl, { MAINNET_POOL } from "@mercurial-finance/dynamic-amm-sdk";
import { Connection, Keypair } from "@solana/web3.js";
import { Node, AnchorProvider } from "@coral-xyz/anchor";
import { YuzuWallet } from "@/lib/wallet";

function Page() {
  const mainnetConnection = new Connection(
    "https://api.mainnet-beta.solana.com"
  );
  const mockWallet = new YuzuWallet(new Keypair());
  const provider = new AnchorProvider(mainnetConnection, mockWallet, {
    commitment: "confirmed",
  });

  const depositToPool = async () => {
    try {
      const constantProductPool = await AmmImpl.create(
        mainnetConnection,
        MAINNET_POOL.USDC_SOL
      );
      const stablePool = await AmmImpl.create(
        mainnetConnection,
        MAINNET_POOL.USDT_USDC
      );
      const lpSupply = await constantProductPool.getLpSupply();

      console.log("lpSupply", lpSupply);
    } catch (error) {
      console.log("Error depositing to pool:", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Test Deposit to Pool</h1>
      <button
        onClick={depositToPool}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Deposit to Pool
      </button>
    </div>
  );
}

export default Page;
