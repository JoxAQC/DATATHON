import React from 'react';

const HomicideIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M16 12l-4 4-4-4" />
    <path d="M12 8v8" />
    <path d="M8.5 7.5l-2-2" />
    <path d="M15.5 7.5l2-2" />
  </svg>
);

export default HomicideIcon;
