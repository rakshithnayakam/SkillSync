import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClockIcon, ArrowRightIcon } from "./Icons";
import API from "../../api/axios";

const COLORS = [
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-green-100",  text: "text-green-700"  },
  { bg: "bg-orange-100", text: "text-orange-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
];

const UpcomingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading]   = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/sessions")
      .then((r) => {
        const all = r.data.data || r.data.sessions || [];
        const upcoming = all
          .filter((s) => s.status === "scheduled")
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
          .slice(0, 3);
        setSessions(upcoming);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary">Upcoming Sessions</h2>
        <button
          onClick={() => navigate("/sessions")}
          className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          View All <ArrowRightIcon className="w-4 h-4 ml-1" />
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse" />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">📅</p>
          <p className="text-sm">No upcoming sessions.</p>
          <button
            onClick={() => navigate("/sessions")}
            className="mt-3 text-xs text-indigo-600 hover:underline"
          >
            Create one →
          </button>
        </div>
      ) : (
        <div className="space-y-1 border-t pt-4">
          {sessions.map((s, i) => {
            const start = new Date(s.startTime);
            const peer  = s.teacherId?.fullName || s.learnerId?.fullName || "Peer";
            const skill = s.skillId?.name || "Session";
            const color = COLORS[i % COLORS.length];
            return (
              <div
                key={s._id}
                className="flex justify-between items-center p-3 border-b last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${color.bg}`}>
                    <ClockIcon className={`w-5 h-5 ${color.text}`} />
                  </div>
                  <div>
                    <p className="font-medium text-primary">{skill}</p>
                    <p className="text-xs text-muted">with {peer}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-secondary">
                  {start.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingSessions;