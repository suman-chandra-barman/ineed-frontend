import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Policy | iNeed",
  description:
    "Provider Independent Contractor Agreement. Learn about the terms and conditions for service providers on the iNeed platform.",
  keywords:
    "provider policy, independent contractor agreement, service provider terms, contractor agreement",
};

export default function TermsAndConditionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Provider Independent{" "}
              <span className="text-primary">Contractor Agreement</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              This Independent Contractor Agreement (&quot;Agreement&quot;) is entered
              into between <strong>iNeed, LLC</strong> (&quot;iNeed,&quot; &quot;Platform,&quot; or
              &quot;Company&quot;) and the undersigned service provider (&quot;Provider&quot;).
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mt-4">
              By creating an account, accepting jobs, or providing services
              through iNeed, Provider agrees to the terms below.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Effective Date: [25 Sep, 2025]
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Policy Sections */}
          <div className="space-y-8 sm:space-y-12">
            {/* Section 1 */}
            <PolicySection
              number="1"
              title="Independent Contractor Relationship"
              items={[
                {
                  type: "paragraph",
                  content: "Provider acknowledges and agrees that:",
                },
                {
                  type: "list",
                  items: [
                    "Provider is an independent contractor, not an employee, partner, or agent of iNeed.",
                    "iNeed does not control how services are performed, only the platform through which services are offered.",
                    "Provider is responsible for all taxes, insurance, licenses, permits, and business expenses related to services performed",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "Nothing in this Agreement creates an employer-employee relationship.",
                },
              ]}
            />

            {/* Section 2 */}
            <PolicySection
              number="2"
              title="Scope of Services"
              items={[
                {
                  type: "paragraph",
                  content:
                    "To protect both you and the customer, all communication must stay within the iNeed platform. This means:",
                },
                {
                  type: "list",
                  items: [
                    "Messaging customers only through iNeed",
                    "Not sharing personal phone numbers or emails",
                    "Not accepting or requesting payment outside the platform",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "If a conversation becomes difficult, you're never on your own—we're here to help.",
                },
              ]}
            />

            {/* Section 3 */}
            <PolicySection
              number="3"
              title="Platform Use & Communication"
              items={[
                {
                  type: "paragraph",
                  content: "To protect all parties:",
                },
                {
                  type: "list",
                  items: [
                    "All communication with customers must occur within the iNeed platform",
                    "Provider may not share personal contact information with customers",
                    "Provider may not accept or request payment outside the platform",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "Circumventing the platform may result in suspension or termination.",
                },
              ]}
            />

            {/* Section 4 */}
            <PolicySection
              number="4"
              title="Job Documentation & Completion"
              items={[
                {
                  type: "paragraph",
                  content: "Provider agrees to:",
                },
                {
                  type: "list",
                  items: [
                    "Upload required before-and-after photos for each job",
                    "Accurately represent the condition of the service area",
                    "Only mark a job as complete once all work has been finished",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "False or misleading documentation is grounds for removal.",
                },
              ]}
            />

            {/* Section 5 */}
            <PolicySection
              number="5"
              title="Payments & Payouts"
              items={[
                {
                  type: "list",
                  items: [
                    "Customers pay iNeed through the platform",
                    "iNeed releases payment to Provider after job completion and confirmation, subject to dispute review",
                    "Provider must complete onboarding requirements, to receive payouts",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "iNeed may withhold or delay payment if a job is disputed or documentation is incomplete.",
                },
              ]}
            />

            {/* Section 6 */}
            <PolicySection
              number="6"
              title="Disputes & Support Escalation"
              items={[
                {
                  type: "paragraph",
                  content:
                    "iNeed handles payments to make things simple and reliable.",
                },
                {
                  type: "paragraph",
                  content: "Providers can expect:",
                },
                {
                  type: "list",
                  items: [
                    "Transparent tracking of completed jobs",
                    "Payouts processed through the platform",
                    "Payment release once the job is confirmed",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "To receive payouts, required onboarding information—including W-9 details—must be completed.",
                },
              ]}
            />

            {/* Section 7 */}
            <PolicySection
              number="7"
              title="Standards of Conduct"
              items={[
                {
                  type: "paragraph",
                  content: "Provider agrees to:",
                },
                {
                  type: "list",
                  items: [
                    "Act professionally and respectfully at all times",
                    "Comply with all applicable laws and regulations",
                    "Avoid unsafe or negligent behavior",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "Repeated violations may result in probation or removal from the platform.",
                },
              ]}
            />

            {/* Section 8 */}
            <PolicySection
              number="8"
              title="Insurance & Liability"
              items={[
                {
                  type: "paragraph",
                  content: "Provider is solely responsible for:",
                },
                {
                  type: "list",
                  items: [
                    "Any damage, injury, or loss caused during service performance",
                    "Maintaining appropriate insurance coverage, if required",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "iNeed is not responsible for Provider's actions, omissions, or service quality.",
                },
              ]}
            />

            {/* Section 9 */}
            <PolicySection
              number="9"
              title="Non-Exclusivity"
              items={[
                {
                  type: "paragraph",
                  content:
                    "This Agreement is non-exclusive. Provider may offer services through other platforms or independently, provided Provider does not solicit iNeed customers off-platform.",
                },
              ]}
            />

            {/* Section 10 */}
            <PolicySection
              number="10"
              title="Confidentiality"
              items={[
                {
                  type: "paragraph",
                  content: "Provider agrees not to misuse or disclose:",
                },
                {
                  type: "list",
                  items: [
                    "Customer information",
                    "Platform processes",
                    "Pricing or operational details",
                  ],
                },
                {
                  type: "footer",
                  content: "This obligation survives termination.",
                },
              ]}
            />

            {/* Section 11 */}
            <PolicySection
              number="11"
              title="Termination"
              items={[
                {
                  type: "paragraph",
                  content:
                    "Either party may terminate this Agreement at any time.",
                },
                {
                  type: "paragraph",
                  content:
                    "iNeed may immediately suspend or terminate Provider for:",
                },
                {
                  type: "list",
                  items: [
                    "Policy violations",
                    "Fraud or misrepresentation",
                    "Repeated customer complaints",
                    "Platform circumvention",
                  ],
                },
              ]}
            />

            {/* Section 12 */}
            <PolicySection
              number="12"
              title="Limitation of Liability"
              items={[
                {
                  type: "paragraph",
                  content: "To the maximum extent permitted by law:",
                },
                {
                  type: "list",
                  items: [
                    "iNeed is not liable for indirect, incidental, or consequential damages",
                    "Provider agrees to indemnify iNeed against claims arising from Provider's services",
                  ],
                },
              ]}
            />

            {/* Section 13 */}
            <PolicySection
              number="13"
              title="Governing Law"
              items={[
                {
                  type: "paragraph",
                  content:
                    "This Agreement is governed by the laws of the State of New York, without regard to conflict-of-law principles.",
                },
              ]}
            />

            {/* Section 14 */}
            <PolicySection
              number="14"
              title="Acceptance"
              items={[
                {
                  type: "paragraph",
                  content:
                    "By registering as a provider or accepting jobs through iNeed, Provider acknowledges that they have read, understood, and agreed to this Agreement.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Policy Section Component
interface ContentItem {
  type: "paragraph" | "list" | "subheading" | "footer";
  content?: string;
  items?: string[];
}

interface PolicySectionProps {
  number: string;
  title: string;
  items: ContentItem[];
}

function PolicySection({ number, title, items }: PolicySectionProps) {
  return (
    <section>
      <div className="flex-1 pt-1">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">
          {number}. {title}
        </h2>

        <div className="space-y-2 text-gray-600">
          {items.map((item, index) => {
            if (item.type === "paragraph") {
              return (
                <p key={index} className="text-base sm:text-lg leading-relaxed">
                  {item.content}
                </p>
              );
            }

            if (item.type === "subheading") {
              return (
                <p
                  key={index}
                  className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed mt-4"
                >
                  {item.content}
                </p>
              );
            }

            if (item.type === "list" && item.items) {
              return (
                <ul key={index} className="space-y-2 sm:space-y-3 ml-1">
                  {item.items.map((listItem, listIndex) => (
                    <li
                      key={listIndex}
                      className="flex items-start gap-3 text-base sm:text-lg"
                    >
                      <span className="text-gray-900 mt-1">•</span>
                      <span className="flex-1">{listItem}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            if (item.type === "footer") {
              return (
                <p
                  key={index}
                  className="text-base sm:text-lg leading-relaxed italic text-gray-500 mt-4"
                >
                  {item.content}
                </p>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
}
