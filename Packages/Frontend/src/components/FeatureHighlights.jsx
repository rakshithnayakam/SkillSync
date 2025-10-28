import React from 'react';
// Import necessary icons from Heroicons
import { 
    ShieldCheckIcon, // Used for Verified Members
    LockClosedIcon,   // Used for Secure Platform
    TrophyIcon,       // Used for Quality Guaranteed (resembles the ribbon/award)
    ClockIcon         // Used for 24/7 Support
} from '@heroicons/react/24/outline';

// Data structure for the features
const features = [
    {
        icon: ShieldCheckIcon,
        title: 'Verified Members',
        description: 'All users go through identity verification',
    },
    {
        icon: LockClosedIcon,
        title: 'Secure Platform',
        description: 'Bank-level encryption protects your data',
    },
    {
        icon: TrophyIcon,
        title: 'Quality Guaranteed',
        description: 'Rated 4.9/5 by 10,000+ users',
    },
    {
        icon: ClockIcon,
        title: '24/7 Support',
        description: 'Our team is always here to help',
    },
];

const FeatureHighlights = () => {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-scree px-4 sm:px-6 lg:px-8">
                
                {/* Feature Grid Container */}
                <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="text-center">
                            
                            {/* Icon Container (matches the light blue rounded background) */}
                            <div className="mx-auto h-16 w-16 flex items-center justify-center 
                                            rounded-xl bg-blue-50 shadow-sm mb-4">
                                
                                {/* Icon itself (blue color, medium size) */}
                                <feature.icon className="h-7 w-7 text-blue-600" aria-hidden="true" />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-medium text-gray-900 mt-4">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-2 text-sm text-gray-500 max-w-[250px] mx-auto">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureHighlights;