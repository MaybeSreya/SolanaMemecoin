import { useState } from 'react';
import axios from 'axios';

function CreateTokenForm({ publicKey }) {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    decimals: 6,
    initialSupply: 1000,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const response = await axios.post('/api/create-token', {
        ...formData,
        ownerPublicKey: publicKey,
      });
      alert(`Token created! Mint Address: ${response.data.mintAddress}`);
    } catch (error) {
      alert('Error creating token');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Token Name" onChange={handleChange} />
      <input name="symbol" placeholder="Symbol" onChange={handleChange} />
      <input name="decimals" placeholder="Decimals" type="number" onChange={handleChange} />
      <input name="initialSupply" placeholder="Initial Supply" type="number" onChange={handleChange} />
      <button type="submit">Create Token</button>
    </form>
  );
}

export default CreateTokenForm;
