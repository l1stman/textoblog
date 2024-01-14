import Link from "next/link"

export default function Texto() {    

    return (
        <div className="animate-in flex flex-row w-full">
       <div className="basis-1/2">
         <h1 className="mt-4 ml-8 text-3xl font-semibold">Explore</h1>
       </div>
       <div className="basis-1/2 flex justify-end items-center">
         <Link href="/posts/create" className="mt-4 mr-8 p-2 bg-black hover:bg-slate-900 text-white px-4 rounded-md">Texto</Link>
       </div>
     </div>
    )

}