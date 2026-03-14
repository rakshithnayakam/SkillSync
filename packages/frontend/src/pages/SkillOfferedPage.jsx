import { useState, useEffect, useRef } from "react";
import { X, Award, ChevronRight } from "lucide-react";
import { getAllSkills, saveSkills } from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SkillsOfferedPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
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
    if (!selectedSkills.length) {
      toast.error("Select at least one skill");
      return;
    }
    setLoading(true);
    try {
      await Promise.all(
        selectedSkills.map((skill) =>
          saveSkills({ skill: skill.name, type: "offer" }),
        ),
      );
      toast.success("Skills saved! Welcome to SkillSync 🎉");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
        <Award /> Skills You Can Teach
      </h1>
      <p className="text-gray-500 mb-6">
        Select skills you can offer to others
      </p>

      <div ref={searchRef} className="relative mb-6 max-w-lg">
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search skills..."
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute bg-white border rounded-xl mt-2 w-full z-10 shadow-lg">
            {filteredSuggestions.map((skill) => (
              <div
                key={skill._id}
                onClick={() => addSkill(skill)}
                className="p-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
              >
                <span>{skill.name}</span>
                <span className="text-xs text-gray-400">{skill.category}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {selectedSkills.map((skill) => (
          <span
            key={skill._id}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg flex items-center gap-2 font-medium"
          >
            {skill.name}
            <X
              size={14}
              className="cursor-pointer hover:text-red-500"
              onClick={() => removeSkill(skill._id)}
            />
          </span>
        ))}
      </div>

      <button
        onClick={handleFinish}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Finish"} <ChevronRight />
      </button>
    </div>
  );
};

export default SkillsOfferedPage;
