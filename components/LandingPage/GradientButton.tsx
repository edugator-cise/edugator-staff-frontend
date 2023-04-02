import Link from "next/link";

export const GradientButton = ({
  text,
  href,
}: {
  text: string;
  href: string;
}) => {
  return (
    <Link href={href}>
      <button className="btn-gradient">
        <p className="text-white font-dm text-sm text-center">{text}</p>
      </button>
    </Link>
  );
};
