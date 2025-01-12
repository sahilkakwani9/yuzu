import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { PoolFarmImpl } from "@mercurial-finance/farming-sdk";
import BN from "bn.js";
import { useEffect, useState } from "react";

const useMeteoraFarm = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [farmBalance, setFarmBalance] = useState(0);

  useEffect(() => {
    getUserBalance();
  }, [publicKey]);

  const getFarmPoolInstance = async () => {
    try {
      const USDC_acUSDC_POOL = new PublicKey(
        "6ZLKLjMd2KzH7PPHCXUPgbMAtdTT37VgTtdeXWLoJppr"
      );

      const farmingPools = await PoolFarmImpl.getFarmAddressesByPoolAddress(
        USDC_acUSDC_POOL
      );
      // farmingPools is an array (A pool can have multiple farms)
      const farmingPool = farmingPools[0];
      const farm = await PoolFarmImpl.create(
        connection,
        farmingPool.farmAddress
      );
      return farm;
    } catch (error) {
      console.log("error creating pool instance");
    }
  };

  const getUserBalance = async () => {
    try {
      if (!publicKey) {
        console.log("no public key found");
        return;
      }
      console.log("fetching user balance");

      const farmPool = await getFarmPoolInstance();
      const userLpBalance = await farmPool!.getUserBalance(publicKey);
      console.log(userLpBalance.toNumber() / LAMPORTS_PER_SOL, "balance");

      setFarmBalance(userLpBalance.toNumber() / LAMPORTS_PER_SOL);
      return userLpBalance.toNumber() / LAMPORTS_PER_SOL;
    } catch (error) {
      console.log("Error depositing to pool:", error);
    }
  };

  const stake = async (amount: BN) => {
    try {
      const farm = await getFarmPoolInstance();
      if (!farm || !publicKey) return;

      const stakeTx = await farm.deposit(publicKey, amount);
      return stakeTx;
    } catch (error) {
      console.log("error staking tokens", error);
    }
  };

  const unstake = async (amount: BN) => {
    try {
      const farm = await getFarmPoolInstance();
      if (!farm || !publicKey) return;

      const unstakeTx = await farm.withdraw(publicKey, amount);
      return unstakeTx;
    } catch (error) {
      console.log("error unstaking tokens", error);
    }
  };

  return {
    getFarmPoolInstance,
    farmBalance,
    stake,
    unstake,
  };
};
