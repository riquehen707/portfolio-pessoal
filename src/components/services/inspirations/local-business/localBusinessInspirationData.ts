export type LocalService = {
  id: "corte" | "barba" | "combo" | "acabamento";
  name: string;
  detail: string;
  price: string;
  duration: string;
};

export type LocalBusinessMedia = {
  id: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  source: string;
};

export const localBusinessServices: LocalService[] = [
  { id: "corte", name: "Corte", detail: "Tesoura ou máquina, lavagem e finalização.", price: "R$ 55", duration: "45 min" },
  { id: "barba", name: "Barba", detail: "Desenho, acabamento e toalha quente.", price: "R$ 42", duration: "30 min" },
  { id: "combo", name: "Corte + barba", detail: "Os dois serviços no mesmo horário.", price: "R$ 88", duration: "75 min" },
  { id: "acabamento", name: "Acabamento", detail: "Contorno e ajuste entre cortes.", price: "R$ 28", duration: "20 min" },
];

export const localBusinessMedia: LocalBusinessMedia[] = [
  { id: "hero", image: "/images/services/inspirations/negocio-local-vibrante/hero.webp", width: 1400, height: 933, alt: "Profissional finalizando um corte de cabelo em fotografia de banco.", credit: "Allef Vinicius", source: "https://unsplash.com/photos/man-sitting-on-barbers-chair-IvQeAVeJULw" },
  { id: "corte", image: "/images/services/inspirations/negocio-local-vibrante/corte.webp", width: 1400, height: 2489, alt: "Barbeiro trabalhando em um corte em fotografia de banco.", credit: "mehdi pezhvak", source: "https://unsplash.com/photos/a-barber-cuts-someones-hair-in-a-barbershop-dhHnyxdNS0k" },
  { id: "ambiente", image: "/images/services/inspirations/negocio-local-vibrante/ambiente.webp", width: 1400, height: 934, alt: "Cadeiras e espelhos de uma barbearia contemporânea em fotografia de banco.", credit: "Redd Francisco", source: "https://unsplash.com/photos/a-barber-shop-with-a-chair-and-a-mirror-BBGyxhtPpC0" },
  { id: "equipe", image: "/images/services/inspirations/negocio-local-vibrante/equipe.webp", width: 1400, height: 1866, alt: "Profissionais trabalhando em uma barbearia em fotografia de banco.", credit: "Chris Charles", source: "https://unsplash.com/photos/man-sitting-on-barber-chair-c1KE5g7u5nk" },
];
