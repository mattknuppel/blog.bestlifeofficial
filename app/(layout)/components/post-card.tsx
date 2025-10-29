import Image from 'next/image';
import Link from 'next/link';
import { Card } from './card';
import type { PostMeta } from '../lib/posts';

interface PostCardProps {
  post: PostMeta;
}

export const PostCard = ({ post }: PostCardProps) => (
  <Card className="flex h-full flex-col">
    <Link href={`/blog/${post.slug}`} className="relative block overflow-hidden rounded-xl bg-slate-100">
      <Image
        src={post.cover}
        alt={post.title}
        width={640}
        height={400}
        className="h-48 w-full object-cover"
        sizes="(max-width: 640px) 100vw, 33vw"
      />
      <span className="sr-only">Read {post.title}</span>
    </Link>
    <div className="mt-4 flex flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-accent">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-accent/10 px-2 py-1 text-[10px] font-semibold text-accent">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-foreground">
        <Link href={`/blog/${post.slug}`} className="hover:text-accent focus:outline-none focus-visible:underline">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{post.description}</p>
      <p className="mt-3 text-xs text-slate-500">
        {new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })} · {post.readingTimeMinutes} min read
      </p>
    </div>
  </Card>
);
