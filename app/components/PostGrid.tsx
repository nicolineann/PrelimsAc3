"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import EditPostForm from "./EditPostForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export type Post = {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  createdAt: string;
  userId: string;
};

export default function PostGrid({ refresh }: { refresh: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editPost, setEditPost] = useState<Post|null>(null);
  const [deletePost, setDeletePost] = useState<Post|null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data))
      .finally(() => setLoading(false));
  }, [refresh]);

  if (loading) return <div className="col-span-full text-center text-gray-400">Loading...</div>;
  if (!posts.length) return <div className="col-span-full text-center text-gray-400">No posts yet.</div>;

  return (
    <>
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow p-4 flex flex-col relative">
          <img src={post.imageUrl} alt={post.title} className="rounded mb-2 object-cover h-48 w-full" />
          <h3 className="font-bold text-lg mb-1">{post.title}</h3>
          <div className="text-xs text-gray-500 mb-1">{post.category}</div>
          <p className="text-gray-700 flex-1">{post.description}</p>
          <div className="text-xs text-gray-400 mt-2">{new Date(post.createdAt).toLocaleString()}</div>
          {user && user.id === post.userId && (
            <div className="flex gap-2 mt-3">
              <button onClick={() => setEditPost(post)} className="flex-1 bg-pink-400 text-white py-1 rounded hover:bg-pink-500 transition">Edit</button>
              <button onClick={() => setDeletePost(post)} className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition">Delete</button>
            </div>
          )}
        </div>
      ))}

      {/* Edit Modal */}
      <Dialog open={!!editPost} onOpenChange={open => !open && setEditPost(null)}>
        <DialogContent className="max-w-lg w-full p-0">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          {editPost && (
            <EditPostForm
              post={editPost}
              onSaved={() => {
                setEditPost(null);
                setTimeout(() => window.location.reload(), 500); // or trigger parent refresh
              }}
              onCancel={() => setEditPost(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={!!deletePost} onOpenChange={open => !open && setDeletePost(null)}>
        <DialogContent className="max-w-md w-full" aria-describedby="delete-dialog-desc">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
          </DialogHeader>
          <p id="delete-dialog-desc" className="mb-4">Are you sure you want to delete this post?</p>
          <div className="flex gap-2">
            <button
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
              onClick={() => setDeletePost(null)}
              disabled={actionLoading}
            >Cancel</button>
            <button
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
              disabled={actionLoading}
              onClick={async () => {
                if (!deletePost) return;
                setActionLoading(true);
                let errorMsg = "";
                try {
                  const res = await fetch("/api/posts", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: deletePost.id }),
                  });
                  if (!res.ok) {
                    try {
                      const data = await res.json();
                      errorMsg = data.error || "Failed to delete post";
                    } catch {
                      errorMsg = "Failed to delete post";
                    }
                    alert(errorMsg);
                    return;
                  }
                  setDeletePost(null);
                  setTimeout(() => window.location.reload(), 500); // or trigger parent refresh
                } finally {
                  setActionLoading(false);
                }
              }}
            >Delete</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
