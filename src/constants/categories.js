import PetIcon from '../assets/pet.svg';
import PersonalIcon from '../assets/personal.svg';
import SelfCareIcon from '../assets/self-care.svg';
import ShopIcon from '../assets/shop.svg';
import WorkIcon from '../assets/work.svg';

const CATEGORIES = [
  {
    id: "pet",
    name: "Pet",
    icon: PetIcon,
    color: "#FFD332",
    bgColor:"#FFF6D4"
  },
  {
    id: "personal",
    name: "Personal",
    icon: PersonalIcon,
    color: "#F478B8",
    bgColor:"#FFE4F2"
  },
  {
    id: "self-care",
    name: "Self Care",
    icon: SelfCareIcon,
    color: "#0087FF",
    bgColor:"#E7F3FF"
  },
  {
    id: "shop",
    name: "Shop",
    icon: ShopIcon,
    color: "#FF9142",
    bgColor:"#FFE6D4"
  },
  {
    id: "work",
    name: "Work",
    icon: WorkIcon,
    color: "#9260F4",
    bgColor:"#EDE4FF"
  },
];

const CATEGORIES_BY_ID = CATEGORIES.reduce((acc, c) => {
  acc[c.id] = c;
  return acc;
}, {});

export { CATEGORIES, CATEGORIES_BY_ID };
