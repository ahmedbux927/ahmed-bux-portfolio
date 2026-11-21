<div align="center">

# Ahmed Bux — Portfolio

**AI Specialist · SaaS Project Analyst · Cybersecurity Professional**

[![Live Site](https://img.shields.io/badge/Live%20Site-ahmed--bux--portfolio.vercel.app-4A1D4E?style=for-the-badge&logo=vercel&logoColor=white)](https://ahmed-bux-portfolio.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ahmed%20Bux-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmed-bux-5a096a310)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-%2B92%20326%203044880-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/923263044880)

*Building intelligent AI systems & SaaS products that businesses trust.*

</div>

---

## About

The official portfolio of **Ahmed Bux** — an AI Specialist and SaaS Project Analyst who also brings frontline cybersecurity expertise (SOC operations, Elastic SIEM & Wazuh, Linux administration) to every system he builds. Based in Sukkur, Sindh, Pakistan; working remotely worldwide.

This repository contains the complete source of the live portfolio website: a single-file static front end, a serverless contact pipeline, and the database schema behind it.

## Highlights

- **Classical editorial design** — light lavender-white theme, deep-plum and violet brand palette, Plus Jakarta Sans typography, tasteful motion (3D globe, scroll reveals, skills ticker)
- **Real project showcase** — four projects with designed cover illustrations, case studies and verified metrics (no placeholder content)
- **Working contact pipeline** — form submissions are validated, stored in Supabase Postgres and emailed via Resend
- **Interactive AI demo** — an on-page assistant that answers questions about Ahmed's services and projects from the facts on the page
- **Direct conversion paths** — WhatsApp deep links on every service, share buttons, and a copy-email action

## Featured Projects

| Project | What it is | Status |
|---|---|---|
| **MediGen AI Pro** | Pharmacy ERP & POS — billing, FEFO expiry control, cash drawer, Gemini AI assistant. 2,509 automated tests, CI green. [Repository](https://github.com/ahmedbux927/MediGen-AI-Pro) | ● Live in production |
| **AdmitSecure** | Secure university admissions platform — role-based access, separation-of-duties approvals, PII-redacted AI assistant (design blueprint, 100K applicants / 500K messages per cycle) | Design blueprint |
| **Stamp Duty Calculator** | UK SDLT calculator — an accurate figure in seconds, mobile-first | ● Live |
| **Digital Futures** | Digital platform initiative | ● In progress |

## Services

1. **AI Automation & Smart Assistants** — assistants and workflows that triage, report and act automatically
2. **SaaS Project Analysis** — requirements, security reviews and product roadmaps
3. **SOC Operations & Threat Detection** — 24/7 monitoring with Elastic SIEM & Wazuh
4. **Linux & Server Security** — RHEL administration, patching and hardening
5. **Penetration Testing & Audits** — vulnerability assessment and web pen testing
6. **Cloud Security & Hardening** — AWS configuration review and access control

## How It Works

```
Visitor ──▶ Vercel (static site, index.html)
   │
   └─ Contact form ──▶ /api/contact (Vercel serverless function)
                          ├─▶ Supabase Postgres — contact_messages (RLS, deny-by-default)
                          └─▶ Resend — email notification to the owner
```

- The front end is **one self-contained HTML file** — styles, scripts and images embedded; no build step.
- The serverless function validates input (length limits + honeypot), then inserts with the Supabase **service-role key** (which bypasses RLS) and sends the notification email. Keys exist only as Vercel environment variables — never in this repository.

## Project Structure

```
ahmed-bux-portfolio/
├── index.html            # The complete website (single file)
├── assets/
│   └── portrait.jpg      # Portrait used for social-share previews (og:image)
├── api/
│   └── contact.js        # Serverless contact endpoint (Supabase + Resend)
├── supabase/
│   └── schema.sql        # contact_messages table + RLS (already applied)
├── vercel.json           # Clean URLs + security headers
├── .env.example          # Required environment variable names
├── .gitignore
├── LICENSE
└── README.md
```

## Environment Variables

Set these in the Vercel project (Production). Values are secrets — they are **not** stored in this repo.

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side insert key (bypasses RLS) |
| `RESEND_API_KEY` | Resend sending key |
| `CONTACT_TO_EMAIL` | Inbox that receives form notifications |

## Deployment

Hosted on **Vercel** and connected to this repository — every push to `main` deploys automatically, typically live within a minute. No build command; the framework preset is "Other" with the repository root as the output.

## Run Locally

```bash
# any static server works, e.g.
python3 -m http.server 8000
# open http://localhost:8000
```

The contact form needs the environment variables above plus `vercel dev` to exercise `/api/contact` locally.

## Author

**Ahmed Bux** — AI Specialist · SaaS Project Analyst · Cybersecurity Professional
BS Artificial Intelligence, BBSUTSD Khairpur Mirs · Diploma in Cloud Cyber Security (EduQual L3), Al Nafi
Cyber Security Specialist at Al Nafi · SaaS Project Analyst at Quadratax

- 🌐 [ahmed-bux-portfolio.vercel.app](https://ahmed-bux-portfolio.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/ahmed-bux-5a096a310)
- 📧 ahmedbux927@gmail.com
- 💬 [WhatsApp](https://wa.me/923263044880)

## License

© 2026 Ahmed Bux. All rights reserved — see [LICENSE](LICENSE). The code is published for reference; the design, content and branding may not be reused without permission.
