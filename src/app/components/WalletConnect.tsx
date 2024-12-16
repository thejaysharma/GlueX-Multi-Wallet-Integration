"use client"
import { useDispatch } from "react-redux";
import { connectWallet } from "../store/walletSlice";
import { connectMetamaskWallet } from "../utils/evm";
import { connectPhantomWallet } from "../utils/solana";
import { connectPetraWallet, connectPontemWallet } from "../utils/aptos";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "./Loader";
import Image from "next/image";
import MetamaskIcon from "@public/images/metamask.svg";
import PhantomIcon from "@public/images/phantom.svg";
import PetraIcon from "@public/images/petra.png";
import PontemIcon from "@public/images/pontem.png";

/**
 * List of supported wallets with their names and icons.
 */
export const wallets = [
    {
        name: "Metamask",
        image: MetamaskIcon,
    },
    {
        name: "Phantom",
        image: PhantomIcon,
    },
    {
        name: "Petra",
        image: PetraIcon,
    },
    {
        name: "Pontem",
        image: PontemIcon,
    },
]

export default function WalletConnect() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    /**
     * Handles the wallet connection based on the selected wallet type.
     * @param {string} wallet - The name of the selected wallet.
     */
    const handleConnect = async (wallet: string) => {
        setLoading(true);
        try {
            let walletAddress;
            let walletType;

            switch (wallet) {
                case "Metamask":
                    walletAddress = await connectMetamaskWallet();
                    walletType = "EVM";
                    break;
                case "Phantom":
                    walletAddress = await connectPhantomWallet();
                    walletType = "Solana";
                    break;
                case "Petra":
                    walletAddress = await connectPetraWallet();
                    walletType = "AptosPetra";
                    break;
                case "Pontem":
                    walletAddress = await connectPontemWallet();
                    walletType = "AptosPontem";
                    break;
                default:
                    throw new Error("Unsupported wallet type");
            }

            toast.success(wallet + " wallet connected successfully!");

            dispatch(
                connectWallet({
                    address: walletAddress,
                    type: walletType,
                })
            );
            router.push("/dashboard");

        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const [selectedWallet, setSelectedWallet] = useState("Metamask");

    /**
     * Handles the change event for the wallet selection radio buttons.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedWallet(event.target.id);
    };

    return (
        <>
            {loading ? <Loader /> :
                <div className="space-y-4">
                    <div className="w-[300px] px-4 py-5 bg-white flex flex-col gap-3 rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]">
                        <legend className="text-xl font-semibold mb-3 select-none">
                            Choose Your Wallet
                        </legend>
                        {wallets.map((wallet) => (
                            <label
                                key={wallet.name}
                                htmlFor={wallet.name}
                                className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg select-none ${selectedWallet === wallet.name
                                    ? "text-blue-500 bg-blue-50 ring-blue-300 ring-1"
                                    : ""
                                    }`}
                            >
                                <Image src={wallet.image} alt={wallet.name} width={32} height={32} className="rounded-full object-contain" />
                                {wallet.name}
                                <input
                                    type="radio"
                                    id={wallet.name}
                                    name="status"
                                    checked={selectedWallet === wallet.name}
                                    onChange={handleChange}
                                    className="peer w-4 h-4 absolute accent-current right-3"
                                />
                            </label>
                        ))}
                        <button
                            onClick={() => handleConnect(selectedWallet)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Connect Wallet
                        </button>
                    </div>
                </div>
            }
        </>
    );
}
