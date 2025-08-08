import * as React from "react";
// If you are using @radix-ui/react-dialog (commonly used with shadcn/ui), update the import as follows:
// Update the import path below to the correct relative path if your Dialog component is local,
// for example, if it's in 'app/components/ui/dialog.tsx', use:
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
// Or, if you are using a package like @radix-ui/react-dialog, use:
//
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import PostForm from "./PostForm";

export default function CreatePostModal({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = React.useState(false);
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
