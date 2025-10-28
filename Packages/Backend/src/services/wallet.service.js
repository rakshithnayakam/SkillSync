import { ApiError } from "../utils/api-error.js";
import { Wallet } from "../models/wallet.models.js";
import { Transaction } from "../models/transaction.models.js";
import { User } from "../models/users.models.js";

const createWallet = async (userId) => {
  const wallet = await Wallet.create({ user: userId });
  return wallet;
};

const getWalletDetails = async (user) => {
  const wallet = await Wallet.findOne({ _id: user.walletId });

  if (!wallet) {
    throw new ApiError(404, "Wallet not found");
  }

  return wallet;
};

const tokenTransfer = async (recieverId, amount, user) => {
  if (!recieverId || !amount) {
    throw new ApiError(409, "RecieverId and amount are required fields");
  }

  const senderWallet = await Wallet.findById(user.walletId);

  if (!senderWallet) {
    throw new ApiError(404, "Sender wallet not found");
  }
  const recieverWallet = await Wallet.findById(user.walletId);

  if (!recieverWallet) {
    throw new ApiError(404, "Reciever wallet not found");
  }

  if (amount > senderWallet.balance) {
    throw new ApiError(407, "Insufficient balance");
  }

  senderWallet.balance -= amount;
  recieverWallet.balance += amount;

  const transaction = await Transaction.create({
    fromUser: senderWallet,
    toUser: recieverWallet,
    transactionType: "transfer",
    amount,
  });

  senderWallet.transactions.push(transaction._id);
  recieverWallet.transactions.push(transaction._id);
  await senderWallet.save();
  await recieverWallet.save();

  return transaction;
};

const addRewards = async (amount) => {
  const wallets = await Wallet.find({}).select("_id");

  if (wallets.length === 0) {
    throw new Error("No wallets exist");
  }

  const walletIds = wallets.map((w) => w._id);

  const transactions = walletIds.map((walletId) => ({
    walletId,
    amount,
    transactionType: "earn",
  }));

  const createdTransactions = await Transaction.insertMany(transactions);

  const transactionIds = createdTransactions.map((t) => t._id);

  await Wallet.updateMany(
    { _id: { $in: walletIds } },
    {
      $inc: { balance: amount },
      $push: { transactions: { $each: transactionIds } },
    },
  );
};

export { createWallet, getWalletDetails, tokenTransfer, addRewards };
