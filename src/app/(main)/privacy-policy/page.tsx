import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | iNeed",
  description:
    "Learn how iNeed collects, uses, and protects your personal information when you use our platform.",
  keywords: "privacy policy, data protection, user data, iNeed privacy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Your privacy matters to us. This policy explains what information
              we collect, why we collect it, and how we keep it secure when you
              use iNeed.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 sm:space-y-12">
            <PolicySection
              number="1"
              title="Information We Collect"
              items={[
                {
                  type: "paragraph",
                  content:
                    "We collect information needed to provide and improve the iNeed platform.",
                },
                {
                  type: "list",
                  items: [
                    "Account details such as name, email, phone number, and address",
                    "Booking and job information, including service notes and uploaded photos",
                    "Device and usage data such as browser type, log data, and session activity",
                  ],
                },
              ]}
            />

            <PolicySection
              number="2"
              title="How We Use Information"
              items={[
                {
                  type: "paragraph",
                  content:
                    "We use collected information to operate, secure, and improve our services.",
                },
                {
                  type: "list",
                  items: [
                    "Create and manage user accounts",
                    "Process bookings, communication, and payments",
                    "Provide customer support and resolve disputes",
                    "Prevent fraud, abuse, and policy violations",
                  ],
                },
              ]}
            />

            <PolicySection
              number="3"
              title="Information Sharing"
              items={[
                {
                  type: "paragraph",
                  content:
                    "We do not sell personal information. We share data only when necessary to run the platform.",
                },
                {
                  type: "list",
                  items: [
                    "Between customers and providers for service fulfillment",
                    "With service partners who support payments, analytics, or security",
                    "When required by law, legal process, or to protect rights and safety",
                  ],
                },
              ]}
            />

            <PolicySection
              number="4"
              title="Data Retention"
              items={[
                {
                  type: "paragraph",
                  content:
                    "We keep information for as long as needed to provide services, comply with legal obligations, and resolve disputes.",
                },
                {
                  type: "footer",
                  content:
                    "Retention periods may vary based on data type, legal requirements, and account activity.",
                },
              ]}
            />

            <PolicySection
              number="5"
              title="Security Measures"
              items={[
                {
                  type: "paragraph",
                  content:
                    "We use reasonable technical and organizational safeguards to protect your data.",
                },
                {
                  type: "list",
                  items: [
                    "Access controls and account authentication",
                    "Secure payment processing partners",
                    "Monitoring to detect suspicious activity",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "No online system is 100% secure, but we continuously improve protection practices.",
                },
              ]}
            />

            <PolicySection
              number="6"
              title="Your Choices and Rights"
              items={[
                {
                  type: "paragraph",
                  content:
                    "Depending on your location, you may have rights to:",
                },
                {
                  type: "list",
                  items: [
                    "Access or update your personal information",
                    "Request deletion of your account data",
                    "Opt out of non-essential communication",
                  ],
                },
                {
                  type: "footer",
                  content:
                    "You can contact support if you need help with account or privacy requests.",
                },
              ]}
            />

            <PolicySection
              number="7"
              title="Cookies and Similar Technologies"
              items={[
                {
                  type: "paragraph",
                  content:
                    "We use cookies and similar tools to keep sessions active, remember preferences, and analyze platform usage.",
                },
                {
                  type: "list",
                  items: [
                    "Essential cookies for login and security",
                    "Performance cookies for product improvements",
                    "Preference cookies for better user experience",
                  ],
                },
              ]}
            />

            <PolicySection
              number="8"
              title="Policy Updates"
              items={[
                {
                  type: "paragraph",
                  content:
                    "We may update this Privacy Policy as our services evolve or legal requirements change.",
                },
                {
                  type: "footer",
                  content:
                    "When updates are material, we will post the revised policy with the latest effective date. Continued use means acceptance of the updated policy.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

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
