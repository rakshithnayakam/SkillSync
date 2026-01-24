import ms from "ms";

export const setAuthCookies = (res, accessToken, refreshToken) => {
  const isProd = process.env.NODE_ENV === "production";

  const options = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  };

  // Access Token (Short lived)
  res.cookie("accessToken", accessToken, {
    ...options,
    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY), // 1day
  });

  // Refresh Token (Long lived)
  res.cookie("refreshToken", refreshToken, {
    ...options,
    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY), // 7 days
  });
};

export const clearAuthCookies = (res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};
