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
            API Playbooks is a free, open-source educational resource about API
            design, security, resilience, and lifecycle management. It is built
            and maintained by{" "}
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
          <h2 className="text-xl font-semibold mb-3">Open source — MIT License</h2>
          <p>
            This project is released under the{" "}
            <a
              href="https://github.com/gigacool/api-playbooks/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              MIT License
            </a>
            . You are free to use, copy, modify, merge, publish, distribute,
            sublicense, and/or sell copies of the content and code — subject to
            the conditions of the MIT License.
          </p>
          <p className="mt-2">
            In short: use it however you want, give credit where it makes sense,
            and don&apos;t hold us liable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contribute and improve</h2>
          <p>
            This is a living resource. If you spot an error, disagree with a
            recommendation, or want to add a topic — we welcome your
            contributions. Open an issue or submit a pull request on{" "}
            <a
              href="https://github.com/gigacool/api-playbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              GitHub
            </a>
            .
          </p>
          <p className="mt-2">
            The best APIs are built by communities, not individuals. The same
            goes for content about APIs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Not professional advice</h2>
          <p>
            The content is educational and opinionated. It is not legal,
            security, or compliance advice. Code examples are provided for
            illustration — always validate recommendations against your specific
            context, requirements, and threat model.
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
          <h2 className="text-xl font-semibold mb-3">Trademarks</h2>
          <p>
            Referenced standards (RFCs, OWASP, etc.) belong to their respective
            organizations. Product names mentioned (Stripe, GitHub, etc.) are
            trademarks of their respective owners and are used for educational
            illustration only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p>
            Questions, feedback, or ideas? Open an issue on{" "}
            <a
              href="https://github.com/gigacool/api-playbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              GitHub
            </a>{" "}
            or reach us at{" "}
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
