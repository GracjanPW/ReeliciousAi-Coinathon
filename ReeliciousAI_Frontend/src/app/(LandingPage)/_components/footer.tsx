import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full px-6 pt-12 pb-6 bg-gradient-to-b from-[#9732BC]/0 to-[#9732BC]/30 text-white font-light">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <ul className="space-y-1 text-sm md:text-base">
          {["Features", "Pricing", "Testimonials", "Documentation"].map(
            (item) => (
              <li key={item}>
                <Link
                  href=""
                  className="transition-opacity duration-300 hover:opacity-60"
                >
                  {item}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="flex flex-col items-center gap-4">
          <Image
            src="/logo2.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-24 md:w-28"
          />
          <div className="flex gap-4 opacity-70">
            {["instagram", "facebook", "twitter", "youtube"].map((platform) => (
              <Link
                key={platform}
                href=""
                className="transition-opacity duration-300 hover:opacity-40"
              >
                <Image
                  src={`/social/${platform}_icon.svg`}
                  alt={platform}
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>

        <ul className="space-y-1 text-sm md:text-base text-right">
          {["Support", "About us", "Privacy Policy", "GDPR"].map((item) => (
            <li key={item}>
              <Link
                href=""
                className="transition-opacity duration-300 hover:opacity-60"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-screen mt-10">
        <hr className="border-t border-white/30" />
      </div>

      <div className="text-center text-xs mt-4 tracking-wide font-light">
        © 2025 ReeliciousAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
