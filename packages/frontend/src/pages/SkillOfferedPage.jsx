import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Search,
  Plus,
  Award,
  Target,
  ChevronRight,
} from "lucide-react";
import { saveSkills } from "../api/axios";
import { useNavigate } from "react-router-dom";

const SkillsOfferedPage = () => {
  const navigate = useNavigate(); // ✅ CORRECT PLACE

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const allSkills = [
    "JavaScript","Python","Java","C++","React","Angular","Vue.js",
    "Node.js","Django","Flask","Spring Boot","HTML","CSS",
    "TypeScript","SQL","MongoDB","AWS","Docker","Git"
  ];

  const filteredSuggestions = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedSkills.includes(skill) &&
      searchQuery.trim() !== ""
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const toggleSkill = (skill) => {
    selectedSkills.includes(skill) ? removeSkill(skill) : addSkill(skill);
  };

  const handleFinish = async () => {
    if (!selectedSkills.length) {
      alert("Select at least one skill");
      return;
    }

    try {
      await saveSkills(selectedSkills, "offer");
      navigate("/dashboard"); // ✅ FINAL STEP
    } catch {
      alert("Failed to save skills");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Award /> Skills Offered
      </h1>

      <div ref={searchRef} className="relative mb-6">
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search skills..."
          className="w-full p-3 border rounded-xl"
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute bg-white border rounded-xl mt-2 w-full z-10">
            {filteredSuggestions.map((skill) => (
              <div
                key={skill}
                onClick={() => addSkill(skill)}
                className="p-3 hover:bg-blue-50 cursor-pointer flex justify-between"
              >
                {skill}
                <Plus size={16} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {selectedSkills.map((skill) => (
          <span
            key={skill}
            className="bg-blue-100 px-3 py-1 rounded-lg flex items-center gap-2"
          >
            {skill}
            <X
              size={14}
              className="cursor-pointer"
              onClick={() => removeSkill(skill)}
            />
          </span>
        ))}
      </div>

      <button
        onClick={handleFinish}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
      >
        Finish <ChevronRight />
      </button>
    </div>
  );
};

export default SkillsOfferedPage;
