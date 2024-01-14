import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

type postData = {
   title: string;
   description: string;
   user: any;
};
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
   const cookieStore = cookies()
   const supabase = createClient(cookieStore)
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const requestUrl = new URL(request.url)
    if (!user) return NextResponse.redirect(`${requestUrl.origin}/login?error=Please login Again!`) // redirect if not authenticated

    const { title, description } = await request.json();
    if (!title || !description) return NextResponse.json({ success: false, message: "Invalid data!" });
    const { data, error } = await supabase
    .from('posts')
    .insert([
      { title: title, description: description, user_id: user?.id },
    ])
    .select();
    if (error) {
        return NextResponse.json({
            success: false,
            error
        });
    } else {
        return NextResponse.json({
            success: true,
            data
        })
    }
}

