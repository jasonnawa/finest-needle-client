import { loadStripe } from '@stripe/stripe-js';
import apiClient from '@/lib/apiClient';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const startCheckout = async (userId: string, amountInCents: number,title: string, successUrl: string, cancelUrl: string) => {
  const response = await apiClient.post('/stripe/create-checkout-session', {
     userId,
     amount: amountInCents,
     title,
     successUrl,
     cancelUrl
    });

  const stripe = await stripePromise;
  if (response.data.url && stripe) {
    window.location.href = response.data.url;  // Redirects user to Stripe Checkout
  }
};
