export type Lang = "sv" | "fi";

export const company = {
  name: "S Rörteam Oy Ab",
  businessId: "2548364-3",
  street: "Tegelbruksvägen 4 A",
  postal: "64200 Närpes",
  phone: "+358 6 224 3016",
  phoneHref: "tel:+35862243016",
  email: "info@rorteam.fi",
  mapQuery: "Tegelbruksvägen 4 A, 64200 Närpes, Finland",
};

export const people = [
  {
    name: "Joakim Berglund",
    role: { sv: "VD", fi: "Toimitusjohtaja" },
    phone: "0500 264 929",
    phoneHref: "tel:+358500264929",
    email: "joakim.berglund@rorteam.fi",
  },
  {
    name: "Kjell Kankaanpää",
    role: null,
    phone: "040 152 3395",
    phoneHref: "tel:+358401523395",
    email: "kjell.kankaanpaa@rorteam.fi",
  },
  {
    name: "Jonathan Nyberg",
    role: null,
    phone: "040 751 3749",
    phoneHref: "tel:+358407513749",
    email: "jonathan.nyberg@rorteam.fi",
  },
] as const;

// Placeholder photos (Unsplash). Swap for the company's own project photos.
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const photos = {
  hero: u("photo-1585704032915-c3400ca199e7", 1600),
  pipes: u("photo-1607472586893-edb57bdc0e39", 900),
  heating: u("photo-1621905252507-b35492cc74b4", 900),
  ventilation: u("photo-1581094794329-c8112a89af12", 900),
  bathroom: u("photo-1552321554-5fefe8c9ef14", 900),
  service: u("photo-1581244277943-fe4a9c777189", 900),
  projects: u("photo-1504328345606-18bbc8c9d7d1", 900),
  shop: u("photo-1581783898377-1c85bf937427", 1200),
  why: u("photo-1584622650111-993a426fbf0a", 1200),
};

export const serviceKeys = [
  "pipes",
  "heating",
  "ventilation",
  "bathroom",
  "service",
  "projects",
] as const;
export type ServiceKey = (typeof serviceKeys)[number];

/**
 * Gallery. Placeholders until the client's photos arrive:
 * put the files in public/gallery/ and set e.g. src: "/gallery/01.jpg",
 * plus an alt text in both languages. `icon` picks the placeholder icon.
 */
export const gallery: {
  src: string | null;
  icon: ServiceKey;
  alt?: { sv: string; fi: string };
}[] = [
  { src: null, icon: "pipes" },
  { src: null, icon: "heating" },
  { src: null, icon: "bathroom" },
  { src: null, icon: "ventilation" },
  { src: null, icon: "service" },
  { src: null, icon: "projects" },
];

export const groupKeys = ["private", "housing", "business", "municipal"] as const;
export type GroupKey = (typeof groupKeys)[number];

export const locations = ["narpes", "kristinestad", "kasko", "other"] as const;

