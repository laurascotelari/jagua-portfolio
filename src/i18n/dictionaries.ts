import type { Locale } from "./config";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    ariaLabel: string;
    home: string;
    cards: string;
    gallery: string;
    about: string;
    language: string;
  };
  hero: {
    ariaLabel: string;
    deskAlt: string;
    hotspotGallery: string;
    hotspotAbout: string;
    hotspotCards: string;
    hotspotLightsOff: string;
    hotspotLightsOn: string;
  };
  cards: {
    ariaLabel: string;
    emptyTitle: string;
    emptySubtitle: string;
    pickAria: string;
    pickTitle: string;
    pickSubtitle: string;
    meaningHeading: string;
    discoverMore: string;
    meaningToday: string;
    cardAria: string;
  };
  gallery: {
    ariaLabel: string;
    empty: string;
    openArtwork: string;
  };
  about: {
    title: string;
    comingSoon: string;
  };
  lightbox: {
    close: string;
    closeLabel: string;
  };
};

const pt: Dictionary = {
  meta: {
    title: "Jagua jpg · Ilustração",
    description: "Portfólio de ilustração, com cinco novas cartas para escolher todos os dias.",
  },
  nav: {
    ariaLabel: "Principal",
    home: "Início",
    cards: "Consultar as cartas",
    gallery: "Galeria",
    about: "Sobre mim",
    language: "Idioma",
  },
  hero: {
    ariaLabel: "Início",
    deskAlt: "Desenho de linha de uma mesa de artista sob uma parede coberta de quadros",
    hotspotGallery: "Clique para ver a galeria",
    hotspotAbout: "Clique para ler sobre mim",
    hotspotCards: "Clique para ver a carta do dia",
    hotspotLightsOff: "Clique para apagar a luz",
    hotspotLightsOn: "Clique para acender a luz",
  },
  cards: {
    ariaLabel: "Consultar as cartas",
    emptyTitle: "As cartas ainda estão sendo pintadas.",
    emptySubtitle: "volte em breve!",
    pickAria: "Escolha uma carta",
    pickTitle: "O que as cartas dizem sobre o seu dia?",
    pickSubtitle: "escolha uma e descubra!",
    meaningHeading: "O que isso significa para o seu dia?",
    discoverMore: "Descubra mais sobre esta obra",
    meaningToday: "O que esta carta significa para hoje?",
    cardAria: "Carta {n} de {total}: vire-a",
  },
  gallery: {
    ariaLabel: "Galeria",
    empty: "Ainda não há nada na parede.",
    openArtwork: "Abrir {title}",
  },
  about: {
    title: "Sobre mim",
    comingSoon: "em breve!",
  },
  lightbox: {
    close: "fechar ✕",
    closeLabel: "Fechar",
  },
};

const en: Dictionary = {
  meta: {
    title: "Jagua jpg · Illustration",
    description: "Illustration portfolio, with five new cards to pick from every day.",
  },
  nav: {
    ariaLabel: "Main",
    home: "Home",
    cards: "Check the Cards",
    gallery: "Gallery",
    about: "About me",
    language: "Language",
  },
  hero: {
    ariaLabel: "Home",
    deskAlt: "Line drawing of an artist's desk under a wall covered in framed pictures",
    hotspotGallery: "Click to see the gallery",
    hotspotAbout: "Click to read about me",
    hotspotCards: "Click to check today's card",
    hotspotLightsOff: "Click to turn the light off",
    hotspotLightsOn: "Click to turn the light on",
  },
  cards: {
    ariaLabel: "Check the Cards",
    emptyTitle: "The cards are still being painted.",
    emptySubtitle: "come back soon!",
    pickAria: "Pick a card",
    pickTitle: "What does the cards say about your day?",
    pickSubtitle: "pick one and find out!",
    meaningHeading: "What does it mean for your day?",
    discoverMore: "Discover more about this artwork",
    meaningToday: "What does this card mean for today?",
    cardAria: "Card {n} of {total}: turn it over",
  },
  gallery: {
    ariaLabel: "Gallery",
    empty: "Nothing on the wall yet.",
    openArtwork: "Open {title}",
  },
  about: {
    title: "About me",
    comingSoon: "coming soon!",
  },
  lightbox: {
    close: "close ✕",
    closeLabel: "Close",
  },
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function formatMessage(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}
