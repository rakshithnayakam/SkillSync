import { useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";

const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-3xl transition-transform hover:scale-110"
        >
          <span
            className={
              hovered >= star || value >= star
                ? "text-yellow-400"
                : "text-gray-600"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

const RATING_LABELS = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

const FeedbackModal = ({ session, currentUserId, onClose, onSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const isTeacher =
    session.teacherId?._id?.toString() === currentUserId?.toString() ||
    session.teacherId?.toString() === currentUserId?.toString();
  const toUser = isTeacher ? session.learnerId : session.teacherId;
  const toUserName = toUser?.fullName || "your session partner";
  const toUserId = toUser?._id || toUser;

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    if (comment.length < 10) {
      toast.error("Comment must be at least 10 characters");
      return;
    }
    if (!toUserId) {
      toast.error("Could not determine recipient");
      return;
    }
    setLoading(true);
    try {
      await API.post("/feedback", {
        toUser: toUserId,
        rating,
        comment: comment.trim(),
      });
      toast.success("Feedback submitted!");
      onSubmitted?.();
      onClose();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="card rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Rate Your Session</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div
          className="flex items-center gap-3 mb-6 p-3 rounded-xl"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center flex-shrink-0">
            {toUserName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">{toUserName}</p>
            <p className="text-xs text-secondary">
              {session.skillId?.name || "Skill session"}
            </p>
          </div>
        </div>
        <div className="mb-5">
          <label className="text-sm font-medium text-secondary mb-2 block">
            Your Rating
          </label>
          <StarRating value={rating} onChange={setRating} />
          {rating > 0 && (
            <p className="text-sm text-indigo-400 font-medium mt-1">
              {RATING_LABELS[rating]}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="text-sm font-medium text-secondary mb-2 block">
            Comment{" "}
            <span className="text-muted font-normal">(min 10 characters)</span>
          </label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this session..."
            className="w-full p-3 rounded-xl text-sm text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
          />
          <p className="text-xs text-muted mt-1 text-right">
            {comment.length}/1000
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-secondary hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !rating || comment.length < 10}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
