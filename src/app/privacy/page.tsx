export const metadata = {
  title: "Privacy Policy — API Playbooks",
  description: "Privacy policy for API Playbooks by Noosia Digital.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: April 13, 2026
      </p>

      <div className="space-y-6 text-foreground/90 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">Who we are</h2>
          <p>
            API Playbooks is a free educational resource built and maintained by{" "}
            <a
              href="https://noosia.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Noosia Digital
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">No cookies</h2>
          <p>
            This site does not use cookies. No tracking cookies, no analytics
            cookies, no third-party cookies. Nothing is stored in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">No personal data collection</h2>
          <p>
            We do not collect, store, or process any personal data. There are no
            sign-up forms, no email collection, no user accounts, and no login
            functionality on this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Hosting and analytics</h2>
          <p>
            This site is hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Vercel
            </a>
            . Vercel may collect anonymous, aggregated data about page visits
            (such as page views and geographic regions) as part of their
            infrastructure. This data is not personally identifiable and is
            governed by{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Vercel&apos;s Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">External links</h2>
          <p>
            This site contains links to external resources (documentation, RFCs,
            tools). We are not responsible for the privacy practices of those
            external sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Changes to this policy</h2>
          <p>
            If we ever change our privacy practices, we will update this page
            with a new &quot;Last updated&quot; date. Given that this site
            collects no data, changes are unlikely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p>
            Questions about this policy? Reach us at{" "}
            <a
              href="https://noosia.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              noosia.digital
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
