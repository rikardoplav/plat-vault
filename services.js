const nearbyServices = [
  {
    id: "pharmacy",
    name: "Pharmacy",
    distance: "400 m / 1,300 ft",
    walkingTime: "6 min",
    drivingTime: "1 min",
    icon: "pill",
    mapImage: "assets/pharmacy-route-map.png",
  },
  {
    id: "supermarket",
    name: "Supermarket",
    distance: "260 m / 859 ft",
    walkingTime: "3 min",
    drivingTime: "1 min",
    icon: "basket",
    mapImage: "assets/service-route-map.png",
  },
  {
    id: "schools",
    name: "Schools",
    distance: "500 m / 1,640 ft",
    walkingTime: "6 min",
    drivingTime: "1 min",
    icon: "school",
    mapImage: "assets/schools-route-map.png",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    distance: "450 m / 1,500 ft",
    walkingTime: "8 min",
    drivingTime: "2 min",
    icon: "utensils",
    mapImage: "assets/restaurants-route-map.png",
  },
  {
    id: "cafes",
    name: "Cafes",
    distance: "350 m / 1,150 ft",
    walkingTime: "6 min",
    drivingTime: "1 min",
    icon: "coffee",
    mapImage: "assets/cafes-route-map.png",
  },
  {
    id: "town-hall",
    name: "Town Hall",
    distance: "650 m / 2,100 ft",
    walkingTime: "11 min",
    drivingTime: "2 min",
    icon: "landmark",
    mapImage: "assets/town-hall-route-map.png",
  },
  {
    id: "public-transport",
    name: "Public Transport",
    distance: "270 m / 890 ft",
    walkingTime: "4 min",
    drivingTime: "1 min",
    icon: "bus",
    mapImage: "assets/public-transport-route-map.png",
  },
  {
    id: "medical-services",
    name: "Medical Services",
    distance: "1,300 m / 4,200 ft",
    walkingTime: "19 min",
    drivingTime: "2 min",
    icon: "medical",
    mapImage: "assets/medical-services-route-map.png",
  },
  {
    id: "bank",
    name: "Bank",
    distance: "650 m / 2,100 ft",
    walkingTime: "11 min",
    drivingTime: "2 min",
    icon: "bank",
    mapImage: "assets/bank-route-map.png",
  },
  {
    id: "post-office",
    name: "Post Office",
    distance: "700 m / 2,300 ft",
    walkingTime: "12 min",
    drivingTime: "2 min",
    icon: "mail",
    mapImage: "assets/public-transport-route-map.png",
  },
];

const serviceIcons = {
  pill: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 21a6 6 0 0 1-4.2-10.2l5-5a6 6 0 1 1 8.4 8.4l-5 5A5.9 5.9 0 0 1 10 21Z"/><path d="m8.5 8.5 7 7"/></svg>',
  basket: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10h14l-1.3 9H6.3L5 10Z"/><path d="M8 10 12 4l4 6"/><path d="M9 14v2M12 14v2M15 14v2"/></svg>',
  school: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v5c3 2 7 2 10 0v-5"/><path d="M21 9v7"/></svg>',
  utensils: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v8M4 3v8M10 3v8M4 11h6l-1 10H5L4 11Z"/><path d="M16 3c3 2 4 5 2 9l-1 2v7h-4v-7l1-2c-2-4-1-7 2-9Z"/></svg>',
  coffee: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2"/><path d="M7 3v2M11 3v2M15 3v2"/></svg>',
  landmark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-5 9 5H3Z"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8M4 20h16"/></svg>',
  bus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M4 11h16M8 18v2M16 18v2M8 7h8"/></svg>',
  medical: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s8-4.8 8-11a5 5 0 0 0-8-4 5 5 0 0 0-8 4c0 6.2 8 11 8 11Z"/><path d="M12 8v6M9 11h6"/></svg>',
  bank: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-5 9 5H3Z"/><path d="M6 10v8M10 10v8M14 10v8M18 10v8M4 20h16"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4Z"/><path d="m4 7 8 6 8-6"/></svg>',
};

const servicesGrid = document.querySelector("#servicesGrid");
const serviceModal = document.querySelector("#serviceModal");
const serviceModalMap = document.querySelector("#serviceModalMap");
const serviceModalTitle = document.querySelector("#serviceModalTitle");
const serviceModalDistance = document.querySelector("#serviceModalDistance");
const serviceModalWalking = document.querySelector("#serviceModalWalking");
const serviceModalDriving = document.querySelector("#serviceModalDriving");
const serviceModalClose = document.querySelector(".service-modal-close");

function renderServices() {
  servicesGrid.innerHTML = nearbyServices
    .map(
      (service) => `
        <button class="service-card" type="button" data-service-id="${service.id}">
          <span class="service-icon">${serviceIcons[service.icon]}</span>
          <strong>${service.name}</strong>
          <span>${service.distance} away</span>
          <em>${service.walkingTime} walk</em>
          <span class="service-map-preview" style="background-image: url('${service.mapImage}')"></span>
        </button>
      `,
    )
    .join("");
}

function openServiceModal(service) {
  serviceModalTitle.textContent = service.name.toUpperCase();
  serviceModalDistance.textContent = service.distance;
  serviceModalWalking.textContent = service.walkingTime;
  serviceModalDriving.textContent = service.drivingTime;
  serviceModalMap.style.backgroundImage = `linear-gradient(rgba(15, 17, 21, 0.14), rgba(15, 17, 21, 0.14)), url('${service.mapImage}')`;
  serviceModal.classList.add("is-open");
  serviceModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeServiceModal() {
  serviceModal.classList.remove("is-open");
  serviceModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

servicesGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".service-card");

  if (!card) return;

  const service = nearbyServices.find((item) => item.id === card.dataset.serviceId);
  if (service) openServiceModal(service);
});

serviceModalClose.addEventListener("click", closeServiceModal);
serviceModal.addEventListener("click", (event) => {
  if (event.target === serviceModal) closeServiceModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && serviceModal.classList.contains("is-open")) {
    closeServiceModal();
  }
});

renderServices();