const sv = {
  banner: "Demo – skapad av Fusion Sites",
  tagline: "VVS installationer – LVI asennukset",
  nav: {
    services: "Tjänster",
    customers: "Kunder",
    shop: "Butik",
    about: "Varför oss",
    contact: "Kontakt",
    quote: "Begär offert",
  },
  call: "Ring oss",
  callShort: "Ring",
  menu: "Meny",
  close: "Stäng",
  langLabel: "Språk",
  hero: {
    eyebrow: "VVS i Österbotten sedan 2013",
    title: "VVS-installationer i Närpes, Kristinestad och Kaskö",
    lead: "Vi utför alla slags VVS-installationer för privatkunder, bostadsbolag, företag och kommuner – snabbt, kostnadseffektivt och så att det fungerar.",
    quote: "Begär offert",
    facts: ["Sedan 2013", "Team på 7 personer", "Egen VVS-butik i Närpes"],
  },
  services: {
    kicker: "Tjänster",
    title: "Det vi hjälper dig med",
    lead: "Från enskilda reparationer till hela installationsprojekt.",
    placeholder: "Exempel – bekräftas",
    items: {
      pipes: {
        title: "Rörinstallationer",
        text: "Vatten- och avloppsinstallationer i nya och befintliga fastigheter.",
      },
      heating: {
        title: "Värme & värmepumpar",
        text: "Installation av värmesystem och värmepumpar.",
      },
      ventilation: {
        title: "Ventilation",
        text: "Ventilationsinstallationer för bostäder och lokaler.",
      },
      bathroom: {
        title: "Badrum",
        text: "VVS-arbeten vid badrumsrenoveringar och nya badrum.",
      },
      service: {
        title: "Service & reparationer",
        text: "Felsökning, reparationer och service av VVS-system.",
      },
      projects: {
        title: "Projekt för företag & kommuner",
        text: "VVS-installationer i större projekt och offentliga fastigheter.",
      },
    } satisfies Record<ServiceKey, { title: string; text: string }>,
  },
  groups: {
    kicker: "Våra kunder",
    title: "Vi jobbar för alla – stora som små",
    items: {
      private: {
        title: "Privatkunder",
        text: "Egnahemshus, fritidshus och lägenheter.",
      },
      housing: {
        title: "Bostadsbolag",
        text: "Installationer och reparationer i bostadsbolagets fastigheter.",
      },
      business: {
        title: "Företag",
        text: "Lokaler, hallar och kontor.",
      },
      municipal: {
        title: "Kommuner",
        text: "Offentliga byggnader och kommunala fastigheter.",
      },
    } satisfies Record<GroupKey, { title: string; text: string }>,
  },
  shop: {
    kicker: "Vår butik",
    title: "VVS-butik i Närpes",
    lead: "I vår butik hittar du ett brett sortiment av VVS-tillbehör – för både proffs och privatpersoner.",
    hoursLabel: "Öppettider",
    hours: "Mån–fre 07.30–16.00",
    weekend: "Lör–sön stängt",
    addressLabel: "Adress",
    directions: "Vägbeskrivning",
    mapTitle: "Karta: Tegelbruksvägen 4 A, Närpes",
  },
  why: {
    kicker: "Varför Rörteam",
    title: "Snabbt, kostnadseffektivt och så att det fungerar",
    lead: "Vårt mål är att betjäna våra kunder så snabbt som möjligt, på ett kostnadseffektivt och fungerande sätt.",
    items: [
      {
        title: "Lokala sedan 2013",
        text: "Vi finns i Närpes och känner området – Kristinestad, Kaskö och Närpes.",
      },
      {
        title: "Snabb service",
        text: "Vi strävar efter att komma på plats så snabbt som möjligt.",
      },
      {
        title: "Kostnadseffektiva lösningar",
        text: "Lösningar som fungerar – utan onödiga kostnader.",
      },
    ],
    stats: [
      { value: "2013", label: "Grundat" },
      { value: "7", label: "Personer i teamet" },
      { value: "3", label: "Orter vi främst betjänar" },
    ],
  },
  contact: {
    kicker: "Kontakt",
    title: "Ta kontakt direkt",
    lead: "Ring eller mejla oss – vi hjälper gärna till.",
    office: "Kontoret",
    call: "Ring",
    email: "E-post",
  },
  form: {
    kicker: "Offertförfrågan",
    title: "Begär offert",
    lead: "Berätta kort om ditt behov så återkommer vi.",
    name: "Namn",
    phone: "Telefon",
    email: "E-post",
    location: "Ort",
    locations: {
      narpes: "Närpes",
      kristinestad: "Kristinestad",
      kasko: "Kaskö",
      other: "Annan ort",
    },
    jobType: "Typ av arbete",
    jobOther: "Annat",
    choose: "Välj…",
    message: "Meddelande",
    messagePh: "Beskriv arbetet, t.ex. vad som ska installeras eller repareras.",
    submit: "Skicka förfrågan",
    required: "obligatorisk",
    thanksTitle: "Tack för din förfrågan!",
    thanksText: "Detta är en demo – formuläret skickar inga uppgifter ännu. Ring gärna oss direkt.",
    again: "Skicka en ny förfrågan",
  },
  gallery: {
    kicker: "Galleri",
    title: "Bilder från våra arbeten",
    placeholder: "Bild kommer",
    open: "Öppna bild",
    close: "Stäng",
    prev: "Föregående bild",
    next: "Nästa bild",
  },
  footer: {
    businessId: "FO-nr / Y-tunnus",
    site: "Webbplats",
    rights: "Alla rättigheter förbehållna.",
  },
};

export type Dict = typeof sv;

