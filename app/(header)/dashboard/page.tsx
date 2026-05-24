import CardDialog from "@/components/create-card";
import FilmList from "@/components/film-list";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import prisma from "@/lib/prisma";




export default async function Page({searchParams} : {searchParams: {page?: number}}) {
    const data = await prisma.film.count()
    const pageAmount = data/5
    const search = await searchParams
    return (
        <div>
            <CardDialog></CardDialog>
            <FilmList currentPage={search.page} page={pageAmount}/>
        </div>
    )
}