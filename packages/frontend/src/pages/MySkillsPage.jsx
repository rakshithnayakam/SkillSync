import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API, { getUserSkills, getAllSkills, saveSkills } from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const MySkillsPage = () => {
  const navigate = useNavigate();
  const [user, setUser]           = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [addingType, setAddingType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, skillsRes, allSkillsRes] = await Promise.all([
          API.get("/auth/current-user"), getUserSkills(), getAllSkills(),
        ]);
        setUser(userRes.data.data);
        setUserSkills(skillsRes.data.data);
        setAllSkills(allSkillsRes.data.data);
      } catch { toast.error("Failed to load skills"); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const offeredSkills = userSkills.filter((s) => s.type === "offer");
  const wantedSkills  = userSkills.filter((s) => s.type === "want");

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !userSkills.find((us) => us.name === skill.name && us.type === addingType) &&
      searchQuery.trim() !== "",
  );

  const handleAddSkill = async (skill) => {
    try {
      const res = await saveSkills({ skill:skill.name, type:addingType });
      setUserSkills([...userSkills, res.data.data]);
      setSearchQuery("");
      toast.success(`${skill.name} added!`);
    } catch { toast.error("Failed to add skill"); }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await API.delete(`/user-skills/${skillId}`);
      setUserSkills(userSkills.filter((s) => s._id !== skillId));
      toast.success("Skill removed!");
    } catch { toast.error("Failed to remove skill"); }
  };

  const inp = { width:"100%", padding:"0.75rem 1rem", borderRadius:"0.75rem", border:"1px solid var(--border)", backgroundColor:"var(--bg-secondary)", color:"var(--text-primary)", fontSize:"0.875rem", outline:"none", boxSizing:"border-box" };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor:"var(--bg-primary)" }}>
      <p className="text-secondary">Loading...</p>
    </div>
  );

  const SkillSection = ({ title, skills, type, accentColor, accentBg }) => (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-primary">
          {title} <span className="text-sm font-normal text-secondary">({skills.length})</span>
        </h2>
        <button onClick={() => { setShowSearch(true); setAddingType(type); setSearchQuery(""); }}
          className="text-sm px-3 py-1 rounded-lg text-white font-medium"
          style={{ backgroundColor:accentColor, border:"none", cursor:"pointer" }}>+ Add</button>
      </div>

      {showSearch && addingType === type && (
        <div className="mb-4">
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..." style={inp} autoFocus />
          {filteredSkills.length > 0 && (
            <div className="mt-1 rounded-xl overflow-hidden shadow-lg"
              style={{ backgroundColor:"var(--bg-card)", border:"1px solid var(--border)" }}>
              {filteredSkills.slice(0, 8).map((skill) => (
                <div key={skill._id} onClick={() => handleAddSkill(skill)}
                  className="flex justify-between items-center p-3 cursor-pointer"
                  style={{ borderBottom:"1px solid var(--border)" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = accentBg}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                  <span className="text-primary text-sm">{skill.name}</span>
                  <span className="text-xs text-muted">{skill.category}</span>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => { setShowSearch(false); setSearchQuery(""); }}
            className="text-xs text-secondary mt-2" style={{ background:"none", border:"none", cursor:"pointer" }}>Cancel</button>
        </div>
      )}

      {skills.length === 0 ? <p className="text-secondary text-sm">No skills added yet</p> : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill._id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ backgroundColor:accentBg, color:accentColor, border:`1px solid ${accentColor}33` }}>
              {skill.name}
              <button onClick={() => handleDeleteSkill(skill._id)}
                style={{ background:"none", border:"none", cursor:"pointer", color:accentColor, fontSize:"14px", lineHeight:1, padding:0 }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
                onMouseLeave={(e) => e.currentTarget.style.color = accentColor}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor:"var(--bg-primary)" }}>
      <DashboardNavbar user={user} />
      <Sidebar />
      <main style={{paddingTop:"4rem",paddingLeft:"15rem",minHeight:"100vh"}}>
        <div style={{background:"linear-gradient(135deg,rgba(79,70,229,0.15) 0%,rgba(124,58,237,0.08) 100%)",borderBottom:"1px solid var(--border)",padding:"2rem 2.5rem 1.5rem"}}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-primary">My Skills</h1>
              <p className="text-secondary mt-1 text-sm">Skills you teach and want to learn</p>
            </div>
          </div>
        </div>
        <div className="p-6 max-w-3xl space-y-6">
          <SkillSection title="Skills I Can Teach"    skills={offeredSkills} type="offer" accentColor="#60a5fa" accentBg="rgba(96,165,250,0.1)" />
          <SkillSection title="Skills I Want to Learn" skills={wantedSkills}  type="want"  accentColor="#34d399" accentBg="rgba(52,211,153,0.1)"  />
        </div>
      </main>
    </div>
  );
};

export default MySkillsPage;
