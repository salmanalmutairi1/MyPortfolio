import React from 'react';
import { Code2 } from 'lucide-react';

const TECH_ICON_MAP: Record<string, string> = {
  Flutter: 'flutter',
  Firebase: 'firebase',
  'VS Code': 'vscodium',
  Cloudflare: 'cloudflare',
  'Android Studio': 'androidstudio',
  Xcode: 'xcode',
  SwiftUI: 'swift',
  SwiftData: 'swift',
  Figma: 'figma',
  TypeScript: 'typescript',
  TailwindCSS: 'tailwindcss',
  Vite: 'vite',
  'Local Storage': 'html5'
};

type TechIconProps = {
  name: string;
  className?: string;
};

const TechIcon: React.FC<TechIconProps> = ({ name, className }) => {
  const slug = TECH_ICON_MAP[name];

  if (!slug) {
    return <Code2 className={className} aria-hidden="true" />;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/ffffff`}
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
};

export default TechIcon;
