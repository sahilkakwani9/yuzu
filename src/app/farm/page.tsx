"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import useMeteora from "@/lib/hooks/meteora";
import { BN } from "bn.js";
import { debounce } from "lodash";
import { Loader2 } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

function Page() {
  const [isDeposit, setIsDeposit] = useState(true);
  const mainnetConnection = new Connection(
    "https://api.mainnet-beta.solana.com"
  );
  const {
    getUserBalance,
    fetchQoute,
    userBalance,
    poolInfo,
    createDepositTransaction,
    fetchWithdrawQoute,
    createWithdrawTransaction,
  } = useMeteora();
  const { sendTransaction } = useWallet();

  const [usdcAmount, setUsdcAmount] = useState("");
  const [solAmount, setSolAmount] = useState("");
  const [lpAmount, setLPAmount] = useState("");
  const [isUpdatingQuote, setIsUpdatingQuote] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  const [currentQuote, setCurrentQuote] = useState<{
    poolTokenAmountOut: any;
    tokenAInAmount: any;
    tokenBInAmount: any;
  } | null>(null);

  const [currentWithdrawQoute, setCurrentWIthdrawQoute] = useState<{
    poolTokenAmountIn: any;
    tokenAOutAmount: any;
    tokenBOutAmount: any;
  } | null>(null);
  const updateQuotes = async () => {
    if (!usdcAmount && !solAmount) return;

    setIsUpdatingQuote(true);
    try {
      if (usdcAmount) {
        const usdcBN = new BN(Number(usdcAmount) * 1000000);
        const quote = await fetchQoute(usdcBN, false);
        if (quote) {
          setCurrentQuote(quote);
          const solValue = quote.tokenBInAmount.toNumber() / LAMPORTS_PER_SOL;
          setSolAmount(solValue.toString());
        }
      } else if (solAmount) {
        const solBN = new BN(Number(solAmount) * LAMPORTS_PER_SOL);
        const quote = await fetchQoute(solBN, true);
        if (quote) {
          setCurrentQuote(quote);
          const usdcValue = quote.tokenAInAmount.toNumber() / 1000000;
          setUsdcAmount(usdcValue.toString());
        }
      }
      setLastUpdateTime(Date.now());
    } catch (error) {
      console.error("Error updating quotes:", error);
    } finally {
      setIsUpdatingQuote(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (usdcAmount || solAmount) {
        updateQuotes();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [usdcAmount, solAmount]);

  const debouncedFetchUSDCQuote = useCallback(
    debounce(async (amount: string) => {
      if (!amount || isNaN(Number(amount))) return;

      setIsUpdatingQuote(true);
      const usdcBN = new BN(Number(amount) * 1000000);

      try {
        const quote = await fetchQoute(usdcBN, false);
        if (quote) {
          setCurrentQuote(quote);
          setLastUpdateTime(Date.now());
        }
      } catch (error) {
        console.error("Error fetching LP quote:", error);
      } finally {
        setIsUpdatingQuote(false);
      }
    }, 500),
    [fetchQoute]
  );

  const debouncedFetchSOLQuote = useCallback(
    debounce(async (amount: string) => {
      if (!amount || isNaN(Number(amount))) return;

      setIsUpdatingQuote(true);
      const solBN = new BN(Number(amount) * LAMPORTS_PER_SOL);

      try {
        const quote = await fetchQoute(solBN, true);
        if (quote) {
          setCurrentQuote(quote);
          const usdcValue = quote.tokenAInAmount.toNumber() / 1000000;
          setUsdcAmount(usdcValue.toString());
          setLastUpdateTime(Date.now());
        }
      } catch (error) {
        console.error("Error fetching SOL quote:", error);
      } finally {
        setIsUpdatingQuote(false);
      }
    }, 500),
    [fetchQoute]
  );
  const debouncedFetchLPQuote = useCallback(
    debounce(async (amount: string) => {
      if (!amount || isNaN(Number(amount))) return;

      setIsUpdatingQuote(true);
      const lpBN = new BN(Number(amount) * LAMPORTS_PER_SOL);

      try {
        const quote = await fetchWithdrawQoute(lpBN);
        console.log("qoute", quote);

        if (quote) {
          setCurrentWIthdrawQoute(quote);
        }
      } catch (error) {
        console.error("Error fetching SOL quote:", error);
      } finally {
        setIsUpdatingQuote(false);
      }
    }, 500),
    [fetchQoute]
  );
  const handleDeposit = async () => {
    if (!currentQuote || isUpdatingQuote || isDepositing) return;

    setIsDepositing(true);
    try {
      // Get the latest quote before proceeding
      await updateQuotes();

      if (!currentQuote) {
        throw new Error("No quote available");
      }

      const transaction = await createDepositTransaction(
        currentQuote.tokenAInAmount,
        currentQuote.tokenBInAmount,
        currentQuote.poolTokenAmountOut
      );

      if (!transaction) {
        throw new Error("Failed to create transaction");
      }

      // Send the transaction
      const signature = await sendTransaction(transaction, mainnetConnection);

      // Wait for confirmation
      const confirmation = await mainnetConnection.confirmTransaction(
        signature,
        "confirmed"
      );

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      // Clear the form after successful deposit
      setUsdcAmount("");
      setSolAmount("");
      setCurrentQuote(null);

      // Refresh user balance
      await getUserBalance();
    } catch (error) {
      console.error("Error during deposit:", error);
      // You might want to show an error notification here
    } finally {
      setIsDepositing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!currentWithdrawQoute || isUpdatingQuote || isWithdrawing) return;

    setIsWithdrawing(true);
    try {
      if (!currentWithdrawQoute) {
        throw new Error("No quote available");
      }

      const transaction = await createWithdrawTransaction(
        currentWithdrawQoute.poolTokenAmountIn,
        currentWithdrawQoute.tokenAOutAmount,
        currentWithdrawQoute.tokenBOutAmount
      );

      if (!transaction) {
        throw new Error("Failed to create transaction");
      }

      // Send the transaction
      const signature = await sendTransaction(transaction, mainnetConnection);

      // Wait for confirmation
      const confirmation = await mainnetConnection.confirmTransaction(
        signature,
        "confirmed"
      );

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      setLPAmount("");
      setCurrentWIthdrawQoute(null);

      // Refresh user balance
      await getUserBalance();
    } catch (error) {
      console.error("Error during deposit:", error);
      // You might want to show an error notification here
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleUsdcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsdcAmount(value);
    if (value) {
      debouncedFetchUSDCQuote(value);
    } else {
      setSolAmount("");
      setCurrentQuote(null);
    }
  };

  const handleSolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSolAmount(value);
    if (value) {
      debouncedFetchSOLQuote(value);
    } else {
      setUsdcAmount("");
      setCurrentQuote(null);
    }
  };

  const handleLPChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    let value: string;

    if (typeof e === "string") {
      value = e;
    } else {
      value = e.target.value;
    }

    setLPAmount(value);

    if (value) {
      debouncedFetchLPQuote(value);
    }
  };

  const getTimeSinceUpdate = () => {
    const seconds = Math.floor((Date.now() - lastUpdateTime) / 1000);
    return `Updated ${seconds}s ago`;
  };

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
                <span>USDC</span>
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
              <div>1 USDC ≈ 0.031491 SOL</div>
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
            <p className="text-sm text-yellow">{userBalance} USDC-SOL</p>
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
                <div className="relative">
                  <label
                    htmlFor="USDC"
                    className="block text-sm mb-2 text-yellow"
                  >
                    USDC
                  </label>
                  <input
                    type="number"
                    id="USDC"
                    value={usdcAmount}
                    onChange={handleUsdcChange}
                    className="w-full px-4 py-2 rounded bg-transparent border border-yellow text-yellow"
                    placeholder="Enter USDC amount"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="sol"
                    className="block text-sm mb-2 text-yellow"
                  >
                    SOL
                  </label>
                  <input
                    type="number"
                    id="sol"
                    value={solAmount}
                    onChange={handleSolChange}
                    className="w-full px-4 py-2 rounded bg-transparent border border-yellow text-yellow"
                    placeholder="Enter SOL amount"
                  />
                </div>

                {/* Quote update indicator */}
                <div className="flex items-center justify-between text-xs text-yellow">
                  {isUpdatingQuote ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Updating quote...</span>
                    </div>
                  ) : (
                    <span>
                      {(usdcAmount || solAmount) && getTimeSinceUpdate()}
                    </span>
                  )}
                </div>
                <button
                  className="mt-4 px-4 md:px-6 py-1.5 md:py-2 rounded-xl w-full bg-[#F9E92B] text-black border-[3px] border-black font-saira font-semibold text-base md:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdatingQuote || isDepositing || !currentQuote}
                  onClick={handleDeposit}
                >
                  {isDepositing ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Depositing...</span>
                    </div>
                  ) : isUpdatingQuote ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Updating Quote...</span>
                    </div>
                  ) : (
                    "Deposit"
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-yellow">
                <div>
                  <label htmlFor="withdrawSol" className="block text-sm mb-2">
                    USDC - SOL
                  </label>
                  <input
                    type="number"
                    id="withdraw USDC - SOL"
                    placeholder="withdraw USDC - SOL"
                    className="w-full px-4 py-2 rounded bg-transparent  border border-yellow text-yellow"
                    value={lpAmount}
                    onChange={handleLPChange}
                  />
                </div>
                <div className="flex items-center justify-between p-2 bg-[#ffffff10] rounded-lg">
                  <span className="text-sm">
                    Balance: {userBalance || "0.00000000"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (userBalance) {
                          const halfBalance = (userBalance / 2).toFixed(8);
                          handleLPChange(halfBalance);
                        }
                      }}
                      className="px-3 py-1 text-xs bg-[#ffffff20] hover:bg-[#ffffff30] rounded transition-colors"
                    >
                      HALF
                    </button>
                    <button
                      onClick={() => {
                        if (userBalance) {
                          handleLPChange(userBalance.toString());
                        }
                      }}
                      className="px-3 py-1 text-xs bg-[#ffffff20] hover:bg-[#ffffff30] rounded transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                {currentWithdrawQoute && (
                  <div className="p-4 bg-white bg-opacity-10 rounded-md mb-4">
                    <h3 className="text-yellow font-bold mb-2">
                      Withdraw Quote
                    </h3>
                    <p className="text-yellow text-sm">
                      <span className="font-semibold">USDC Out:</span>{" "}
                      {currentWithdrawQoute.tokenAOutAmount.toNumber() /
                        1000000}{" "}
                      USDC
                    </p>
                    <p className="text-yellow text-sm">
                      <span className="font-semibold">SOL Out:</span>{" "}
                      {currentWithdrawQoute.tokenBOutAmount.toNumber() /
                        LAMPORTS_PER_SOL}{" "}
                      SOL
                    </p>
                  </div>
                )}
                <button
                  className="mt-4 px-4 md:px-6 py-1.5 md:py-2 rounded-xl w-full bg-[#F9E92B] text-black border-[3px] border-black font-saira font-semibold text-base md:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    isUpdatingQuote || isWithdrawing || !currentWithdrawQoute
                  }
                  onClick={handleWithdraw}
                >
                  {isWithdrawing ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Withdrawing...</span>
                    </div>
                  ) : isUpdatingQuote ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Updating Quote...</span>
                    </div>
                  ) : (
                    "Withdraw"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
