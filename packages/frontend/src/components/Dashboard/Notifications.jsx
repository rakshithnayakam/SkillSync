import { useState, useEffect, useRef } from "react";
import API from "../../api/axios";

const NotificationsDropdown = () => {
  const [open, setOpen]     = useState(false);
  const [notes, setNotes]   = useState([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const build = async () => {
      try {
        const results = await Promise.allSettled([
          API.get("/requests"),
          API.get("/sessions"),
        ]);
        const reqs  = results[0].status === "fulfilled" ? (results[0].value.data.data || []) : [];
        const sesss = results[1].status === "fulfilled" ? (results[1].value.data.data || []) : [];

        const built = [
          ...reqs.filter(r => r.status === "pending").slice(0,3).map(r => ({
            id: r._id, type: "request",
            text: `New request from ${r.fromUserId?.fullName || "someone"}`,
            time: new Date(r.createdAt), read: false,
          })),
          ...sesss.filter(s => s.status === "scheduled").slice(0,3).map(s => ({
            id: s._id, type: "session",
            text: `Upcoming: ${s.skillId?.name || "session"} with ${s.teacherId?.fullName || s.learnerId?.fullName || "peer"}`,
            time: new Date(s.startTime), read: false,
          })),
        ].sort((a,b) => b.time - a.time).slice(0,8);

        setNotes(built);
        setUnread(built.length);
      } catch { /* silent — notifications are non-critical */ }
    };
    build();
  }, []);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const markAllRead = () => { setNotes(n => n.map(x => ({...x, read:true}))); setUnread(0); };

  const typeIcon = (t) => ({request:"📨",session:"📅",badge:"🏅"}[t] || "🔔");

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        style={{background:"none",border:"none",cursor:"pointer",padding:"4px",position:"relative",display:"flex"}}>
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--text-secondary)" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
        </svg>
        {unread > 0 && (
          <span style={{position:"absolute",top:"-2px",right:"-2px",width:"16px",height:"16px",borderRadius:"50%",backgroundColor:"#ef4444",color:"white",fontSize:"9px",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden"
          style={{backgroundColor:"var(--bg-card)",border:"1px solid var(--border)"}}>
          <div className="flex items-center justify-between px-4 py-3" style={{borderBottom:"1px solid var(--border)"}}>
            <span className="font-semibold text-primary text-sm">Notifications</span>
            {unread > 0 && (
              <button onClick={markAllRead} style={{color:"#818cf8",background:"none",border:"none",cursor:"pointer",fontSize:"12px"}}>
                Mark all read
              </button>
            )}
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-2xl mb-2">🔔</p>
              <p className="text-sm text-secondary">No notifications yet</p>
            </div>
          ) : (
            <div style={{maxHeight:"320px",overflowY:"auto"}}>
              {notes.map(n => (
                <div key={n.id}
                  className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
                  style={{borderBottom:"1px solid var(--border)",backgroundColor:n.read?"transparent":"rgba(99,102,241,0.05)"}}
                  onClick={() => { setNotes(prev => prev.map(x => x.id===n.id ? {...x,read:true} : x)); setUnread(p => Math.max(0,p-1)); }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--bg-secondary)"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = n.read ? "transparent" : "rgba(99,102,241,0.05)"}>
                  <span style={{fontSize:"15px",flexShrink:0,marginTop:"1px"}}>{typeIcon(n.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-primary leading-relaxed">{n.text}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {n.time.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
                    </p>
                  </div>
                  {!n.read && <span style={{width:"7px",height:"7px",borderRadius:"50%",backgroundColor:"#818cf8",flexShrink:0,marginTop:"5px"}}/>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
