# Security Policy

## Reporting a vulnerability

If you find a security issue in this portfolio or its contact pipeline, please
report it privately — do not open a public issue.

- **Email:** ahmedbux927@gmail.com
- **WhatsApp:** +92 326 3044880

You will get an acknowledgement within 48 hours. Ahmed works in security
(SOC operations and penetration testing), so reports are taken seriously and
handled discreetly.

## Scope & posture

- The site is a static single file; the only server-side surface is
  `/api/contact`.
- The endpoint validates all input (length limits, email shape, honeypot
  field) and talks to Supabase with a server-side service key that is never
  exposed to the browser.
- The `contact_messages` table has Row Level Security enabled with no public
  policies (deny by default); only the owner reads submissions, from the
  Supabase dashboard.
- Secrets live only in Vercel environment variables — never in this
  repository. `.env.example` lists variable names only.
