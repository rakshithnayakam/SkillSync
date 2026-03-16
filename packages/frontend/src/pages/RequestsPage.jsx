import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const statusStyle = (s) => ({
  pending:   { color:"#fb923c", bg:"rgba(251,146,60,0.12)"  },
  accepted:  { color:"#34d399", bg:"rgba(52,211,153,0.12)"  },
  rejected:  { color:"#f87171", bg:"rgba(248,113,113,0.12)" },
  completed: { color:"#60a5fa", bg:"rgba(96,165,250,0.12)"  },
}[s] || { color:"var(--text-muted)", bg:"var(--bg-secondary)" });

const sel = { width:"100%", marginTop:"0.25rem", padding:"0.7rem 1rem", borderRadius:"0.75rem", border:"1px solid var(--border)", backgroundColor:"var(--bg-secondary)", color:"var(--text-primary)", fontSize:"0.875rem", outline:"none", boxSizing:"border-box" };

const RequestsPage = () => {
  const [user, setUser]         = useState(null);
  const [requests, setRequests] = useState([]);
  const [users, setUsers]       = useState([]);
  const [skills, setSkills]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [formData, setFormData] = useState({ toUserId:"", skillId:"", message:"" });

  useEffect(() => {
    const load = async () => {
      const [u, r, us, sk] = await Promise.allSettled([
        API.get("/auth/current-user"), API.get("/requests"),
        API.get("/users"), API.get("/skills"),
      ]);
      if (u.status==="fulfilled") setUser(u.value.data.data);
      if (r.status==="fulfilled") setRequests(r.value.data.data || []);
      if (us.status==="fulfilled") setUsers(us.value.data.data || []);
      if (sk.status==="fulfilled") setSkills(sk.value.data.data || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleSend = async () => {
    if (!formData.toUserId || !formData.skillId) { toast.error("Select a user and skill"); return; }
    try {
      const res = await API.post("/requests/add-request", formData);
      setRequests([...requests, res.data.data]);
      setShowModal(false); setFormData({ toUserId:"", skillId:"", message:"" });
      toast.success("Request sent!");
    } catch { toast.error("Failed to send request"); }
  };

  const handleUpdate = async (id, status) => {
    try {
      await API.patch(`/requests/update-request/${id}`, { status });
      setRequests(requests.map(r => r._id===id ? {...r, status} : r));
      toast.success(`Request ${status}!`);
    } catch { toast.error("Failed to update request"); }
  };

  const tabs = ["all","pending","accepted","completed","rejected"];
  const filtered = activeTab==="all" ? requests : requests.filter(r => r.status===activeTab);

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{backgroundColor:"var(--bg-primary)"}}><p className="text-secondary">Loading...</p></div>;

  return (
    <div style={{backgroundColor:"var(--bg-primary)",minHeight:"100vh"}}>
      <DashboardNavbar user={user}/><Sidebar/>

      {/* Page header banner */}
      <div style={{paddingTop:"4rem",paddingLeft:"15rem"}}>
        <div style={{background:"linear-gradient(135deg,rgba(79,70,229,0.15) 0%,rgba(124,58,237,0.08) 100%)",borderBottom:"1px solid var(--border)",padding:"2rem 2.5rem 1.5rem"}}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-primary">Requests</h1>
              <p className="text-secondary mt-1 text-sm">Manage your skill exchange requests</p>
            </div>
            <button onClick={()=>setShowModal(true)}
              className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",cursor:"pointer"}}>
              + Send Request
            </button>
          </div>

          {/* Stats inline in header */}
          <div className="grid grid-cols-4 gap-3 mt-5">
            {["pending","accepted","completed","rejected"].map(s=>{
              const {color,bg} = statusStyle(s);
              return (
                <div key={s} className="rounded-xl p-3 text-center" style={{backgroundColor:bg,border:`1px solid ${color}22`}}>
                  <p className="text-xl font-bold" style={{color}}>{requests.filter(r=>r.status===s).length}</p>
                  <p className="text-xs text-secondary capitalize mt-0.5">{s}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5" style={{maxWidth:"64rem"}}>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {tabs.map(tab=>(
              <button key={tab} onClick={()=>setActiveTab(tab)}
                className="px-4 py-2 rounded-xl text-sm font-medium capitalize"
                style={activeTab===tab
                  ? {background:"linear-gradient(135deg,#4f46e5,#7c3aed)",color:"white",border:"none",cursor:"pointer"}
                  : {backgroundColor:"var(--bg-card)",color:"var(--text-secondary)",border:"1px solid var(--border)",cursor:"pointer"}}>
                {tab} {tab!=="all" && <span className="ml-1 opacity-60">({requests.filter(r=>r.status===tab).length})</span>}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="card rounded-2xl overflow-hidden">
            <div className="px-5 py-4" style={{borderBottom:"1px solid var(--border)"}}>
              <p className="font-semibold text-primary text-sm">
                {activeTab==="all" ? "All Requests" : `${activeTab.charAt(0).toUpperCase()+activeTab.slice(1)} Requests`}
                <span className="ml-2 font-normal text-secondary">({filtered.length})</span>
              </p>
            </div>

            {filtered.length===0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">📭</p>
                <p className="font-medium text-secondary">No requests found</p>
                <button onClick={()=>setShowModal(true)}
                  className="mt-4 px-4 py-2 rounded-xl text-white text-sm font-semibold"
                  style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",cursor:"pointer"}}>
                  Send First Request
                </button>
              </div>
            ) : (
              filtered.map((req, i) => {
                const {color,bg} = statusStyle(req.status);
                const isReceived = req.toUserId?._id===user?._id;
                return (
                  <div key={req._id} className="flex items-center justify-between px-5 py-4 transition-colors"
                    style={{borderBottom:i<filtered.length-1?"1px solid var(--border)":"none"}}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor="var(--bg-secondary)"}
                    onMouseLeave={e=>e.currentTarget.style.backgroundColor="transparent"}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                        style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)"}}>
                        {(isReceived ? req.fromUserId?.fullName : req.toUserId?.fullName)?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-primary text-sm">
                          {isReceived ? "From" : "To"}: {isReceived ? (req.fromUserId?.fullName||"Unknown") : (req.toUserId?.fullName||"Unknown")}
                        </p>
                        {req.message && <p className="text-xs text-secondary truncate max-w-xs mt-0.5">{req.message}</p>}
                        <p className="text-xs text-muted mt-0.5">{new Date(req.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize" style={{backgroundColor:bg,color}}>{req.status}</span>
                      {req.status==="pending" && isReceived && (
                        <div className="flex gap-1.5">
                          <button onClick={()=>handleUpdate(req._id,"accepted")} className="text-xs px-3 py-1 rounded-lg text-white" style={{backgroundColor:"#10b981",border:"none",cursor:"pointer"}}>Accept</button>
                          <button onClick={()=>handleUpdate(req._id,"rejected")} className="text-xs px-3 py-1 rounded-lg text-white" style={{backgroundColor:"#ef4444",border:"none",cursor:"pointer"}}>Reject</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{backgroundColor:"rgba(0,0,0,0.7)"}}>
          <div className="card rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Send Request</h2>
              <button onClick={()=>setShowModal(false)} style={{background:"none",border:"none",cursor:"pointer",color:"var(--text-secondary)",fontSize:"20px"}}>×</button>
            </div>
            <div className="space-y-4">
              <div><label style={{fontSize:"0.875rem",color:"var(--text-secondary)",display:"block",marginBottom:"0.25rem"}}>Select User</label>
                <select value={formData.toUserId} onChange={e=>setFormData({...formData,toUserId:e.target.value})} style={sel}>
                  <option value="">Choose a user...</option>
                  {users.filter(u=>u._id!==user?._id).map(u=><option key={u._id} value={u._id}>{u.fullName} (@{u.username})</option>)}
                </select>
              </div>
              <div><label style={{fontSize:"0.875rem",color:"var(--text-secondary)",display:"block",marginBottom:"0.25rem"}}>Select Skill</label>
                <select value={formData.skillId} onChange={e=>setFormData({...formData,skillId:e.target.value})} style={sel}>
                  <option value="">Choose a skill...</option>
                  {skills.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
              <div><label style={{fontSize:"0.875rem",color:"var(--text-secondary)",display:"block",marginBottom:"0.25rem"}}>Message (optional)</label>
                <textarea value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}
                  rows={3} placeholder="Hi! I'd love to learn from you..." style={{...sel,resize:"none"}}/>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={()=>setShowModal(false)} className="flex-1 py-3 rounded-xl text-secondary text-sm" style={{border:"1px solid var(--border)",background:"none",cursor:"pointer"}}>Cancel</button>
              <button onClick={handleSend} className="flex-1 py-3 rounded-xl text-white text-sm font-semibold" style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",cursor:"pointer"}}>Send Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RequestsPage;
