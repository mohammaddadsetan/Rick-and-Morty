import Link from "next/link";
import React from "react";

type navLinkprops = {
  href?: string;
  text: string;
  className?: string;
};

export default function NavButton({
  href = "#",
  text,
  className,
}: navLinkprops) {
  return (
    <Link className={className} href={href}>
      {text}
    </Link>
  );
}
