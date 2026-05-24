import prisma from "@/lib/prisma";
import FilmCard from "./film-card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";




export default async function FilmList({page, currentPage = 1} : {page?: number, currentPage?: number}) {
    const data = await prisma.film.findMany({
        skip: currentPage ? (currentPage-1) * 6 : 0,
        take: 6
    })
    const totalFilms = await prisma.film.count();
    const totalPages = Math.ceil(totalFilms / 6);
    const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages || 1);
    const prevPage = safeCurrentPage - 1;
    const nextPage = safeCurrentPage + 1;
    return (
        <>
        <div className="grid gap-8 grid-cols-3">
            {data.map((film) => {
                return (<FilmCard key={film.id} film={film}/>)
            })}
        </div>
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious href={safeCurrentPage === 1 ? "#" : `?page=${prevPage}`} className={
                  safeCurrentPage === 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }/>
                </PaginationItem>
                <PaginationItem>
                <PaginationLink href="?page=1">1</PaginationLink>
                </PaginationItem>
                {(!!(page) && Array.from({length: page}, (_,i) => {
                    return(
                        <PaginationItem key={i+2}>
                        <PaginationLink href={`?page=${i+2}`} key={i+2}>{i+2}</PaginationLink>
                        </PaginationItem>
                    )
                }))}
                <PaginationItem>
                <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                <PaginationNext href={safeCurrentPage === totalPages ? "#" : `?page=${nextPage}`} className={
                  safeCurrentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }/>
                </PaginationItem>
            </PaginationContent>
            </Pagination>
        </>

    )
}