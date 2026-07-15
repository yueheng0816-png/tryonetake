import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "Compare", href: "/#comparison" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "LinkedIn Headshots", href: "/use-cases/linkedin-headshots" },
    { label: "Corporate Headshots", href: "/use-cases/corporate-headshots" },
    { label: "OneTake vs HeadshotPro", href: "/vs/headshotpro" },
    { label: "OneTake vs Aragon AI", href: "/vs/aragon-ai" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
  Contact: [
    { label: "support@tryonetake.com", href: "mailto:support@tryonetake.com" },
    { label: "Twitter / X", href: "https://x.com/tryonetake" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-5">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <span>📸</span>
              OneTake
            </Link>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Professional AI headshots from just 1 photo.
              <br />
              Actually looks like you.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-base font-semibold">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors break-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} OneTake. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
