import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendEvmTransaction } from "../utils/evm";
import { sendSolanaTransaction } from "../utils/solana";
import { sendAptosTransaction } from "../utils/aptos";

// TransactionForm component handles sending transactions for different wallet types
export default function TransactionForm() {
    // Get connected wallet and wallet type from Redux store
    const { connectedWallet, walletType } = useSelector((state: any) => state.wallet);

    // State variables for recipient address and amount
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Send transaction based on wallet type
            switch (walletType) {
                case "EVM":
                    await sendEvmTransaction(connectedWallet, recipient.trim(), amount);
                    break;
                case "Solana":
                    await sendSolanaTransaction(connectedWallet, recipient.trim(), amount);
                    break;
                case "AptosPetra":
                    await sendAptosTransaction("petra", recipient.trim(), amount);
                    break;
                case "AptosPontem":
                    await sendAptosTransaction("pontem", recipient.trim(), amount);
                    break;
                default:
                    throw new Error("Unsupported wallet type");
            }
            // Show success message
            toast.success("Transaction sent successfully!");
            alert("Transaction sent successfully!");
        } catch (error) {
            // Log error if transaction fails
            toast.error("Error sending transaction");
            console.error("Error sending transaction:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Send Transaction</h2>
            {/* Input for recipient address */}
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="block w-full border rounded px-4 py-2"
            />
            {/* Input for amount */}
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full border rounded px-4 py-2"
            />
            {/* Submit button */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Send
            </button>
        </form>
    );
}
