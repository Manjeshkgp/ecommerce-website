import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pkg from "passport-jwt";
import userSchema from "../models/userSchema.js";
import * as dotenv from "dotenv";
import passport from "passport";
import crypto from "crypto";
import adminSchema from "../models/adminSchema.js";
dotenv.config();

export const GoogleAuth = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope:['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    },
     function (accessToken, refreshToken, profile, cb) {
      console.log(profile.displayName)
      userSchema.findOne({
        email: profile.emails[0].value
      }).lean().exec(async function(err,user){
        if (err) {
          return cb(err, false);
        }
        if (user) {
          return cb(null, {email:user.email,name:user.name,_id:user._id,createdAt:user.createdAt});
        } else {
          const registerUser = new userSchema({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomUUID().toString(),
          });
          const saveUser = await registerUser.save();
          console.log(saveUser);
          user = saveUser;
          return cb(null, user);
        }
      });
    }
  )
);
passport.serializeUser(function(user,cb){
  cb(null,user)
});
passport.deserializeUser(function(user,cb){
  cb(null,user)
});

const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      userSchema.findById(jwt_payload._id, function (err, user) {
        if (Date.now() > jwt_payload.exp * 1000) {
          return done(null, false, { message: 'Token expired' });
        }
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, {email:user.email,name:user.name,_id:user._id,createdAt:user.createdAt});
        } else {
          adminSchema.findById(jwt_payload._id,function(err,admin){
            if(err){
              return done (err, false);
            }
            if(admin){
              return done (null,{email:admin.email,name:admin.name,_id:admin._id,createdAt:admin.createdAt})
            }
            else {
              return done (null, false)
            }
          })
          // or you could create a new account
        }
      });
    })
  );
};

