"use client";



import Header from "./header";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
const CreatePostModal = dynamic(() => import("./components/CreatePostModal"), { ssr: false });
const PostGrid = dynamic(() => import("./components/PostGrid"), { ssr: false });

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  const { user } = useUser();
  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ background: "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(255, 255, 255, 1) 100%)" }}>
      <Header />
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-16 px-4">
        <img src="/file.svg" alt="Hero" className="mx-auto mb-6 w-32 h-32 object-contain drop-shadow-lg" />
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900">Image for Posting and Sharing</h1>
        <p className="max-w-xl mx-auto text-lg text-gray-700 mb-8">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                const btn = document.querySelector('button.bg-blue-600');
                if (btn && 'click' in btn) (btn as HTMLButtonElement).click();
              }}
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
            >
              Get started
            </a>
          ) : (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                const signInBtn = document.querySelector('button[data-sign-in-button]');
                if (signInBtn && 'dispatchEvent' in signInBtn) (signInBtn as HTMLButtonElement).dispatchEvent(new MouseEvent('click', { bubbles: true }));
              }}
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
            >
              Get started
            </a>
          )}
          <a href="#learn-more" className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition border border-blue-600">Learn more →</a>
        </div>
      </section>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          {user && <CreatePostModal onCreated={() => setRefresh(r => r + 1)} />}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <PostGrid refresh={refresh} />
        </div>
      </main>
    </div>
  );
}
