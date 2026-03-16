import { useState, useEffect, useRef } from "react";
import { X, Plus, BookOpen, ChevronRight } from "lucide-react";
import { getAllSkills, saveSkills } from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SkillsWantedPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery]   = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allSkills, setAllSkills]       = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading]           = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    getAllSkills()
      .then((res) => setAllSkills(res.data.data))
      .catch(() => toast.error("Failed to load skills"));
  }, []);

  const filteredSuggestions = allSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedSkills.find((s) => s._id === skill._id) &&
      searchQuery.trim() !== "",
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addSkill = (skill) => {
    if (!selectedSkills.find((s) => s._id === skill._id)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillId) => {
    setSelectedSkills(selectedSkills.filter((s) => s._id !== skillId));
  };

  const handleFinish = async () => {
    if (!selectedSkills.length) { toast.error("Select at least one skill"); return; }
    setLoading(true);
    try {
      await Promise.all(selectedSkills.map((skill) => saveSkills({ skill: skill.name, type: "want" })));
      toast.success("Skills saved!");
      navigate("/skills-offered");
    } catch (err) {
      toast.error("Failed to save skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
              <BookOpen size={20} style={{ color: "#10b981" }} />
            </div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              Skills You Want to Learn
            </h1>
          </div>
          <p style={{ color: "var(--text-secondary)" }}>Select skills you want to learn from others</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ backgroundColor: "#10b981" }}>1</div>
            <span className="text-sm font-medium" style={{ color: "#10b981" }}>Skills to Learn</span>
          </div>
          <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>2</div>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Skills to Teach</span>
          </div>
        </div>

        {/* Search */}
        <div ref={searchRef} className="relative mb-6">
          <div className="relative">
            <Plus size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
            <input
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              placeholder="Search skills to learn..."
              style={{
                width: "100%", padding: "0.75rem 1rem 0.75rem 2.25rem",
                borderRadius: "0.75rem", border: "1px solid var(--border)",
                backgroundColor: "var(--bg-card)", color: "var(--text-primary)",
                fontSize: "0.875rem", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute w-full z-10 mt-1 rounded-xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              {filteredSuggestions.slice(0, 8).map((skill) => (
                <div key={skill._id} onClick={() => addSkill(skill)}
                  className="flex justify-between items-center p-3 cursor-pointer transition-colors"
                  style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(16,185,129,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                  <span style={{ color: "var(--text-primary)", fontSize: "0.875rem" }}>{skill.name}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{skill.category}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected skills */}
        {selectedSkills.length > 0 && (
          <div className="mb-8">
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              Selected ({selectedSkills.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <span key={skill._id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>
                  {skill.name}
                  <X size={13} className="cursor-pointer" onClick={() => removeSkill(skill._id)}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#10b981"} />
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedSkills.length === 0 && (
          <div className="mb-8 p-8 rounded-xl text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <BookOpen size={32} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-secondary)" }}>Search and select skills you want to learn</p>
          </div>
        )}

        {/* Continue button */}
        <button onClick={handleFinish} disabled={loading || !selectedSkills.length}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-opacity"
          style={{
            background: "linear-gradient(135deg, #10b981, #0d9488)",
            color: "white", border: "none", cursor: loading || !selectedSkills.length ? "not-allowed" : "pointer",
            opacity: loading || !selectedSkills.length ? 0.5 : 1,
          }}>
          {loading ? "Saving..." : "Continue"} <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
};

export default SkillsWantedPage;
