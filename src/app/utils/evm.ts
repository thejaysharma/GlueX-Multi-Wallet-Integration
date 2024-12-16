import { ethers } from "ethers";
import { toast } from "react-toastify";

/**
 * Connects to the Metamask wallet and returns the user's Ethereum address
 * @returns {Promise<string>} The connected wallet's Ethereum address
 * @throws {Error} If Metamask is not installed or connection fails
 */
export const connectMetamaskWallet = async (): Promise<string> => {
    // Check if we're in a browser environment and Metamask is installed
    if (typeof window !== 'undefined' && window.ethereum)
        try {
            // Create an Ethereum provider using the browser's web3 instance
            const provider = new ethers.BrowserProvider(window.ethereum)
            // Request user's permission to connect their wallet
            await provider.send("eth_requestAccounts", []);
            // Get the signer (wallet) instance
            const signer = await provider.getSigner();
            // Return the connected wallet's address
            return await signer.getAddress();
        }
        catch (error) {
            toast.error("Failed to connect to Metamask wallet!");
            console.error('Error connecting to MetaMask:', error);
            throw new Error("Failed to connect to Metamask wallet!");
        }
    else {
        toast.error("Metamask is not installed!");
        throw new Error("Metamask is not installed!");
    }
};