import { loadStripe } from '@stripe/stripe-js';
import apiClient from '@/lib/apiClient';
import { CourseDTO } from '../courses/courseTypes';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const startCheckout = async (userId: string, amountInCents: number, title: string, successUrl: string, cancelUrl: string) => {
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

export const startCourseCheckout = async (email: string, course: CourseDTO, successUrl: string, cancelUrl: string) => {
  course.price = course.price * 100
  const response = await apiClient.post('/stripe/create-course-checkout-session', {
    email,
    course,
    successUrl,
    cancelUrl
  });

  const stripe = await stripePromise;
  if (response.data.url && stripe) {
    window.location.href = response.data.url;  // Redirects user to Stripe Checkout
  }
};

