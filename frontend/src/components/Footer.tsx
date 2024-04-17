import { Link } from "react-router-dom";

interface FooterProps {
  footer: string;
  linkLabel: string;
  link: string;
}

export const Footer = ({ footer, link, linkLabel }: FooterProps) => {
  return (
    <div className="text-center text-sm">
      {footer}{" "}
      <Link to={link} className="underline">
        {linkLabel}
      </Link>
    </div>
  );
};
