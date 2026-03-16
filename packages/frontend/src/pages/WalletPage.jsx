import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const txIcon = (type) => ({ transfer: "🔄", earn: "🎓", spend: "📚", reward: "🎁" }[type] || "💰");
const txColor = (type, isIncoming) => {
  if (type === "reward") return { color: "#a78bfa", bg: "rgba(167,139,250,0.1)" };
  if (isIncoming) return { color: "#34d399", bg: "rgba(52,211,153,0.1)" };
  return { color: "#f87171", bg: "rgba(248,113,113,0.1)" };
};

const WalletPage = () => {
  const [user, setUser]       = useState(null);
  const [wallet, setWallet]   = useState(null);
  const [users, setUsers]     = useState([]);
  const [txns, setTxns]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [transferData, setTransferData] = useState({ toUserId: "", amount: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, walletRes, usersRes, txRes] = await Promise.all([
          API.get("/auth/current-user"),
          API.get("/wallet"),
          API.get("/users"),
          API.get("/wallet/transactions"),
        ]);
        setUser(userRes.data.data);
        setWallet(walletRes.data.data);
        setUsers(usersRes.data.data);
        setTxns(txRes.data.data || []);
      } catch(e) {
        toast.error("Failed to load wallet");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTransfer = async () => {
    if (!transferData.toUserId || !transferData.amount) { toast.error("Please fill all fields"); return; }
    if (transferData.amount <= 0) { toast.error("Amount must be greater than 0"); return; }
    if (transferData.amount > wallet.balance) { toast.error("Insufficient balance"); return; }
    try {
      await API.post("/wallet/transfer", { toUserId: transferData.toUserId, amount: Number(transferData.amount) });
      const [walletRes, txRes] = await Promise.all([API.get("/wallet"), API.get("/wallet/transactions")]);
      setWallet(walletRes.data.data);
      setTxns(txRes.data.data || []);
      setShowModal(false);
      setTransferData({ toUserId: "", amount: "" });
      toast.success("Tokens transferred!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Transfer failed");
    }
  };

  const sel = { width:"100%", padding:"0.75rem 1rem", borderRadius:"0.75rem", border:"1px solid var(--border)", backgroundColor:"var(--bg-secondary)", color:"var(--text-primary)", fontSize:"0.875rem", outline:"none" };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor:"var(--bg-primary)" }}>
      <p className="text-secondary">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor:"var(--bg-primary)" }}>
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-60 min-h-screen"><div className="p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-primary">Wallet</h1>

          {/* Balance Card */}
          <div className="rounded-2xl p-8 text-white shadow-lg" style={{ background:"linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}>
            <p className="text-sm font-medium mb-1" style={{ color:"rgba(199,210,254,0.9)" }}>Total Balance</p>
            <p className="text-6xl font-extrabold mb-1">{wallet?.balance ?? 0}</p>
            <p style={{ color:"rgba(199,210,254,0.8)" }}>SkillSync Tokens</p>
            <button onClick={() => setShowModal(true)}
              className="mt-6 px-5 py-2 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor:"rgba(255,255,255,0.15)", color:"white", border:"1px solid rgba(255,255,255,0.2)" }}>
              Send Tokens
            </button>
          </div>

          {/* How Tokens Work */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">How Tokens Work</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { emoji:"🎓", label:"Earn",     desc:"Teach a skill",        color:"rgba(52,211,153,0.1)",  text:"#34d399" },
                { emoji:"📚", label:"Spend",    desc:"Learn a skill",        color:"rgba(96,165,250,0.1)",  text:"#60a5fa" },
                { emoji:"🔄", label:"Transfer", desc:"Send to other users",  color:"rgba(167,139,250,0.1)", text:"#a78bfa" },
              ].map(({ emoji, label, desc, color, text }) => (
                <div key={label} className="text-center p-4 rounded-xl" style={{ backgroundColor:color }}>
                  <p className="text-2xl mb-2">{emoji}</p>
                  <p className="font-semibold text-sm" style={{ color }}>{label}</p>
                  <p className="text-xs text-secondary mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wallet Details */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">Wallet Details</h2>
            <div className="space-y-3">
              {[
                { label:"Wallet ID", value: <span className="font-mono text-xs text-primary">{wallet?._id}</span> },
                { label:"Owner",     value: <span className="font-semibold text-primary">{user?.fullName}</span> },
                { label:"Balance",   value: <span className="font-bold text-lg" style={{ color:"#818cf8" }}>{wallet?.balance} tokens</span> },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-3" style={{ borderBottom:"1px solid var(--border)" }}>
                  <span className="text-secondary text-sm">{label}</span>
                  {value}
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Transaction History
              <span className="ml-2 text-sm font-normal text-secondary">({txns.length})</span>
            </h2>
            {txns.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-3">💸</p>
                <p className="text-secondary">No transactions yet</p>
                <p className="text-sm text-muted mt-1">Send tokens to see history here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {txns.map((tx) => {
                  const isIncoming = tx.toUser?._id === user?._id || tx.toUser === user?._id;
                  const { color, bg } = txColor(tx.transactionType, isIncoming);
                  const peer = isIncoming
                    ? (tx.fromUser?.fullName || "System")
                    : (tx.toUser?.fullName || "Unknown");
                  return (
                    <div key={tx._id} className="flex items-center justify-between p-3 rounded-xl"
                      style={{ backgroundColor:"var(--bg-secondary)", border:"1px solid var(--border)" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                          style={{ backgroundColor:bg }}>{txIcon(tx.transactionType)}</div>
                        <div>
                          <p className="text-sm font-medium text-primary capitalize">{tx.transactionType}</p>
                          <p className="text-xs text-secondary">
                            {isIncoming ? "From" : "To"}: {peer}
                          </p>
                          <p className="text-xs text-muted">
                            {new Date(tx.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-base" style={{ color }}>
                        {isIncoming ? "+" : "-"}{tx.amount}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Transfer Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor:"rgba(0,0,0,0.6)" }}>
            <div className="card rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Send Tokens</h2>
              <p className="text-sm text-secondary mb-6">
                Balance: <span className="font-bold" style={{ color:"#818cf8" }}>{wallet?.balance} tokens</span>
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-secondary block mb-1">Send To</label>
                  <select value={transferData.toUserId}
                    onChange={(e) => setTransferData({ ...transferData, toUserId:e.target.value })} style={sel}>
                    <option value="">Select user...</option>
                    {users.filter((u) => u._id !== user?._id).map((u) => (
                      <option key={u._id} value={u._id}>{u.fullName} (@{u.username})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-secondary block mb-1">Amount</label>
                  <input type="number" value={transferData.amount}
                    onChange={(e) => setTransferData({ ...transferData, amount:e.target.value })}
                    placeholder="Enter amount..." min="1" max={wallet?.balance} style={sel} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl text-secondary text-sm"
                  style={{ border:"1px solid var(--border)" }}>Cancel</button>
                <button onClick={handleTransfer}
                  className="flex-1 py-3 rounded-xl text-white text-sm font-semibold"
                  style={{ background:"linear-gradient(135deg,#4f46e5,#7c3aed)" }}>Send</button>
              </div>
            </div>
          </div>
        )}
      </div></main>
    </div>
  );
};

export default WalletPage;
