window.SaaSConfig = {
  analytics: {
    enabled: true, // Enable or disable analytics tracking
    provider: "GoogleAnalytics", // Options: GoogleAnalytics, Mixpanel, Custom
    trackingId: "UA-XXXXX-Y",
  },

  monetization: {
    enabled: true, // Enable or disable monetization features
    plans: ["free", "pro", "enterprise"], // Available subscription plans
    defaultPlan: "free",
    billingProvider: "Stripe", // Options: Stripe, PayPal, Custom
    supportedCurrencies: ["USD", "EUR", "GBP", "INR"], // Supported payment currencies
  },

  promotions: {
    enabled: true, // Enable or disable promotional offers
    discountCodes: ["WELCOME10", "SUMMER20"], // Active discount codes
    seasonalOffers: {
      blackFriday: { discount: 30, active: true },
      cyberMonday: { discount: 25, active: true },
    },
  },

  authentication: {
    methods: ["email", "google", "github"], // Supported login methods
    twoFactorAuth: true, // Enable 2FA for added security
    sessionTimeout: 3600, // Session timeout in seconds (1 hour)
  },

  api: {
    enabled: true, // Enable or disable API access
    rateLimit: 1000, // API requests per hour
    keyRotation: true, // Enable automatic API key rotation
  },

  ui: {
    theme: "light", // Default UI theme, options: light, dark, auto
    defaultLanguage: "en", // Default language setting
    supportedLanguages: ["en", "es", "fr", "de", "zh", "hi"], // Available languages
    branding: {
      logo: "/assets/logo.png",
      primaryColor: "#4a90e2",
    },
  },

  notifications: {
    enabled: true, // Enable system notifications
    email: true, // Enable email notifications
    push: false, // Enable push notifications
  },

  security: {
    dataEncryption: true, // Enable end-to-end encryption
    contentSecurityPolicy: "strict", // Options: strict, relaxed, none
    autoLogout: 30, // Auto logout after inactivity (minutes)
  },

  featureFlags: {
    betaAccess: false, // Enable beta features for select users
    aiAssistant: true, // Enable AI-powered assistant
    userFeedback: true, // Enable user feedback system
  },

  support: {
    liveChat: true, // Enable live chat support
    emailSupport: "support@yourcompany.com",
    communityForum: "https://forum.yourcompany.com",
  },

  integrations: {
    enabled: true, // Enable third-party integrations
    available: ["Slack", "Zapier", "HubSpot"], // Supported integrations
  },

  regions: {
    supported: ["US", "EU", "UK", "IN", "AU"], // Regions where the SaaS is available
    default: "US",
    geoRestrictions: {
      CN: false, // Block access in China
      RU: false, // Block access in Russia
    },
  },
};

// console.log("SaaSConfig Loaded:", window.SaaSConfig);

window.SaaSConfig = {
  ...window.SaaSConfig, // Merge with existing config

  scalability: {
    multiTenantSupport: false, // Handle multiple customers in one deployment
    regionalDataCenters: false, // Store data in region-specific centers (GDPR compliance)
    highAvailability: false, // Ensure system uptime even under heavy load
  },

  advancedSecurity: {
    sso: false, // Single Sign-On (SSO) for enterprise clients
    auditLogs: false, // Record user activity for security and compliance
    biometricLogin: false, // Support fingerprint or facial recognition login
  },

  growthFeatures: {
    referralProgram: false, // Enable user referral rewards
    affiliateMarketing: false, // Allow affiliates to promote the product
    loyaltyRewards: false, // Offer perks for long-term users
  },

  enterpriseFeatures: {
    customSLAs: false, // Offer Service Level Agreements (SLAs) for enterprise clients
    dedicatedSupport: false, // Priority support for high-paying customers
    whiteLabeling: false, // Allow branding customization for resellers
  },

  automation: {
    aiInsights: false, // AI-powered analytics and recommendations
    workflowAutomation: false, // Automate tasks and processes
    autoScaling: false, // Dynamically scale infrastructure based on demand
  },

  compliance: {
    GDPR: false, // European privacy compliance
    HIPAA: false, // Healthcare data protection compliance
    SOC2: false, // Security compliance for enterprise SaaS
  },

  developerTools: {
    webhooks: false, // Allow users to integrate with external systems
    customAPIs: false, // Allow API extensions by users
    pluginMarketplace: false, // Support third-party plugins/extensions
  },

  paymentsExpansion: {
    cryptoPayments: false, // Accept Bitcoin, Ethereum, etc.
    invoiceBilling: false, // Generate invoices for businesses
    taxCalculation: false, // Automatic tax calculation based on region
  },

  localization: {
    rightToLeftSupport: false, // RTL support for Arabic/Hebrew languages
    culturalAdaptation: false, // Adjust UI/UX for different cultural norms
  },

  teamCollaboration: {
    multiUserAccounts: false, // Allow multiple users per account
    roleBasedAccess: false, // Granular permission settings for teams
    teamChat: false, // In-app messaging system for team communication
  },

  hardwareIntegration: {
    IoTSupport: false, // Connect with smart devices
    hardwareSecurityTokens: false, // Physical security keys for login
  },

  customerEngagement: {
    AIChatbots: false, // AI-powered chat support
    communityForums: false, // User discussion and self-help forums
    userSurveys: false, // Collect feedback from users
  },
};

// console.log("Updated SaaSConfig with Future Features:", window.SaaSConfig);
