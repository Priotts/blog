import NextAuth from "next-auth";
import { authConfig } from "./utils/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  runtime: 'experimental-edge',  
  unstable_allowDynamic: [
     '/node_modules/mongoose/**',  
  ],
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
