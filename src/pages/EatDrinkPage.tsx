{/* Smart Highlight Cards with real filtering actions */}
<div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

  {/* Card 1 – Clear all + inspiration */}
  <button
    onClick={() => {
      setSearchQuery("");
      setActiveCategory("all");
      setMonthFilter("any");
      setLocationFilter("any");
      window.scrollTo({ top: 800, behavior: "smooth" });
    }}
    className="relative h-60 w-full overflow-hidden rounded-lg text-left transition hover:-translate-y-1 hover:shadow-xl"
  >
    <img
      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1500"
      className="h-full w-full object-cover"
      alt="The taste of Cape Coast"
    />
    <div className="absolute bottom-0 left-0 w-[85%] bg-[#D9F3F0] p-4 shadow-md">
      <h3 className="font-semibold text-gray-900 text-lg">The taste of Cape Coast</h3>
      <p className="text-sm text-gray-700">
        Discover authentic traditions and local ingredients.
      </p>
    </div>
  </button>

  {/* Card 2 – Cheap & simple → search */}
  <button
    onClick={() => {
      setActiveCategory("all");
      setSearchQuery("affordable");
      window.scrollTo({ top: 800, behavior: "smooth" });
    }}
    className="relative h-60 w-full overflow-hidden rounded-lg text-left transition hover:-translate-y-1 hover:shadow-xl"
  >
    <img
      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1500"
      className="h-full w-full object-cover"
      alt="Easy & affordable"
    />
    <div className="absolute bottom-0 left-0 w-[85%] bg-[#D9F3F0] p-4 shadow-md">
      <h3 className="font-semibold text-gray-900 text-lg">Easy &amp; Affordable</h3>
      <p className="text-sm text-gray-700">
        Low-cost and family-friendly options.
      </p>
    </div>
  </button>

  {/* Card 3 – Bars & Nightlife → category = bar */}
  <button
    onClick={() => {
      setActiveCategory("bar");
      setSearchQuery("");
      window.scrollTo({ top: 800, behavior: "smooth" });
    }}
    className="relative h-60 w-full overflow-hidden rounded-lg text-left transition hover:-translate-y-1 hover:shadow-xl"
  >
    <img
      src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1500"
      className="h-full w-full object-cover"
      alt="Bars, pubs and nightlife"
    />
    <div className="absolute bottom-0 left-0 w-[85%] bg-[#D9F3F0] p-4 shadow-md">
      <h3 className="font-semibold text-gray-900 text-lg">
        Bars, pubs & nightlife
      </h3>
      <p className="text-sm text-gray-700">
        Social spots for drinks and nightlife.
      </p>
    </div>
  </button>

  {/* Card 4 – Coffee & Cake → category = cafe */}
  <button
    onClick={() => {
      setActiveCategory("cafe");
      setSearchQuery("");
      window.scrollTo({ top: 800, behavior: "smooth" });
    }}
    className="relative h-60 w-full overflow-hidden rounded-lg text-left transition hover:-translate-y-1 hover:shadow-xl"
  >
    <img
      src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1500"
      className="h-full w-full object-cover"
      alt="Coffee & Cake"
    />
    <div className="absolute bottom-0 left-0 w-[85%] bg-[#D9F3F0] p-4 shadow-md">
      <h3 className="font-semibold text-gray-900 text-lg">Coffee & Cake</h3>
      <p className="text-sm text-gray-700">
        Brunch, pastries and cosy cafés.
      </p>
    </div>
  </button>

  {/* Card 5 – Vegan → search “vegan” */}
  <button
    onClick={() => {
      setSearchQuery("vegan");
      setActiveCategory("all");
      window.scrollTo({ top: 800, behavior: "smooth" });
    }}
    className="relative h-60 w-full overflow-hidden rounded-lg text-left transition hover:-translate-y-1 hover:shadow-xl"
  >
    <img
      src="https://images.unsplash.com/photo-1604908177225-df3b3f0c39eb?q=80&w=1500"
      className="h-full w-full object-cover"
      alt="Vegan & Vegetarian"
    />
    <div className="absolute bottom-0 left-0 w-[85%] bg-[#D9F3F0] p-4 shadow-md">
      <h3 className="font-semibold text-gray-900 text-lg">Vegan & Vegetarian</h3>
      <p className="text-sm text-gray-700">
        Plant-based and healthy dishes.
      </p>
    </div>
  </button>

  {/* Card 6 – All restaurants → category restaurant */}
  <button
    onClick={() => {
      setActiveCategory("restaurant");
      setSearchQuery("");
      window.scrollTo({ top: 800, behavior: "smooth" });
    }}
    className="relative h-60 w-full overflow-hidden rounded-lg text-left transition hover:-translate-y-1 hover:shadow-xl"
  >
    <img
      src="https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1500"
      className="h-full w-full object-cover"
      alt="All restaurants"
    />
    <div className="absolute bottom-0 left-0 w-[85%] bg-[#D9F3F0] p-4 shadow-md">
      <h3 className="font-semibold text-gray-900 text-lg">All restaurants</h3>
      <p className="text-sm text-gray-700">
        Full overview of Cape Coast dining spots.
      </p>
    </div>
  </button>

</div>
