import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const WalletPage = () => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferData, setTransferData] = useState({
    toUserId: "",
    amount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, walletRes, usersRes] = await Promise.all([
          API.get("/auth/current-user"),
          API.get("/wallet"),
          API.get("/users"),
        ]);
        setUser(userRes.data.data);
        setWallet(walletRes.data.data);
        setUsers(usersRes.data.data);
      } catch {
        toast.error("Failed to load wallet");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTransfer = async () => {
    if (!transferData.toUserId || !transferData.amount) {
      toast.error("Please fill all fields");
      return;
    }
    if (transferData.amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    if (transferData.amount > wallet.balance) {
      toast.error("Insufficient balance");
      return;
    }
    try {
      await API.post("/wallet/transfer", {
        toUserId: transferData.toUserId,
        amount: Number(transferData.amount),
      });
      // refresh wallet
      const walletRes = await API.get("/wallet");
      setWallet(walletRes.data.data);
      setShowTransferModal(false);
      setTransferData({ toUserId: "", amount: "" });
      toast.success("Tokens transferred!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Transfer failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-64 p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>

          {/* Balance Card */}
          <div className="bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-2xl p-8 shadow-lg">
            <p className="text-indigo-200 text-sm font-medium mb-1">
              Total Balance
            </p>
            <p className="text-5xl font-extrabold mb-1">
              {wallet?.balance || 0}
            </p>
            <p className="text-indigo-200">SkillSync Tokens</p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowTransferModal(true)}
                className="bg-white text-indigo-600 px-5 py-2 rounded-xl font-semibold hover:bg-indigo-50"
              >
                Send Tokens
              </button>
            </div>
          </div>

          {/* How Tokens Work */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              How Tokens Work
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-2xl mb-2">🎓</p>
                <p className="font-semibold text-green-700">Earn</p>
                <p className="text-sm text-gray-500 mt-1">
                  Teach a skill to earn tokens
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <p className="text-2xl mb-2">📚</p>
                <p className="font-semibold text-blue-700">Spend</p>
                <p className="text-sm text-gray-500 mt-1">
                  Learn a skill using tokens
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <p className="text-2xl mb-2">🔄</p>
                <p className="font-semibold text-purple-700">Transfer</p>
                <p className="text-sm text-gray-500 mt-1">
                  Send tokens to other users
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Wallet Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">Wallet ID</span>
                <span className="text-gray-800 font-mono text-sm">
                  {wallet?._id}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">Owner</span>
                <span className="text-gray-800 font-semibold">
                  {user?.fullName}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Current Balance</span>
                <span className="text-indigo-600 font-bold text-xl">
                  {wallet?.balance} tokens
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Modal */}
        {showTransferModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Send Tokens
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Your balance:{" "}
                <span className="font-bold text-indigo-600">
                  {wallet?.balance} tokens
                </span>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Send To
                  </label>
                  <select
                    value={transferData.toUserId}
                    onChange={(e) =>
                      setTransferData({
                        ...transferData,
                        toUserId: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select user...</option>
                    {users
                      .filter((u) => u._id !== user?._id)
                      .map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.fullName} (@{u.username})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={transferData.amount}
                    onChange={(e) =>
                      setTransferData({
                        ...transferData,
                        amount: e.target.value,
                      })
                    }
                    placeholder="Enter amount..."
                    min="1"
                    max={wallet?.balance}
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 py-3 border rounded-xl hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransfer}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WalletPage;
