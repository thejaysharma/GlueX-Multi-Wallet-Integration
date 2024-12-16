import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
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

/**
 * Sends a transaction on the Solana blockchain.
 * @param {string} sender - The public key of the sender's wallet.
 * @param {string} reciever - The public key of the receiver's wallet.
 * @param {string} amount - The amount of SOL to send.
 * @returns {Promise<string>} The transaction signature.
 * @throws Will throw an error if the transaction fails.
 */
export const sendSolanaTransaction = async (sender: string, reciever: string, amount: string): Promise<string> => {
    try {

        const connectionUrl = process.env.NEXT_PUBLIC_SOLANA_CONNECTION_URL;
        if (!connectionUrl) {
            throw new Error("Solana connection URL is not defined");
        }
        const connection = new Connection(connectionUrl, "confirmed");

        const walletPublicKey = new PublicKey(sender.toString());

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: walletPublicKey,
                toPubkey: new PublicKey(reciever),
                lamports: Number(amount) * 1e9,  // Amount in lamports (1 SOL = 1e9 lamports)
            })
        );

        // get the latest blockhash and assign it to the transaction before sending it to the network
        const { blockhash } = await connection.getLatestBlockhash();
        console.log(blockhash)
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = walletPublicKey;

        const { signature } = await window.solana.signAndSendTransaction(transaction);
        await connection.confirmTransaction(signature);
        return signature;
    }
    catch (error) {
        toast.error("Error sending transaction!");
        console.error("Error sending transaction:", error);
        throw new Error("Error sending transaction");
    }
}