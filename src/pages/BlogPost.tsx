import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '@/data/blog'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <main className="mx-auto flex max-w-3xl flex-col px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0">
        <Link
          to="/blog"
          className="text-xl text-textSecondary transition hover:text-accent"
          aria-label="Back to blog"
        >
          &larr;
        </Link>
        <p className="mt-10 text-lg text-textPrimary/80">Post not found.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0">
      <Link
        to="/blog"
        className="mb-8 text-xl text-textSecondary transition hover:text-accent"
        aria-label="Back to blog"
      >
        &larr;
      </Link>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-textPrimary text-balance md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-textSecondary/70">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>
      <article className="prose-custom">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  )
}

export default BlogPost
