import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Fair Use Policy | iNeed",
  description:
    "Simple and transparent pricing policy for service fees, cancellations, and fair use.",
  keywords:
    "pricing policy, fair use policy, service fee, cancellation policy, iNeed",
};

export default function PricingFairUsePolicyPage() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black">
      <div className="mx-auto max-w-4xl px-6 py-10 sm:px-10 sm:py-14">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          Pricing &amp; Fair Use Policy
        </h1>

        <p className="mt-6 text-base leading-7 sm:text-lg sm:leading-8">
          At iNeed, we believe in simple, transparent pricing with no surprises.
          This policy outlines how service fees and cancellations are handled to
          ensure a fair experience for both customers and service providers.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
            Service Fee
          </h2>

          <p className="mt-5 text-base leading-7 sm:text-lg sm:leading-8">
            To support platform operations, customer support, and secure booking
            management, a <strong>5% service fee</strong> is applied to each
            booking.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-10 text-base leading-7 sm:text-lg sm:leading-8">
            <li>
              The service fee is <strong>capped at $9 per booking</strong>
            </li>
            <li>
              This fee is included in your total at checkout before payment is
              completed
            </li>
            <li>
              There are <strong>no hidden fees</strong>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
            Cancellation Policy
          </h2>

          <p className="mt-5 text-base leading-7 sm:text-lg sm:leading-8">
            We understand that plans can change. Our cancellation policy is
            designed to respect both your time and the service provider&apos;s
            schedule.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-10 text-base leading-7 sm:text-lg sm:leading-8">
            <li>
              <strong>
                Cancellations made 12 hours or more before the scheduled service
              </strong>
              <p className="ml-0">→ Full refund</p>
            </li>
            <li>
              <strong>
                Cancellations made less than 12 hours before the scheduled
                service
              </strong>
              <p className="ml-0">→ A $25 cancellation fee will apply</p>
            </li>
            <li>
              <strong>
                First-time late cancellations may be waived as a one-time
                courtesy
              </strong>
            </li>
          </ul>

          <p className="mt-2 text-base leading-7 sm:text-lg sm:leading-8">
            All cancellations must be made through your account dashboard.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
            Fair Use
          </h2>

          <p className="mt-5 text-base leading-7 sm:text-lg sm:leading-8">
            Our policies are in place to ensure reliability and fairness across
            the platform.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-10 text-base leading-7 sm:text-lg sm:leading-8">
            <li>
              Repeated last-minute cancellations may result in restricted
              booking access
            </li>
            <li>
              Misuse of the platform may lead to account review or suspension
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
