import { useMemo, useState } from "react";

type IconProps = {
  className?: string;
};

function Icon({ name, className = "size-5" }: IconProps & { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    calendar: (
      <>
        <path d="M8 2v4M16 2v4" />
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    leaf: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 18 2 18 2c1 6.5-1 15-7 18Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6.94C9.35 12.95 12 11 14 8" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    people: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3-1.4 4.2L7 9l3.6 1.8L12 15l1.4-4.2L17 9l-3.6-1.8L12 3Z" />
        <path d="m5 15-.7 2.3L2 18l2.3.7L5 21l.7-2.3L8 18l-2.3-.7L5 15ZM19 13l-.5 1.5L17 15l1.5.5L19 17l.5-1.5L21 15l-1.5-.5L19 13Z" />
      </>
    ),
    tent: (
      <>
        <path d="m3 20 9-16 9 16H3Z" />
        <path d="m12 4 4 16M8 20l4-7 4 7" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    waves: (
      <>
        <path d="M2 8c2.5 2 5.5 2 8 0s5.5-2 8 0 3.5 1 4 .5M2 13c2.5 2 5.5 2 8 0s5.5-2 8 0 3.5 1 4 .5M2 18c2.5 2 5.5 2 8 0s5.5-2 8 0 3.5 1 4 .5" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const destinations = [
  {
    type: "Piscina natural",
    title: "El Refugio Esmeralda",
    location: "Valle de Bravo, México",
    rating: "4.9",
    price: "Desde $45",
    image:
      "https://images.unsplash.com/photo-1636484807510-bc2ffbaf3241?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  },
  {
    type: "Camping junto al lago",
    title: "Cumbres del Silencio",
    location: "Pucón, Chile",
    rating: "4.8",
    price: "Desde $28",
    image:
      "https://images.unsplash.com/photo-1789539355070-a32bbd8a342a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  },
  {
    type: "Glamping & piscina",
    title: "Bosque de Agua",
    location: "Antioquia, Colombia",
    rating: "4.9",
    price: "Desde $62",
    image:
      "https://images.unsplash.com/photo-1645447556616-e9d1c52e8037?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("2 personas");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const filteredDestinations = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return destinations;
    return destinations.filter((item) =>
      `${item.title} ${item.location} ${item.type}`.toLowerCase().includes(term),
    );
  }, [query]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setShowResults(true);
    document.querySelector("#destinos")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFavorite = (title: string) => {
    setFavorites((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    );
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f4ed] text-[#16352e]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#0c312b]/80 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <a href="#" className="flex items-center gap-2.5" aria-label="Nómada, inicio">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#e9ff7a] text-[#12372f]">
              <Icon name="compass" className="size-5" />
            </span>
            <span className="font-display text-[27px] font-semibold tracking-[-0.04em]">
              nómada
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a className="nav-link" href="#destinos">
              Destinos
            </a>
            <a className="nav-link" href="#experiencias">
              Experiencias
            </a>
            <a className="nav-link" href="#inspiracion">
              Inspiración
            </a>
            <a className="nav-link" href="#nosotros">
              Nosotros
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-white/10">
              <Icon name="user" className="size-4" />
              Mi cuenta
            </button>
            <a
              href="#destinos"
              className="rounded-full bg-[#e9ff7a] px-5 py-3 text-sm font-bold text-[#15372f] transition hover:bg-white"
            >
              Explorar lugares
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2 hover:bg-white/10 md:hidden"
            aria-label="Abrir menú"
          >
            <Icon name="menu" className="size-6" />
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-white/10 bg-[#0c312b] px-5 py-5 md:hidden">
            {["Destinos", "Experiencias", "Inspiración", "Nosotros"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-white/10 py-3 text-sm font-semibold"
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero relative flex min-h-[850px] items-end overflow-hidden pb-20 pt-36 md:min-h-[820px] md:items-center md:pb-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,35,30,.88)_0%,rgba(6,35,30,.62)_42%,rgba(6,35,30,.12)_75%),linear-gradient(0deg,rgba(6,35,30,.5)_0%,transparent_45%)]" />
          <div className="absolute right-[4%] top-28 hidden rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md md:flex items-center gap-2">
            <Icon name="spark" className="size-4 text-[#e9ff7a]" />
            148 rincones por descubrir
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-10">
            <div className="max-w-[760px] text-white">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#e9ff7a]">
                <span className="h-px w-8 bg-current" />
                Respira. Explora. Conecta.
              </p>
              <h1 className="font-display text-[58px] font-semibold leading-[0.92] tracking-[-0.055em] sm:text-[76px] md:text-[96px]">
                Escápate a tu
                <span className="block font-normal italic text-[#e9ff7a]">lugar feliz.</span>
              </h1>
              <p className="mt-6 max-w-[560px] text-[17px] leading-7 text-white/80 md:text-lg">
                Piscinas entre montañas, campings bajo las estrellas y experiencias que se quedan
                contigo.
              </p>
            </div>

            <form
              onSubmit={handleSearch}
              className="mt-10 grid max-w-[980px] rounded-[26px] bg-white p-2 shadow-2xl shadow-black/25 md:grid-cols-[1.35fr_1fr_.8fr_auto] md:rounded-full"
            >
              <label className="flex items-center gap-3 rounded-full px-5 py-3 text-[#16352e] focus-within:bg-[#f2f3ed]">
                <Icon name="pin" className="size-5 shrink-0 text-[#4d756c]" />
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[.14em]">
                    ¿Dónde?
                  </span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#7f918c]"
                    placeholder="Busca un destino"
                  />
                </span>
              </label>
              <label className="flex items-center gap-3 rounded-full border-t border-[#dfe4df] px-5 py-3 text-[#16352e] focus-within:bg-[#f2f3ed] md:border-l md:border-t-0">
                <Icon name="calendar" className="size-5 shrink-0 text-[#4d756c]" />
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[.14em]">
                    Fechas
                  </span>
                  <input
                    type="date"
                    value={dates}
                    onChange={(event) => setDates(event.target.value)}
                    className="max-w-[145px] bg-transparent text-sm text-[#7f918c] outline-none"
                  />
                </span>
              </label>
              <label className="flex items-center gap-3 rounded-full border-t border-[#dfe4df] px-5 py-3 text-[#16352e] focus-within:bg-[#f2f3ed] md:border-l md:border-t-0">
                <Icon name="people" className="size-5 shrink-0 text-[#4d756c]" />
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[.14em]">
                    Viajeros
                  </span>
                  <select
                    value={guests}
                    onChange={(event) => setGuests(event.target.value)}
                    className="bg-transparent pr-2 text-sm text-[#7f918c] outline-none"
                  >
                    <option>1 persona</option>
                    <option>2 personas</option>
                    <option>3 personas</option>
                    <option>4+ personas</option>
                  </select>
                </span>
              </label>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-[#e9ff7a] px-7 py-4 text-sm font-extrabold text-[#15372f] transition hover:bg-[#d9f45a]"
              >
                <Icon name="search" className="size-5" />
                Buscar
              </button>
            </form>
          </div>
        </section>

        <section id="experiencias" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid items-end gap-5 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow">Elige tu aventura</p>
              <h2 className="section-title">
                Dos formas de <em>desconectar.</em>
              </h2>
            </div>
            <p className="max-w-[390px] text-sm leading-6 text-[#62746f] md:pb-2">
              Tanto si buscas un chapuzón refrescante como una noche bajo las estrellas, tenemos el
              lugar perfecto.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <a
              href="#destinos"
              className="group relative min-h-[450px] overflow-hidden rounded-[32px]"
            >
              <img
                className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1760457356823-82902a011137?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400"
                alt="Piscina rodeada de montañas verdes"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092f29]/90 via-[#092f29]/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white md:p-10">
                <div>
                  <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#e9ff7a] text-[#15372f]">
                    <Icon name="waves" />
                  </span>
                  <h3 className="font-display text-4xl font-semibold">Piscinas con encanto</h3>
                  <p className="mt-2 text-sm text-white/75">
                    Refugios de agua entre paisajes increíbles.
                  </p>
                </div>
                <span className="hidden size-12 items-center justify-center rounded-full border border-white/40 transition group-hover:bg-white group-hover:text-[#15372f] sm:flex">
                  <Icon name="arrow" />
                </span>
              </div>
            </a>

            <a
              href="#destinos"
              className="group relative min-h-[450px] overflow-hidden rounded-[32px]"
            >
              <img
                className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1789539354982-e44e0f65052d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400"
                alt="Tienda de campaña junto a un lago de montaña"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092f29]/90 via-[#092f29]/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white md:p-10">
                <div>
                  <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#ffb889] text-[#15372f]">
                    <Icon name="tent" />
                  </span>
                  <h3 className="font-display text-4xl font-semibold">Camping a tu manera</h3>
                  <p className="mt-2 text-sm text-white/75">
                    Desde lo salvaje hasta el glamping más cómodo.
                  </p>
                </div>
                <span className="hidden size-12 items-center justify-center rounded-full border border-white/40 transition group-hover:bg-white group-hover:text-[#15372f] sm:flex">
                  <Icon name="arrow" />
                </span>
              </div>
            </a>
          </div>
        </section>

        <section id="destinos" className="bg-[#123c34] py-20 text-white md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-[#e9ff7a]">Selección de la semana</p>
                <h2 className="section-title text-white">
                  Lugares que <em>inspiran.</em>
                </h2>
              </div>
              <a href="#" className="flex items-center gap-2 text-sm font-bold text-[#e9ff7a]">
                Ver todos los destinos <Icon name="arrow" className="size-4" />
              </a>
            </div>

            {showResults && (
              <p className="mt-6 rounded-2xl bg-white/10 px-5 py-3 text-sm text-white/80">
                {filteredDestinations.length
                  ? `${filteredDestinations.length} lugares encontrados${dates ? ` para ${dates}` : ""} · ${guests}`
                  : "No encontramos coincidencias. Prueba con “México”, “Chile” o “piscina”."}
              </p>
            )}

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDestinations.map((item) => (
                <article
                  key={item.title}
                  className="group overflow-hidden rounded-[28px] bg-[#f7f4ed] text-[#16352e]"
                >
                  <div className="relative h-[280px] overflow-hidden">
                    <img
                      className="size-full object-cover transition duration-700 group-hover:scale-105"
                      src={item.image}
                      alt={item.title}
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-[#f7f4ed]/95 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.12em]">
                      {item.type}
                    </span>
                    <button
                      onClick={() => toggleFavorite(item.title)}
                      className={`absolute right-4 top-4 flex size-10 items-center justify-center rounded-full backdrop-blur transition ${favorites.includes(item.title) ? "bg-[#e9ff7a] text-[#15372f]" : "bg-black/20 text-white hover:bg-white hover:text-[#15372f]"}`}
                      aria-label={`Guardar ${item.title}`}
                    >
                      <Icon
                        name="heart"
                        className={`size-5 ${favorites.includes(item.title) ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-[25px] font-semibold leading-tight">
                          {item.title}
                        </h3>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#6d7c78]">
                          <Icon name="pin" className="size-3.5" />
                          {item.location}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#e6eadf] px-2.5 py-1 text-xs font-bold">
                        ★ {item.rating}
                      </span>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-[#d9ddd6] pt-4">
                      <span className="text-sm font-bold">
                        {item.price} <small className="font-normal text-[#71807c]">/ noche</small>
                      </span>
                      <button className="flex items-center gap-1 text-xs font-extrabold">
                        Ver lugar <Icon name="chevron" className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="inspiracion"
          className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-2"
        >
          <div className="relative min-h-[560px]">
            <img
              className="absolute left-0 top-0 h-[86%] w-[82%] rounded-[32px] object-cover"
              src="https://images.unsplash.com/photo-1749995410603-1bc188cea80e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200"
              alt="Río de agua cristalina entre un bosque verde"
            />
            <img
              className="absolute bottom-0 right-0 h-[43%] w-[47%] rounded-[24px] border-[10px] border-[#f7f4ed] object-cover"
              src="https://images.unsplash.com/photo-1768824928595-057557e13afe?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=800"
              alt="Atardecer sobre colinas y un lago"
            />
            <div className="absolute bottom-[9%] left-[8%] rounded-2xl bg-[#e9ff7a] p-5 text-[#15372f] shadow-xl">
              <span className="font-display text-3xl font-semibold">+148</span>
              <span className="block text-[10px] font-bold uppercase tracking-[.14em]">
                Lugares únicos
              </span>
            </div>
          </div>

          <div className="lg:pl-12">
            <p className="eyebrow">Viajar con propósito</p>
            <h2 className="section-title">
              Menos ruido.
              <br />
              <em>Más naturaleza.</em>
            </h2>
            <p className="mt-6 max-w-[540px] leading-7 text-[#637570]">
              Seleccionamos espacios que respetan su entorno y te acercan a lo esencial. Cada
              destino cuenta una historia y apoya a las comunidades que lo hacen posible.
            </p>
            <div className="mt-9 space-y-6">
              {[
                [
                  "leaf",
                  "Escapadas responsables",
                  "Lugares comprometidos con el cuidado del entorno.",
                ],
                [
                  "shield",
                  "Reservas con confianza",
                  "Anfitriones verificados y asistencia cuando la necesites.",
                ],
                [
                  "map",
                  "Rincones de verdad",
                  "Una selección curada, lejos de las rutas de siempre.",
                ],
              ].map(([icon, title, text]) => (
                <div key={title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#dfe8dc]">
                    <Icon name={icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm text-[#6b7a76]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="nosotros"
          className="mx-4 mb-4 overflow-hidden rounded-[34px] bg-[#e9ff7a] md:mx-8 md:mb-8"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col items-center px-5 py-20 text-center md:py-24">
            <Icon name="compass" className="mb-5 size-10" />
            <h2 className="font-display max-w-[750px] text-5xl font-semibold leading-[.98] tracking-[-.045em] md:text-7xl">
              Tu próxima historia comienza afuera.
            </h2>
            <p className="mt-6 max-w-[520px] text-[#4c665f]">
              Descubre lugares inolvidables para nadar, acampar y volver a sentirte parte de la
              naturaleza.
            </p>
            <a
              href="#destinos"
              className="mt-8 flex items-center gap-2 rounded-full bg-[#15372f] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#092720]"
            >
              Empezar a explorar <Icon name="arrow" className="size-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#092b25] px-5 py-10 text-white/60 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href="#" className="flex items-center gap-2 text-white">
            <Icon name="compass" className="size-5 text-[#e9ff7a]" />
            <span className="font-display text-2xl font-semibold">nómada</span>
          </a>
          <p className="text-xs">© 2026 Nómada. Hecho para volver a lo esencial.</p>
          <div className="flex gap-5 text-xs font-semibold text-white">
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
