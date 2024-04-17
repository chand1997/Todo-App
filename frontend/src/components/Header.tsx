interface HeaderProps {
  heading: string;
}

export const Header = ({ heading }: HeaderProps) => {
  return <div className="text-2xl font-mono text-center">{heading}</div>;
};
