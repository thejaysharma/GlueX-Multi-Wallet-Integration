# Multi-Wallet Integration and Transaction Application

This project is a **Next.js** application designed to integrate multiple blockchain wallets across different ecosystems (EVM, Solana, and Aptos) and allow users to perform on-chain actions such as sending transactions. Built using **Tailwind CSS**, it ensures a responsive and visually appealing UI, with **Redux** handling state management. Features include wallet connection, transaction signing, real-time notifications with **React Toast**, and user feedback through **loaders**.

---

## **Features**

1. **Multi-Wallet Integration**:
   - Connect wallets from EVM, Solana, and Aptos ecosystems.
   - Automatically reconnect previously connected wallets using local storage.

2. **On-Chain Transactions**:
   - Perform blockchain transactions such as sending tokens or transferring funds.

3. **User Feedback**:
   - Notifications using **React Toast** for transaction success, errors, and loading states.
   - Loaders for a seamless user experience.

4. **State Management**:
   - Wallet states are managed with **Redux** for a scalable and maintainable codebase.

5. **Data Persistence**:
   - Wallet connection details are persisted to local storage.

---

## **Prerequisites**

1. **Node.js** (v16.x or above)
   - [Download Node.js](https://nodejs.org/)

2. **Git** (to clone the repository)
   - [Download Git](https://git-scm.com/)

3. A supported browser with wallet extensions installed:
   - **EVM Ecosystem**: Trust Wallet or Rabby Wallet
   - **Solana Ecosystem**: Phantom Wallet
   - **Aptos Ecosystem**: Pontem Wallet or Petra Wallet

---

## **Installation**

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:thejaysharma/GlueX-Multi-Wallet-Integration.git

   cd GlueX-Multi-Wallet-Integration
2. **Install tha Dependencies**:
   ```bash
   npm install
3. **Set Up Environment Variables**:
   ```bash
   NEXT_PUBLIC_SOLANA_CONNECTION_URL=https://api.devnet.solana.com
   NEXT_PUBLIC_APTOS_NODE_URL=https://api.mainnet.aptoslabs.com/v1
4. **Run the Development Server**:
   ```bash
   npm run dev
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## **Wallets Integrated**

1. **EVM Ecosystem**:
   - **MetaMask**: A widely used Ethereum wallet supporting multiple EVM chains. Integrated using (window.ethereum).
   - **Trust Wallet**: A secure and popular wallet for Ethereum and other EVM-compatible blockchains.
   - **Rabby Wallet**: A wallet optimized for DeFi users on Ethereum.

2. **Solana Ecosystem**:
   - **Phantom Wallet**: A feature-rich wallet for Solana blockchain users.

3. **Aptos Ecosystem**:
   - **Pontem Wallet**: A browser extension for interacting with the Aptos blockchain.
   - **Petra Wallet**: A simple and user-friendly wallet for Aptos.

---

## **On-Chain Actions**

1. **EVM Transactions**:
   - Use ethers.js to send ETH or tokens via MetaMask, Trust Wallet, or Rabby Wallet.

2. **Solana Transactions**:
   - Send SOL tokens using @solana/web3.js. Transactions are signed using the Phantom Wallet.

3. **Aptos Transactions**:
   - Use the Aptos SDK to transfer tokens with wallets like Pontem and Petra.

---

## **Future Enhancements**

1. **Additional Wallets**:
   - Add support for Cosmos wallets like Keplr and Leap, and more Solana wallets like Backpack.

2. **Advanced Blockchain Features**:
   - Allow staking, token swaps, and liquidity pooling.

3. **Improved Security**:
   - Encrypt wallet data before storing in local storage.

---

## **Documentation**

For detailed information about the implementation choices, challenges faced, and how they were addressed, refer to the project documentation:

[**Project Documentation**](https://docs.google.com/document/d/1IQTkpjxXprtuMPzrrV7s_qikLK7OIsa3x5VJCAFDDco/edit?usp=sharing)
