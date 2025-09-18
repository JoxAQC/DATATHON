import React from 'react';

const RobberyIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M3 3h18v18H3z" fill="currentColor" opacity="0.2"/>
    <path d="M12 12a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5z"/>
    <path d="M21 21L12 12l-9 9"/>
    <path d="M3 21V3"/>
    <path d="M21 3v18"/>
  </svg>
);

export default RobberyIcon;
