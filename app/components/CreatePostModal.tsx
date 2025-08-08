"use client";

import { useState } from "react";
import PostForm from "./PostForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function CreatePostModal({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-pink-600 text-white px-4 py-2 rounded shadow hover:bg-pink-700 transition">Create New Post</button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full p-0">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <PostForm onCreated={() => { setOpen(false); onCreated(); }} />
      </DialogContent>
    </Dialog>
  );
}
