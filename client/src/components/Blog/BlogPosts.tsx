import React from 'react'
import BlogPost from './BlogPost'

export default function BlogPosts() {
  return (
    <section>
      <h1 className='text-center font-extrabold my-5 text-2xl'>Stories around you</h1>
      <div className='flex flex-row flex-wrap gap-6 justify-center'>
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
    </div>
    </section>
  )
}
