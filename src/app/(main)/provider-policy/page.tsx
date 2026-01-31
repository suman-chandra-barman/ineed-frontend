import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Policy | iNeed",
  description:
    "At iNeed, we believe great service starts with clarity and mutual respect. Our platform is designed to support you, help you grow, and make your work easier—not harder.",
  keywords:
    "provider policy, service provider, terms and conditions, provider support",
};

export default function ProviderPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Provider <span className="text-primary">Policy</span>
            </h1>
            <div className="relative">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                At iNeed, we believe great service starts with clarity and
                mutual respect. Our platform is designed to support you, help
                you grow, and make your work easier—not harder. Here&apos;s what we
                expect so everyone has a positive experience.
              </p>
            </div>
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
              title="Professionalism Comes First"
              items={[
                {
                  type: "paragraph",
                  content:
                    "When you accept a job through iNeed, customers are counting on you. We expect providers to:",
                },
                {
                  type: "list",
                  items: [
                    "Arrive on time or communicate promptly if delayed",
                    "Follow the job details as listed",
                    "Treat customers and their space with care and respect",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "Professionalism builds trust—and trust builds repeat work.",
                },
              ]}
            />

            {/* Section 2 */}
            <PolicySection
              number="2"
              title="Platform-Only Communication"
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
              title="Clear Job Documentation"
              items={[
                {
                  type: "paragraph",
                  content: "Transparency protects everyone.",
                },
                {
                  type: "subheading",
                  content: "For every job, providers are required to:",
                },
                {
                  type: "list",
                  items: [
                    "Upload clear before photos of the service area",
                    "Upload clear after photos once work is complete",
                    "Ensure photos accurately reflect the work performed",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "Photos help confirm completion and prevent misunderstandings.",
                },
              ]}
            />

            {/* Section 4 */}
            <PolicySection
              number="4"
              title="Completing a Job"
              items={[
                {
                  type: "paragraph",
                  content: "Only mark a job as complete when:",
                },
                {
                  type: "list",
                  items: [
                    "All required work has been finished",
                    "All required photos have been uploaded",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "Once submitted, the customer will review the job. If there's an issue, iNeed may step in to help resolve it fairly.",
                },
              ]}
            />

            {/* Section 5 */}
            <PolicySection
              number="5"
              title="When Issues Come Up"
              items={[
                {
                  type: "paragraph",
                  content:
                    "If a customer has concerns or a conversation becomes uncomfortable:",
                },
                {
                  type: "list",
                  items: [
                    "Do not argue or escalate directly",
                    "You will have the option to use the Support Escalation feature",
                    "Allow iNeed to step in and manage communication",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "Our role is to support both sides and help find solutions.",
                },
              ]}
            />

            {/* Section 6 */}
            <PolicySection
              number="6"
              title="Payments & Payouts"
              items={[
                {
                  type: "paragraph",
                  content:
                    "iNeed handles payments to make things simple and reliable.",
                },
                {
                  type: "subheading",
                  content: "Providers can expect:",
                },
                {
                  type: "list",
                  items: [
                    "Transparent tracking of completed jobs",
                    "Payouts processed through the platform",
                    "Payments released once the job is confirmed",
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
              title="Accountability & Fair Use"
              items={[
                {
                  type: "paragraph",
                  content: "To maintain a healthy platform:",
                },
                {
                  type: "list",
                  items: [
                    "False completion claims are not permitted",
                    "Circumventing the platform is not allowed",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "Our goal is fairness, consistency, and long-term success for everyone.",
                },
              ]}
            />

            {/* Section 8 */}
            <PolicySection
              number="8"
              title="Our Commitment to You"
              items={[
                {
                  type: "paragraph",
                  content:
                    "iNeed is built to support providers, not just assign jobs.",
                },
                {
                  type: "subheading",
                  content: "We're here to:",
                },
                {
                  type: "list",
                  items: [
                    "Provide consistent opportunities",
                    "Offer support when challenges arise",
                    "Create a fair, respectful environment",
                    "Help you focus on delivering great service",
                  ],
                },
                {
                  type: "footer",
                  content: "When providers succeed, the platform succeeds.",
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
      {/* Content */}
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
                  className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed"
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
