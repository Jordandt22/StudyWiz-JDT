const { errorHandler } = require("../utils/global.utils");
const { verifyAccessToken } = require("../firebase/firebase.utils");

module.exports = {
  authUser: async (req, res, next) => {
    const ERROR_ROUTE = "AUTH";
    const { fbId } = req.params;
    const accessToken = req.headers.authorization;
    if (!accessToken)
      return errorHandler(res, 400, ERROR_ROUTE, "MUST SEND AN ACCESS TOKEN");

    // Verifying Firebase Access Token
    verifyAccessToken(
      accessToken.replace("Bearer ", ""),
      res,
      async (decodedToken) => {
        if (!decodedToken)
          return errorHandler(res, 400, ERROR_ROUTE, "INVALID ACCESS TOKEN");

        // Checking the Firebase ID
        const {
          uid,
          firebase: { sign_in_provider },
        } = decodedToken;
        if (uid !== fbId)
          return errorHandler(res, 401, ERROR_ROUTE, "INCORRECT UID");

        // Sending the data to next part
        req.body = { ...req.body, fbId, provider: sign_in_provider };
        return next();
      }
    );
  },
};
