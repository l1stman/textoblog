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

export async function PUT(request: Request) {
   const cookieStore = cookies()
   const supabase = createClient(cookieStore)
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const requestUrl = new URL(request.url)
    if (!user) return NextResponse.redirect(`${requestUrl.origin}/login?error=Please login Again!`) // redirect if not authenticated

    const { id, title, description } = await request.json();
    if (!id || !title || !description) return NextResponse.json({ success: false, message: "Invalid data!" });
    const { data, error } = await supabase
    .from('posts')
    .update(
      { title: title, description: description },
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .select("*, profiles (username)")
    .single();
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

export async function DELETE(request: Request) {
   const cookieStore = cookies()
   const supabase = createClient(cookieStore)
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const requestUrl = new URL(request.url)
    if (!user) return NextResponse.redirect(`${requestUrl.origin}/login?error=Please login Again!`) // redirect if not authenticated

    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: "Invalid data!" });
    const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
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