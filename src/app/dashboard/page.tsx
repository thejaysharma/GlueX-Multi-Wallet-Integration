"use client";
import { useSelector, useDispatch } from "react-redux";
import { disconnectWallet } from "../store/walletSlice";
import { persistor } from "../store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import TransactionForm from "../components/TransactionForm";

export default function Dashboard() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Get wallet data from Redux state
    const { connectedWallet, walletType } = useSelector((state: any) => state.wallet);

    // Handle disconnect wallet
    const handleDisconnect = async () => {
        setLoading(true);
        dispatch(disconnectWallet());
        await persistor.purge(); // Clear persisted state
        setLoading(false);
        router.push("/"); // Redirect to homepage
    };

    return (
        <>{loading ? <Loader /> :
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="bg-white p-8 shadow-lg max-w-md w-full text-center rounded-3xl">
                    <h1 className="text-2xl font-semibold mb-4">User Profile</h1>

                    {connectedWallet ? (
                        <>
                            <div className="mb-4">
                                <p className="text-gray-600">Wallet Address:</p>
                                <p className="text-lg font-mono break-all">{connectedWallet}</p>
                            </div>
                            <div className="mb-6">
                                <p className="text-gray-600">Wallet Type:</p>
                                <p className="text-lg font-semibold">{walletType}</p>
                            </div>
                            <div className="grid gap-3">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Do a Transaction
                                </button>
                                <button
                                    onClick={handleDisconnect}
                                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                                >
                                    Disconnect Wallet
                                </button>
                            </div>
                            {showModal && <Modal onClose={() => setShowModal(false)} >
                                <TransactionForm />
                            </Modal>}
                        </>
                    ) : (
                        <p className="text-gray-500">No wallet connected</p>
                    )}
                </div>
            </div>
        }
        </>
    );
}
