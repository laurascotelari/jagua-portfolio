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
  };
  lightbox: {
    close: string;
    closeLabel: string;
    previous: string;
    previousLabel: string;
    next: string;
    nextLabel: string;
    inTodaysHand: string;
  };
  cards: {
    ariaLabel: string;
    emptyTitle: string;
    emptySubtitle: string;
    pickAria: string;
    pickTitle: string;
    pickSubtitle: string;
    meaningHeading: string;
    back: string;
    cardAria: string;
    share: string;
    shareLabel: string;
    shared: string;
    grimoireTitle: string;
    grimoireNote: string;
    grimoireNoteLabel: string;
    grimoireOpen: string;
  };
  about: {
    title: string;
    lead: string;
    bio: string;
    practiceTitle: string;
    practice: string;
    noteTitle: string;
    noteLead: string;
    name: string;
    nameLabel: string;
    aboutField: string;
    aboutLabel: string;
    message: string;
    messageLabel: string;
    send: string;
    copy: string;
    copied: string;
    opened: string;
  };
  gallery: {
    ariaLabel: string;
    empty: string;
    openArtwork: string;
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
  },
  cards: {
    ariaLabel: "Consultar as cartas",
    emptyTitle: "As cartas ainda estão sendo pintadas.",
    emptySubtitle: "volte em breve!",
    pickAria: "Escolha uma carta",
    pickTitle: "O que as cartas dizem sobre o seu dia?",
    pickSubtitle: "escolha uma e descubra!",
    meaningHeading: "O que isso significa para o seu dia?",
    back: "← voltar às cartas",
    cardAria: "Carta {n} de {total}: vire-a",
    share: "copiar esta carta",
    shareLabel: "Copiar um link para esta carta",
    shared: "copiado",
    grimoireTitle: "cartas que você virou",
    grimoireNote: "uma linha só sua",
    grimoireNoteLabel: "Uma nota particular, guardada neste navegador",
    grimoireOpen: "Abrir {title}, virada em {date}",
  },
  gallery: {
    ariaLabel: "Galeria",
    empty: "Ainda não há nada na parede.",
    openArtwork: "Abrir {title}",
  },
  about: {
    title: "Sobre mim",
    lead: "desenhos, e cinco cartas por dia",
    bio: "Este é um portfólio de desenhos e pinturas. Cada peça na parede pode trazer um texto: de onde veio, o que estava sendo lido ou ouvido, o que ela ainda significa.\n\nConsultar as cartas reparte cinco imagens por dia, as mesmas para quem entrar. Não é previsão. É um convite para ficar um pouco com uma delas.",
    practiceTitle: "Como é feito",
    practice: "O trabalho é sobretudo desenho — traço, símbolo, figura, um pouco de pintura quando a cor pede espaço. Os textos ficam ao lado da imagem, em português e em inglês.",
    noteTitle: "Deixe um bilhete",
    noteLead: "nome, assunto, recado",
    name: "nome",
    nameLabel: "Seu nome",
    aboutField: "sobre o quê",
    aboutLabel: "Uma peça ou uma encomenda",
    message: "recado",
    messageLabel: "Sua mensagem",
    send: "enviar o bilhete",
    copy: "copiar o bilhete",
    copied: "copiado",
    opened: "abrindo o correio",
  },
  lightbox: {
    close: "fechar ✕",
    closeLabel: "Fechar",
    previous: "← anterior",
    previousLabel: "Peça anterior: {title}",
    next: "próxima →",
    nextLabel: "Próxima peça: {title}",
    inTodaysHand: "esta também está nas cartas de hoje",
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
  },
  cards: {
    ariaLabel: "Check the Cards",
    emptyTitle: "The cards are still being painted.",
    emptySubtitle: "come back soon!",
    pickAria: "Pick a card",
    pickTitle: "What does the cards say about your day?",
    pickSubtitle: "pick one and find out!",
    meaningHeading: "What does it mean for your day?",
    back: "← back to the cards",
    cardAria: "Card {n} of {total}: turn it over",
    share: "copy this card",
    shareLabel: "Copy a link to this card",
    shared: "copied",
    grimoireTitle: "your draws",
    grimoireNote: "a line for yourself",
    grimoireNoteLabel: "A private note, kept in this browser",
    grimoireOpen: "Open {title}, drawn on {date}",
  },
  gallery: {
    ariaLabel: "Gallery",
    empty: "Nothing on the wall yet.",
    openArtwork: "Open {title}",
  },
  about: {
    title: "About me",
    lead: "drawings, and five cards a day",
    bio: "This is a portfolio of drawings and paintings. Each piece on the wall can carry a text: where it came from, what was being read or heard, what it still means.\n\nCheck the Cards deals five images a day, the same ones for everyone who arrives. It is not a prediction. It is an invitation to stay with one of them for a while.",
    practiceTitle: "How the work is made",
    practice: "The work is mostly drawing — line, symbol, figure, and a little paint when the color needs more room. The texts sit beside the image, in Portuguese and in English.",
    noteTitle: "Leave a note",
    noteLead: "a name, a subject, a message",
    name: "name",
    nameLabel: "Your name",
    aboutField: "about what",
    aboutLabel: "A piece or a commission",
    message: "message",
    messageLabel: "Your message",
    send: "send the note",
    copy: "copy the note",
    copied: "copied",
    opened: "opening your mail",
  },
  lightbox: {
    close: "close ✕",
    closeLabel: "Close",
    previous: "← previous",
    previousLabel: "Previous piece: {title}",
    next: "next →",
    nextLabel: "Next piece: {title}",
    inTodaysHand: "this one is also in today's cards",
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
