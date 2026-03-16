import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../api/axios";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token          = searchParams.get("token");
  const [status, setStatus] = useState("verifying"); // verifying | success | error

  useEffect(() => {
    if (!token) { setStatus("error"); return; }
    API.get(`/auth/verify-email/${token}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 p-10 max-w-md w-full text-center">
        {status === "verifying" && (
          <>
            <div className="text-5xl mb-4 animate-pulse">📧</div>
            <h2 className="text-xl font-bold text-primary">Verifying your email...</h2>
            <p className="text-gray-400 text-sm mt-2">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-primary">Email Verified!</h2>
            <p className="text-muted text-sm mt-2 mb-6">
              Your email has been verified. You're all set!
            </p>
            <Link
              to="/dashboard"
              className="inline-block py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
            >
              Go to Dashboard
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-primary">Verification Failed</h2>
            <p className="text-muted text-sm mt-2 mb-6">
              The link is invalid or has expired.
            </p>
            <Link
              to="/dashboard"
              className="inline-block py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
            >
              Request New Link
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;