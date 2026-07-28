import type { MediaConfig } from "@/types/product";

export type AthleteQuote = {
  name: string;
  handle: string;
  avatarSrc?: string;
  quote: string;
  isDraft: boolean;
};

export type Athlete = {
  number: string;
  position: string;
  name: string;
  credential: string;
  photo: MediaConfig;
  quote: AthleteQuote;
};

export const landingPageConfig = {
  collaborationName: "SickFit × KC-1400 Collective",

  header: {
    lockupPrefix: "SICKFIT",
    lockupSeparator: "×",
    lockupSuffix: "KC-1400 COLLECTIVE",
    ctaLabel: "Preorder Now",
  },

  hero: {
    eyebrow: "Powered by the KC-1400 Collective · Football 2026",
    titleLineOne: "Tiger Blue.",
    titleLineTwo: "Built To Work.",
    description:
      "Three pairs of SickFit performance compression socks, built with three star student-athletes through the KC-1400 Collective for the 2026 football season. Limited preorder. When they're gone, they're gone.",
    ctaLabel: "Preorder the 3-Pack",
    meta: {
      athletesLabel: "The Athletes",
      athletesValue: "Sallis · Rembert · Lockhart",
      shipsLabel: "Ships",
      quantityLabel: "Quantity",
      quantityValue: "Limited first run",
    },
  },

  ticker: {
    items: [
      "PREORDER OPEN",
      "SICKFIT × KC-1400 COLLECTIVE",
      "3-PACK · $34.99",
      "SHIPS FOR FOOTBALL SEASON",
    ],
  },

  partnership: {
    eyebrow: "The Partnership",
    title: "Three Names On This Pack",
    cards: [
      {
        label: "The Driver",
        title: "KC-1400 Collective",
        featured: true,
        body: "The collective behind this collab. KC-1400 exists to serve Jackson State student-athletes, building real NIL opportunities that put money in players' pockets. They represent the athletes and built this deal. Every pack sold pays the players.",
      },
      {
        label: "The Players",
        title: "Student-Athletes",
        featured: false,
        body: "The three athletes on this pack play football at Jackson State. This is an athlete partnership through the KC-1400 Collective. This product is not affiliated with, sponsored by, or endorsed by Jackson State University.",
      },
      {
        label: "The Product",
        title: "SickFit",
        featured: false,
        body: "Veteran-owned performance compression, built for people who spend all day on their feet. We make the socks. The athletes make them theirs.",
      },
    ],
  },

  product: {
    productImage: {
      alt: "SickFit x KC-1400 Game Day 3-Pack",
      placeholderLabel: "Product shot placeholder · 3-pack hero image or flat lay · [Mike / product photography]",
    } as MediaConfig,
    intro:
      "The same compression we build for the people who spend all day on their feet.",
    introHighlight: "all day on their feet",
    audience:
      "The nurse. The athlete. The crew. The traveler. The soldier. The line cook. The tradesman. The ones who keep the world running.",
    body: "Now in Tiger colors: support through the arch and ankle, cushion where the game happens, and blood flow that keeps legs fresh in the fourth quarter, whether you're on the field or in the stands.",
  },

  athletes: {
    eyebrow: "The Lineup · Represented by the KC-1400 Collective",
    titleLineOne: "Worn By The Ones",
    titleLineTwo: "Who Set The Tone",
    intro:
      "Three student-athletes who carry the load on both sides of the ball. This is their pack, built with them for the 2026 season.",
    roster: [
      {
        number: "11",
        position: "Quarterback · #11",
        name: "Jared Lockhart",
        credential: "Starting Quarterback",
        photo: {
          src: "/players/Athlete11.jpeg",
          alt: "Jared Lockhart athlete photo",
          placeholderLabel: "Athlete photo · [kc1400 approved image]",
        },
        quote: {
          name: "Jared Lockhart",
          handle: "@lockhartjared1",
          avatarSrc: "/players/jlockhearttwitter.jpg",
          quote:
            "Pressure creates opportunities. I trust the work I've put in, and I trust the gear I wear. SickFit is apart of how I take care of body.",
          isDraft: false,
        },
      },
      {
        number: "15",
        position: "Defensive Back · #15",
        name: "Kam Sallis",
        credential: "Preseason SWAC Defensive Player of the Year",
        photo: {
          src: "/players/Athlete15.jpeg",
          alt: "Kam Sallis athlete photo",
          placeholderLabel: "Athlete photo · [kc1400 approved image]",
        },
        quote: {
          name: "Kam Sallis",
          handle: "@KameronSallis",
          avatarSrc: "/players/kamSallistwitter.jpg",
          quote:
            "Every rep matters. Every detail matters. That's why I only wear gear like SickFit that's ready to compete.",
          isDraft: false,
        },
      },
      {
        number: "3",
        position: "Wide Receiver · #3",
        name: "Nate Rembert",
        credential: "Preseason All-SWAC First Team",
        photo: {
          src: "/players/Athlete8.jpeg",
          alt: "Nate Rembert athlete photo",
          placeholderLabel: "Athlete photo · [kc1400 approved image]",
        },
        quote: {
          name: "Nate Rembert",
          handle: "@NateRembert",
          avatarSrc: "/players/NateRembertTwitter.jpg",
          quote:
            "When you expect greatness from yourself, every piece of your game should match that standard including your socks.",
          isDraft: false,
        },
      },
    ] satisfies Athlete[],
  },

  benefits: {
    eyebrow: "Why SickFit",
    title: "Built For Feet That Work",
    cards: [
      {
        index: "1",
        icon: "compress",
        title: "Graduated Compression",
        body: "Tighter at the ankle, easing up the calf. Supports circulation so legs feel fresher late in the day, or late in the game.",
      },
      {
        index: "2",
        icon: "shield",
        title: "Support Where It Counts",
        body: "Arch and ankle support built into the knit, with cushion in the heel and forefoot where impact lands.",
      },
      {
        index: "3",
        icon: "verified",
        title: "Made To Last The Season",
        body: "Performance fibers that hold their shape and compression wash after wash. Not a merch sock. A working sock in team colors.",
      },
    ],
  },

  preorderSteps: {
    eyebrow: "How Preorder Works",
    title: "Lock Yours In",
    shippingWindow: "[SHIP WINDOW: e.g. before kickoff, Week 1]",
    steps: [
      {
        label: "Step 1",
        icon: "shopping_cart",
        title: "Order Now",
        body: "Place your preorder for $34.99. Your pack is reserved from the first production run.",
      },
      {
        label: "Step 2",
        icon: "precision_manufacturing",
        title: "We Build The Run",
        body: "Production starts when preorder closes. You'll get email updates from order to ship.",
      },
      {
        label: "Step 3",
        icon: "local_shipping",
        title: "Wear It Game Day",
        body: "Packs ship [SHIP WINDOW]. In your hands for football season.",
      },
    ],
  },

  finalCta: {
    title: "Get The Pack",
    closingDate: "[DATE]",
    body: "Limited first run. Preorder closes [DATE]. Every pack pays the players.",
  },

  footer: {
    disclaimer:
      "© 2026 SickFit®. Athlete partnership powered by the KC-1400 Collective. This product is not affiliated with, sponsored by, or endorsed by Jackson State University. Preorder pricing is final and not eligible for discount codes or promotions.",
    tag: "SICKFIT × KC-1400 COLLECTIVE · FOOTBALL 2026",
  },
};

export const NEEDS_APPROVAL_NOTE =
  "Draft content pending final approval: athlete quotes, athlete social handles, shipping dates, preorder close date, product colorway names, product photography, athlete photography, partner logos.";
