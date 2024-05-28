"use client";
import Navbar from '@/Components/NavigationBar';
import React, { useState } from 'react';
import Button from '@/Components/Button';

import { useSession, signIn, signOut } from "next-auth/react";

function LoginPage() {
    const { data: session } = useSession();
    return (
        <>
            <Navbar />
            <div className="grid m-auto text-center">
                {session ? (
                    <>
                        <div>Signed in as {session.user.name}</div>
                        <Button onClick={() => signOut()}>Sign out</Button>
                    </>
                ) : (
                    <>
                        <div className="m-4">If not signed in...</div>
                        <Button onClick={() => signIn()}>Sign in</Button>
                    </>
                )}
            </div>
        </>
    );
}

export default LoginPage;
