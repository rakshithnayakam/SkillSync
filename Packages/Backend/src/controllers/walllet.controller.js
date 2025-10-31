import { asyncHandlers } from "../utils/async-handlers.js";
import { ApiResponse } from "../utils/api-response.js";
import {
  addRewards,
  getWalletDetails,
  tokenTransfer,
} from "../services/wallet.service.js";
import { ApiError } from "../utils/api-error.js";

const getUserWalletDetails = asyncHandlers(async (req, res) => {
  const user = req.user;

  const walletDetails = await getWalletDetails(user);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        walletDetails,
        "Wallet details fetched successfully",
      ),
    );
});

const transferTokens = asyncHandlers(async (req, res) => {
  const { recieverId, amount } = req.body;

  const successtransaction = await tokenTransfer(recieverId, amount, req.user);

  if (!successtransaction) {
    throw new ApiError(500, "Ther'e was an error. Please try again");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        successtransaction,
        "Tokens transferred successfully",
      ),
    );
});

const giveRewards = asyncHandlers(async (req, res) => {
  const { amount } = req.body;

  await addRewards(amount);

  res.status(200).json(new ApiResponse(200, {}, "Rewards added successfully"));
});

export { getUserWalletDetails, transferTokens, giveRewards };
