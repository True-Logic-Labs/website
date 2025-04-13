# Deployment

https://medium.com/@sbuckpesch/setup-aws-s3-static-website-hosting-using-ssl-acm-34d41d32e394

# Architecture

# 🚀 Final Setup Recommendation

| **Component**                   | **Service Used**         | **Deployment Platform**       |
| ------------------------------- | ------------------------ | ----------------------------- |
| **Frontend**                    | Netlify                  | Hosted on Netlify             |
| **Backend (FastAPI)**           | Fly.io                   | Hosted on Fly.io              |
| **Database & Auth**             | Supabase                 | Managed PostgreSQL (Supabase) |
| **File Storage (Images, PDFs)** | Supabase Storage         | Managed by Supabase           |
| **Email Sending**               | Brevo, Mailgun, Postmark | API calls from FastAPI        |
| **WhatsApp & SMS**              | Twilio, Vonage           | API calls from FastAPI        |
| **Background Processing**       | Celery + Redis           | Hosted on Fly.io              |

## 🎯 Final Verdict

✅ **Yes, this setup is solid for emails, WhatsApp, and SMS.**  
✅ **Keeps frontend lightweight** (Netlify only serves UI).  
✅ **Backend handles sensitive API calls** (Fly.io with environment variables).  
✅ **Supabase for auth & DB** keeps things simple.  
✅ **Celery + Redis (Optional) for better scaling** on high email/SMS volume.

## 1. FrontEnd > Netlify

Just use the netlify website to set up github and CICD

## 2. Edge Functions for small api calls > Netlify

```bash
npm install -g netlify-cli
netlify login
netlify init

mkdir -p netlify/edge-functions
touch netlify/edge-functions/openai.js # this js file name is used in the endpoint, see the curl below.

netlify env:set OPENAI_API_KEY <<<your_openai_api_key_here>>> # Add as many as needed.

touch ./netlify.toml
```

Note the project structure for edge functions

├── netlify/edge-functions/openai.js
├── netlify/.netlify <-- This installation makes
└── netlify/netlify.toml

```toml
[[edge_functions]]
function = "openai"
path = "/.netlify/edge-functions/openai"
```

TRY THIS > netlify deploy --prod --dir=.
OR TRY > netlify deploy --prod

```bash
netlify status

curl -X POST "https://edgetools.netlify.app/.netlify/edge-functions/openai" \
 -H "Content-Type: application/json" \
 -d '{"prompt": "Hello, AI!"}'
```

## 3. Auth and DB > Supabase

```bash
# Without installing supabase, in package.json
npx supabase functions new hello-world
npx supabase start
npx supabase functions serve --debug
npx supabase logs
```

## 4. Full Fledged FastAPI backend App > fly.io (https://fly.io/dashboard/manasvi-m-sharma)

```bash
# Install Fly IO CLI
curl -fsSL https://fly.io/install.sh | sh

# Commands
fly auth login
fly launch
fly deploy
```

## 5. S3 blog storage > supabase or fly.io

## 6. Serverless if needed > Netlify

# Idea to Form

- ENTRY > Blog Post - Our Blog > repurposed entry point on FB, Insta, Linkedin, YouTube
  - POC activity - Github
  - Webcourse - Techables
  - Webinar Product - Zoom, or google or find good one
    - IB Industrial Workshop - Speak to Pathways
  - Consultation - Cal.com, WhatsApp marketing, Discord Group Community
  - Products
    - Basic Fast
      - LLM Tools like excelbot and https://gravitywrite.com/ and https://ahrefs.com/writing-tools/instagram-caption-generator
      - These go to common website
    - Advance Slow
      - Recruiter AI
      - NotePad Notes
      - Audio Based Task Management

# Form to Monetization

- Meetings - Stripe + Cal.com
- Affiliate Links -
- Web Courses -

# Content Strategy

### Categories

- By Industry
- By Role

### For all Pages we can have "Commons" stuff that can be put anywhere

- Global Blogs
- Other Tools Up Sell
- Affiliate Stories
- Developers Stories

### Items specific to page or tool "Specifics"

- Hero
- Tool
- Features
- Pricing
- Testimonials
- FAQs
- Tool Niche/ industry Blog

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `yarn`                 | Installs dependencies                            |
| `yarn dev`             | Starts local dev server at `localhost:4321`      |
| `yarn build`           | Build your production site to `./dist/`          |
| `yarn preview`         | Preview your build locally, before deploying     |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                     |

## Upcoming Tools

AI-Powered Job Search Toolkit

- ✅ AI Resume Builder & Optimizer
- ✅ AI Cover Letter Generator
- ✅ AI Job Description Matcher (CV vs JD Keyword Optimization)
- ✅ AI Skills Gap Analyzer
- ✅ AI LinkedIn Profile Optimizer
- ✅ AI Portfolio & Work Sample Enhancer
- ✅ AI Elevator Pitch Generator
- ✅ AI Interview Coach & Mock Interview
- ✅ AI Salary Benchmark & Negotiation Guide
- ✅ AI Cold Email & Networking Message Writer
- ✅ AI Job Application Tracker & Reminder
- ✅ AI Thank You Email Generator

## Competition

🚀 AI Tools for Online Presence & Social Growth
🔹 Content Creation & Writing

- ✅ ChatGPT / Gemini / Claude – AI-powered content writing & ideation
- ✅ Jasper AI – Long-form content & blog writing
- ✅ Copy.ai – Marketing copy, ads, and social media posts
- ✅ Writesonic – AI blog posts, website copy, and product descriptions
- ✅ Rytr – AI-powered storytelling and captions

🔹 Social Media Management & Automation

- ✅ Hootsuite / Buffer – Social scheduling & automation
- ✅ Publer – AI-generated posts & auto-scheduling
- ✅ Lately AI – AI-driven social media repurposing
- ✅ SocialBee – AI-based content recycling & scheduling

🔹 AI Image & Video Creation

- ✅ Canva AI – AI-powered design, templates, and branding
- ✅ Adobe Firefly – AI image and video editing
- ✅ Runway ML – AI video editing & motion graphics
- ✅ Pika Labs – AI-powered video generation
- ✅ DALL·E / MidJourney – AI-generated images & artwork

🔹 AI SEO & Growth Tools

- ✅ Surfer SEO – AI-driven content optimization
- ✅ Frase.io – AI SEO & topic research
- ✅ Scalenut – AI-powered SEO & keyword research
- ✅ RankIQ – AI-based SEO content planning

🔹 AI Engagement & Community Growth

- ✅ Brand24 – AI-powered social media monitoring
- ✅ SparkToro – AI-driven audience insights
- ✅ Chatbots (ManyChat / Drift) – AI for social engagement & customer support

🔹 AI Video & Podcast Tools

- ✅ Descript – AI video editing & podcasting
- ✅ Veed.io – AI-based video subtitles & auto-editing
- ✅ Castmagic – AI-powered podcast content repurposing
