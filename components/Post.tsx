"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";



export const PostPageContent = ({post, user}: { post: any, user: any }) => {

  const router = useRouter();

  const [message, setMessage] = useState(""); 
  const [post_data, setPost] = useState(post);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    fetch('/api/posts/edit', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: post.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then((res: any) => {
          if(res.success) {
          return router.push("/")
        }
          else return setMessage("Error")
      })
      .catch((error) => console.error('Error:', error));
  };

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  fetch('/api/posts/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: post.id,
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
      .then((res: any) => {
          if(res.success) {
            setPost(res.data)
           setMessage("Texto edited successfully!")
           setTimeout(() => {
           setMessage("")
           }, 2500);
        }
          else if(res.error.code == "23514") {
            return setMessage("title should have only 20 characters")
        } else {
          return setMessage("Error")
        }
      })
      .catch((error) => console.error('Error:', error));
    
};

  return (
    <>
      <div className="animate-in flex flex-row w-full">
        <div className="basis-1/2">
          <h1 className="mt-4 ml-8 text-3xl font-semibold">{post_data.title}</h1>
          <h3 className="ml-10 text-sm font-mono text-gray-500">
            @{post_data.profiles?.username}
          </h3>
        </div>
        {user?.id === post_data.user_id ? (
          <div className="basis-1/2 flex justify-end items-center">
            <button
             onClick={handleOpenModal}
              className="mt-4 mr-8 p-2 bg-black text-white hover:bg-red-500 px-4 rounded-md"
            >
              Delete Post
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-1/2 lg:p-4 mt-4 my-10">
          <div className="h-auto w-auto border border-gray-950 rounded-xl mx-4">
            <p className="animate-in p-4">{post_data.description}</p>
          </div>
          {/* date and status */}
          <div className="flex flex-col lg:flex-row w-full">
            <div className="lg:w-1/2 lg:p-4 items-center">
              <h5 className="ml-10 text-xs font-mono text-gray-500">
                {post_data.created_at}
              </h5>
            </div>
            <div className="lg:w-1/2 lg:p-4 items-center">
              <h5 className="ml-10 text-xs font-mono text-gray-500">
                {post_data.status ? "Online" : "Hidden"}
              </h5>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 lg:p-4">
          {user?.id === post_data.user_id ? (
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
                Edit Title
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="title"
                placeholder="Random Title"
                defaultValue={post_data.title}
                required
              />
              <label className="text-md" htmlFor="description">
                Edit Description
              </label>
              <textarea
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="description"
                id="description"
                cols={30}
                rows={10}
                placeholder="any description"
                required
              >
                {post_data.description}
              </textarea>
              <button
                type="submit"
                className="bg-black text-white hover:bg-slate-900 rounded-md px-4 py-2 text-foreground mb-2"
              >
                Save Texto
              </button>
            </form>
          ) : null}
        </div>
      </div>
      <VerificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </>
  );
}



interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);
    // Perform your verification logic here, and call onConfirm() when verified
    // For example, you might want to show a loading state while verifying
    setTimeout(() => {
      // Simulating verification delay
      setIsSubmitting(false);
      onConfirm();
      onClose(); // Close the modal after confirming
    }, 2000);
  };

  return (
    <div
      className={`${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out`}
    >
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-lg mb-4">Are you sure?</p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
