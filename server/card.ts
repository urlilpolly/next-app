"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";




export async function createCard(formData: FormData){
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const author = formData.get("authorId") as string;

     console.log({ title, content, author });

    await prisma.film.create({
        data: {
            title,
            content,
            authorId: author
        }
    })
    redirect("/dashboard")
}

export async function searchFilm(formData: FormData) {
  const query = formData.get("query") as string;

  const params = new URLSearchParams();

  if (query?.trim()) {
    params.set("query", query.trim());
  }

  params.set("page", "1");

  redirect(`/dashboard?${params.toString()}`);
}