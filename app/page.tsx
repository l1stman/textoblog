import { createClient } from '@/utils/supabase/server'
import Header from '@/components/Header'
import { cookies } from 'next/headers'
import NavBar from '@/components/NavBar'
import Explore from '@/components/Explore'
import Texto from '@/components/Texto'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      {user && (
       <Texto/>
     
      )}
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="animate-in w-full flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 items-center">
          {user ? <Explore /> : <Header />}
        </div>

      </div>
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
            Created By{" "}
            <a
              href="https://github.com/l1stman"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              l1stman
            </a>
          </p>
        </footer>
    </>
  );
  
}
