import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // If token.length < 500 => Then, this token is custom auth token from jwt
    // If token .length > 500  => Then, this token is google auth token
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      // this is going to give us  the data from each specific token (it is give us the username of the person and its id)
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      // sub is smply google's name for a specific id that differenciate every single google user
      req.userId = decodedData?.sub;
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
