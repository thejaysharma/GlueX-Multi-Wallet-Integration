"use client";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import WalletConnect from "./components/WalletConnect";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { connectedWallet } = useSelector((state: any) => state.wallet);
  const router = useRouter();

  useEffect(() => {
    if (connectedWallet) {
      router.push("/dashboard");
    }
  }
    , [connectedWallet]);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8">Web3 Wallet Integration</h1>
      <WalletConnect />
      <ToastContainer />
    </div>


  );
}