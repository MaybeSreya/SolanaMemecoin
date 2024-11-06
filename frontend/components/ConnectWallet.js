import { useState, useEffect } from 'react';

export default function ConnectWallet({ setPublicKey }) {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const connectWalletOnLoad = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          const response = await window.solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
          setPublicKey(response.publicKey.toString());
        } catch (err) {
          console.log("Connect wallet error:", err);
        }
      }
    };
    connectWalletOnLoad();
  }, [setPublicKey]);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      const response = await window.solana.connect();
      setWalletAddress(response.publicKey.toString());
      setPublicKey(response.publicKey.toString());
    } else {
      alert("Please install the Phantom Wallet!");
    }
  };

  return (
    <div>
      {walletAddress ? (
        <p>Connected: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
