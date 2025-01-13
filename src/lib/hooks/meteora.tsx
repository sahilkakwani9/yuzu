import AmmImpl, {
  MAINNET_POOL,
  PoolInformation,
  PoolState,
} from "@mercurial-finance/dynamic-amm-sdk";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BN from "bn.js";
import { useEffect, useState } from "react";

const useMeteora = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [userBalance, setUserBalance] = useState(0);
  const [poolInfo, setPoolInfo] = useState<PoolState>();
  const [poolState, setPoolState] = useState<PoolInformation>();
  useEffect(() => {
    getUserBalance();
    getPoolInfo();
  }, [publicKey]);

  const getPollInstance = async () => {
    try {
      return await AmmImpl.create(connection, MAINNET_POOL.USDC_SOL);
    } catch (error) {
      console.log("error creating pool instance");
    }
  };

  const getPoolInfo = async () => {
    try {
      const constantProductPool = await getPollInstance();
      const poolState = await constantProductPool?.poolState;
      const poolInfo = await constantProductPool?.poolInfo;
      setPoolInfo(poolState);
      setPoolState(poolInfo);
      return poolState;
    } catch (error) {
      console.log("error fetching pool info", error);
    }
  };

  const getUserBalance = async () => {
    try {
      if (!publicKey) {
        console.log("no public key found");
        return;
      }
      console.log("fetching user balance");

      const constantProductPool = await getPollInstance();
      const userLpBalance = await constantProductPool!.getUserBalance(
        publicKey
      );
      console.log(userLpBalance.toNumber() / LAMPORTS_PER_SOL, "balance");

      setUserBalance(userLpBalance.toNumber() / LAMPORTS_PER_SOL);
      return userLpBalance.toNumber() / LAMPORTS_PER_SOL;
    } catch (error) {
      console.log("Error depositing to pool:", error);
    }
  };

  const createDepositTransaction = async (
    tokenAInAmount: BN,
    tokenBInAmount: BN,
    poolTokenAmountOut: BN
  ) => {
    try {
      if (!publicKey) {
        console.log("no public key found");
        return;
      }
      const constantProductPool = await getPollInstance();
      const depositTx = await constantProductPool!.deposit(
        publicKey,
        tokenAInAmount,
        tokenBInAmount,
        poolTokenAmountOut
      );
      return depositTx;
    } catch (error) {
      console.log("Error creating txn :", error);
    }
  };

  const createWithdrawTransaction = async (
    lpTokenAmount: BN,
    tokenAOutAmount: BN,
    tokenBOutAmount: BN
  ) => {
    try {
      if (!publicKey) {
        console.log("no public key found");
        return;
      }
      const constantProductPool = await getPollInstance();
      const depositTx = await constantProductPool!.withdraw(
        publicKey,
        lpTokenAmount,
        tokenAOutAmount,
        tokenBOutAmount
      );
      return depositTx;
    } catch (error) {
      console.log("Error creating txn :", error);
    }
  };

  const fetchQoute = async (amount: BN, out?: boolean) => {
    try {
      if (!publicKey) {
        console.log("no public key found");
        return;
      }
      const constantProductPool = await getPollInstance();
      if (!out) {
        const { poolTokenAmountOut, tokenAInAmount, tokenBInAmount } =
          constantProductPool!.getDepositQuote(amount, new BN(0), true, 1);

        return { poolTokenAmountOut, tokenAInAmount, tokenBInAmount };
      }
      const { poolTokenAmountOut, tokenAInAmount, tokenBInAmount } =
        constantProductPool!.getDepositQuote(new BN(0), amount, true, 1);

      return { poolTokenAmountOut, tokenAInAmount, tokenBInAmount };
    } catch (error) {
      console.log("Error qouting token amounts:", error);
    }
  };

  const fetchWithdrawQoute = async (amount: BN, out?: boolean) => {
    try {
      if (!publicKey) {
        console.log("no public key found");
        return;
      }
      const constantProductPool = await getPollInstance();

      const { poolTokenAmountIn, tokenAOutAmount, tokenBOutAmount } =
        constantProductPool!.getWithdrawQuote(amount, 10);

      return { poolTokenAmountIn, tokenAOutAmount, tokenBOutAmount };
    } catch (error) {
      console.log("Error qouting token amounts:", error);
    }
  };

  fetchWithdrawQoute;
  return {
    getPollInstance,
    getUserBalance,
    createDepositTransaction,
    fetchQoute,
    createWithdrawTransaction,
    fetchWithdrawQoute,
    userBalance,
    poolInfo,
    poolState,
  };
};

export default useMeteora;
