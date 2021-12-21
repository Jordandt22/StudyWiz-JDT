const admin = require("./firebase.admin");
const { errorHandler } = require("../utils/global.utils");

module.exports = {
  verifyAccessToken: async (accessToken, res, cb) =>
    await admin
      .auth()
      .verifyIdToken(accessToken)
      .then(cb)
      .catch((err) => {
        const {
          errorInfo: { code, message },
        } = err;
        if (process.env.NODE_ENV === "development") console.log(code, message);

        switch (code) {
          case "auth/argument-error":
          case "auth/invalid-id-token":
          case "auth/id-token-revoked":
            return errorHandler(
              res,
              400,
              "FIREBASE AUTH",
              "INVALID ACCESS TOKEN",
              err.errorInfo
            );

          case "auth/id-token-expired":
            return errorHandler(
              res,
              400,
              "FIREBASE AUTH",
              "EXPIRED ACCESS TOKEN",
              err.errorInfo
            );

          default:
            return errorHandler(res, 500, "FIREBASE AUTH", "ERROR OCCURED");
        }
      }),
};
