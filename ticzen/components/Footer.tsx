import Link from "next/link";

const allEvents = ["Comedy", "Concerts", "Seminar", "Conference", "Night Life", "Launching", "Tours", "Fashion"];
const moreInfo = ["Terms & Conditions", "Accessibility", "FAQ", "About Us", "Privacy Policy"];
const support = ["Contact Us", "Pricing", "Help", "How it Works", "Partner program"];

const SocialIcons = () => (
  <div className="flex gap-3 mt-6">
    {[
      { label: "f", title: "Facebook" },
      { label: "in", title: "LinkedIn" },
      { label: "𝕏", title: "X (Twitter)" },
      { label: "▶", title: "YouTube" },
    ].map(({ label, title }) => (
      <a key={title} href="#" title={title} className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors text-xs font-bold">
        {label}
      </a>
    ))}
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-black tracking-tight text-white">
                TIC<span className="bg-white text-black px-0.5 rounded">ZE</span>N
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Lorem ipsum dolor sit Lore Lorem ipsum dolor sit Lore Lorem ipsum dolor sit Lore Lorem ipsum dolor sit Lore Lorem ipsum dolor sit Lore Lorem ipsum dolor sit.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Lorem ipsum dolor sit Lore Lorem ipsum dolor sit Lore Lorem ipsum dolor sit.
            </p>
          </div>

          {/* All Events */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">ALL EVENTS</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {allEvents.map((item) => (
                <Link key={item} href={`/events?category=${item.toLowerCase()}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* More Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">More Info</h4>
            <ul className="space-y-2">
              {moreInfo.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
            <SocialIcons />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>Copyright © 2026 Design by CODEZEN</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms & Condition</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
