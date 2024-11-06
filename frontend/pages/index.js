import { useState } from 'react';
import ConnectWallet from '../components/ConnectWallet';
import CreateTokenForm from '../components/CreateTokenForm';
import Notification from '../components/Notification';

export default function Home() {
  const [publicKey, setPublicKey] = useState(null);
  const [notification, setNotification] = useState(null);

  return (
    <div>
      <h1>Solana Memecoin Generator</h1>
      <ConnectWallet setPublicKey={setPublicKey} setNotification={setNotification} />
      <CreateTokenForm publicKey={publicKey} setNotification={setNotification} />
      <Notification message={notification} setMessage={setNotification} />
    </div>
  );
}
