import prisma from "@/lib/prisma";
import FilmCard from "./film-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const PAGE_SIZE = 6;

export default async function FilmList({
  currentPage = 1,
  query = "",
}: {
  currentPage?: number;
  query?: string;
}) {
  const search = query.trim();

  const where = search
    ? {
        title: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : {};

  const totalFilms = await prisma.film.count({
    where,
  });

  const totalPages = Math.ceil(totalFilms / PAGE_SIZE);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const data = await prisma.film.findMany({
    where,
    skip: (safeCurrentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: {
      id: "desc",
    },
  });

  const createPageHref = (page: number) => {
    const params = new URLSearchParams();

    if (search) {
      params.set("query", search);
    }

    params.set("page", String(page));

    return `?${params.toString()}`;
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="grid gap-8 grid-cols-3">
          {data.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      ) : (
        <p>Фильмы не найдены</p>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  safeCurrentPage === 1
                    ? "#"
                    : createPageHref(safeCurrentPage - 1)
                }
                className={
                  safeCurrentPage === 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={createPageHref(pageNumber)}
                    isActive={pageNumber === safeCurrentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href={
                  safeCurrentPage === totalPages
                    ? "#"
                    : createPageHref(safeCurrentPage + 1)
                }
                className={
                  safeCurrentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}