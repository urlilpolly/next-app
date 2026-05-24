import Navbar from "@/components/navigation"





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
        <>
        <Navbar/>
        (children)
        </>
    )
}