"use client";
import { useState } from "react";


export default function PostForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, imageUrl }),
      });
      if (!res.ok) throw new Error("Failed to create post");
      setTitle("");
      setDescription("");
      setCategory("");
      setImageUrl("");
      onCreated();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Create New Post</h2>
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
        <input
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          required
          type="url"
          placeholder="https://example.com/image.jpg"
          className="w-full border rounded px-3 py-2"
        />
        {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 rounded max-h-40" />}
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" disabled={loading || !imageUrl} className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition disabled:opacity-50">
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
