import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API, { getUserSkills, getAllSkills, saveSkills } from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const MySkillsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [addingType, setAddingType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, skillsRes, allSkillsRes] = await Promise.all([
          API.get("/auth/current-user"),
          getUserSkills(),
          getAllSkills(),
        ]);
        setUser(userRes.data.data);
        setUserSkills(skillsRes.data.data);
        setAllSkills(allSkillsRes.data.data);
      } catch {
        toast.error("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const offeredSkills = userSkills.filter((s) => s.type === "offer");
  const wantedSkills = userSkills.filter((s) => s.type === "want");

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !userSkills.find(
        (us) => us.name === skill.name && us.type === addingType,
      ) &&
      searchQuery.trim() !== "",
  );

  const handleAddSkill = async (skill) => {
    try {
      const res = await saveSkills({ skill: skill.name, type: addingType });
      setUserSkills([...userSkills, res.data.data]);
      setSearchQuery("");
      toast.success(`${skill.name} added!`);
    } catch {
      toast.error("Failed to add skill");
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await API.delete(`/user-skills/${skillId}`);
      setUserSkills(userSkills.filter((s) => s._id !== skillId));
      toast.success("Skill removed!");
    } catch {
      toast.error("Failed to remove skill");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-64 p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">My Skills</h1>
          </div>

          {/* Skills I Can Teach */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-primary">
                Skills I Can Teach
                <span className="ml-2 text-sm text-gray-400">
                  ({offeredSkills.length})
                </span>
              </h2>
              <button
                onClick={() => {
                  setShowSearch(true);
                  setAddingType("offer");
                }}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              >
                + Add Skill
              </button>
            </div>

            {showSearch && addingType === "offer" && (
              <div className="mb-4">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search skills to add..."
                  className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoFocus
                />
                {filteredSkills.length > 0 && (
                  <div className="border rounded-xl mt-1 bg-white dark:bg-gray-800 shadow-lg">
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill._id}
                        onClick={() => handleAddSkill(skill)}
                        className="p-3 hover:bg-blue-50 cursor-pointer flex justify-between"
                      >
                        <span>{skill.name}</span>
                        <span className="text-xs text-gray-400">
                          {skill.category}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                  className="text-xs text-gray-400 mt-2 hover:text-secondary"
                >
                  Cancel
                </button>
              </div>
            )}

            {offeredSkills.length === 0 ? (
              <p className="text-gray-400 text-sm">No skills added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {offeredSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    {skill.name}
                    <button
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="text-blue-400 hover:text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Skills I Want to Learn */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-primary">
                Skills I Want to Learn
                <span className="ml-2 text-sm text-gray-400">
                  ({wantedSkills.length})
                </span>
              </h2>
              <button
                onClick={() => {
                  setShowSearch(true);
                  setAddingType("want");
                }}
                className="text-sm bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700"
              >
                + Add Skill
              </button>
            </div>

            {showSearch && addingType === "want" && (
              <div className="mb-4">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search skills to add..."
                  className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  autoFocus
                />
                {filteredSkills.length > 0 && (
                  <div className="border rounded-xl mt-1 bg-white dark:bg-gray-800 shadow-lg">
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill._id}
                        onClick={() => handleAddSkill(skill)}
                        className="p-3 hover:bg-emerald-50 cursor-pointer flex justify-between"
                      >
                        <span>{skill.name}</span>
                        <span className="text-xs text-gray-400">
                          {skill.category}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                  className="text-xs text-gray-400 mt-2 hover:text-secondary"
                >
                  Cancel
                </button>
              </div>
            )}

            {wantedSkills.length === 0 ? (
              <p className="text-gray-400 text-sm">No skills added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {wantedSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    {skill.name}
                    <button
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="text-emerald-400 hover:text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MySkillsPage;
