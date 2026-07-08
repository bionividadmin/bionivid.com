// MOCK DATA for Bionivid Technology Website
// This file centralizes all mocked data — will be replaced with backend calls later

export const SITE = {
  name: "Bionivid",
  tagline: "Your Trusted Research Partner",
  since: "2011",
  email: "info@bionivid.com",
  phone: "+91 953 5619 191",
  address: "3rd Floor, Saanvi Complex, 28, Kattigenahalli, Bengaluru, Karnataka 560064",
  socials: {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  nivilabsUrl: "https://nivilabs.bionivid.com",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Publications", to: "/publications" },
  { label: "Genomics Services", to: "/genomics-services" },
  { label: "Genomics Solutions", to: "/genomics-solutions" },
  {
    label: "The Genome Education",
    to: "/education",
    children: [
      { label: "Dissertation Programme", to: "/education#dissertation" },
      { label: "Industrial Training", to: "/education#industrial" },
      { label: "Workshops", to: "/education#workshops" },
      { label: "Internships", to: "/education#internships" },
    ],
  },
  { label: "Contact Us", to: "/contact" },
];

export const HERO_SLIDES = [
  {
    eyebrow: "Your Trusted Research Partner — Since 2011",
    titleTop: "Advancing",
    titleAccent: "Genomics",
    titleBottom: "through Data & Innovation",
    body: "We deliver advanced genomics solutions and bioinformatics expertise to accelerate research and drive innovation.",
    image: "https://images.pexels.com/photos/8532830/pexels-photo-8532830.jpeg",
    ctas: [
      { label: "Company Profile", to: "/about", primary: true },
      { label: "Google Scholar", href: "https://scholar.google.com/scholar?hl=en&q=Bionivid", primary: false },
    ],
  },
  {
    eyebrow: "NGS Data Analytics",
    titleTop: "Precision",
    titleAccent: "Bioinformatics",
    titleBottom: "for Modern Research",
    body: "From wet lab to insight — end-to-end genomics powered by SQIT, Genome Station and GStack.",
    image: "https://images.pexels.com/photos/8533023/pexels-photo-8533023.jpeg",
    ctas: [
      { label: "Explore Solutions", to: "/genomics-solutions", primary: true },
      { label: "Talk to Experts", to: "/contact", primary: false },
    ],
  },
  {
    eyebrow: "Powered by NiviLabs",
    titleTop: "Cloud Genomics",
    titleAccent: "Made Simple",
    titleBottom: "— Anywhere, Anytime",
    body: "NiviLabs — our cloud-based genomics analytics platform for storage, sharing and collaborative analysis.",
    image: "https://images.pexels.com/photos/25626587/pexels-photo-25626587.jpeg",
    ctas: [
      { label: "Visit NiviLabs", href: "https://nivilabs.bionivid.com", primary: true },
      { label: "Learn More", to: "/genomics-solutions", primary: false },
    ],
  },
];

export const STATS = [
  { value: "250+", label: "Publications", icon: "BookOpen" },
  { value: "5,000+", label: "Projects Executed", icon: "ClipboardList" },
  { value: "15,000+", label: "Samples Processed", icon: "TestTube2" },
  { value: "50+", label: "Solutions Offered", icon: "Lightbulb" },
];

export const SERVICES = [
  {
    slug: "genomics-services",
    title: "Genomics Services",
    icon: "Dna",
    short: "Comprehensive NGS data analysis, wet lab and bioinformatics solutions.",
  },
  {
    slug: "bioinformatics",
    title: "Bioinformatics Analysis",
    icon: "BarChart3",
    short: "Advanced data analysis, custom pipelines and insights that drive discovery.",
  },
  {
    slug: "research-collaboration",
    title: "Research Collaboration",
    icon: "Users",
    short: "Expert support for research, publications and scientific consulting.",
  },
  {
    slug: "genome-education",
    title: "The Genome Education",
    icon: "GraduationCap",
    short: "Bridging the gap between science and society through training and outreach.",
  },
];

export const SOLUTIONS = [
  {
    slug: "genome-station",
    title: "Genome Station",
    tagline: "On-Premise Bioinformatics Workstation",
    image: "https://images.pexels.com/photos/9243559/pexels-photo-9243559.jpeg",
    features: [
      "Pre-installed with state-of-the-art bioinformatics tools & pipelines",
      "End-to-end analysis solution for NGS, Microbiome, Metagenomics, Transcriptomics & more",
      "High performance computing with secure local storage & data management",
      "User-friendly interface with automated workflows & reporting",
      "Ideal for research labs seeking data security, speed & reliability",
      "On-site installation, training & technical support",
    ],
    description:
      "A dedicated workstation for NGS data analysis with a proprietary user interface, pre-installed tools and 24×7 technical support.",
  },
  {
    slug: "gstack",
    title: "GStack",
    tagline: "Cloud Genomics Platform",
    image: "https://images.pexels.com/photos/7693222/pexels-photo-7693222.jpeg",
    features: [
      "A cloud-based platform for genomics data storage, sharing & collaboration",
      "Built-in data management with secure access control & backup",
      "Collaborate in real-time across projects & teams",
      "Scalable storage & high-speed computing on cloud infrastructure",
      "Accessible anytime, anywhere with complete data security",
      "Subscription-based or custom enterprise solutions",
    ],
    description:
      "Specialized cloud storage platform to organize, store, retrieve and share NGS data securely with advanced analytics and collaboration tools.",
  },
  {
    slug: "sqit",
    title: "SQIT (Workbench)",
    tagline: "CLI-Powered NGS Workbench",
    image: "https://images.pexels.com/photos/6248959/pexels-photo-6248959.jpeg",
    features: [
      "Specialized & optimized platform for CLI-based NGS data analysis",
      "Integrated workflows for Microbiome, RNA-Seq, WES, WGS & more",
      "Automated QC, alignment, variant calling & annotation",
      "Customizable pipelines & modular analysis",
      "High-performance computing with resource monitoring",
      "Designed for researchers, by researchers",
    ],
    description:
      "SQIT (Workbench) is a specialized and optimized platform developed for performing CLU-based Next-Generation Sequencing data analysis.",
  },
];

export const TECH_PLATFORMS = [
  { name: "Illumina", type: "Short Read Sequencing", image: "https://images.pexels.com/photos/9243559/pexels-photo-9243559.jpeg" },
  { name: "PacBio", type: "Long Read Sequencing", image: "https://images.pexels.com/photos/8533087/pexels-photo-8533087.jpeg" },
  { name: "Nanopore", type: "Long Read Sequencing", image: "https://images.pexels.com/photos/13014236/pexels-photo-13014236.jpeg" },
];

export const OMICS_CATEGORIES = [
  {
    title: "GENOME",
    icon: "Dna",
    items: [
      "Whole Genome Sequencing",
      "Whole Exome / Targeted Sequencing",
      "Genome Finishing (Hi-C / Bionano)",
      "Genotyping By Seq (GBS)",
      "Single Cell Genomics",
      "Exosomal DNA / cfDNA-Seq",
    ],
  },
  {
    title: "MICROBIOME",
    icon: "Microscope",
    items: [
      "Amplicon — 16S/ITS",
      "MID — Sanger",
      "Metatranscriptome",
      "Shotgun Metagenome",
      "Metavirome",
    ],
  },
  {
    title: "EPIGENOME",
    icon: "ShieldCheck",
    items: [
      "Bisulfite (WGBS / RRBS)",
      "ChIP / MeDIP Seq",
      "ATAC — Seq",
      "Hi-C Proximity Ligation",
      "Single-cell ATAC",
      "Single-cell Multiomics",
    ],
  },
  {
    title: "TRANSCRIPTOME",
    icon: "Activity",
    items: [
      "Whole Transcriptome",
      "Small RNA Profiling",
      "Degradome Profiling",
      "Exosomal RNA-seq",
      "Single-cell RNA-Seq",
    ],
  },
];

export const VALUES = [
  { title: "Teamwork", icon: "Handshake", body: "We believe in collaboration, respect and collective growth." },
  { title: "Leadership", icon: "Trophy", body: "We lead by example with vision, integrity and purpose." },
  { title: "Customer Oriented", icon: "Users", body: "We focus on understanding and exceeding customer expectations." },
  { title: "Quality Excellence", icon: "BadgeCheck", body: "We are committed to delivering high quality, every single time." },
];

export const LEADERSHIP = [
  {
    name: "Rohit Shukla",
    role: "CEO & Founder",
    photo: "https://images.pexels.com/photos/5945799/pexels-photo-5945799.jpeg",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Roli Budhwar, Ph.D.",
    role: "COO & Co-founder",
    photo: "https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Vinita Menon",
    role: "Director",
    photo: "https://images.pexels.com/photos/8532830/pexels-photo-8532830.jpeg",
    linkedin: "https://linkedin.com",
  },
];

export const LIFE_AT_BIONIVID = [
  { label: "Collaborative Culture", image: "https://images.pexels.com/photos/5945799/pexels-photo-5945799.jpeg" },
  { label: "Continuous Learning", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655" },
  { label: "Research Excellence", image: "https://images.pexels.com/photos/8533087/pexels-photo-8533087.jpeg" },
  { label: "Team Events", image: "https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg" },
];

export const CLIENTS = [
  { name: "BARC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/BARC_Logo.svg/200px-BARC_Logo.svg.png" },
  { name: "DBT", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Emblem_of_India.svg/200px-Emblem_of_India.svg.png" },
  { name: "DST", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Emblem_of_India.svg/200px-Emblem_of_India.svg.png" },
  { name: "ICAR", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Indian_Council_of_Agricultural_Research_Logo.svg/200px-Indian_Council_of_Agricultural_Research_Logo.svg.png" },
  { name: "ICMR", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Icmr-logo.png/200px-Icmr-logo.png" },
  { name: "IISc", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/IISc_Seal.svg/200px-IISc_Seal.svg.png" },
  { name: "NCCS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Emblem_of_India.svg/200px-Emblem_of_India.svg.png" },
  { name: "IARI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Indian_Council_of_Agricultural_Research_Logo.svg/200px-Indian_Council_of_Agricultural_Research_Logo.svg.png" },
];

export const TESTIMONIALS = [
  {
    quote: "Bionivid's expertise in genomics and bioinformatics has been instrumental in the success of our research projects. Their professionalism and support are truly exceptional.",
    name: "Dr. Ramesh Kumar",
    role: "Research Scientist",
  },
  {
    quote: "The team is highly professional and their support in data analysis and publication is truly exceptional.",
    name: "Dr. Neha Sharma",
    role: "Postdoctoral Researcher",
  },
  {
    quote: "Hands-on training and workshops from Bionivid helped our students gain real-world research experience.",
    name: "Prof. Anil Verma",
    role: "Head of Department",
  },
  {
    quote: "An exceptional research partner — the SQIT platform and their bioinformatics pipelines saved us months of analysis time.",
    name: "Dr. Padma Shastry",
    role: "Principal Scientist, NCCS",
  },
  {
    quote: "Reliable, timely and scientifically sound. Bionivid consistently delivers publication-grade insights.",
    name: "Dr. Shailendra Goel",
    role: "University of Delhi",
  },
];

export const PUBLICATIONS = [
  { year: 2026, title: "Insight into the reproductive performance of Murrah bufaloes based on RNA sequencing analysis", publisher: "Frontiers", link: "#" },
  { year: 2026, title: "Population structure and genetic diversity of Fusarium species on solanaceous crops in the North-Western Himalayas", publisher: "Springer", link: "#" },
  { year: 2026, title: "Genomic insights into Exiguobacterium indicum VIT-2023: a dual-function PGPR with potential for plant health protection and plastic biodegradation", publisher: "Taylor & Francis", link: "#" },
  { year: 2025, title: "Genomic characterization of host gene alterations in Theileria annulata-transformed leukocytes", publisher: "Nature", link: "#" },
  { year: 2025, title: "Modern Approaches in Genetic Toxicology Research: Insights from Next-Generation-Based RNA Sequencing", publisher: "Springer", link: "#" },
  { year: 2025, title: "Characterization of an entomopathogenic fungi, Aspergillus sp. R55 as a biocontrol agent against invasive rugose spiralling whitefly infesting oil palm in India", publisher: "Springer", link: "#" },
  { year: 2025, title: "First pathogenomic insights into Ganoderma ellipsoideum as an emerging causal agent of basal stem rot in oil palm", publisher: "Nature", link: "#" },
  { year: 2025, title: "First identification of Curvularia xishuangbannaensis Tibpromma & K.D. Hyde, sp. nov as a causal agent of leaf spot in oil palm nurseries and evaluation of fungicidal efficacy", publisher: "Society for Promotion of Horticulture (SPH)", link: "#" },
  { year: 2025, title: "Clinical Pattern and Therapeutic Approaches in Dairy Cattle Affected with Foot and Mouth Disease Virus (FMDV) Serotype O/2021-22 during an Outbreak in Kashmir, India", publisher: "Indian Journal of Animal Research", link: "#" },
  { year: 2025, title: "Analysis of antimicrobial potential and functional perspectives of marine macroalgal epiphytic microbiomes from Visakhapatnam coast of Bay of Bengal, India", publisher: "Taylor & Francis", link: "#" },
  { year: 2024, title: "A Draft Transcriptome Announcement of Aquilaria malaccensis", publisher: "Sciendo", link: "#" },
  { year: 2024, title: "Characterization of a novel root associated diazotrophic rare PGPR from Arunachal Pradesh", publisher: "Springer Nature", link: "#" },
  { year: 2024, title: "Identification of Differentially Expressed miRNAs and Target Genes in a Highly Pungent Pepper Cultivar", publisher: "Springer Nature", link: "#" },
  { year: 2024, title: "Comparative transcriptomics of drought-tolerant rice varieties", publisher: "Nature", link: "#" },
  { year: 2024, title: "Metagenomic diversity of paddy soil rhizosphere microbiome", publisher: "Frontiers", link: "#" },
  { year: 2024, title: "Single-cell RNA-seq atlas of buffalo mammary gland lactation", publisher: "Elsevier", link: "#" },
  { year: 2023, title: "Whole genome sequencing of endemic Indian cattle breeds", publisher: "Springer", link: "#" },
  { year: 2023, title: "Chloroplast genome assembly of Coffea arabica cultivars", publisher: "Nature", link: "#" },
  { year: 2023, title: "CRISPR-Cas9 mediated knockout studies in rice blast pathogen", publisher: "Elsevier", link: "#" },
  { year: 2023, title: "Long-read sequencing of Basmati rice for haplotype resolution", publisher: "Frontiers", link: "#" },
  { year: 2022, title: "Population genomics of Indian sheep breeds", publisher: "Springer", link: "#" },
  { year: 2022, title: "Transcriptome profiling of mango during postharvest ripening", publisher: "Elsevier", link: "#" },
  { year: 2022, title: "Microbial community shifts in constructed wetlands", publisher: "Frontiers", link: "#" },
  { year: 2022, title: "Epigenome-wide analysis in gestational diabetes cohorts", publisher: "Nature", link: "#" },
  { year: 2021, title: "Assembly and annotation of Withania somnifera reference genome", publisher: "Springer", link: "#" },
];

export const PUBLISHERS = ["Nature", "Springer Nature", "Elsevier", "Frontiers", "Taylor & Francis"];

export const EDUCATION_PROGRAMS = [
  { id: "industrial", title: "Industrial Training", body: "Hands-on industrial training in bioinformatics and NGS analytics for undergraduate and postgraduate students.", icon: "Briefcase" },
  { id: "dissertation", title: "Dissertation Programme", body: "Guided dissertation projects on real genomics datasets, mentored by senior scientists.", icon: "BookOpen" },
  { id: "workshops", title: "Workshops", body: "Regular workshops on NGS, single-cell, metagenomics and machine learning in biology.", icon: "Presentation" },
  { id: "internships", title: "Internships", body: "Full-time internships combining wet lab and dry lab exposure across omics domains.", icon: "GraduationCap" },
];

export const FOOTER_LINKS = {
  services: [
    { label: "Genomics Services", to: "/genomics-services" },
    { label: "Bioinformatics Analysis", to: "/genomics-services" },
    { label: "Research Collaboration", to: "/genomics-services" },
    { label: "NGS Technologies", to: "/genomics-services" },
    { label: "Multiomics Solutions", to: "/genomics-services" },
  ],
  solutions: [
    { label: "Genome Station", to: "/genomics-solutions#genome-station" },
    { label: "SQIT (Workbench)", to: "/genomics-solutions#sqit" },
    { label: "GStack", to: "/genomics-solutions#gstack" },
    { label: "NiviLabs", href: "https://nivilabs.bionivid.com" },
  ],
  quick: [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Publications", to: "/publications" },
    { label: "Genomics Services", to: "/genomics-services" },
    { label: "Genomics Solutions", to: "/genomics-solutions" },
    { label: "The Genome Education", to: "/education" },
    { label: "Contact Us", to: "/contact" },
  ],
};
