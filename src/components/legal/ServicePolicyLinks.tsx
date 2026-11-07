import Link from "next/link";

export function ServicePolicyLinks() {
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <p>All prices are in USD. Request a written scope and quote before paying. Sending a request does not authorize a charge.</p>
      <nav aria-label="Service and payment policies" className="flex flex-wrap gap-x-5 gap-y-2">
        <Link className="underline underline-offset-4" href="/legal/terms">Terms and Conditions</Link>
        <Link className="underline underline-offset-4" href="/legal/refund-cancellation">Refunds and Cancellations</Link>
        <Link className="underline underline-offset-4" href="/legal/delivery-payment">Delivery and Payment</Link>
        <Link className="underline underline-offset-4" href="/legal/privacy-policy">Privacy Policy</Link>
      </nav>
    </div>
  );
}
