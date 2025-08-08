"use client";
import { useState } from "react";
import type { Post } from "./PostGrid";

export default function EditPostForm({ post, onSaved, onCancel }: {
  post: Post;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id, title, description, category, imageUrl }),
      });
      if (!res.ok) {
        let msg = "Failed to update post";
        try {
          const data = await res.json();
          msg = data.error || msg;
        } catch {}
        throw new Error(msg);
      }
      onSaved();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Edit Post</h2>
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <input value={category} onChange={e => setCategory(e.target.value)} required className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} required type="url" className="w-full border rounded px-3 py-2" />
        {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 rounded max-h-40" />}
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex gap-2">
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition">Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
