"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { BN } from "bn.js";
import React, { useState } from "react";

function Page() {
  const [activeTab, setActiveTab] = useState("stake");
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  // const [isDepositing, setIsDepositing] = useState(false);
  // const [isWithdrawing, setIsWithdrawing] = useState(false);

  // const { farmBalance, stake } = useMeteoraFarm();
  // const { sendTransaction } = useWallet();
  // const { connection } = useConnection();

  const handleStakeChange = (e) => {
    setStakeAmount(e.target.value);
  };

  const handleUnstakeChange = (e) => {
    setUnstakeAmount(e.target.value);
  };

  const handleDeposit = async () => {
    // try {
    //   setIsDepositing(true);
    //   const stakeTx = await stake(new BN(stakeAmount));
    //   if (!stakeTx) {
    //     throw new Error("Failed to create transaction");
    //   }
    //   const signature = await sendTransaction(stakeTx, connection);
    //   // Wait for confirmation
    //   const confirmation = await connection.confirmTransaction(
    //     signature,
    //     "confirmed"
    //   );
    //   if (confirmation.value.err) {
    //     throw new Error("Transaction failed");
    //   }
    //   setStakeAmount("0");
    // } catch (error) {
    //   console.log("error depositing tokens", error);
    // } finally {
    //   setIsDepositing(false);
    // }
  };

  const handleWithdraw = () => {
    alert(`You have unstaked ${unstakeAmount} Bonk-SOL tokens!`);
    setUnstakeAmount("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-yellow font-saira">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Deposit Bonk-SOL LP token to start earning your liquidity mining
      </h1>

      <div className="bg-yellow bg-opacity-40 p-6 rounded-lg shadow-md w-96">
        <div className="flex justify-between mb-4">
          <button
            className={`w-1/2 text-center py-2 font-medium ${
              activeTab === "stake"
                ? "border-b-2 border-yellow"
                : "text-opacity-50"
            }`}
            onClick={() => setActiveTab("stake")}
          >
            Stake
          </button>
          <button
            className={`w-1/2 text-center py-2 font-medium ${
              activeTab === "unstake"
                ? "border-b-2 border-yellow"
                : "text-opacity-50"
            }`}
            onClick={() => setActiveTab("unstake")}
          >
            Unstake
          </button>
        </div>

        {activeTab === "stake" ? (
          <div>
            <div className="mb-4">
              <label
                htmlFor="stake-input"
                className="block text-sm font-medium mb-2"
              >
                Enter stake amount:
              </label>
              <div className="flex items-center border border-yellow rounded-lg">
                <input
                  id="stake-input"
                  type="number"
                  value={stakeAmount}
                  onChange={handleStakeChange}
                  className="flex-1 bg-transparent border-none outline-none px-4 py-2"
                />
                <span className="px-4 py-2">Bonk-SOL</span>
              </div>
            </div>
            <p className="text-sm mb-4">Balance: 0.00 Bonk-SOL</p>
            <button
              className={`w-full py-2 rounded-lg text-black border-[3px] border-black bg-yellow font-medium `}
              onClick={handleDeposit}
              disabled={!stakeAmount || Number(stakeAmount) <= 0}
            >
              Enter Deposit Amount
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label
                htmlFor="unstake-input"
                className="block text-sm font-medium mb-2"
              >
                Enter amount to unstake:
              </label>
              <div className="flex items-center border border-yellow rounded-lg">
                <input
                  id="unstake-input"
                  type="number"
                  value={unstakeAmount}
                  onChange={handleUnstakeChange}
                  className="flex-1 bg-transparent border-none outline-none px-4 py-2"
                />
                <span className="px-4 py-2">Bonk-SOL</span>
              </div>
            </div>
            {/* <p className="text-sm mb-4">{`Balance: ${farmBalance} Bonk-SOL`}</p> */}
            <button
              className={`w-full py-2 rounded-lg text-black border-[3px] border-black bg-yellow font-medium `}
              onClick={handleWithdraw}
              disabled={!unstakeAmount || Number(unstakeAmount) <= 0}
            >
              Enter Withdraw Amount
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
