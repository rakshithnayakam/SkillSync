import { 
    UserPlusIcon,      // Sign Up (Looks like a person with a plus sign)
    UsersIcon,         // Match (Represents two people connecting)
    AcademicCapIcon,   // Learn (Graduation cap)
    TrophyIcon,        // Earn (Trophy/Reward)
} from '@heroicons/react/24/outline';

const steps = [
    {
        id: 1,
        title: 'Sign Up',
        description: 'Create your profile and list the skills you want to learn and teach.',
        icon: UserPlusIcon,
        bgColor: 'bg-blue-600',
        iconBg: 'bg-blue-50', // light background for the icon container
        iconColor: 'text-blue-600',
    },
    {
        id: 2,
        title: 'Match',
        description: 'Our smart algorithm connects you with the perfect learning partner.',
        icon: UsersIcon,
        bgColor: 'bg-purple-600',
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
    },
    {
        id: 3,
        title: 'Learn',
        description: 'Exchange knowledge through virtual sessions or in-person meetups.',
        icon: AcademicCapIcon,
        bgColor: 'bg-green-500',
        iconBg: 'bg-green-50',
        iconColor: 'text-green-600',
    },
    {
        id: 4,
        title: 'Earn',
        description: 'Gain badges, points, and unlock new opportunities as you progress.',
        icon: TrophyIcon,
        bgColor: 'bg-orange-500',
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-600',
    },
];

const HowItWorks = () => {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        How It Works
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Getting started with SkillSync is simple. Follow these four easy steps to begin your learning journey today.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div 
                            key={step.id} 
                            className="relative p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition-shadow duration-300 hover:shadow-xl"
                        >
                            {/* Step Number (Positioned Top Right) */}
                            <div className="absolute top-4 right-4 text-xs font-medium text-gray-400 bg-gray-50 rounded-full h-8 w-8 flex items-center justify-center border border-gray-100">
                                {`0${step.id}`}
                            </div>

                            {/* Icon Container */}
                            <div className={`p-4 rounded-xl inline-flex ${step.iconBg}`}>
                                <step.icon className={`h-8 w-8 ${step.iconColor}`} aria-hidden="true" />
                            </div>

                            {/* Title */}
                            <h3 className="mt-6 text-xl font-semibold text-gray-900">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-2 text-base text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;