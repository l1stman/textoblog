import Explore from "@/components/Explore";
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function ExploreRoute() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if(user) redirect("/");
return (
    <>
       <div className="animate-in w-full flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 items-center">
          <Explore /> 
        </div>
    </>
)

}