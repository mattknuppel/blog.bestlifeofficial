interface AuthorBioProps {
  name: string;
  bio?: string;
}

export const AuthorBio = ({ name, bio }: AuthorBioProps) => (
  <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">About the author</h2>
    <p className="mt-2 text-base font-semibold text-foreground">{name}</p>
    <p className="mt-2 text-sm text-slate-600">
      {bio ||
        'Nutriwise curates trustworthy, practical nutrition guidance to help you make confident decisions about your health.'}
    </p>
  </section>
);
