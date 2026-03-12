import Logo from "@/assets/icons/Logo";
import { FaFacebook, FaTwitter, FaGithub, FaInstagram, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 text-zinc-400 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 mx-auto container px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-4 lg:gap-8">
          
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block transition-transform hover:scale-105">
              <Logo />
            </Link>

            <p className="mt-8 max-w-xs text-zinc-400 leading-relaxed font-medium">
              PocketBD is Bangladesh’s premier digital wallet solution. Fast, secure, and built for the modern economy.
            </p>

            <div className="mt-10">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Stay Connected</h4>
              <div className="flex gap-4">
                {[
                  { icon: FaFacebook, href: "#", label: "Facebook" },
                  { icon: FaInstagram, href: "#", label: "Instagram" },
                  { icon: FaTwitter, href: "#", label: "Twitter" },
                  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
                  { icon: FaGithub, href: "#", label: "GitHub" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            <div>
              <p className="font-bold text-white text-lg">Platform</p>
              <ul className="mt-6 space-y-4">
                {[
                  { name: "Personal Wallet", href: "/features" },
                  { name: "Merchant Solutions", href: "/features" },
                  { name: "Money Transfer", href: "/features" },
                  { name: "Bill Payments", href: "/features" },
                  { name: "Mobile Top-up", href: "/features" }
                ].map((item, i) => (
                  <li key={i}>
                    <Link to={item.href} className="text-zinc-500 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                      <FaArrowRight className="size-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-bold text-white text-lg">Company</p>
              <ul className="mt-6 space-y-4">
                {[
                  { name: "About PocketBD", href: "/about" },
                  { name: "Career", href: "#" },
                  { name: "Pricing Plans", href: "/pricing" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "Brand Assets", href: "#" }
                ].map((item, i) => (
                  <li key={i}>
                    <Link to={item.href} className="text-zinc-500 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                      <FaArrowRight className="size-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="font-bold text-white text-lg">Resources</p>
              <ul className="mt-6 space-y-4">
                {[
                  { name: "Help Center", href: "/faq" },
                  { name: "API Docs", href: "#" },
                  { name: "Security", href: "#" },
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" }
                ].map((item, i) => (
                  <li key={i}>
                    <Link to={item.href} className="text-zinc-500 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group">
                      <FaArrowRight className="size-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-sm font-semibold">
            <span>&copy; {currentYear} PocketBD. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-bold">
            <a href="#" className="hover:text-blue-500 transition-colors">English (US)</a>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              System Online
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
