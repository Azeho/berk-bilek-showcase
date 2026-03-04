import metalCutting from "@/assets/portfolio-metal-cutting.jpg";
import busStop from "@/assets/portfolio-bus-stop.jpg";
import roadSafety from "@/assets/portfolio-road-safety.jpg";
import printing from "@/assets/portfolio-printing.jpg";
import ledScreen from "@/assets/portfolio-led-screen.jpg";
import animation3d from "@/assets/portfolio-3d-animation.jpg";
import lighting from "@/assets/portfolio-lighting.jpg";

export type ProjectCategory = "metal" | "advertising";

export interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    id: "1",
    image: metalCutting,
    title: "CNC metal kesmek",
    description: "Ýokary takyklykly CNC enjamlar bilen metal kesmek we gaýtadan işlemek.",
    category: "metal",
  },
  {
    id: "2",
    image: busStop,
    title: "Awtobus duralgasy",
    description: "Şäher infrastrukturasy üçin döwrebap polat we aýna duralgalar.",
    category: "metal",
  },
  {
    id: "3",
    image: roadSafety,
    title: "Ýol howpsuzlyk enjamlary",
    description: "Ýokary hilli polat ýol germewleri we howpsuzlyk enjamlary.",
    category: "metal",
  },
  {
    id: "4",
    image: lighting,
    title: "Şäher yşyklandyrma",
    description: "Döwrebap dizaýnly köçe yşyklandyrma sütünleri.",
    category: "metal",
  },
  {
    id: "5",
    image: printing,
    title: "Uly formatly çap",
    description: "Ýokary hilli bannerler we mahabat materiallary çap etmek.",
    category: "advertising",
  },
  {
    id: "6",
    image: ledScreen,
    title: "LED ekranlar",
    description: "Daşky mahabat üçin uly ölçegli LED wideo ekranlar.",
    category: "advertising",
  },
  {
    id: "7",
    image: animation3d,
    title: "3D animasiýa",
    description: "Mahabat üçin 3D animasiýa we wizuallaşdyrma hyzmatlary.",
    category: "advertising",
  },
];
