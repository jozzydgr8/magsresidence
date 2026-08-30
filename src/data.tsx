import {
  WifiOutlined,
  PlaySquareOutlined,
  CoffeeOutlined,
  SafetyCertificateOutlined,
  SkinOutlined,
  CustomerServiceOutlined,
  ThunderboltOutlined,
  CalendarOutlined,
  PoweroffOutlined,
  ShopOutlined,
  PlayCircleOutlined,
  SafetyOutlined,
  CloudOutlined,
  HomeOutlined,
  CarOutlined,
  EnvironmentOutlined,
  ClearOutlined,
  SmileOutlined,
  HeartOutlined,
  DesktopOutlined
} from "@ant-design/icons";

import firstBackground from './asset/LivingRoom1.png';
import secondBackground from './asset/livingRoom2.png';
import thirdBackground from './asset/room2.jpg';


export const backgroundImages =[
  {
    background:firstBackground
  },
  {
    background:secondBackground
  },
  {
    background:thirdBackground
  },
  
]

export const amenities = [
  {
    title: "High-Speed WiFi",
    description:
      "Reliable internet for work, streaming, and staying connected.",
    icon: WifiOutlined,
  },
  {
    title: "Smart TV",
    description:
      "Netflix, YouTube, and entertainment in every apartment.",
    icon: PlaySquareOutlined,
  },
  {
    title: "Full Kitchen",
    description:
      "Equipped with cookware, microwave, fridge, and coffee maker.",
    icon: CoffeeOutlined,
  },
  {
    title: "24/7 Security",
    description:
      "Secure access, surveillance, and round-the-clock support.",
    icon: SafetyCertificateOutlined,
  },
  {
    title: "Premium Bedding",
    description:
      "Hotel-quality linens, pillows, and comfortable mattresses.",
    icon: SkinOutlined,
  },
  {
    title: "Concierge Service",
    description:
      "Personalized assistance for reservations, transport, and more.",
    icon: CustomerServiceOutlined,
  },
  {
    title: "Great Location",
    description:
      "Close to business districts, dining, shopping, and attractions.",
    icon: EnvironmentOutlined,
  },
  {
    title: "Flexible Stays",
    description:
      "Short-term and extended stays available — stay as long as you need.",
    icon: CalendarOutlined,
  },
];

export     const reason = [
  {
    "id": 1,
    "title": "Hotel Comfort, Apartment Freedom",
    "description": "Enjoy the service and quality of a premium hotel with the space, privacy, and flexibility of your own apartment."
  },
  {
    "id": 2,
    "title": "Stay as Long as You Need",
    "description": "Whether it's a few nights or a few months, our flexible terms and competitive rates make extended stays simple."
  },
  {
    "id": 3,
    "title": "Everything Set Up for You",
    "description": "We handle the details — utilities, cleaning, maintenance — so you can focus on what brought you here."
  }
]


export const singleAmenities = [
  {
    label: "Fast Wi-Fi",
    icon: <WifiOutlined />,
  },
  {
    label: "Air conditioning",
    icon: <CloudOutlined />,
  },
  {
    label: "Full kitchen",
    icon: <HomeOutlined />,
  },
  {
    label: "Secure parking",
    icon: <CarOutlined />,
  },
  {
    label: "Private pool",
    icon: <EnvironmentOutlined />,
  },
  {
    label: "Daily cleaning",
    icon: <ClearOutlined />,
  },
];

export const features = [
  {
    label: "24-Hour Power Supply",
    icon: <ThunderboltOutlined />,
  },
  {
    label: "Fast Wi-Fi",
    icon: <WifiOutlined />,
  },
  {
    label: "Inverter",
    icon: <ThunderboltOutlined />,
  },
  {
    label: "Spacious Balcony",
    icon: <HomeOutlined />,
  },
  {
    label: "Standby Generator",
    icon: <PoweroffOutlined />,
  },
  {
    label: "Laundry Service on Demand",
    icon: <ClearOutlined />,
  },
  {
    label: "Close to Government Lodges",
    icon: <EnvironmentOutlined />,
  },
  {
    label: "24-Hour Security Patrol",
    icon: <SafetyOutlined />,
  },
  {
    label: "En-Suite Rooms",
    icon: <HomeOutlined />,
  },
  {
    label: "Cozy Bedding",
    icon: <ShopOutlined />,
  },
  {
    label: "Netflix",
    icon: <PlayCircleOutlined />,
  },
  {
    label: "Smart TVs",
    icon: <DesktopOutlined />,
  },
  {
    label: "Prime Location",
    icon: <EnvironmentOutlined />,
  },
  {
    label: "Close to Fun Centers",
    icon: <SmileOutlined />,
  },
  {
    label: "Hosted With Love",
    icon: <HeartOutlined />,
  },
];