import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Policy | iNeed",
  description:
    "At iNeed, our goal is simple: make getting services feel clear, supported, and stress-free. Learn about our customer policies and commitments.",
  keywords:
    "customer policy, service booking, terms and conditions, customer support",
};

export default function CustomerPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Customer <span className="text-primary">Policy</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              At iNeed, our goal is simple: make getting services feel clear,
              supported, and stress-free. Here&apos;s what you can expect when
              you book through our platform.
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
              title="Clear Booking, No Guesswork"
              items={[
                {
                  type: "paragraph",
                  content: "When you book a service through iNeed, you'll see:",
                },
                {
                  type: "list",
                  items: [
                    "The service type and details upfront",
                    "Your scheduled date and time",
                    "Clear instructions on how to communicate with your provider",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "All booking details and messages stay in one place so nothing gets lost.",
                },
              ]}
            />

            {/* Section 2 */}
            <PolicySection
              number="2"
              title="Trusted Providers"
              items={[
                {
                  type: "paragraph",
                  content:
                    "We work with independent service providers who are committed to delivering quality work and professionalism. Each provider:",
                },
                {
                  type: "list",
                  items: [
                    "Receives clear job details before arrival",
                    "Communicates through the iNeed platform",
                    "Confirms completed work with before-and-after photos",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "While providers operate independently, iNeed stays involved to help ensure accountability and clarity throughout the service.",
                },
              ]}
            />

            {/* Section 3 */}
            <PolicySection
              number="3"
              title="Transparent Communication"
              items={[
                {
                  type: "paragraph",
                  content: "All communication happens within iNeed so:",
                },
                {
                  type: "list",
                  items: [
                    "Questions are easy to track",
                    "Expectations are clearly documented",
                    "Support can step in if needed",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "If something feels unclear at any point, we encourage you to reach out—we're here to help.",
                },
              ]}
            />

            {/* Section 4 */}
            <PolicySection
              number="4"
              title="Job Completion & Confirmation"
              items={[
                {
                  type: "paragraph",
                  content: "Once your service is completed:",
                },
                {
                  type: "list",
                  items: [
                    "Your provider will upload before-and-after photos",
                    "You'll have the opportunity to review the work",
                    "You can confirm completion directly through the platform",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "If everything looks good, the booking will be finalized. If something needs attention, you can let us know.",
                },
              ]}
            />

            {/* Section 5 */}
            <PolicySection
              number="5"
              title="Support When You Need It"
              items={[
                {
                  type: "paragraph",
                  content:
                    "Sometimes things don't go perfectly—and that's okay.",
                },
                {
                  type: "subheading",
                  content: "If an issue comes up:",
                },
                {
                  type: "list",
                  items: [
                    "You can report it directly through your provider or iNeed support team",
                    "Our support team will review the details",
                    "We'll work toward a fair resolution for everyone involved",
                    "Our focus is on solutions, not blame.",
                  ],
                },
              ]}
            />

            {/* Section 6 */}
            <PolicySection
              number="6"
              title="Fair & Respectful Interactions"
              items={[
                {
                  type: "paragraph",
                  content: "We ask that all customers:",
                },
                {
                  type: "list",
                  items: [
                    "Treat providers with courtesy and respect",
                    "Provide accurate service details and access instructions",
                    "Communicate concerns calmly through the platform",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "Great service experiences happen when everyone works together.",
                },
              ]}
            />

            {/* Section 7 */}
            <PolicySection
              number="7"
              title="Termination Policy"
              items={[
                {
                  type: "paragraph",
                  content:
                    "We reserve the right to suspend or terminate your access if:",
                },
                {
                  type: "list",
                  items: [
                    "You violate these terms.",
                    "You fail to pay subscription fees.",
                    "Your account remains inactive beyond allowed duration.",
                  ],
                },
              ]}
            />

            {/* Section 8 */}
            <PolicySection
              number="8"
              title="Our Promise"
              items={[
                {
                  type: "paragraph",
                  content:
                    "iNeed isn't just about booking a service—it's about feeling confident from start to finish.",
                },
                {
                  type: "paragraph",
                  content:
                    "We're here to support you, communicate clearly, and help ensure every service experience feels reliable, fair, and handled with care.",
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
