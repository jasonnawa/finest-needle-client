'use client';

const testimonials = [
  {
    text: `"We matched in two days and met in person within a week. Now we're engaged!"`,
    author: '– Amara & Tunde, Manchester',
  },
  {
    text: `"I was skeptical... now I’m grateful. We just moved in together!"`,
    author: '– Aisha & Kwame, London',
  },
  {
    text: `"Never thought online dating could work until now. We're planning a wedding!"`,
    author: '– Zainab & Chinedu, Birmingham',
  },
  {
    text: `"I found my person on this site. We’re happier than ever!"`,
    author: '– Kofi & Ngozi, Leds',
  },
  {
    text: `"Real people. Real matches. Real love. ❤️"`,
    author: '– Sade & Olu, Johannesburg',
  },
];


export default function TestimonialsMarquee() {
    return (
      <section className="py-20 bg-[var(--accent-light)] overflow-hidden">
        <h2 className="text-[#ff4d88] text-4xl font-bold mb-12 text-center">Success Stories</h2>
  
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max gap-8 marquee">
            {[...testimonials, ...testimonials].map((t, i) => (
              <blockquote
                key={i}
                className="bg-white/90 text-gray-800 p-6 rounded-xl shadow min-w-[280px] max-w-sm"
              >
                <p className="italic mb-3">“{t.text}”</p>
                <footer className="text-sm text-gray-600">{t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    );
  }