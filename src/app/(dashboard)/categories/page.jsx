"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { FolderOpen, Plus, Trash2, Pencil, Check } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  const [color, setColor] = useState("#3B82F6");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("expense");
  const [editColor, setEditColor] = useState("#3B82F6");
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  async function addCategory(e) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    try {
      await api.post("/categories", {
        name: name.trim(),
        type,
        color,
        icon: "Circle",
      });

      toast.success("Category added successfully!");
      setName("");
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category.");
    }
  }

  async function deleteCategory(id) {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await api.delete(`/categories/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category.");
    }
  }

  function startEdit(cat) {
    setEditingId(cat._id);
    setEditName(cat.name);
    setEditType(cat.type || "expense");
    setEditColor(cat.color || "#3B82F6");
  }

  async function saveEdit(id) {
    if (!editName.trim()) {
      toast.error("Category name is required.");
      return;
    }

    try {
      await api.put(`/categories/${id}`, {
        name: editName.trim(),
        type: editType,
        color: editColor,
      });

      toast.success("Category updated!");
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category.");
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <FolderOpen className="text-blue-600" size={28} /> Category Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Create and organize your income and expense categories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Category Form */}
        <Card className="lg:col-span-1 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Plus size={20} className="text-blue-600" /> Create Category
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={addCategory} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                  Category Name
                </label>
                <Input
                  placeholder="e.g. Dining Out, Investments, Rent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="expense">Expense Category</option>
                  <option value="income">Income Category</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                  Color Tag
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border p-0.5"
                  />
                  <span className="text-xs text-gray-500 font-mono">{color}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className="w-6 h-6 rounded-full border border-gray-200 transition hover:scale-110"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Save Category
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Categories List */}
        <Card className="lg:col-span-2 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg font-bold text-gray-900">
              Your Categories ({categories.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <p className="text-gray-400 py-12 text-center text-sm font-medium animate-pulse">
                Loading categories...
              </p>
            ) : categories.length === 0 ? (
              <p className="text-gray-400 py-12 text-center text-sm">
                No categories created yet. Use the form to create your first category.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((category) => {
                  const isEditing = editingId === category._id;

                  return (
                    <div
                      key={category._id}
                      className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between gap-3 bg-white hover:border-gray-300 transition"
                    >
                      {isEditing ? (
                        <div className="space-y-3">
                          <Input
                            size="sm"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <select
                              value={editType}
                              onChange={(e) => setEditType(e.target.value)}
                              className="text-xs border rounded p-1.5 flex-1"
                            >
                              <option value="expense">Expense</option>
                              <option value="income">Income</option>
                            </select>
                            <input
                              type="color"
                              value={editColor}
                              onChange={(e) => setEditColor(e.target.value)}
                              className="w-8 h-8 rounded cursor-pointer"
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-xs text-gray-500 px-2 py-1"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => saveEdit(category._id)}
                              className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md font-semibold flex items-center gap-1"
                            >
                              <Check size={14} /> Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-4 w-4 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: category.color || "#3B82F6" }}
                            />
                            <div>
                              <p className="font-bold text-gray-900 text-sm">
                                {category.name}
                              </p>
                              <span
                                className={`inline-block px-2 py-0.2 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                  category.type === "income"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {category.type || "expense"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEdit(category)}
                              className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
                              title="Edit Category"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => deleteCategory(category._id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                              title="Delete Category"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}