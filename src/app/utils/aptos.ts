import { toast } from "react-toastify";
import { AptosClient } from "aptos";

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

const NODE_URL = process.env.NEXT_PUBLIC_APTOS_NODE_URL;

/**
 * Sends a transaction on the Aptos blockchain.
 * @param {string} walletType - The type of wallet to connect (either "pontem" or "petra").
 * @param {string} recipient - The address of the recipient's wallet.
 * @param {string} amount - The amount of Aptos coins to send.
 * @returns {Promise<any>} The result of the transaction submission.
 * @throws Will throw an error if the transaction fails or if the node URL is not provided.
 */
export async function sendAptosTransaction(
    walletType: string,
    recipient: string,
    amount: string
): Promise<any> {
    if (!NODE_URL) {
        toast.error("Aptos node URL not provided");
        throw new Error("Aptos node URL not provided");
    }
    const aptosClient = new AptosClient(NODE_URL);

    try {
        // Connect wallet based on type
        const senderAddress =
            walletType === "pontem"
                ? await connectPontemWallet()
                : await connectPetraWallet();

        // Prepare transaction payload
        const payload = {
            type: "entry_function_payload",
            function: "0x1::coin::transfer",
            arguments: [recipient, amount],
            type_arguments: ["0x1::aptos_coin::AptosCoin"],
        };

        console.log(senderAddress, payload);

        // Get transaction details
        const txnRequest = await aptosClient.generateTransaction(
            senderAddress,
            payload
        );

        // Sign transaction
        const signedTxn =
            walletType === "pontem"
                ? await window.pontem.signTransaction(txnRequest)
                : await window.aptos.signTransaction(txnRequest);

        // Submit transaction
        const result = await aptosClient.submitTransaction(signedTxn);
        return result;
    } catch (error) {
        toast.error(`Error sending transaction with ${walletType}`);
        console.error(`Error sending transaction with ${walletType}:`, error);
        throw error;
    }
}
