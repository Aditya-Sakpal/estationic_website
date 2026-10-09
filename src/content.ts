/*
 * Every word on the page lives here, so copy changes never touch layout code.
 *
 * Money is always written the Indian way (Rs 64,999, Rs 1,29,999), never in
 * dollars.
 *
 * Compliance copy says "RERA" and never names one state: state rules are
 * added as the product grows, and the site must not age with them.
 */

export const LINKS = {
  demo: "https://cal.com/estationic/demo",
  email: "info@estationic.com",
  // opens a Gmail draft addressed to us, in a new tab
  compose: "https://mail.google.com/mail/?view=cm&fs=1&to=info%40estationic.com&su=Estationic%20enquiry",
};

export const NAV = [
  { label: "Marketing", href: "#marketing" },
  { label: "Sales", href: "#sales" },
  { label: "Autopilot", href: "#autopilot" },
  { label: "Compliance", href: "#compliance" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const HERO = {
  title: ["Ads that comply.", "Leads that book."],
  sub: "Estationic runs your real estate sales and marketing on autopilot: compliant ads, an auto budget allocator, an AI caller that qualifies every lead and hands over to your team, and WhatsApp follow-ups through the site visit to the booking.",
  primary: "Book a demo",
  secondary: "See how it works",
};

/* Clients, as monochrome marks cut from their own sites (public/clients).
   Heights are set per mark so a wide wordmark and a square badge carry the
   same visual weight. */
export const LOGOS_LABEL = "Trusted by teams across real estate";
export const CLIENTS = [
  { name: "Betterrwalls", src: "/clients/betterrwalls.png", height: 30 },
  { name: "Goldmark Developers", src: "/clients/goldmark.png", height: 36 },
  { name: "Subhadra Estates", src: "/clients/subhadra.png", height: 50 },
  { name: "House of Media", src: "/clients/house-of-media.png", height: 38, wordmark: "House of Media" },
];

export const MARKETING = {
  title: ["Marketing on autopilot,", "compliant by default"],
  body: "Estationic makes your posts and ads from approved material, checks them against the RERA rules, runs them on Meta and Google, and moves budget to the campaigns that bring buyers.",
  tabs: [
    {
      key: "create",
      title: "Posts and ads, made for you",
      body: "Posts, carousels, reels and ads in nine languages, built from your approved renders and prices.",
    },
    {
      key: "publish",
      title: "Published and managed",
      body: "Ads run from your own Meta and Google accounts, launched, paused and refreshed for you.",
    },
    {
      key: "budget",
      title: "Auto budget allocator",
      body: "Spend moves every day to the campaigns that bring site visits and bookings, not just clicks.",
    },
    {
      key: "capture",
      title: "Every lead in one place",
      body: "Leads from ads, forms, portals, WhatsApp and calls land in one queue, ready for the first call.",
    },
  ],
};

export const SALES = {
  title: ["Sales on autopilot,", "from first call to booking"],
  body: "The moment a lead arrives, Estationic calls, qualifies and follows up, books the site visit and keeps going until the flat is booked. Your team steps in when it matters.",
  steps: [
    {
      title: "An AI call within a minute",
      body: "An AI caller rings every new lead in their own language, while the enquiry is still fresh.",
    },
    {
      title: "Qualified, and handed to your team",
      body: "Budget, configuration and timeline are captured on the call. Buyers who want a person reach your team with the whole conversation.",
    },
    {
      title: "Follow-ups on WhatsApp",
      body: "Timely follow-ups, brochures and answers on WhatsApp, so no lead goes quiet.",
    },
    {
      title: "Site visit booked",
      body: "A slot is booked, the location is sent a day before, and a reminder goes out on the day.",
    },
    {
      title: "After the visit, to the booking",
      body: "Follow-ups continue after the visit until the booking is done. No-shows are called back and rebooked.",
    },
    {
      title: "Nurtured until ready",
      body: "Leads who are not ready yet are kept warm with the right updates until they are.",
    },
  ],
};

export const CONTROL = {
  title: ["Autopilot where it helps,", "your team where it matters"],
  body: "Choose what runs on its own. Everything the AI does is logged with its reason, and anything it is not trusted to do waits for a person.",
  columns: [
    {
      key: "auto",
      title: "Runs on its own",
      items: [
        "The first call and the first WhatsApp reply",
        "Qualification and follow-ups",
        "Site visit location and reminders",
        "No-show recovery and nurturing",
        "Budget shifts within your limits",
      ],
    },
    {
      key: "approve",
      title: "Waits for your approval",
      items: [
        "New posts and ads",
        "Price quotes and offers",
        "Budget changes beyond your limits",
        "Any new claim about a project",
      ],
    },
    {
      key: "team",
      title: "Your team owns",
      items: ["Hosting the site visit", "Negotiation and closing", "Conversations the AI hands over"],
    },
  ],
};

export const COMPLIANCE = {
  title: ["Compliance built into", "every ad and every call"],
  body: "RERA registration, approved claims and consent are checked by the system itself, before anything reaches a buyer.",
  items: [
    {
      title: "Registration checked first",
      body: "No ad goes out for a project that is not registered with its state RERA. A lapsed or revoked registration stops its own ads.",
    },
    {
      title: "Only approved claims",
      body: "Prices, possession dates and amenities appear only if your team approved them. Copy that invents one is refused before anyone sees it.",
    },
    {
      title: "Approved pictures only",
      body: "Every render and photograph carries a named approval. Replace the file and it needs approving again.",
    },
    {
      title: "Registration on every creative",
      body: "The RERA number, QR code and the authority's website go on every post, placed and sized the way the rules ask.",
    },
    {
      title: "Consent and calling hours",
      body: "Calls and WhatsApp messages go out only with consent, never to numbers on DND, and only within calling hours.",
    },
    {
      title: "A record of every decision",
      body: "Who approved what, and what each ad and call was checked against, is kept in a log nobody can edit.",
    },
  ],
};

export const STATS = {
  title: "Built for teams that sell by the book",
  items: [
    { value: 10000, suffix: "+", label: "calls made" },
    { value: 1000, suffix: "+", label: "site visits booked" },
    { value: 1000, suffix: "+", label: "ads run" },
    { value: 10, suffix: "+", label: "projects delivered" },
  ],
};

export const INTEGRATIONS = {
  title: ["Works with the tools", "your team already uses"],
  body: "Ads run from your own Meta and Google accounts, conversations happen on WhatsApp, and your CRM stays the record.",
};

/* Two lists. A developer or a mandate firm pays per project, per month,
   before GST; users and the channel partners on its projects are never
   charged for. A channel partner works many developers' projects at once, so
   it pays one price a month for the whole firm (decided 6 October 2026). */
export const PRICING = {
  title: ["Priced per project,", "never per seat"],
  body: "One monthly price for each project, plus GST. Every plan includes unlimited users, and channel partners working your projects are free.",
  tabs: { project: "Developers and mandate firms", partner: "Channel partners" },
  plans: [
    {
      name: "Launch",
      blurb: "For a single tower, up to about 500 leads a month.",
      price: "Rs 64,999",
      period: "per project a month, plus GST",
      popular: false,
      features: [
        "Lead Qualifier and Visit Confirmer agents",
        "1,500 AI call minutes",
        "3 calling channels",
        "40 image posts, 8 carousels, 5 videos",
        "1 phone number",
        "2 AI voices",
        "Unlimited users; channel partners free",
      ],
    },
    {
      name: "Growth",
      blurb: "For a busy launch, up to about 1,300 leads a month.",
      price: "Rs 1,29,999",
      period: "per project a month, plus GST",
      popular: true,
      features: [
        "Everything in Launch, plus the Re-engager and Post-visit Follow-up agents",
        "4,000 AI call minutes",
        "6 calling channels",
        "100 image posts, 20 carousels, 10 videos",
        "2 phone numbers",
        "3 AI voices",
        "Unlimited users; channel partners free",
      ],
    },
    {
      name: "Scale",
      blurb: "For a township, up to about 2,200 leads a month.",
      price: "Rs 1,99,999",
      period: "per project a month, plus GST",
      popular: false,
      features: [
        "All 6 agents, including the Inbound Receptionist and CP Desk",
        "6,500 AI call minutes",
        "10 calling channels",
        "200 image posts, 40 carousels, 15 videos",
        "2 phone numbers",
        "All 4 AI voices",
        "Unlimited users; channel partners free",
      ],
    },
  ],
  terms: [
    { title: "Setup", body: "Rs 49,999 for your first project, Rs 14,999 for each one after." },
    { title: "30-day pilot", body: "Rs 29,999, adjusted against the setup fee when you sign." },
    { title: "Pay yearly", body: "Pay for 10 months and get 12." },
    { title: "More projects", body: "10% off from 3 projects. 20% off from 5, with minutes and posts pooled across them." },
  ],
  topupsTitle: "Top-ups, prepaid",
  topups: [
    { item: "1,000 AI call minutes", price: "Rs 10,000" },
    { item: "5,000 AI call minutes, by bank transfer", price: "Rs 45,000" },
    { item: "10,000 AI call minutes, on Scale, by bank transfer", price: "Rs 80,000" },
    { item: "Image post", price: "Rs 49" },
    { item: "Carousel", price: "Rs 149" },
    { item: "Extra carousel slide", price: "Rs 59" },
    { item: "Video, any kind", price: "Rs 5,499" },
    { item: "Extra calling channel", price: "Rs 999 / month" },
    { item: "Extra agent on Launch", price: "Rs 4,999 / month" },
    { item: "Extra phone number", price: "Rs 999 / month" },
    { item: "WhatsApp messages", price: "Meta's price + 15%" },
  ],
  fine: [
    "Included minutes reset every month. Top-ups last 12 months.",
    "Usage is prepaid, with a heads-up when you reach 80%.",
    "Calls go out between 10 am and 9 pm. A lead we cannot reach is tried up to 3 times a day for 3 days.",
    "You only pay for posts that pass the checks.",
  ],
  partner: {
    title: ["One plan for your firm,", "every project included"],
    body: "One monthly price for your whole firm, plus GST, however many developers and projects you sell for. Every plan includes unlimited users.",
    plans: [
      {
        name: "Solo",
        blurb: "For a broker or a small team selling up to 5 projects.",
        price: "Rs 24,999",
        period: "per firm a month, plus GST",
        popular: false,
        features: [
          "Lead Qualifier and Visit Confirmer agents",
          "400 AI call minutes",
          "2 calling channels",
          "20 image posts, 4 carousels, 1 video",
          "1 phone number",
          "Up to 5 projects at once",
          "2 AI voices",
          "Unlimited users",
        ],
      },
      {
        name: "Team",
        blurb: "For a growing firm selling up to 15 projects.",
        price: "Rs 59,999",
        period: "per firm a month, plus GST",
        popular: true,
        features: [
          "Everything in Solo, plus the Re-engager and Post-visit Follow-up agents",
          "1,200 AI call minutes",
          "4 calling channels",
          "60 image posts, 12 carousels, 3 videos",
          "1 phone number",
          "Up to 15 projects at once",
          "3 AI voices",
          "Unlimited users",
        ],
      },
      {
        name: "Firm",
        blurb: "For a large firm selling up to 30 projects.",
        price: "Rs 1,29,999",
        period: "per firm a month, plus GST",
        popular: false,
        features: [
          "Every agent, including the Inbound Receptionist",
          "3,500 AI call minutes",
          "8 calling channels",
          "150 image posts, 30 carousels, 7 videos",
          "2 phone numbers",
          "Up to 30 projects at once",
          "All 4 AI voices",
          "Unlimited users",
        ],
      },
    ],
    terms: [
      { title: "Setup", body: "Rs 14,999, once for your firm." },
      { title: "Every developer", body: "Register buyers, share your links and co-branded posts, and track brokerage with every developer you sell for." },
      { title: "Pay yearly", body: "Pay for 10 months and get 12." },
      { title: "On a developer's desk", body: "Working a developer's project through their WhatsApp stays free. The plan is for running your own leads, calls and ads." },
    ],
  },
};

export const FAQ = {
  title: ["Your questions", "answered"],
  body: "Quick answers about running sales and marketing with Estationic.",
  items: [
    {
      q: "Does Estationic replace our CRM?",
      a: "No. It works beside Sell.Do, LeadRat or whichever CRM you run. Your CRM stays the record; Estationic does the work your team has no time for.",
    },
    {
      q: "Does the AI caller replace our sales team?",
      a: "No. It makes the first call within a minute, qualifies the buyer and books the visit. When a buyer asks for a person, or a deal needs negotiating, it hands over to your team with the whole conversation.",
    },
    {
      q: "How does it keep our advertising compliant?",
      a: "Every project is checked against its RERA registration before anything is advertised, and every ad is checked against the facts your team approved. A project that is not registered cannot be advertised at all.",
    },
    {
      q: "Which states do you cover?",
      a: "RERA rules differ by state, and we add each state's rules as we grow. Tell us where you build and we will show you what is covered today.",
    },
    {
      q: "Which languages does it speak and write in?",
      a: "Calls and messages reach buyers in their own language, and creatives are written in English, Hinglish, Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada and Bengali.",
    },
    {
      q: "Will it post or spend without our approval?",
      a: "Only if you let it. You choose what runs on autopilot: new creatives can wait for your approval, and budget only moves within the limits you set.",
    },
    {
      q: "Can the AI caller sound like our brand?",
      a: "Launch includes two voices, Growth a third and Scale all four, men's and women's. Rename any of them to match your team, for free.",
    },
    {
      q: "We are a channel partner. How are we charged?",
      a: "One monthly price for your whole firm, never per project or per developer. Solo covers up to 5 projects at once, Team 15 and Firm 30. Working a developer's project through their WhatsApp stays free.",
    },
    {
      q: "What is a calling channel?",
      a: "A channel is one call happening at a time. More channels let the AI reach more leads at once when your ads are busy, and channels are shared by all your agents so none sit idle.",
    },
    {
      q: "Is our data secure?",
      a: "Each developer's data is isolated inside the database itself, sign-in uses your company Google or Microsoft account, and every action is kept in a log nobody can edit.",
    },
  ],
};

export const CTA = {
  title: ["Put your next launch", "on autopilot"],
  primary: "Book a demo",
  secondary: "Email us",
};

export const FOOTER = {
  blurb: "The AI sales and marketing autopilot for real estate developers.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Marketing", href: "#marketing" },
        { label: "Sales", href: "#sales" },
  { label: "Autopilot", href: "#autopilot" },
        { label: "Compliance", href: "#compliance" },
        { label: "Integrations", href: "#integrations" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ],
  talk: {
    title: "Talk to us",
    body: "See Estationic on one of your own projects.",
  },
};
