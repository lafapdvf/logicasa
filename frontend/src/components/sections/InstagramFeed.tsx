export function InstagramFeed() {
  // Exemplo de dados (que poderiam vir de uma API ou serem estáticos)
  const posts = [
    { id: 1, url: "link-do-post", thumb: "url-da-imagem", views: "12.5k" },
    { id: 2, url: "link-do-post", thumb: "url-da-imagem", views: "10.2k" },
    { id: 3, url: "link-do-post", thumb: "url-da-imagem", views: "8.7k" },
  ];

  return (
    <section className="px-6 py-24 bg-[#050a15]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-light text-white italic">
              Vistos no{" "}
              <span className="text-[#00c2ff] not-italic font-semibold">
                Instagram
              </span>
            </h2>
            <p className="text-slate-400 mt-2">
              Os projetos que mais inspiraram nossa comunidade.
            </p>
          </div>
          <a
            href="#"
            className="text-[#00c2ff] text-sm font-bold uppercase tracking-widest hover:underline"
          >
            Ver perfil →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-white/5 border border-white/10"
            >
              <img
                src={post.thumb}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:rotate-2 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-sm font-medium">
                  🔥 {post.views} visualizações
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
