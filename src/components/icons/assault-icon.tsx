import React from 'react';

const AssaultIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M11.83 2.17a2.5 2.5 0 0 1 3.34 0l8.66 8.66a2.5 2.5 0 0 1 0 3.34l-8.66 8.66a2.5 2.5 0 0 1-3.34 0L3.17 14.17a2.5 2.5 0 0 1 0-3.34l8.66-8.66z" />
    <path d="M7 17l10-10" />
    <path d="M12 22V12" />
    <path d="M22 12H12" />
  </svg>
);

export default AssaultIcon;
