// app/profile/page.tsx

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return user;
}

export default async function ProfilePage() {
  const user = await getCurrentUser();

  async function updateProfile(formData: FormData) {
    "use server";

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      redirect("/login");
    }

    const name = String(formData.get("name") || "").trim();

    if (!name) {
      throw new Error("Имя не может быть пустым");
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
      },
    });

    revalidatePath("/profile");
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="bg-neutral-900 px-8 py-10 text-white">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-neutral-700 text-4xl font-bold">
                { user.name.charAt(0).toUpperCase() }
              </div>

              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="mt-1 text-neutral-300">{user.email}</p>

              </div>
            </div>
          </div>

          <div className="grid gap-8 p-8 md:grid-cols-2">
            <section>
              <h3 className="mb-4 text-xl font-semibold text-neutral-900">
                Редактирование профиля
              </h3>

              <form action={updateProfile} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Имя
                  </label>
                  <input
                    name="name"
                    defaultValue={user.name}
                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none transition focus:border-neutral-900"
                    placeholder="Введите имя"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-neutral-900 px-5 py-2.5 font-medium text-white transition hover:bg-neutral-700"
                >
                  Сохранить изменения
                </button>
              </form>
            </section>

            <section>
              <h3 className="mb-4 text-xl font-semibold text-neutral-900">
                Информация об аккаунте
              </h3>

              <div className="space-y-3 text-sm">

                <div className="rounded-xl bg-neutral-100 p-4">
                  <p className="text-neutral-500">Email</p>
                  <p className="mt-1 font-medium text-neutral-900">
                    {user.email}
                  </p>
                </div>

                <div className="rounded-xl bg-neutral-100 p-4">
                  <p className="text-neutral-500">Дата регистрации</p>
                  <p className="mt-1 font-medium text-neutral-900">
                    {user.createdAt.toLocaleDateString("ru-RU")}
                  </p>
                </div>

              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}