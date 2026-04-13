export const metadata = {
  title: "Terms of Service — API Playbooks",
  description: "Terms of service for API Playbooks by Noosia Digital.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Terms of Service
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: April 13, 2026
      </p>

      <div className="space-y-6 text-foreground/90 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-3">What this site is</h2>
          <p>
            API Playbooks is a free educational resource about API design, security,
            resilience, and lifecycle management. It is provided by{" "}
            <a
              href="https://noosia.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Noosia Digital
            </a>{" "}
            as-is, for informational and educational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Use of content</h2>
          <p>
            You are free to use the information on this site to improve your API
            practices. Code examples are provided for illustration and can be
            adapted for your projects. The content is not legal, security, or
            compliance advice — always validate recommendations against your
            specific context and requirements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">No warranties</h2>
          <p>
            The content is provided &quot;as is&quot; without warranties of any
            kind, express or implied. While we strive for accuracy, API
            standards, tools, and best practices evolve. We make no guarantees
            that the information is complete, current, or error-free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">External links</h2>
          <p>
            This site links to external resources (RFCs, documentation, tools,
            products). These links are provided for convenience. We do not
            endorse, control, or take responsibility for the content or
            availability of external sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Intellectual property</h2>
          <p>
            The original content, structure, and design of API Playbooks are the
            property of Noosia Digital. Referenced standards (RFCs, OWASP, etc.)
            belong to their respective organizations. Product names mentioned
            (Stripe, GitHub, etc.) are trademarks of their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Limitation of liability</h2>
          <p>
            Noosia Digital shall not be liable for any damages arising from the
            use of this site or the application of its content. You use the
            information at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Changes</h2>
          <p>
            We may update these terms from time to time. Continued use of the
            site constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p>
            Questions? Reach us at{" "}
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
