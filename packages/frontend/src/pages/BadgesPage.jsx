import { useState, useEffect } from "react";
import API from "../api/axios";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const BADGES = [
  { id:"first_session",    emoji:"🎯", name:"First Step",       desc:"Complete your first session",      threshold:1,   color:"#fbbf24", bg:"rgba(251,191,36,0.12)"  },
  { id:"five_sessions",    emoji:"🔥", name:"On Fire",           desc:"Complete 5 sessions",              threshold:5,   color:"#fb923c", bg:"rgba(251,146,60,0.12)"  },
  { id:"ten_sessions",     emoji:"💎", name:"Diamond Learner",   desc:"Complete 10 sessions",             threshold:10,  color:"#60a5fa", bg:"rgba(96,165,250,0.12)"  },
  { id:"first_teach",      emoji:"🧑‍🏫", name:"First Teacher",   desc:"Teach your first session",         threshold:1,   color:"#a78bfa", bg:"rgba(167,139,250,0.12)" },
  { id:"five_teach",       emoji:"🏫", name:"Mentor",            desc:"Teach 5 sessions",                 threshold:5,   color:"#818cf8", bg:"rgba(129,140,248,0.12)" },
  { id:"skill_diverse",    emoji:"🌈", name:"Polymath",          desc:"Exchange 3 different skills",      threshold:3,   color:"#f472b6", bg:"rgba(244,114,182,0.12)" },
  { id:"wallet_100",       emoji:"💰", name:"Credit Hoarder",    desc:"Earn 100 credits total",           threshold:100, color:"#fbbf24", bg:"rgba(251,191,36,0.12)"  },
  { id:"top_rated",        emoji:"⭐", name:"Top Rated",         desc:"Receive 5 five-star ratings",      threshold:5,   color:"#60a5fa", bg:"rgba(96,165,250,0.12)"  },
  { id:"early_adopter",    emoji:"🚀", name:"Early Adopter",     desc:"Joined in the first month",        threshold:1,   color:"#a78bfa", bg:"rgba(167,139,250,0.12)" },
  { id:"profile_complete", emoji:"✅", name:"Complete Profile",  desc:"Fill out your full profile",       threshold:1,   color:"#34d399", bg:"rgba(52,211,153,0.12)"  },
  { id:"request_sent_5",   emoji:"📨", name:"Go-Getter",         desc:"Send 5 skill requests",            threshold:5,   color:"#fb923c", bg:"rgba(251,146,60,0.12)"  },
];

const BadgesPage = () => {
  const [user, setUser]         = useState(null);
  const [userBadges, setUserBadges] = useState({});
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");

  useEffect(() => {
    Promise.all([API.get("/auth/current-user"), API.get("/badges/me")])
      .then(([u,b]) => {
        setUser(u.data.data);
        const map = {};
        (b.data.badges||[]).forEach(x => map[x.badgeId]=x);
        setUserBadges(map);
      })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  }, []);

  const earned = BADGES.filter(b=>userBadges[b.id]?.earned).length;
  const shown  = filter==="all" ? BADGES : filter==="earned" ? BADGES.filter(b=>userBadges[b.id]?.earned) : BADGES.filter(b=>!userBadges[b.id]?.earned);

  return (
    <div className="min-h-screen" style={{backgroundColor:"var(--bg-primary)"}}>
      <DashboardNavbar user={user}/>
      <Sidebar/>
      <main style={{paddingTop:"4rem",paddingLeft:"15rem",minHeight:"100vh"}}>
        <div style={{background:"linear-gradient(135deg,rgba(79,70,229,0.15) 0%,rgba(124,58,237,0.08) 100%)",borderBottom:"1px solid var(--border)",padding:"2rem 2.5rem 1.5rem"}}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-primary">Badges</h1>
              <p className="text-secondary mt-1 text-sm">Track your achievements and milestones</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-primary">{earned} <span className="text-base font-normal text-secondary">/ {BADGES.length}</span></p>
              <p className="text-xs text-secondary mt-0.5">badges earned</p>
              <div className="h-1.5 rounded-full mt-2 w-32" style={{backgroundColor:"var(--border)"}}>
                <div className="h-full rounded-full" style={{width:`${Math.round((earned/BADGES.length)*100)}%`,background:"linear-gradient(90deg,#4f46e5,#7c3aed)"}}/>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 max-w-4xl space-y-6">

          {/* Progress */}
          <div className="card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-secondary">Overall Progress</p>
                <p className="text-3xl font-extrabold text-primary mt-0.5">{earned} <span className="text-lg font-normal text-secondary">/ {BADGES.length} badges</span></p>
              </div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)"}}>
                <span style={{fontSize:"28px"}}>🏆</span>
              </div>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{backgroundColor:"var(--border)"}}>
              <div className="h-full rounded-full transition-all duration-700" style={{width:`${(earned/BADGES.length)*100}%`,background:"linear-gradient(90deg,#4f46e5,#7c3aed)"}}/>
            </div>
            <p className="text-xs text-muted mt-2">{Math.round((earned/BADGES.length)*100)}% complete</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {["all","earned","locked"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className="px-4 py-2 rounded-xl text-sm font-medium capitalize"
                style={filter===f ? {background:"linear-gradient(135deg,#4f46e5,#7c3aed)",color:"white",border:"none",cursor:"pointer"} : {backgroundColor:"var(--bg-card)",color:"var(--text-secondary)",border:"1px solid var(--border)",cursor:"pointer"}}>
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({length:8}).map((_,i)=><div key={i} className="h-40 rounded-2xl animate-pulse" style={{backgroundColor:"var(--bg-card)"}}/>)}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {shown.map(b=>{
                const isEarned = !!userBadges[b.id]?.earned;
                const progress = userBadges[b.id]?.progress ?? 0;
                const pct = Math.min(100, Math.round((progress/b.threshold)*100));
                return (
                  <div key={b.id} className="card rounded-2xl p-4 flex flex-col items-center text-center transition-transform hover:scale-105"
                    style={isEarned ? {border:`1px solid ${b.color}33`} : {opacity:0.7}}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                      style={{backgroundColor: isEarned ? b.bg : "var(--bg-secondary)"}}>
                      <span style={{fontSize:"26px",filter:isEarned?"none":"grayscale(100%)"}}>{b.emoji}</span>
                    </div>
                    <p className="text-sm font-semibold text-primary mb-1">{b.name}</p>
                    <p className="text-xs text-secondary leading-snug mb-3">{b.desc}</p>
                    {isEarned ? (
                      <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{backgroundColor:b.bg,color:b.color}}>✓ Earned</span>
                    ) : (
                      <div className="w-full">
                        <div className="flex justify-between text-xs text-muted mb-1">
                          <span>{progress}</span><span>{b.threshold}</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{backgroundColor:"var(--border)"}}>
                          <div className="h-full rounded-full" style={{width:`${pct}%`,backgroundColor:b.color}}/>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default BadgesPage;
