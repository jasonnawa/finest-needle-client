'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { getCourseById } from '@/api/courses/courseService';
import { CourseDTO } from '@/api/courses/courseTypes';
import { startCourseCheckout } from '@/api/stripe/stripeService';
import ReactMarkdown from 'react-markdown';

type PageProps = {
  params: Promise<{ id: string }>;
};
const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND_URL

export default function CourseDescriptionPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [course, setCourse] = useState<CourseDTO | null>(null)
  const [isLoading, setIsLoading] = useState(false);


  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const router = useRouter();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourseById(id);
        if (res.status) {
          setCourse(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchCourses();
  }, []);

  const handleBuyNow = async () => {
    if (course && emailValid) {
      setIsLoading(true);
      try {
        await startCourseCheckout(email, course, `${FRONTEND}/payment/success`, `${FRONTEND}/payment/failure`);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const markdownStyles = {
    paragraph: {
      marginBottom: '1em',
      lineHeight: '1.6',
    },
    heading: {
      marginTop: '1.5em',
      marginBottom: '0.5em',
    },
    list: {
      paddingLeft: '1.5em',
      marginBottom: '1em',
    },
    listItem: {
      marginBottom: '0.5em',
    },
  };

  return (
    <section className="min-h-screen bg-white px-6 py-20 flex items-center justify-center">
      {course && <div className="max-w-6xl w-full bg-gray-100 p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-pink-600">{course.title}</h1>
        <ReactMarkdown
          components={{
            p: ({ children }) => <p style={markdownStyles.paragraph}>{children}</p>,
            h1: ({ children }) => <h1 style={markdownStyles.heading}>{children}</h1>,
            h2: ({ children }) => <h2 style={markdownStyles.heading}>{children}</h2>,
            h3: ({ children }) => <h3 style={markdownStyles.heading}>{children}</h3>,
            ul: ({ children }) => <ul style={markdownStyles.list}>{children}</ul>,
            ol: ({ children }) => <ol style={markdownStyles.list}>{children}</ol>,
            li: ({ children }) => <li style={markdownStyles.listItem}>{children}</li>,
          }}
        >
          {course.description}
        </ReactMarkdown>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Enter your email to continue:
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="you@example.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-gray-800">€{course.price}</span>
          <button
            onClick={handleBuyNow}
            disabled={!emailValid || isLoading}
            className={`${emailValid && !isLoading ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-400 cursor-not-allowed'
              } text-white px-6 py-2 rounded text-sm transition flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              "Buy Now"
            )}
          </button>

        </div>
      </div>}

      {!course && (
        <div className="w-full flex flex-col items-center justify-center py-16 text-gray-400">
          <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25v.008h.008V14.25H12zm0 0a4.5 4.5 0 01-4.5-4.5 4.5 4.5 0 119 0 4.5 4.5 0 01-4.5 4.5zm0 0v3.75"></path>
          </svg>
          <p className="text-lg font-semibold">No courses available</p>
          <p className="text-sm">Please check back later.</p>
        </div>
      )}
    </section>
  );
}
