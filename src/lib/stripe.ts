import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  if (stripeClient) {
    return stripeClient;
  }

  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    return null;
  }

  stripeClient = new Stripe(apiKey);
  return stripeClient;
}

export async function createConnectAccount(email: string) {
  const stripe = getStripeClient();
  if (!stripe) throw new Error("Stripe not configured");

  return stripe.accounts.create({
    type: "express",
    email,
    capabilities: {
      transfers: { requested: true },
    },
  });
}

export async function createAccountLink(accountId: string, returnUrl: string, refreshUrl: string) {
  const stripe = getStripeClient();
  if (!stripe) throw new Error("Stripe not configured");

  return stripe.accountLinks.create({
    account: accountId,
    return_url: returnUrl,
    refresh_url: refreshUrl,
    type: "account_onboarding",
  });
}

export async function createPaymentIntent(amount: number, currency: string, metadata: Record<string, string>) {
  const stripe = getStripeClient();
  if (!stripe) throw new Error("Stripe not configured");

  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    metadata,
  });
}

export async function createTransfer(amount: number, destinationAccountId: string, metadata: Record<string, string>) {
  const stripe = getStripeClient();
  if (!stripe) throw new Error("Stripe not configured");

  return stripe.transfers.create({
    amount: Math.round(amount * 100),
    currency: "usd",
    destination: destinationAccountId,
    metadata,
  });
}
