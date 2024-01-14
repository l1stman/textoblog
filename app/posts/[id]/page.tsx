import { PostPageContent } from "@/components/Post";
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


    let { data: post, error } = await supabase
      .from("posts")
      .select("*, profiles (username)")
      .eq("id", params.id)
      .single()
         if(!post) redirect("/");

         const {
            data: { user },
          } = await supabase.auth.getUser()

    return (
        <>
            <PostPageContent post={post} user={user} />
        </>
    );
}

export default page;