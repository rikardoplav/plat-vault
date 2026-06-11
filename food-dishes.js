const dishes = [
  {
    id: "seppie-piselli",
    name: "Seppie e Piselli",
    image: "assets/seppie-e-piselli.jpg",
  },
  {
    id: "carrettiera",
    name: "La Carrettiera",
    image: "assets/la-carrettiera.png",
  },
  {
    id: "guazzetto",
    name: "Guazzetto",
    image: "assets/guazzetto.png",
  },
  {
    id: "furbi-abbiti",
    name: "Furbi con l'Abbìti",
    image: "assets/furbi-con-abbiti.jpg",
  },
  {
    id: "vincisgrassi",
    name: "Vincisgrassi",
    image: "assets/vincisgrassi.jpg",
  },
];

function DishList() {
  const [activeDish, setActiveDish] = React.useState(null);

  return React.createElement(
    "div",
    { className: "food-dishes-panel" },
    React.createElement(
      "div",
      { className: "mb-6" },
      React.createElement(
        "p",
        {
          className:
            "mb-2 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#c8a46b]",
        },
        "Traditional Dishes of Potenza Picena"
      ),
      React.createElement(
        "p",
        { className: "max-w-xl text-base leading-7 text-[#f7f1e8]/70" },
        "A curated taste of local recipes shaped by the Adriatic, countryside kitchens and family tradition."
      )
    ),
    React.createElement(
      "div",
      { className: "dish-list" },
      dishes.map((dish, index) => {
        const isOpen = activeDish === dish.id;

        return React.createElement(
          "article",
          {
            className: `dish-row ${isOpen ? "is-active" : ""}`,
            key: dish.id,
          },
          React.createElement(
            "button",
            {
              type: "button",
              className:
                "flex w-full items-center justify-between gap-4 py-5 text-left",
              onClick: () => setActiveDish(isOpen ? null : dish.id),
              "aria-expanded": isOpen,
            },
            React.createElement(
              "span",
              { className: "flex items-baseline gap-4" },
              React.createElement(
                "span",
                {
                  className:
                    "text-xs font-black uppercase tracking-[0.18em] text-[#c8a46b]/70",
                },
                String(index + 1).padStart(2, "0")
              ),
              React.createElement(
                "strong",
                {
                  className:
                    "font-serif text-[1.35rem] leading-tight text-[#f7f1e8] sm:text-[1.6rem]",
                },
                dish.name
              )
            ),
            React.createElement(
              "span",
              {
                className:
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#c8a46b]/35 text-[#c8a46b]",
              },
              isOpen ? "-" : "+"
            )
          ),
          React.createElement(
            "div",
            { className: "dish-gallery-wrap" },
            React.createElement(
              "div",
              { className: "dish-gallery" },
              React.createElement("img", {
                alt: dish.name,
                src: dish.image,
              })
            )
          )
        );
      })
    )
  );
}

const foodDishesRoot = document.getElementById("foodDishesRoot");

if (foodDishesRoot && window.React && window.ReactDOM) {
  ReactDOM.createRoot(foodDishesRoot).render(React.createElement(DishList));
}
