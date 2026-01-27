// src/components/DashboardComponents/Icons.jsx (Helper Icons)
import React from 'react';

// Common icon setup
const Icon = ({ children, className = "h-6 w-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        {children}
    </svg>
);

export const HandWaveIcon = (props) => (
    <span {...props} role="img" aria-label="wave">👋</span>
);

export const ArrowRightIcon = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></Icon>
);

// Badge Icons
export const ExpertTeacherIcon = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>
);
export const QuickLearnerIcon = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.25 2.25 0 0021 18.25V5.25A2.25 2.25 0 0018.75 3h-12A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21z" /></Icon>
);
export const StarIcon = (props) => (
    <Icon {...props}><path fillRule="evenodd" d="M10.788 3.212a.75.75 0 011.424 0l4.27 8.358 9.243 1.341a.75.75 0 01.417 1.279l-6.702 6.536 1.583 9.222a.75.75 0 01-1.087.795L12 18.016l-8.283 4.354a.75.75 0 01-1.087-.795l1.583-9.222-6.702-6.536a.75.75 0 01.417-1.28l9.243-1.34L10.788 3.212z" clipRule="evenodd" /></Icon>
);
export const StreakMasterIcon = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0l4.5-4.5m-4.5 4.5l-4.5-4.5M21 18v-5.25M3 18v-5.25" /></Icon>
);

// Requests Icons (Simulating the clock, checkmark, and circular loader)
export const ClockIcon = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>
);
export const CheckCircleIcon = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>
);
export const StatusIcon = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25A1.875 1.875 0 0112 4.125V4.5a3 3 0 00-3 3h-.375a1.875 1.875 0 01-1.875-1.875V4.125A1.875 1.875 0 018.25 2.25h3.625zM22.5 10.5h-4.5a2.25 2.25 0 00-2.25 2.25v1.5a2.25 2.25 0 002.25 2.25h4.5a2.25 2.25 0 002.25-2.25v-1.5a2.25 2.25 0 00-2.25-2.25z" /></Icon>
);