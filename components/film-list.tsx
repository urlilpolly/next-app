import prisma from "@/lib/prisma";
import FilmCard from "./film-card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";




export default async function FilmList({page, currentPage} : {page?: number, currentPage?: number}) {
    const data = await prisma.film.findMany({
        skip: currentPage ? (currentPage-1) * 6 : 0,
        take: 6
    })
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
                <PaginationPrevious href="#" />
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
                <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
            </Pagination>
        </>

    )
}