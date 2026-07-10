# Initial seed data for the Bionivid CMS.
# Mirrors the content in /app/frontend/src/data/mock.js so the site keeps working end-to-end.

SITE = {
    "id": "main",
    "name": "Bionivid",
    "tagline": "Your Trusted Research Partner",
    "since": "2011",
    "email": "info@bionivid.com",
    "phone": "+91 953 5619 191",
    "address": "3rd Floor, Saanvi Complex, 28, Kattigenahalli, Bengaluru, Karnataka 560064",
    "socials": {
        "twitter": "https://twitter.com",
        "linkedin": "https://linkedin.com",
        "facebook": "https://facebook.com",
        "instagram": "https://instagram.com",
        "youtube": "https://youtube.com",
    },
    "nivilabsUrl": "https://nivilabs.bionivid.com",
    "gazetteUrl": "https://bionivid.in/bionivid-gazette.pdf",
    "logo": "https://customer-assets.emergentagent.com/job_nivilabs-showcase/artifacts/sx8jwdiv_Bionivid-Logo.png",
    "nivilabsLogo": "https://customer-assets.emergentagent.com/job_nivilabs-showcase/artifacts/mmr3t9y8_preview.png",
    "sqitLogo": "https://customer-assets.emergentagent.com/job_nivilabs-showcase/artifacts/ea0bfh6c_sqit.ai.green.png",
}

HOME_ABOUT = {
    "id": "main",
    "eyebrow": "About Bionivid",
    "titleTop": "Your trusted research partner in",
    "titleAccent": "genomics",
    "titleBottom": "and bioinformatics",
    "description": "Bionivid is your trusted research partner for genomics and NGS application-based data analytics. Our mission is to actively collaborate on your research, providing timely solutions and scientific insights.",
    "descriptionSecondary": "With advanced bioinformatics software (SQIT) and cutting-edge hardware (Genome Station), we offer tailored solutions for research projects, leveraging our extensive genomics expertise.",
    "ctas": [
        {"label": "Learn More About Us", "to": "/about", "primary": True}
    ],
    "images": [
        {"src": "https://images.pexels.com/photos/15202224/pexels-photo-15202224.jpeg", "alt": "Bionivid Office"},
        {"src": "https://images.pexels.com/photos/8533087/pexels-photo-8533087.jpeg", "alt": "Lab"},
        {"src": "https://images.pexels.com/photos/5945799/pexels-photo-5945799.jpeg", "alt": "Team"}
    ],
    "mainImageIndex": 0,
}

HERO_SLIDES = [
    {"order": 0, "eyebrow": "Your Trusted Research Partner \u2014 Since 2011", "titleTop": "Advancing", "titleAccent": "Genomics", "titleBottom": "through Data & Innovation",
     "body": "We deliver advanced genomics solutions and bioinformatics expertise to accelerate research and drive innovation.",
     "image": "https://images.pexels.com/photos/8532830/pexels-photo-8532830.jpeg",
     "ctas": [{"label": "Company Profile", "to": "/about", "primary": True}, {"label": "Google Scholar", "href": "https://scholar.google.com/scholar?hl=en&q=Bionivid", "primary": False}]},
    {"order": 1, "eyebrow": "NGS Data Analytics", "titleTop": "Precision", "titleAccent": "Bioinformatics", "titleBottom": "for Modern Research",
     "body": "From wet lab to insight \u2014 end-to-end genomics powered by SQIT, Genome Station and GStack.",
     "image": "https://images.pexels.com/photos/8533023/pexels-photo-8533023.jpeg",
     "ctas": [{"label": "Explore Solutions", "to": "/genomics-solutions", "primary": True}, {"label": "Talk to Experts", "to": "/contact", "primary": False}]},
    {"order": 2, "eyebrow": "Powered by niviLabs", "titleTop": "Premium Reagents,", "titleAccent": "Engineered for", "titleBottom": "Reproducibility.",
     "body": "niviLabs \u2014 our in-house catalog of high-quality enzymes, kits, reagents, consumables and lab instruments, backed by a seamless one-click RFQ system.",
     "image": "https://images.pexels.com/photos/25626587/pexels-photo-25626587.jpeg",
     "ctas": [{"label": "Browse Catalog", "href": "https://nivilabs.bionivid.com", "primary": True}, {"label": "Request a Quote", "to": "/contact", "primary": False}]},
]

