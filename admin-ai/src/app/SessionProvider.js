"use client"; //SessionProvider Added for Login Control

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

const SessionProvider = ({ children }) => {
    return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;

