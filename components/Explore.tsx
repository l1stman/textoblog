"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
  id: any;
  title: any;
  description: any;
  user_id: any;
}
export default function Explore() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;

  const fetchPosts = async () => {

      // Fetch total posts count
      try {
        const supabase = createClientComponentClient()
      
        const { data, error } = await supabase.from("posts").select();

  
      const totalPosts = data?.length || 0;
  
      // Fetch paginated and randomly ordered posts
      const { data: posts } = await supabase
        .from('posts')
        .select('id, title, description, user_id, profiles (username)')
        .range((page - 1) * pageSize, page * pageSize - 1);
  
      const totalPages = Math.ceil(totalPosts / pageSize);
      const postsArray: Post[] = Array.isArray(posts) ? posts : [];

      setPosts(postsArray);
      setTotalPages(totalPages);

      } catch (error) {
        console.log(error)
      }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, pageSize, createClientComponentClient]);

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  return (
    <>
    
    <div className="flex flex-wrap w-full divide-x-0 mt-6 sm:divide-x sm:divide-y-0 divide-y">
      {posts.map((post: any) => (
          <Link href={"/posts/" + post?.id} className="w-full sm:w-1/2 md:w-1/3 p-4 mt-4 hover:-translate-y-2 cursor-pointer">
        <div key={post?.id} >
          <h1 className="text-start text-xl font-semibold">{post?.title}</h1>
          <p className="text-start">{post?.description.length > 150
  ? post?.description.substring(0, 150) + "..." 
  : post?.description}</p>
          <h3 className="text-end text-gray-500 text-sm font-mono">
            <span className="hover:underline">@{post.profiles.username}</span>
          </h3>
        </div>
          </Link>
      ))}

    </div>
      <div className="w-full p-4 flex justify-center">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  className={`px-3 py-1 rounded-full ${
                    index + 1 === page ? 'bg-black text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      </>
  );
}
