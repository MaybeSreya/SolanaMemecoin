const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const { createMint, getOrCreateAssociatedTokenAccount, mintTo } = require('@solana/spl-token');

const connection = new Connection(process.env.RPC_URL, 'confirmed');
const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY)));

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const { name, symbol, decimals, initialSupply, ownerPublicKey } = req.body;
  try {
    const ownerPublicKeyParsed = new PublicKey(ownerPublicKey);
    const mint = await createMint(connection, payer, ownerPublicKeyParsed, null, decimals);
    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, ownerPublicKeyParsed);

    await mintTo(connection, payer, mint, tokenAccount.address, payer, initialSupply * Math.pow(10, decimals));

    res.status(200).json({
      success: true,
      mintAddress: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
