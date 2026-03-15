import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "./Icons";
import API from "../../api/axios";

const RecommendedMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/matchmaking")
      .then((r) => setMatches((r.data.matches || r.data.data || []).slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recommended Matches</h2>
        <button
          onClick={() => navigate("/matchmaking")}
          className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          View All <ArrowRightIcon className="w-4 h-4 ml-1" />
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-sm">No matches yet. Add skills to your profile!</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {matches.map((m) => (
            <div key={m.user._id} className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center flex-shrink-0">
                  {m.user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{m.user.name}</p>
                  <p className="text-sm text-gray-500 truncate max-w-xs">
                    {m.commonSkills?.join(", ") || "Skill match"}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 flex-shrink-0">
                {m.matchScore}% Match
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedMatches;