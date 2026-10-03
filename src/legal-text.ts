/* The privacy policy and the terms of service, as structured text the legal
   pages render. Google's OAuth verification and Meta's App Review both read
   the privacy policy, so the Google and Meta sections must stay true to what
   the product does with their data. */

export type LegalSection = { heading: string; body: (string | string[])[] };
export type LegalDoc = { title: string; updated: string; intro: string[]; sections: LegalSection[] };

const CONTACT = "info@estationic.com";

export const PRIVACY: LegalDoc = {
  title: "Privacy policy",
  updated: "3 October 2026",
  intro: [
    `This policy explains what personal data Estationic ("we", "us") collects, why, how it is used and shared, and the choices you have. It covers our website at estationic.com and our software at app.estationic.com (together, "the service").`,
    "Estationic is software used by real estate developers, mandate firms and channel partners (our \"clients\") to run their marketing and sales. Some of the data in the service belongs to our clients and their buyers. Section 4 explains how we handle it.",
  ],
  sections: [
    {
      heading: "1. Data we collect about people who use the service",
      body: [
        "When you sign in or are invited to the service we collect:",
        [
          "Your name, work email address and profile picture, from the Google or Microsoft account you sign in with.",
          "Your mobile number, if you confirm it with a one-time code.",
          "The organisation you belong to, your role in it, and the actions you take in the service, which we keep in an audit log.",
          "Technical data such as your IP address, browser and device type, kept in server logs for security and troubleshooting.",
        ],
        "When you contact us or book a demo, we collect the details you give us, such as your name, email address, company and message.",
      ],
    },
    {
      heading: "2. Data from accounts you connect",
      body: [
        "You may connect accounts you own on other platforms so the service can publish and manage your advertising and messaging. We only access these accounts after you grant permission on the platform's own consent screen, and only for the purposes below.",
        [
          "Meta (Facebook Pages, Instagram accounts, ad accounts and WhatsApp Business numbers): to publish posts and ads you approve, create lead forms on your Page, read the leads those forms collect, read the spend and results of ads made through the service, send WhatsApp messages from your own number, and report the outcomes of leads back to Meta when the buyer has agreed to it.",
          "Google (Google Ads accounts, YouTube channels and Business Profile locations): to create and manage campaigns you approve, upload a video ad to your YouTube channel when you publish one, read the spend, clicks and leads of campaigns made through the service, and report the outcomes of leads back to Google when the buyer has agreed to it.",
          "Your CRM (LeadSquared, LeadRat or Sell.Do) and your Razorpay account: to keep leads, visits and bookings in step with your CRM, and to create token payment links on your own account.",
        ],
        "Access tokens for these accounts are encrypted before they are stored, separately for each organisation. You can disconnect an account at any time in Settings, Connected accounts, and you can also remove our access from the platform's own settings.",
      ],
    },
    {
      heading: "3. Google user data and the Limited Use requirements",
      body: [
        "Estationic's use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
        "Specifically, data we receive from Google APIs:",
        [
          "is used only to provide the features you can see in the service: publishing and managing your campaigns, uploading your video ads, and showing you their results;",
          "is not sold, and is not used or transferred for advertising, credit-worthiness or any purpose unrelated to those features;",
          "is not used to develop, improve or train generalised artificial intelligence or machine learning models;",
          "is not read by our staff, except with your permission for a specific item, when needed for security or to comply with the law, or when it has been aggregated and anonymised for internal operations.",
        ],
      ],
    },
    {
      heading: "4. Data our clients put into the service",
      body: [
        "Our clients use the service to handle data about home buyers and other people they deal with, such as names, phone numbers, enquiries, call recordings and transcripts, WhatsApp messages, site visits and bookings. For this data, our client decides why and how it is processed, and we process it on their behalf and on their instructions. If you are a buyer and want to exercise your rights over this data, please contact the developer or firm you dealt with; we will help them respond.",
        "The service masks buyers' phone numbers on screen by default, records who reveals one, and never writes a buyer's number into its audit log.",
        "When a client uses our AI calling agent, calls are recorded and transcribed so the client can see what was said. Buyers who ask not to be called again are not called again.",
      ],
    },
    {
      heading: "5. How we use data",
      body: [
        [
          "To provide, secure and support the service.",
          "To carry out the actions you or your organisation ask for, such as publishing an approved post or calling a lead.",
          "To bill organisations for their plan and usage.",
          "To send you service messages, such as invitations, sign-in codes and alerts.",
          "To meet legal obligations, such as tax records and responses to lawful requests.",
        ],
        "We do not sell personal data, and we do not use it to show you advertising.",
      ],
    },
    {
      heading: "6. Who we share data with",
      body: [
        "We share data only with service providers that help us run the service, under contracts that restrict their use of it, and only as much as each needs:",
        [
          "Hosting and storage: Amazon Web Services (database, file storage and email, in Mumbai) and Vercel (application hosting).",
          "AI and voice: OpenAI (writing, image and reading), Sarvam AI (calling agent, speech), Vobiz (telephony), ElevenLabs (voice correction), and Higgsfield and OpenRouter (video generation).",
          "Messaging and payments: Meta (WhatsApp) and Razorpay.",
          "Caching: Redis Cloud, for short-lived chat memory in Ask Jimmy.",
        ],
        "Some of these providers process data outside India. We also share data when the law requires it, or with a buyer of our business, who would be bound by this policy.",
      ],
    },
    {
      heading: "7. How long we keep data",
      body: [
        "We keep account and client data for as long as the organisation uses the service, and delete it within 90 days after the organisation leaves, unless the law requires us to keep it longer (for example, invoices for eight years). Ask Jimmy chats are deleted 30 days after their last message. Voice notes from site visits are deleted twelve months after the lead is closed. Audit records are kept for a fixed period and then deleted.",
        "When a person's account is erased, we remove their name, email address, picture and phone number, and keep only an anonymous identifier so records that refer to it still make sense.",
      ],
    },
    {
      heading: "8. Security",
      body: [
        "Each organisation's data is kept apart from every other organisation's by the database itself. Connection tokens are encrypted per organisation. Files are kept in private storage and shared only through links that expire after a few minutes. Access inside an organisation follows the roles its administrators set.",
      ],
    },
    {
      heading: "9. Your rights",
      body: [
        "Under India's Digital Personal Data Protection Act, 2023, you may ask us to access, correct, update or erase your personal data, withdraw consent you gave us, and nominate someone to exercise these rights for you. Write to us at the address below and we will respond within the time the law allows.",
      ],
    },
    {
      heading: "10. Deleting data from Meta and Google connections",
      body: [
        `If you remove Estationic from your Facebook account, or ask Meta to delete the data we received, we delete the connection and its tokens, and you can check the status of the request at app.estationic.com/connect/deletion. To remove our access to your Google account, use myaccount.google.com/permissions or disconnect it in the service. To ask for any other deletion, email ${CONTACT}.`,
      ],
    },
    {
      heading: "11. Cookies",
      body: [
        "The service uses cookies that are necessary for signing in and keeping you signed in, and for protecting connections to other platforms. Our website does not use advertising cookies.",
      ],
    },
    {
      heading: "12. Children",
      body: ["The service is for businesses and is not meant for anyone under 18. We do not knowingly collect data about children."],
    },
    {
      heading: "13. Changes to this policy",
      body: [
        "We will update this page when our practices change, and change the date at the top. If a change is significant, we will tell administrators of organisations that use the service before it takes effect.",
      ],
    },
    {
      heading: "14. Contact and grievances",
      body: [
        `For any question, request or complaint about your personal data, email our grievance officer at ${CONTACT}. If you are not satisfied with our answer, you may complain to the Data Protection Board of India.`,
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: "Terms of service",
  updated: "3 October 2026",
  intro: [
    `These terms govern the use of Estationic's website at estationic.com and software at app.estationic.com ("the service"). By using the service, or by signing an order with us, you agree to them on behalf of the organisation you represent ("you"). If you do not agree, do not use the service.`,
  ],
  sections: [
    {
      heading: "1. The service",
      body: [
        "Estationic is software for real estate developers, mandate firms and channel partners. It helps them prepare and publish advertising, manage leads, call and message buyers, book site visits and track bookings. Features and limits depend on your plan, as set out in your order and on our pricing page.",
      ],
    },
    {
      heading: "2. Accounts",
      body: [
        [
          "You must give accurate information when you sign up and keep it up to date.",
          "You are responsible for the people you invite, the roles you give them, and everything done under your organisation's accounts.",
          `Keep sign-in details secure and tell us at once at ${"info@estationic.com"} if you suspect misuse.`,
        ],
      ],
    },
    {
      heading: "3. Your responsibilities",
      body: [
        "You remain responsible for your projects, your advertising and how you deal with buyers. In particular, you agree that:",
        [
          "your projects and advertisements comply with the Real Estate (Regulation and Development) Act, 2016, your state authority's rules, and every other law that applies, and the registration details, prices and facts you record and approve in the service are true and current;",
          "you have the right to use every picture, logo and document you upload;",
          "you have a lawful basis, including consent where the law requires it, to contact the buyers you call or message through the service, and you honour their requests to stop;",
          "you follow the terms of every platform you connect, including Meta's and Google's advertising policies and WhatsApp's business policies;",
          "you will not use the service for spam, fraud, misleading claims, or anything unlawful.",
        ],
      ],
    },
    {
      heading: "4. AI-generated content",
      body: [
        "The service uses artificial intelligence to write copy, design posts and videos, and speak with buyers. It checks generated content against the facts you approved, but AI can make mistakes. You must review content before you approve it for publishing, and you are responsible for what you approve. If you choose to let the service publish automatically, you accept that responsibility in advance.",
      ],
    },
    {
      heading: "5. Connected platforms",
      body: [
        "When you connect Meta, Google, a CRM, Razorpay or another platform, you authorise us to act on that account as described in our privacy policy. Those platforms are run by others; their availability, review decisions, charges and policies are outside our control. Advertising spend and messaging charges are billed to you by the platform unless your order says otherwise.",
      ],
    },
    {
      heading: "6. Fees and payment",
      body: [
        "Fees are set out in your order and are exclusive of GST. Plans are billed per active project per month. Top-ups are prepaid and expire twelve months after purchase. Unless your order says otherwise, fees are payable in advance and are not refundable, except where the law requires or we agree in writing. We may suspend the service if fees remain unpaid fifteen days after we notify you.",
      ],
    },
    {
      heading: "7. Your data",
      body: [
        "You own the data you and your buyers put into the service. You grant us the right to process it only to provide and support the service, as described in our privacy policy. You can export your data while your account is active, and we delete it after you leave as the privacy policy describes.",
      ],
    },
    {
      heading: "8. Our property",
      body: [
        "The service, its software, design and documentation belong to Estationic. We grant you a non-exclusive, non-transferable right to use the service during your subscription for your own business. You may not copy, resell, reverse engineer or build a competing product from it. If you send us suggestions, we may use them freely.",
      ],
    },
    {
      heading: "9. Confidentiality",
      body: [
        "Each of us will keep the other's non-public information confidential, use it only for the purpose of these terms, and protect it with reasonable care.",
      ],
    },
    {
      heading: "10. Availability and changes",
      body: [
        "We work to keep the service available and secure, but we do not promise it will be uninterrupted or error free. We may change features over time; we will not materially reduce the core features of a plan you have paid for during its term.",
      ],
    },
    {
      heading: "11. Disclaimer",
      body: [
        "Except as expressly stated in these terms, the service is provided as is. We do not guarantee any number of leads, site visits or bookings, any advertising result, or that a platform will approve your content.",
      ],
    },
    {
      heading: "12. Limitation of liability",
      body: [
        "Neither of us is liable for indirect or consequential loss, or loss of profit, revenue or goodwill. Our total liability arising from these terms in any twelve months is limited to the fees you paid us in those twelve months. These limits do not apply to fraud, or where the law does not allow them.",
      ],
    },
    {
      heading: "13. Indemnity",
      body: [
        "You will compensate us for any claim, fine or loss arising from content you approved, data you supplied without the right to do so, or your breach of section 3.",
      ],
    },
    {
      heading: "14. Suspension and termination",
      body: [
        "You may stop using the service at the end of any paid period. We may suspend or end access if you seriously breach these terms, if required by law, or if your use puts other clients or the service at risk. On termination, your right to use the service ends and we handle your data as the privacy policy describes.",
      ],
    },
    {
      heading: "15. Governing law",
      body: [
        "These terms are governed by the laws of India. The courts of Maharashtra have exclusive jurisdiction over any dispute arising from them.",
      ],
    },
    {
      heading: "16. Changes to these terms",
      body: [
        "We may update these terms and will change the date at the top. If a change is significant, we will tell your administrators before it takes effect. Continuing to use the service after that means you accept the new terms.",
      ],
    },
    {
      heading: "17. Contact",
      body: [`Questions about these terms: ${CONTACT}.`],
    },
  ],
};
