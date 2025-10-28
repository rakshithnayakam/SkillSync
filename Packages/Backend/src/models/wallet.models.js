import moongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
    transactions: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "Transactions",
    },
  },
  { timestamps: true },
);

export const Wallet = moongoose.model("Wallet", walletSchema);
