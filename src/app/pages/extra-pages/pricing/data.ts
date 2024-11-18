import { PricingPlan } from "src/app/shared/widget/pricing-cards/pricing-card.model";

const PLANS: PricingPlan[] = [
    {
        id: 1,
        name: 'Professional Pack',
        icon: 'user',
        price: 19,
        features: ['10 GB Storage', '500 GB Bandwidth', 'No Domain', 'Email Support', '24x7 Support'],
        recommended: false
    },
    {
        id: 2,
        name: 'Business Pack',
        icon: 'briefcase',
        price: 29,
        features: ['50 GB Storage', '900 GB Bandwidth', '2 Domain', 'Email Support', '24x7 Support'],
        recommended: true
    },
    {
        id: 3,
        name: 'Professional Pack',
        icon: 'shopping-bag',
        price: 39,
        features: ['100 GB Storage', 'Unlimited Bandwidth', 'Unlimited Domain', 'Email Support', '24x7 Support'],
        recommended: false
    }
];

export { PLANS };
