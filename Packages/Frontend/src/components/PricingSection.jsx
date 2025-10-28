import React from 'react';

// --- Icon Placeholders ---

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12.586l2.828 2.828-1.414-4.243 3.535-2.5-4.243-.707L10 3.172 7.293 8.243 3.05 8.95L6.586 11.457 5.172 15.69l2.828-2.828z" />
    </svg>
);

const LightningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

const CrownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 6L14 3 20 3 20 6"></path>
        <path d="M4 6L4 3 10 3 10 6"></path>
        <path d="M12 18s6-3 6-9H6s0 6 6 9z"></path>
        <path d="M12 21L12 18"></path>
    </svg>
);


// --- Feature Data ---

const pricingPlans = [
  {
    name: "Free",
    tagline: "Perfect for getting started with skill exchange",
    price: "$0",
    interval: "/forever",
    buttonText: "Get Started",
    buttonClass: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    isPopular: false,
    icon: StarIcon,
    iconBg: "bg-blue-500",
    features: [
      "3 skill exchanges per month",
      "Basic profile customization",
      "Access to skill categories",
      "Community forum access",
      "Email support",
      "Basic badges & achievements",
    ],
  },
  {
    name: "Pro",
    tagline: "For active learners and dedicated mentors",
    price: "$12",
    interval: "/per month",
    buttonText: "Start Free Trial",
    buttonClass: "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:opacity-90",
    isPopular: true,
    icon: LightningIcon,
    iconBg: "bg-blue-500",
    features: [
      "Unlimited skill exchanges",
      "Priority matching algorithm",
      "Advanced profile features",
      "Video session recording",
      "Priority support",
      "All badges & achievements",
      "Analytics dashboard",
      "Calendar integration",
    ],
  },
  {
    name: "Teams",
    tagline: "For organizations and learning communities",
    price: "$49",
    interval: "/per month",
    buttonText: "Contact Sales",
    buttonClass: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    isPopular: false,
    icon: CrownIcon,
    iconBg: "bg-purple-600",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team analytics & insights",
      "Custom branding",
      "Dedicated account manager",
      "SSO & advanced security",
      "API access",
      "Custom integrations",
    ],
  },
];

// --- Sub-Components ---

const FeatureListItem = ({ text }) => (
  <li className="flex items-start mb-2">
    <CheckIcon />
    <span className="ml-3 text-sm text-gray-600">{text}</span>
  </li>
);

const PricingCard = ({ plan }) => {
  const IconComponent = plan.icon;

  // Conditional classes for the popular card
  const cardClasses = plan.isPopular
    ? "shadow-2xl border-2 border-blue-500 transform scale-[1.03] translate-y-[-10px] z-10"
    : "shadow-lg border border-gray-200";

  const wrapperClasses = plan.isPopular
    ? "relative rounded-2xl bg-white p-6 pt-10"
    : "relative rounded-2xl bg-white p-6 pt-10";

  return (
    <div className={`w-full max-w-sm mx-auto ${cardClasses}`}>
      <div className={wrapperClasses}>
        
        {/* Most Popular Badge */}
        {plan.isPopular && (
          <span 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       px-4 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full shadow-lg"
          >
            Most Popular
          </span>
        )}

        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${plan.iconBg}`}>
          <IconComponent />
        </div>

        {/* Plan Header */}
        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
        <p className="text-sm text-gray-500 mb-6">{plan.tagline}</p>

        {/* Price */}
        <p className="text-3xl font-bold text-gray-900">
          {plan.price}
          <span className="text-base font-normal text-gray-500">{plan.interval}</span>
        </p>

        {/* Button */}
        <button 
          className={`w-full mt-6 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${plan.buttonClass}`}
        >
          {plan.buttonText}
        </button>
        
        {/* Separator */}
        <p className="text-sm font-semibold text-gray-800 mt-8 mb-4">What's included:</p>

        {/* Features List */}
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <FeatureListItem key={index} text={feature} />
          ))}
        </ul>

      </div>
    </div>
  );
};

// --- Main Component ---
const PricingSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-8">
                <StarIcon />
                <span className="ml-1">Simple, Transparent Pricing</span>
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
            <p className="text-md text-gray-600 max-w-2xl mx-auto">
                Start free and upgrade as you grow. All plans include our core features with no hidden fees.
            </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start space-y-12 lg:space-y-0 lg:space-x-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        {/* Footer Guarantee */}
        <div className="text-center mt-16 text-sm text-gray-600">
            <span role="img" aria-label="money back">💰</span> 30-day money-back guarantee on all paid plans
        </div>

      </div>
    </div>
  );
};

export default PricingSection;