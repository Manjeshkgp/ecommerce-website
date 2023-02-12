import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pkg from "passport-jwt";
import userSchema from "../models/userSchema.js";
import * as dotenv from "dotenv";
import passport from "passport";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope:["profile","email"]
    },
    async function (accessToken, refreshToken, profile, done) {
      let userExists = await userSchema.findOne({
        email: profile.emails[0]
      });
      if (!userExists) {
        const registerUser = new userSchema({
          name: profile.name,
          email: profile.emails[0],
          password: crypto.randomUUID(),
        });
        const saveUser = await registerUser.save();
        console.log(saveUser);
        userExists = saveUser;
      }
      done(null, userExists);
    }
  )
);

const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      userSchema.findOne(jwt_payload.email, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
