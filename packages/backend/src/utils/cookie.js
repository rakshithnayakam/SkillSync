import ms from "ms";

export const setAuthCookies = (res, accessToken, refreshToken) => {
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    domain: "localhost",
  };

  res.cookie("accessToken", accessToken, {
    ...options,
    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY),
  });

  res.cookie("refreshToken", refreshToken, {
    ...options,
    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY),
  });
};

export const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", { path: "/", domain: "localhost" });
  res.clearCookie("refreshToken", { path: "/", domain: "localhost" });
};