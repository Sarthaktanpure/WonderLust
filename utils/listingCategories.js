const LISTING_CATEGORIES = [
  { value: "trending", label: "Trending", icon: "fa-solid fa-fire" },
  { value: "rooms", label: "Rooms", icon: "fa-solid fa-bed" },
  {
    value: "iconic-cities",
    label: "Iconic cities",
    icon: "fa-solid fa-mountain-city",
  },
  { value: "mountains", label: "Mountains", icon: "fa-solid fa-mountain" },
  { value: "castles", label: "Castles", icon: "fa-brands fa-alipay" },
  {
    value: "amazing-pools",
    label: "Amazing Pools",
    icon: "fa-solid fa-person-swimming",
  },
  { value: "camps", label: "Camps", icon: "fa-brands fa-free-code-camp" },
  { value: "farm", label: "Farm", icon: "fa-solid fa-cow" },
];

const LISTING_CATEGORY_VALUES = LISTING_CATEGORIES.map(
  (category) => category.value
);

module.exports = {
  LISTING_CATEGORIES,
  LISTING_CATEGORY_VALUES,
};
