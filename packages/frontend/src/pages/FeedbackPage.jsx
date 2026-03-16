import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";
import toast from "react-hot-toast";

const StarDisplay = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`text-lg ${s <= rating ? "text-yellow-400" : "text-gray-200"}`}>
        ★
      </span>
    ))}
  </div>
);

const FeedbackPage = () => {
  const { userId }    = useParams();
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ feedbacks: [], totalRatings: 0, averageRating: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get("/auth/current-user");
        setUser(userRes.data.data);

        const targetId = userId || userRes.data.data._id;
        const feedbackRes = await API.get(`/feedback/${targetId}`);
        setData(feedbackRes.data.data);
      } catch {
        toast.error("Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: data.feedbacks.filter((f) => f.rating === star).length,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-64 p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Feedback & Ratings</h1>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 rounded-2xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {/* Summary card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-8">
                  {/* Average score */}
                  <div className="text-center flex-shrink-0">
                    <p className="text-6xl font-black text-gray-900">
                      {data.averageRating ?? "—"}
                    </p>
                    <StarDisplay rating={Math.round(data.averageRating || 0)} />
                    <p className="text-sm text-gray-400 mt-1">
                      {data.totalRatings} review{data.totalRatings !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Bar breakdown */}
                  <div className="flex-1 space-y-2">
                    {ratingCounts.map(({ star, count }) => {
                      const pct = data.totalRatings > 0
                        ? Math.round((count / data.totalRatings) * 100)
                        : 0;
                      return (
                        <div key={star} className="flex items-center gap-2 text-sm">
                          <span className="w-3 text-gray-500 text-xs">{star}</span>
                          <span className="text-yellow-400 text-xs">★</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400 rounded-full transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-5 text-gray-400 text-xs text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Feedback list */}
              {data.feedbacks.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <p className="text-4xl mb-3">💬</p>
                  <p className="text-lg font-medium text-gray-500">No feedback yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Complete sessions to receive ratings.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.feedbacks.map((f) => (
                    <div
                      key={f._id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center flex-shrink-0">
                            {f.fromUser?.fullName?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">
                              {f.fromUser?.fullName || "Anonymous"}
                            </p>
                            <p className="text-xs text-gray-400">
                              @{f.fromUser?.username}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <StarDisplay rating={f.rating} />
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(f.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                        {f.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default FeedbackPage;