STATS = [
    {"order": 0, "value": "250+", "label": "Publications", "icon": "BookOpen"},
    {"order": 1, "value": "5,000+", "label": "Projects Executed", "icon": "ClipboardList"},
    {"order": 2, "value": "15,000+", "label": "Samples Processed", "icon": "TestTube2"},
    {"order": 3, "value": "50+", "label": "Solutions Offered", "icon": "Lightbulb"},
]

SERVICES = [
    {"order": 0, "slug": "genomics-services", "title": "Genomics Services", "icon": "Dna", "short": "Comprehensive NGS data analysis, wet lab and bioinformatics solutions."},
    {"order": 1, "slug": "bioinformatics", "title": "Bioinformatics Analysis", "icon": "BarChart3", "short": "Advanced data analysis, custom pipelines and insights that drive discovery."},
    {"order": 2, "slug": "research-collaboration", "title": "Research Collaboration", "icon": "Users", "short": "Expert support for research, publications and scientific consulting."},
]

SOLUTIONS = [
    {"order": 0, "slug": "genome-station", "title": "Genome Station", "tagline": "On-Premise Bioinformatics Workstation",
     "image": "https://images.pexels.com/photos/9243559/pexels-photo-9243559.jpeg",
     "description": "A dedicated workstation for NGS data analysis with a proprietary user interface, pre-installed tools and 24\u00d77 technical support.",
     "features": [
         "Pre-installed with state-of-the-art bioinformatics tools & pipelines",
         "End-to-end analysis solution for NGS, Microbiome, Metagenomics, Transcriptomics & more",
         "High performance computing with secure local storage & data management",
         "User-friendly interface with automated workflows & reporting",
         "Ideal for research labs seeking data security, speed & reliability",
         "On-site installation, training & technical support",
     ]},
    {"order": 1, "slug": "gstack", "title": "GStack", "tagline": "Cloud Genomics Platform",
     "image": "https://images.pexels.com/photos/7693222/pexels-photo-7693222.jpeg",
     "description": "Specialized cloud storage platform to organize, store, retrieve and share NGS data securely with advanced analytics and collaboration tools.",
     "features": [
         "A cloud-based platform for genomics data storage, sharing & collaboration",
         "Built-in data management with secure access control & backup",
         "Collaborate in real-time across projects & teams",
         "Scalable storage & high-speed computing on cloud infrastructure",
         "Accessible anytime, anywhere with complete data security",
         "Subscription-based or custom enterprise solutions",
     ]},
    {"order": 2, "slug": "sqit", "title": "SQIT (Workbench)", "tagline": "CLI-Powered NGS Workbench",
     "image": "https://images.pexels.com/photos/6248959/pexels-photo-6248959.jpeg",
     "description": "SQIT (Workbench) is a specialized and optimized platform developed for performing CLU-based Next-Generation Sequencing data analysis.",
     "features": [
         "Specialized & optimized platform for CLI-based NGS data analysis",
         "Integrated workflows for Microbiome, RNA-Seq, WES, WGS & more",
         "Automated QC, alignment, variant calling & annotation",
         "Customizable pipelines & modular analysis",
         "High-performance computing with resource monitoring",
         "Designed for researchers, by researchers",
     ]},
    {"order": 3, "slug": "sqit-online", "title": "SQIT.online", "tagline": "Cloud Gateway to SQIT.ai Desktop",
     "image": "https://images.pexels.com/photos/6248959/pexels-photo-6248959.jpeg", "externalUrl": "https://sqit.online",
     "description": "SQIT.online is the web-based front-end for our flagship SQIT.ai desktop workbench. Submit datasets and analysis specs online \u2014 our scientists run your workflow on dedicated SQIT.ai instances hosted on Bionivid's servers and deliver publication-ready results.",
     "features": [
         "Submit analysis requests through a simple online form",
         "Runs on dedicated SQIT.ai desktop instances on our HPC servers",
         "No local installation \u2014 zero setup time on your side",
         "Reproducible pipelines curated by SQIT.ai",
         "Expert scientist oversight on every run",
         "Publication-ready QC reports, tables and figures delivered securely",
     ]},
    {"order": 4, "slug": "nivilabs", "title": "niviLabs", "tagline": "Premium Reagents & Kits",
     "image": "https://images.pexels.com/photos/13014236/pexels-photo-13014236.jpeg", "externalUrl": "https://nivilabs.bionivid.com",
     "description": "niviLabs is Bionivid's in-house catalog of premium reagents, engineered for absolute reproducibility. Source high-quality enzymes, kits, reagents, consumables and lab instruments \u2014 all backed by a one-click Request-for-Quote (RFQ) system.",
     "features": [
         "High-purity molecular biology enzymes for cloning, PCR and genome editing",
         "Optimized buffers, master mixes and solutions for reproducible results",
         "Complete DNA/RNA extraction, amplification and NGS library-prep kits",
         "Laboratory consumables built to strict molecular biology standards",
         "One-click Request-for-Quote (RFQ) procurement system",
         "Backed by 10+ years of wet-lab expertise from Bionivid",
     ]},
]