const fi: Dict = {
  banner: "Demo – toteutus Fusion Sites",
  tagline: "VVS installationer – LVI asennukset",
  nav: {
    services: "Palvelut",
    customers: "Asiakkaat",
    shop: "Myymälä",
    about: "Miksi me",
    contact: "Yhteystiedot",
    quote: "Pyydä tarjous",
  },
  call: "Soita meille",
  callShort: "Soita",
  menu: "Valikko",
  close: "Sulje",
  langLabel: "Kieli",
  hero: {
    eyebrow: "LVI-palvelua Pohjanmaalla vuodesta 2013",
    title: "LVI-asennukset Närpiössä, Kristiinankaupungissa ja Kaskisissa",
    lead: "Teemme kaikenlaisia LVI-asennuksia yksityisasiakkaille, taloyhtiöille, yrityksille ja kunnille – nopeasti, kustannustehokkaasti ja toimivasti.",
    quote: "Pyydä tarjous",
    facts: ["Vuodesta 2013", "7 hengen tiimi", "Oma LVI-myymälä Närpiössä"],
  },
  services: {
    kicker: "Palvelut",
    title: "Näissä autamme",
    lead: "Yksittäisistä korjauksista kokonaisiin asennusprojekteihin.",
    placeholder: "Esimerkki – vahvistetaan",
    items: {
      pipes: {
        title: "Putkiasennukset",
        text: "Vesi- ja viemäriasennukset uusiin ja olemassa oleviin kiinteistöihin.",
      },
      heating: {
        title: "Lämmitys ja lämpöpumput",
        text: "Lämmitysjärjestelmien ja lämpöpumppujen asennukset.",
      },
      ventilation: {
        title: "Ilmanvaihto",
        text: "Ilmanvaihtoasennukset asuntoihin ja toimitiloihin.",
      },
      bathroom: {
        title: "Kylpyhuoneet",
        text: "LVI-työt kylpyhuoneremonteissa ja uusissa kylpyhuoneissa.",
      },
      service: {
        title: "Huolto ja korjaukset",
        text: "LVI-järjestelmien vianetsintä, korjaukset ja huolto.",
      },
      projects: {
        title: "Projektit yrityksille ja kunnille",
        text: "LVI-asennukset suurempiin projekteihin ja julkisiin kiinteistöihin.",
      },
    },
  },
  groups: {
    kicker: "Asiakkaamme",
    title: "Palvelemme kaikkia – isoja ja pieniä",
    items: {
      private: {
        title: "Yksityisasiakkaat",
        text: "Omakotitalot, vapaa-ajan asunnot ja kerrostaloasunnot.",
      },
      housing: {
        title: "Taloyhtiöt",
        text: "Asennukset ja korjaukset taloyhtiöiden kiinteistöissä.",
      },
      business: {
        title: "Yritykset",
        text: "Liiketilat, hallit ja toimistot.",
      },
      municipal: {
        title: "Kunnat",
        text: "Julkiset rakennukset ja kunnalliset kiinteistöt.",
      },
    },
  },
  shop: {
    kicker: "Myymälämme",
    title: "LVI-myymälä Närpiössä",
    lead: "Myymälästämme löydät laajan valikoiman LVI-tarvikkeita – niin ammattilaisille kuin yksityisille.",
    hoursLabel: "Aukioloajat",
    hours: "Ma–pe 07.30–16.00",
    weekend: "La–su suljettu",
    addressLabel: "Osoite",
    directions: "Reittiohjeet",
    mapTitle: "Kartta: Tegelbruksvägen 4 A, Närpiö",
  },
  why: {
    kicker: "Miksi Rörteam",
    title: "Nopeasti, kustannustehokkaasti ja toimivasti",
    lead: "Tavoitteemme on palvella asiakkaitamme mahdollisimman nopeasti, kustannustehokkaasti ja toimivasti.",
    items: [
      {
        title: "Paikallinen vuodesta 2013",
        text: "Toimimme Närpiössä ja tunnemme alueen – Kristiinankaupunki, Kaskinen ja Närpiö.",
      },
      {
        title: "Nopea palvelu",
        text: "Pyrimme olemaan paikalla mahdollisimman nopeasti.",
      },
      {
        title: "Kustannustehokkaat ratkaisut",
        text: "Toimivia ratkaisuja – ilman turhia kustannuksia.",
      },
    ],
    stats: [
      { value: "2013", label: "Perustettu" },
      { value: "7", label: "Hengen tiimi" },
      { value: "3", label: "Pääasiallista toiminta-aluetta" },
    ],
  },
  contact: {
    kicker: "Yhteystiedot",
    title: "Ota yhteyttä suoraan",
    lead: "Soita tai lähetä sähköpostia – autamme mielellämme.",
    office: "Toimisto",
    call: "Soita",
    email: "Sähköposti",
  },
  form: {
    kicker: "Tarjouspyyntö",
    title: "Pyydä tarjous",
    lead: "Kerro lyhyesti tarpeestasi, niin palaamme asiaan.",
    name: "Nimi",
    phone: "Puhelin",
    email: "Sähköposti",
    location: "Paikkakunta",
    locations: {
      narpes: "Närpiö",
      kristinestad: "Kristiinankaupunki",
      kasko: "Kaskinen",
      other: "Muu paikkakunta",
    },
    jobType: "Työn tyyppi",
    jobOther: "Muu",
    choose: "Valitse…",
    message: "Viesti",
    messagePh: "Kuvaile työ, esim. mitä asennetaan tai korjataan.",
    submit: "Lähetä tarjouspyyntö",
    required: "pakollinen",
    thanksTitle: "Kiitos tarjouspyynnöstäsi!",
    thanksText: "Tämä on demo – lomake ei vielä lähetä tietoja. Soita meille suoraan.",
    again: "Lähetä uusi pyyntö",
  },
  gallery: {
    kicker: "Galleria",
    title: "Kuvia töistämme",
    placeholder: "Kuva tulossa",
    open: "Avaa kuva",
    close: "Sulje",
    prev: "Edellinen kuva",
    next: "Seuraava kuva",
  },
  footer: {
    businessId: "Y-tunnus",
    site: "Verkkosivut",
    rights: "Kaikki oikeudet pidätetään.",
  },
};

export const dictionaries: Record<Lang, Dict> = { sv, fi };
