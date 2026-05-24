import { Film } from "@/generated/prisma/client";
import { Card, CardContent, CardHeader } from "./ui/card";




export default function FilmCard({film} : {film: Film}) {
    return (
        <Card>
            <CardHeader>
                {film.title}
            </CardHeader>
            <CardContent>
                {film.content}
            </CardContent>
        </Card>
    )
}