TECH_PLATFORMS = [
    {"order": 0, "name": "Illumina", "type": "Short Read Sequencing", "image": "https://images.pexels.com/photos/9243559/pexels-photo-9243559.jpeg"},
    {"order": 1, "name": "PacBio", "type": "Long Read Sequencing", "image": "https://images.pexels.com/photos/8533087/pexels-photo-8533087.jpeg"},
    {"order": 2, "name": "Nanopore", "type": "Long Read Sequencing", "image": "https://images.pexels.com/photos/13014236/pexels-photo-13014236.jpeg"},
]

OMICS_CATEGORIES = [
    {"order": 0, "title": "GENOME", "icon": "Dna", "items": ["Whole Genome Sequencing", "Whole Exome / Targeted Sequencing", "Genome Finishing (Hi-C / Bionano)", "Genotyping By Seq (GBS)", "Single Cell Genomics", "Exosomal DNA / cfDNA-Seq"]},
    {"order": 1, "title": "MICROBIOME", "icon": "Microscope", "items": ["Amplicon \u2014 16S/ITS", "MID \u2014 Sanger", "Metatranscriptome", "Shotgun Metagenome", "Metavirome"]},
    {"order": 2, "title": "EPIGENOME", "icon": "ShieldCheck", "items": ["Bisulfite (WGBS / RRBS)", "ChIP / MeDIP Seq", "ATAC \u2014 Seq", "Hi-C Proximity Ligation", "Single-cell ATAC", "Single-cell Multiomics"]},
    {"order": 3, "title": "TRANSCRIPTOME", "icon": "Activity", "items": ["Whole Transcriptome", "Small RNA Profiling", "Degradome Profiling", "Exosomal RNA-seq", "Single-cell RNA-Seq"]},
]

VALUES = [
    {"order": 0, "title": "Teamwork", "icon": "Handshake", "body": "We believe in collaboration, respect and collective growth."},
    {"order": 1, "title": "Leadership", "icon": "Trophy", "body": "We lead by example with vision, integrity and purpose."},
    {"order": 2, "title": "Customer Oriented", "icon": "Users", "body": "We focus on understanding and exceeding customer expectations."},
    {"order": 3, "title": "Quality Excellence", "icon": "BadgeCheck", "body": "We are committed to delivering high quality, every single time."},
]

LEADERSHIP = [
    {"order": 0, "name": "Rohit Shukla", "role": "CEO & Founder", "photo": "https://images.pexels.com/photos/5945799/pexels-photo-5945799.jpeg", "linkedin": "https://linkedin.com"},
    {"order": 1, "name": "Roli Budhwar, Ph.D.", "role": "COO & Co-founder", "photo": "https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg", "linkedin": "https://linkedin.com"},
    {"order": 2, "name": "Vinita Menon", "role": "Director", "photo": "https://images.pexels.com/photos/8532830/pexels-photo-8532830.jpeg", "linkedin": "https://linkedin.com"},
]

