"use client";


import Header from "./header";
import dynamic from "next/dynamic";
import { useState } from "react";
const CreatePostModal = dynamic(() => import("./components/CreatePostModal"), { ssr: false });
const PostGrid = dynamic(() => import("./components/PostGrid"), { ssr: false });

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <CreatePostModal onCreated={() => setRefresh(r => r + 1)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <PostGrid refresh={refresh} />
        </div>
      </main>
    </div>
  );
}
