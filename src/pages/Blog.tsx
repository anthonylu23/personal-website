import { Link } from 'react-router-dom'
import SectionHeading from '@/components/SectionHeading'
import { getAllPostMeta } from '@/data/blog'

const Blog = () => {
  const posts = getAllPostMeta()

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-28 px-4 pb-[calc(6rem+var(--safe-area-bottom,0px))] pt-[calc(8rem+var(--safe-area-top,0px))] lg:px-0">
      <section className="scroll-mt-24">
        <SectionHeading title="Blog" />
        <div className="border-t border-border/40">
          <div className="divide-y divide-border/30">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-base font-medium text-textPrimary/90 transition hover:text-accent"
                >
                  {post.title}
                </Link>
                <div className="text-sm leading-relaxed text-textSecondary md:flex md:max-w-[60%] md:flex-col md:items-end md:text-right">
                  <p>{post.description}</p>
                  <p className="mt-2 text-xs text-textSecondary/70">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}

                  </p>
                </div>
              </div>
            ))}
          </div>
          {posts.length === 0 && (
            <p className="py-8 text-center text-sm text-textSecondary/60">
              No posts yet. Check back soon!
            </p>
          )}
          <div className="flex items-center justify-center gap-4 py-4">
            <span className="h-px w-32 bg-border/60 sm:w-56 md:w-80" />
            <span className="h-1 w-1 rounded-full bg-border/60" />
            <span className="h-px w-32 bg-border/60 sm:w-56 md:w-80" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Blog