ABOUT_GALLERIES = {
    "id": "main",
    "team": {
        "eyebrow": "Our People", "title": "Meet the", "accent": "Bionivid Team",
        "description": "A diverse group of scientists, bioinformaticians, and engineers united by a passion for genomics.",
        "images": [
            {"src": "https://images.unsplash.com/photo-1631556759511-6ce895fbf0ad", "caption": "Senior Scientists"},
            {"src": "https://images.unsplash.com/photo-1707944745899-104a4b12d945", "caption": "Research Team"},
            {"src": "https://images.unsplash.com/photo-1486825586573-7131f7991bdd", "caption": "Bioinformaticians"},
            {"src": "https://images.unsplash.com/photo-1581093577421-f561a654a353", "caption": "Wet Lab Specialists"},
            {"src": "https://images.unsplash.com/photo-1582719471384-894fbb16e074", "caption": "NGS Analysts"},
            {"src": "https://images.unsplash.com/photo-1602052577122-f73b9710adba", "caption": "Molecular Biologists"},
        ],
    },
    "culture": {
        "eyebrow": "Life at Bionivid", "title": "Our", "accent": "Culture",
        "description": "Team celebrations, off-sites, workshops and everyday moments that shape who we are.",
        "images": [
            {"src": "https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg", "caption": "Team Discussions"},
            {"src": "https://images.pexels.com/photos/5945799/pexels-photo-5945799.jpeg", "caption": "Collaboration Sessions"},
            {"src": "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c", "caption": "Brainstorming"},
            {"src": "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca", "caption": "Group Off-sites"},
            {"src": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655", "caption": "Workshops & Training"},
        ],
    },
}

CLIENTS = [
    {"order": 0, "name": "BARC", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/BARC_Logo.svg/200px-BARC_Logo.svg.png"},
    {"order": 1, "name": "DBT", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Emblem_of_India.svg/200px-Emblem_of_India.svg.png"},
    {"order": 2, "name": "DST", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Emblem_of_India.svg/200px-Emblem_of_India.svg.png"},
    {"order": 3, "name": "ICAR", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Indian_Council_of_Agricultural_Research_Logo.svg/200px-Indian_Council_of_Agricultural_Research_Logo.svg.png"},
    {"order": 4, "name": "ICMR", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Icmr-logo.png/200px-Icmr-logo.png"},
    {"order": 5, "name": "IISc", "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/IISc_Seal.svg/200px-IISc_Seal.svg.png"},
    {"order": 6, "name": "NCCS", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Emblem_of_India.svg/200px-Emblem_of_India.svg.png"},
    {"order": 7, "name": "IARI", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Indian_Council_of_Agricultural_Research_Logo.svg/200px-Indian_Council_of_Agricultural_Research_Logo.svg.png"},
]

TESTIMONIALS = [
    {"order": 0, "quote": "Bionivid's expertise in genomics and bioinformatics has been instrumental in the success of our research projects. Their professionalism and support are truly exceptional.", "name": "Dr. Ramesh Kumar", "role": "Research Scientist"},
    {"order": 1, "quote": "The team is highly professional and their support in data analysis and publication is truly exceptional.", "name": "Dr. Neha Sharma", "role": "Postdoctoral Researcher"},
    {"order": 2, "quote": "Hands-on training and workshops from Bionivid helped our students gain real-world research experience.", "name": "Prof. Anil Verma", "role": "Head of Department"},
    {"order": 3, "quote": "An exceptional research partner \u2014 the SQIT platform and their bioinformatics pipelines saved us months of analysis time.", "name": "Dr. Padma Shastry", "role": "Principal Scientist, NCCS"},
    {"order": 4, "quote": "Reliable, timely and scientifically sound. Bionivid consistently delivers publication-grade insights.", "name": "Dr. Shailendra Goel", "role": "University of Delhi"},
]

PUBLICATIONS = [
    {"year": 2026, "title": "Insight into the reproductive performance of Murrah bufaloes based on RNA sequencing analysis", "publisher": "Frontiers", "link": "#"},
    {"year": 2026, "title": "Population structure and genetic diversity of Fusarium species on solanaceous crops in the North-Western Himalayas", "publisher": "Springer", "link": "#"},
    {"year": 2026, "title": "Genomic insights into Exiguobacterium indicum VIT-2023: a dual-function PGPR with potential for plant health protection and plastic biodegradation", "publisher": "Taylor & Francis", "link": "#"},
    {"year": 2025, "title": "Genomic characterization of host gene alterations in Theileria annulata-transformed leukocytes", "publisher": "Nature", "link": "#"},
    {"year": 2025, "title": "Modern Approaches in Genetic Toxicology Research: Insights from Next-Generation-Based RNA Sequencing", "publisher": "Springer", "link": "#"},
    {"year": 2025, "title": "Characterization of an entomopathogenic fungi, Aspergillus sp. R55 as a biocontrol agent against invasive rugose spiralling whitefly infesting oil palm in India", "publisher": "Springer", "link": "#"},
    {"year": 2025, "title": "First pathogenomic insights into Ganoderma ellipsoideum as an emerging causal agent of basal stem rot in oil palm", "publisher": "Nature", "link": "#"},
    {"year": 2025, "title": "First identification of Curvularia xishuangbannaensis Tibpromma & K.D. Hyde, sp. nov as a causal agent of leaf spot in oil palm nurseries and evaluation of fungicidal efficacy", "publisher": "Society for Promotion of Horticulture (SPH)", "link": "#"},
    {"year": 2025, "title": "Clinical Pattern and Therapeutic Approaches in Dairy Cattle Affected with Foot and Mouth Disease Virus (FMDV) Serotype O/2021-22 during an Outbreak in Kashmir, India", "publisher": "Indian Journal of Animal Research", "link": "#"},
    {"year": 2025, "title": "Analysis of antimicrobial potential and functional perspectives of marine macroalgal epiphytic microbiomes from Visakhapatnam coast of Bay of Bengal, India", "publisher": "Taylor & Francis", "link": "#"},
    {"year": 2024, "title": "A Draft Transcriptome Announcement of Aquilaria malaccensis", "publisher": "Sciendo", "link": "#"},
    {"year": 2024, "title": "Characterization of a novel root associated diazotrophic rare PGPR from Arunachal Pradesh", "publisher": "Springer Nature", "link": "#"},
    {"year": 2024, "title": "Identification of Differentially Expressed miRNAs and Target Genes in a Highly Pungent Pepper Cultivar", "publisher": "Springer Nature", "link": "#"},
    {"year": 2024, "title": "Comparative transcriptomics of drought-tolerant rice varieties", "publisher": "Nature", "link": "#"},
    {"year": 2024, "title": "Metagenomic diversity of paddy soil rhizosphere microbiome", "publisher": "Frontiers", "link": "#"},
    {"year": 2024, "title": "Single-cell RNA-seq atlas of buffalo mammary gland lactation", "publisher": "Elsevier", "link": "#"},
    {"year": 2023, "title": "Whole genome sequencing of endemic Indian cattle breeds", "publisher": "Springer", "link": "#"},
    {"year": 2023, "title": "Chloroplast genome assembly of Coffea arabica cultivars", "publisher": "Nature", "link": "#"},
    {"year": 2023, "title": "CRISPR-Cas9 mediated knockout studies in rice blast pathogen", "publisher": "Elsevier", "link": "#"},
    {"year": 2023, "title": "Long-read sequencing of Basmati rice for haplotype resolution", "publisher": "Frontiers", "link": "#"},
    {"year": 2022, "title": "Population genomics of Indian sheep breeds", "publisher": "Springer", "link": "#"},
    {"year": 2022, "title": "Transcriptome profiling of mango during postharvest ripening", "publisher": "Elsevier", "link": "#"},
    {"year": 2022, "title": "Microbial community shifts in constructed wetlands", "publisher": "Frontiers", "link": "#"},
    {"year": 2022, "title": "Epigenome-wide analysis in gestational diabetes cohorts", "publisher": "Nature", "link": "#"},
    {"year": 2021, "title": "Assembly and annotation of Withania somnifera reference genome", "publisher": "Springer", "link": "#"},
]
