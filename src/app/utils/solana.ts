import { toast } from "react-toastify";

/**
 * Connects to the Phantom wallet if available.
 * @returns {Promise<string>} The public key of the connected wallet as a string.
 * @throws Will throw an error if the connection fails or if the Phantom wallet is not installed.
 */
export const connectPhantomWallet = async (): Promise<string> => {
    if (typeof window !== 'undefined' && window.solana || window.solana?.isPhantom)
        try {
            const response = await window.solana.connect();
            return response.publicKey.toString();
        }
        catch (error) {
            toast.error("Failed to connect to Phantom wallet!");
            console.error('Error connecting to Phantom:', error);
            throw new Error("Failed to connect to Phantom wallet!");
        }
    else {
        toast.error("Phantom wallet not installed!");
        throw new Error("Phantom wallet not installed!");
    }
};