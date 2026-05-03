import Link from "next/link";

const col1 = ["Comedy", "Concerts", "Seminar", "Conference", "Night Life", "Launching", "Tours", "Fashion"];
const col2 = ["Comedy", "Concerts", "Seminar", "Conference", "Night Life", "Launching", "Tours", "Fashion"];
const moreInfo = ["Terms & Conditions", "Accessibility", "FAQ", "About Us", "Privacy Policy"];
const support = ["Contact Us", "Pricing", "Help", "How it Works", "Partner program"];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                TIC
                <span className="inline-block bg-white text-gray-900 px-1 py-0.5 mx-0.5 rounded-sm">ZE</span>
                N
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-400 mb-3">
              Lorem ipsum dolor sit Lore Lorem ipsum dolor sit Lore Lorem ipsum dolor sit Lore Lorem ipsum dolor sit.
            </p>
            <p className="text-xs leading-relaxed text-gray-400">
              Lorem ipsum dolor sit Lore Lorem ipsum dolor sit Lore.
            </p>
          </div>

          {/* All Events */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">ALL EVENTS</h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              {col1.map((item) => (
                <Link key={item} href={`/events?category=${item.toLowerCase()}`}
                  className="text-xs text-gray-400 hover:text-white transition-colors">{item}</Link>
              ))}
            </div>
          </div>

          {/* More Info */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">More Info</h4>
            <ul className="space-y-2">
              {moreInfo.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-2 mb-6">
              {support.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { label: "f", title: "Facebook" },
                { label: "in", title: "LinkedIn" },
                { label: "𝕏", title: "X" },
                { label: "▶", title: "YouTube" },
              ].map(({ label, title }) => (
                <a key={title} href="#" title={title}
                  className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-[11px] font-bold text-gray-400 hover:text-white hover:border-gray-400 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-gray-500">Copyright © 2026 Design by CODEZEN</p>
          <div className="flex gap-4">
            <Link href="#" className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors">Terms & Condition</Link>
            <Link href="#" className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
