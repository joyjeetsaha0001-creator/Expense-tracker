"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { Button } from "@/components/ui/Button";

import { Input } from "@/components/ui/Input";

import { Trash2, Pencil } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");

  const [color, setColor] = useState("#3B82F6");

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");

      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function addCategory() {
    if (!name.trim()) return;

    try {
      await api.post("/categories", {
        name,
        color,
        icon: "Circle",
      });

      setName("");
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCategory(id) {
    if (!confirm("Delete this category?")) return;

    try {
      await api.delete(`/categories/${id}`);

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  }

  async function editCategory(category) {
    const updatedName = prompt(
      "Edit Category",
      category.name
    );

    if (!updatedName) return;

    try {
      await api.put(`/categories/${category._id}`, {
        ...category,
        name: updatedName,
      });

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">

      <Card>

        <CardHeader>

          <CardTitle>

            Category Management

          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-4">

          <Input
            placeholder="Category Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="color"
            value={color}
            onChange={(e) =>
              setColor(e.target.value)
            }
            className="w-20 h-10"
          />

          <Button
            onClick={addCategory}
            className="w-full"
          >
            Add Category
          </Button>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>

            Your Categories

          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="space-y-3">

            {categories.map((category) => (

              <div
                key={category._id}
                className="flex justify-between items-center border rounded-lg p-4"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="h-5 w-5 rounded-full"
                    style={{
                      backgroundColor:
                        category.color,
                    }}
                  />

                  <p>{category.name}</p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      editCategory(category)
                    }
                  >

                    <Pencil
                      size={18}
                    />

                  </button>

                  <button
                    onClick={() =>
                      deleteCategory(
                        category._id
                      )
                    }
                  >

                    <Trash2
                      size={18}
                      className="text-red-500"
                    />

                  </button>

                </div>

              </div>

            ))}

          </div>

        </CardContent>

      </Card>

    </div>
  );
}