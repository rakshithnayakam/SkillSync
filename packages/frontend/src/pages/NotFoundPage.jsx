import { useNavigate, useLocation } from "react-router-dom";

// ──────────────────────────────────────────────
// 404 Page  –  SkillSync Priority 3
// ──────────────────────────────────────────────

export default function NotFoundPage() {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Big illustrated number */}
        <div className="relative inline-block mb-6">
          <span className="text-[9rem] font-black leading-none tracking-tighter select-none"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </span>
          {/* floating emoji */}
          <span className="absolute -top-3 -right-4 text-4xl animate-bounce">🔎</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-zinc-400 text-sm leading-relaxed mb-2">
          The page{" "}
          <code className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded text-xs">
            {location.pathname}
          </code>{" "}
          doesn't exist.
        </p>
        <p className="text-zinc-500 text-sm mb-8">
          It may have been moved, deleted, or you may have mistyped the URL.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-500 hover:text-white transition-colors"
          >
            ← Go back
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-colors"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-zinc-800">
          <p className="text-xs text-zinc-600 mb-3">Or jump to</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Sessions",    path: "/sessions"    },
              { label: "Wallet",      path: "/wallet"      },
              { label: "Badges",      path: "/badges"      },
              { label: "Matchmaking", path: "/matchmaking" },
              { label: "Profile",     path: "/profile"     },
            ].map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}