"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Menubar from "../components/Menubar";

const Dashboard = () => {
  const router = useRouter();
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  
  useEffect(() => {
    if (!isAuthenticated) {
      
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <>
    <Menubar />
        <div className="mt-5 text-center">
        <h1 className="text-purple-600 text-5xl">Welcome to the Dashboard</h1>
        <p className="text-pink-500 mt-5">Only authenticated users can see this page.</p>
        </div>
    </>
  );
};

export default Dashboard;
