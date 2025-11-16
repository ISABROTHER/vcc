{/* TOP-1% Inspiration Cards */}
<div className="mt-12">
  {/* Mobile horizontal scroll */}
  <div className="flex gap-6 overflow-x-auto pb-4 sm:hidden snap-x snap-mandatory">
    {[  
      {
        title: "The taste of Cape Coast",
        text: "Discover authentic traditions and local ingredients.",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1500"
      },
      {
        title: "Easy & affordable",
        text: "Friendly, simple and budget-friendly food spots.",
        img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1500"
      },
      {
        title: "Bars, pubs & nightlife",
        text: "Social spots for drinks, dancing and good company.",
        img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1500"
      },
      {
        title: "Coffee & cake",
        text: "Chilled cafés and pastry moments.",
        img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1500"
      },
      {
        title: "Vegan & vegetarian",
        text: "Plant-based, creative and healthy options.",
        img: "https://images.unsplash.com/photo-1604908177225-df3b3f0c39eb?q=80&w=1500"
      },
      {
        title: "All restaurants",
        text: "Explore every place to eat in Cape Coast.",
        img: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1500"
      }
    ].map((c, i) => (
      <div
        key={i}
        className="relative snap-start min-w-[260px] h-60 overflow-hidden rounded-xl shadow-sm bg-gray-100 group"
      >
        <img
          src={c.img}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 w-[85%] bg-[#D9F3F0] p-4 rounded-tr-xl shadow-md transition-all duration-300 group-hover:translate-y-[-3px]">
          <h3 className="font-semibold text-gray-900">{c.title}</h3>
          <p className="text-sm text-gray-700">{c.text}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Desktop Grid */}
  <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {[  
      {
        title: "The taste of Cape Coast",
        text: "Discover authentic traditions and local ingredients.",
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1500"
      },
      {
        title: "Easy & affordable",
        text: "Friendly, simple and budget-friendly food spots.",
        img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1500"
      },
      {
        title: "Bars, pubs & nightlife",
        text: "Social spots for drinks, dancing and good company.",
        img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1500"
      },
      {
        title: "Coffee & cake",
        text: "Chilled cafés and pastry moments.",
        img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1500"
      },
      {
        title: "Vegan & vegetarian",
        text: "Plant-based, creative and healthy options.",
        img: "https://images.unsplash.com/photo-1604908177225-df3b3f0c39eb?q=80&w=1500"
      },
      {
        title: "All restaurants",
        text: "Explore every place to eat in Cape Coast.",
        img: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1500"
      }
    ].map((c, i) => (
      <div
        key={i}
        className="relative h-60 w-full overflow-hidden rounded-xl shadow-sm bg-gray-100 group"
      >
        <img
          src={c.img}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 w-[85%] bg-[#D9F3F0] p-4 rounded-tr-xl shadow-md transition-all duration-300 group-hover:translate-y-[-3px]">
          <h3 className="font-semibold text-gray-900">{c.title}</h3>
          <p className="text-sm text-gray-700">{c.text}</p>
        </div>
      </div>
    ))}
  </div>
</div>
