import { toast } from "react-toastify";

/**
 * Connects to the Pontem wallet if available.
 * @returns {Promise<string>} The address of the connected wallet.
 * @throws Will throw an error if the connection fails or if the Pontem wallet is not installed.
 */
export async function connectPontemWallet(): Promise<string> {
    if (typeof window !== "undefined" && window.pontem) {
        try {
            const response = await window.pontem.connect();
            return response.address;
        } catch (error) {
            toast.error("Failed to connect Pontem wallet");
            console.error("Failed to connect Pontem wallet:", error);
            throw error;
        }
    } else {
        toast.error("Pontem wallet not installed!");
        throw new Error("Pontem wallet not installed!");
    }
}

/**
 * Connects to the Petra wallet if available.
 * @returns {Promise<string>} The address of the connected wallet.
 * @throws Will throw an error if the connection fails or if the Petra wallet is not installed.
 */
export async function connectPetraWallet(): Promise<string> {
    if (typeof window !== "undefined" && window.aptos) {
        try {
            const response = await window.aptos.connect();
            return response.address;
        } catch (error) {
            toast.error("Failed to connect Petra wallet");
            console.error("Failed to connect Petra wallet:", error);
            throw error;
        }
    } else {
        toast.error("Petra wallet not installed!");
        throw new Error("Petra wallet not installed!");
    }
}