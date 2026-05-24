import CardDialog from "@/components/create-card";
import FilmList from "@/components/film-list";
import prisma from "@/lib/prisma";
import { searchFilm } from "@/server/card";




export default async function Page({searchParams} : {searchParams: {page?: number, query?: string}}) {
    const data = await prisma.film.count()
    const pageAmount = data/5
    const search = await searchParams
    const query = search.query || ""
    return (
        <div>
            <CardDialog></CardDialog>
            <form action={searchFilm} className="mb-8 flex gap-3">
                <input
                type="text"
                name="query"
                defaultValue={query}
                placeholder="Поиск по названию..."
                className="w-full rounded-md border px-4 py-2"
                />

                <button
                type="submit"
                className="rounded-md bg-black px-5 py-2 text-white"
                >
                Найти
                </button>
            </form>
            <FilmList currentPage={search.page} query={query}/>
        </div>
    )
}