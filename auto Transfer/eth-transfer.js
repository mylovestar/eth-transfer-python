const Web3 = require('web3');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const provider = new Web3.providers.HttpProvider(process.env.ETHEREUM_NODE_URL);
const web3 = new Web3(provider);

const senderAddress = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY).address;

// Specify the recipient's address and the amount to transfer
const recipientAddress = '0xRecipientAddressHere';
const amountToSend = web3.utils.toWei('0.1', 'ether'); // Change the amount as needed

async function sendEther() {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(senderAddress);

    const rawTransaction = {
      from: senderAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      to: recipientAddress,
      value: amountToSend,
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, process.env.PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

    console.log('Transaction hash:', receipt.transactionHash);
  } catch (error) {
    console.error('Error:', error);
  }
}

sendEther();
