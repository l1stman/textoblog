"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';


export default function CreateForm() {
    const [message, setMessage] = useState("");

    const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
            if(res.success) {
             setMessage("Texto created successfully!")
              return router.push("/")
          }
            else return setMessage("Error")
        })
        .catch((error) => console.error('Error:', error));
      
  };


  

  return (
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        onSubmit={handleSubmit}
      >
        {message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-xl">
            {message}
          </p>
        )}
        <label className="text-md" htmlFor="title">
          Title
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="title"
          placeholder="Random Title"
          required
        />
        <label className="text-md" htmlFor="description">
          Description
        </label>
        <textarea className='rounded-md px-4 py-2 bg-inherit border mb-6' name="description" id="description" cols={30} rows={10} placeholder="any description"
          required>
        </textarea>
        <button type="submit" className="bg-black text-white hover:bg-slate-900 rounded-md px-4 py-2 text-foreground mb-2">
          Create Texto
        </button>
        
      </form>

  )
}
