"use client"
import { authClient } from "@/lib/authClient";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Field, FieldGroup } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createCard } from "@/server/card";



export default function CardDialog() {
    const {data: session} = authClient.useSession()
    return(
        <Dialog>
            <DialogTrigger>
                Добавить фильм
            </DialogTrigger>
            <DialogContent>
                <form action={createCard}>
                    <DialogHeader>
                        <DialogTitle>
                            Добавление фильма крутого
                        </DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="title">
                                Заголовок!
                            </Label>
                            <Input id="title" name="title" defaultValue={"fgdgdags"}>
                            </Input>
                        </Field>
                        <Field>
                            <Label htmlFor="content">
                                Контент
                            </Label>
                            <Input id="content" name="content" defaultValue={"fgdgdags"}>
                            </Input>
                        </Field>
                        <Input id="authorId" name="authorId" hidden defaultValue={session?.user.id}></Input>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"outline"}>Отмена</Button>
                        </DialogClose>
                        <Button type="submit">Сохранить</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}