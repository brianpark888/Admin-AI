"use client";
import ShowForm from '@/Components/ShowForm';
import Navbar from '@/Components/NavigationBar';
import {useState} from 'react';

export default function Home() {

    return (
      <div>
        <Navbar />
        <ShowForm />
      </div>
    );
  }
  