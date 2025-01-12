"use client";
import React, { useState } from "react";
import { Connection, Keypair } from "@solana/web3.js";
import useMeteora from "@/lib/hooks/meteora";

function Page() {
  const [isDeposit, setIsDeposit] = useState(true);
  const mainnetConnection = new Connection(
    "https://api.mainnet-beta.solana.com"
  );

  const { getUserBalance, fetchQoute, userBalance, poolInfo } = useMeteora();
  return (
    <div className="h-screen  flex items-center justify-center px-4 ">
      <div className="max-w-screen-xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Value Locked Card */}
        <div className="bg-yellow bg-opacity-30 p-6 rounded-lg shadow-lg lg:col-span-2">
          <h2 className="text-xl font-saira text-yellow mb-4">
            Total Value Locked
          </h2>
          <p className="text-4xl font-saira text-yellow mb-2">
            {poolInfo?.totalLockedLp.toNumber()}
          </p>
          <p className="text-sm font-saira text-yellow mb-6">
            <span className="inline-block px-2 py-1 rounded">
              99.83% permanently locked
            </span>
          </p>

          <hr className="border-yellow border-opacity-50 my-4" />

          {/* Liquidity Allocation */}
          <div className="mt-4 font-saira">
            <h3 className="text-lg text-yellow mb-3">Liquidity Allocation</h3>
            <div className="flex justify-between text-yellow text-sm">
              <div>
                <span>METAV</span>
              </div>
              <div>377,862,688.264296</div>
            </div>
            <div className="flex justify-between text-yellow text-sm mt-2">
              <div>
                <span>SOL</span>
              </div>
              <div>56,416.984574588</div>
            </div>
          </div>

          <hr className="border-yellow border-opacity-50 my-4" />

          {/* Pool Details */}
          <div className="mt-6 font-saira">
            <div className="flex justify-between text-yellow text-md mt-2">
              <div>
                <span>Current Pool Price:</span>
              </div>
              <div>1 METAV ≈ 0.031491 SOL</div>
            </div>

            <div className="flex justify-between text-yellow text-md mb-1">
              <div>
                <span>Virtual Price:</span>
              </div>
              <div>1.17759461</div>
            </div>
            <div className="flex justify-between text-yellow text-md mb-1">
              <div>
                <span>24h Volume:</span>
              </div>
              <div>$1,125,716.25</div>
            </div>
            <div className="flex justify-between text-yellow text-sm mb-1">
              <div>
                <span>24h Yield:</span>
              </div>
              <div>$1,292.97</div>
            </div>
            <div className="flex justify-between text-yellow text-md mb-1">
              <div>
                <span>24h Fee:</span>
              </div>
              <div>$22,514.32</div>
            </div>
            <div className="flex justify-between text-yellow text-md mb-1">
              <div>
                <span>Liquidity Provider Fee:</span>
              </div>
              <div>2%</div>
            </div>
            <div className="flex justify-between text-yellow text-md mb-1">
              <div>
                <span>Protocol Fee:</span>
              </div>
              <div>0.4%</div>
            </div>
          </div>

          <hr className="border-yellow border-opacity-50 my-4" />

          {/* Pool Links */}
          <div className="mt-6 font-saira">
            <h3 className="text-yellow text-lg mb-3">Pool Chart</h3>
            <div className="flex gap-2">
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-2 w-32 text-center"
                href="https://www.birdeye.so"
                target="_blank"
                rel="noopener noreferrer"
              >
                Birdeye
              </a>
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-2 w-32 text-center"
                href="https://www.geckoterminal.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GeckoTerminal
              </a>
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-2 w-32 text-center"
                href="https://www.dexscreener.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                DEXScreener
              </a>
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-2 w-32 text-center"
                href="https://www.dextools.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                DEXTools
              </a>
            </div>
          </div>

          <hr className="border-yellow border-opacity-50 my-4" />

          {/* Trading Platforms */}
          <div className="mt-6 font-saira">
            <h3 className="text-yellow text-lg mb-3">
              Supported Trading Platforms
            </h3>
            <div className="flex gap-2 flex-wrap max-w-full">
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-1 w-auto text-center"
                href="https://www.ape.pro"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ape.Pro
              </a>
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-1 w-auto text-center"
                href="https://www.bananagun.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Banana Gun
              </a>
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-1 w-auto text-center"
                href="https://www.bonkbot.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                BONKbot
              </a>
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-1 w-auto text-center"
                href="https://www.fluxbot.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fluxbot
              </a>
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-1 w-auto text-center"
                href="https://www.jupiter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jupiter
              </a>
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-1 w-auto text-center"
                href="https://www.metasolanabot.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                MetaSolanaBot
              </a>
              <a
                className="text-yellow border border-yellow p-1 rounded block mb-1 w-auto text-center"
                href="https://www.photon.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Photon
              </a>
              <a
                className="text-yellow border border-yellow p-1 rounded mb-1 w-auto text-center"
                href="https://www.trojan.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trojan
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Your Deposit Card */}
          <div className="bg-yellow bg-opacity-30 p-6 rounded-lg shadow-lg font-saira">
            <h2 className="text-xl text-yellow mb-2">Your Deposit</h2>
            <p className="text-2xl text-yellow font-bold">$0.00</p>
            <p className="text-sm text-yellow">{userBalance} METAV-SOL</p>
          </div>

          {/* Deposit Card */}
          <div className="bg-yellow bg-opacity-30 p-6 rounded-lg shadow-lg font-saira">
            {/* Buttons to toggle between Deposit and Withdraw */}
            <div className="flex mb-4">
              <div className="flex space-x-4">
                <span
                  onClick={() => setIsDeposit(true)}
                  className={`cursor-pointer ${
                    isDeposit ? "text-[#ffed2b] underline" : "text-yellow"
                  }`}
                >
                  Deposit
                </span>
                <span
                  onClick={() => setIsDeposit(false)}
                  className={`cursor-pointer ${
                    !isDeposit ? "text-[#F9E92B] underline" : "text-yellow"
                  }`}
                >
                  Withdraw
                </span>
              </div>
            </div>

            {/* Conditional rendering based on the state */}
            {isDeposit ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="metav"
                    className="block text-sm mb-2 text-yellow"
                  >
                    METAV
                  </label>
                  <input
                    type="number"
                    id="metav"
                    className="w-full px-4 py-2 rounded bg-transparent border border-yellow text-yellow"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sol"
                    className="block text-sm mb-2 text-yellow"
                  >
                    SOL
                  </label>
                  <input
                    type="number"
                    id="sol"
                    className="w-full px-4 py-2 rounded bg-transparent border border-yellow text-yellow"
                  />
                </div>
                <button className="mt-4 px-4 md:px-6 py-1.5 md:py-2 rounded-xl w-full bg-[#F9E92B] text-black border-[3px] border-black font-saira font-semibold text-base md:text-xl">
                  Deposit
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-yellow">
                <div>
                  <label htmlFor="withdrawMetav" className="block text-sm mb-2">
                    METAV
                  </label>
                  <input
                    type="number"
                    id="withdrawMetav"
                    className="w-full px-4 py-2 rounded bg-transparent border border-yellow text-yellow"
                  />
                </div>
                <div>
                  <label htmlFor="withdrawSol" className="block text-sm mb-2">
                    SOL
                  </label>
                  <input
                    type="number"
                    id="withdrawSol"
                    className="w-full px-4 py-2 rounded bg-transparent  border border-yellow text-yellow"
                  />
                </div>
                <button className="mt-4 px-4 md:px-6 py-1.5 md:py-2 rounded-xl w-full bg-[#F9E92B] text-black border-[3px] border-black font-saira font-semibold text-base md:text-xl">
                  Withdraw
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <h1 className="text-xl  font-bold mb-4">Test Deposit to Pool</h1>
      <button
        onClick={depositToPool}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Deposit to Pool
      </button> */}
    </div>
  );
}

export default Page;
