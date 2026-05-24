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