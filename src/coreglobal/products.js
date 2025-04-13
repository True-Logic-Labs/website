export const globalProductViewController = {
        "hero":true,
        "toolPreview":true,
        "upsell":true,
        "features":true,
        "pricing":false,
        "testimonials":false,
        "faq": true,
        "toolBlog": false,
        "generalBlog": false,
        "promoteAffiliateEarn": false,
        "makeYourOwnTool": false

}

const productTypes = [
        {
          productTypeID: 1,
          productTypeName: "TextGen",
          description: "These generate text output only. These are created using python backend AI."
        },
        {
          productTypeID: 2,
          productTypeName: "HandMade",
          description: "These can be anything, difference is that that are made each individually."
        }
]


export function calculateTokenPricingWithUnits({
  inputTokensPerCall,
  outputTokensPerCall,
  callsPerMonthAllowedForTool,
  modelRates,
  profitMargin = 1.5,
  baseTokenDefinition = { input: 150, output: 300 }
}) {
  // Total tokens used monthly
  const totalInputTokens = inputTokensPerCall * callsPerMonthAllowedForTool;
  const totalOutputTokens = outputTokensPerCall * callsPerMonthAllowedForTool;
  const totalTokensUsed = totalInputTokens + totalOutputTokens;

  // Rates per token
  const inputRatePerToken = modelRates.input / 1_000_000;
  const outputRatePerToken = modelRates.output / 1_000_000;

  // Total backend cost
  const totalCost = (totalInputTokens * inputRatePerToken) + (totalOutputTokens * outputRatePerToken);
  const costPerCall = totalCost / callsPerMonthAllowedForTool;

  // Suggested pricing with profit
  const suggestedChargePerCall = costPerCall * profitMargin;
  const totalChargeToUser = suggestedChargePerCall * callsPerMonthAllowedForTool;
  
  const baseInput = baseTokenDefinition.input;
  const baseOutput = baseTokenDefinition.output;
  const baseTokenSize = baseInput + baseOutput;
  const totalTokensPerCall = inputTokensPerCall + outputTokensPerCall;
  const totalBaseTokensPerCall = totalTokensPerCall / baseTokenSize;
  const totalBaseTokensUsed = totalBaseTokensPerCall * callsPerMonthAllowedForTool;
  return {
    breakdown: {
      modelUsed: modelRates.modelName,
      callsPerMonthAllowedForTool: `${callsPerMonthAllowedForTool} calls/month`,
      profitMarginPercentage: `${((profitMargin - 1) * 100).toFixed(0)}% profit margin`,
      baseTokenUnitDefinition: `1 system token = ${baseInput} input + ${baseOutput} output tokens`,
      backendCostForAllCalls: `$${totalCost.toFixed(4)} per month`,
      userPaysForAllCalls: `$${totalChargeToUser.toFixed(2)} per month`,
    },
    totalInputTokens: `${totalInputTokens.toLocaleString()} tokens/month`,
    totalOutputTokens: `${totalOutputTokens.toLocaleString()} tokens/month`,
    totalTokensUsed: `${totalTokensUsed.toLocaleString()} tokens/month`,
    totalCost: `$${totalCost.toFixed(4)} per month (backend cost)`,
    costPerCall: `$${costPerCall.toFixed(4)} per call (backend cost)`,
    suggestedChargePerCall: `$${suggestedChargePerCall.toFixed(4)} per call (with profit)`,
    totalChargeToUser: `$${ totalChargeToUser.toFixed( 2 ) } per month (user charge)`,
    totalBaseTokensUsedPerCall: totalBaseTokensPerCall,
    totalBaseTokensUsed: `${totalBaseTokensUsed.toFixed(2)} system tokens/month`,
  };
}


export const configs = [
  {

    "toolDetails": {
      "productID": "1",
      "productTypeID": productTypes[ 0 ].productTypeID,
      "productTypeName": productTypes[ 0 ].productTypeName,
      "inputTokensPerCall": 300,
      "outputTokensPerCall": 1000,
      "freeUsageAllowance": 2,
      "freeUsageAllowancePostLogin": 5,
      "usageAllowanceSubscription": 300,
      "categorisation": {
        "industry": ["Marketing & Advertising AI","E-commerce & Retail AI"],
        "jobRole":["AI Tools for Marketers"],
        "useCase": [ "AI for Text & Content Generation" ],
        "tags":["marketing","advertisement","seo"]
      },
      "releaseStatus": "released",
      "pageViewSettings": {
        "hero":true,
        "toolPreview":true,
        "upsell":true,
        "features":true,
        "pricing":true,
        "testimonials":true,
        "faq": true,
        "toolBlog": false,
        "generalBlog": false,
        "promoteAffiliateEarn": false,
        "makeYourOwnTool": false
      }
    },

    "genCode" : {
    "questions": [
      { "q": "What is the main message of your ad?", "type": "textbox", "typeoptions": "none" },
      { "q": "Who is your target audience?", "type": "textarea", "typeoptions": "none" },
      { "q": "Do you want to include a call-to-action?", "type": "radio", "typeoptions": ["Yes", "No"] },
      { "q": "What tone should your ad have?", "type": "checkbox", "typeoptions": ["Exciting", "Informative", "Persuasive", "Humorous"] },
      { "q": "Should we include emojis in the ad copy?", "type": "radio", "typeoptions": ["Don't put emojis", "Put lots of emojis!"] },
    ],
    "prompt": "Write an ad copy for a social media ad with the message <<A1>>. The target audience is <<A2>>. The ad should have a call-to-action: <<A3>>. The tone should be <<A4>>. <<A5>>. Give only markdown output, no code block.",
    },

    "toolMeta": {
    "title": "Ad Copy Generator",
    "productID": "1",
    "description":
      "Write ad copy that grabs attention and converts. This tool generates social media ad copy designed to hook your audience instantly, leading to <span>higher click-through rates and conversions</span>. Stay ahead of competitors by delivering powerful, persuasive ads that drive results.",
    "bundle": "🚀 Marketing Power Pack",
    "subCat": "📈 Social Media Domination",
    "membershipLevels": ["free", "bundleLevel", "allPremium"],
    "SEO": {
      "keywords":
        "ad copy generator, AI social media ads, Facebook ad copy, Instagram ad creator, increase click-through rates",
      "metaTitle":
        "AI Ad Copy Generator for Social Media | Boost Engagement and CTR",
      "metaDescription":
        "Create high-converting ad copy tailored for Facebook, Instagram, and LinkedIn. Save time and boost your social media engagement with AI-powered ad generation.",
      "og": {
        "title": "AI Ad Copy Generator for Social Media Success | Try for Free",
        "description":
          "Generate attention-grabbing ad copy that converts. Perfect for marketers looking to dominate social media platforms with persuasive, effective ads.",
      },
      "twitterCard": {
        "title": "Boost Social Media Engagement with AI Ad Copy Generator",
        "description":
          "Create powerful, high-converting ad copy effortlessly. Try it for free today.",
      },
      },
    
    "pageDetails": {
      "usecase":
        "Perfect for social media marketers, startups, and e-commerce brands who want to create engaging ads effortlessly.",
      "keywords":
        "ad copy generator, AI social media ads, Facebook ad copy, Instagram ad creator, increase click-through rates",
      "hero": {
        "title": "AI Ad Copy Generator for Social Media Success",
        "subtitle":
          "Instantly create ad copy that grabs attention and drives results.",
        "cta": {
          "text": "Generate Ad Copy Now",
          "link": "/tools/ad-copy-generator", // Adjust based on your tool route
        },
      },
      "features": [
        {
          "title": "Smart Campaign Builder",
          "description": "Create compelling email campaigns effortlessly.",
          "icon": "📄",
          "footer": "Generates structured, high-converting email copy tailored to your brand.",
          "colorBG": "#e6e6e6"
        },
        {
          "title": "Audience Targeting Insights",
          "description": "Understand your ideal customers better.",
          "icon": "🎯",
          "footer": "Helps craft personalized messages for maximum engagement.",
          "colorBG": "#e6e6e6"
        },
        {
          "title": "Brand Tone Customization",
          "description": "Maintain a consistent voice.",
          "icon": "📝",
          "footer": "Adapts messaging to match your brand's tone—whether professional, casual, or humorous.",
          "colorBG": "#e6e6e6"
        },
        {
          "title": "Automated Offer Integration",
          "description": "Highlight deals effortlessly.",
          "icon": "🎁",
          "footer": "Seamlessly incorporates discounts, trials, and promotions into your email.",
          "colorBG": "#e6e6e6"
        },
        {
          "title": "Testimonial Inclusion for Trust",
          "description": "Boost credibility with social proof.",
          "icon": "⭐",
          "footer": "Dynamically adds customer reviews to build trust and increase conversions.",
          "colorBG": "#e6e6e6"
        }
      ],
      "testimonials": [
        {
          "user": "Jane D.",
          "feedback":
            "This tool saved me hours! My Facebook ads are performing better than ever.",
        },
        {
          "user": "Mark S.",
          "feedback":
            "I love how intuitive it is. The ad copy feels personalized and drives real engagement.",
        },
        {
          "user": "Jane D.",
          "feedback":
            "This tool saved me hours! My Facebook ads are performing better than ever.",
        },
      ],
      "faq": [
        {
          "question": "How does the AI generate ad copy?",
          "answer":
            "Our AI uses advanced language models trained on high-converting ad examples to create tailored ad copy for your audience.",
        },
        {
          "question": "Is this tool free to use?",
          "answer":
            "You can use this tool 5 times for free. After that, a premium membership is required.",
        },
        {
          "question": "Can I use this tool for Instagram and LinkedIn ads?",
          "answer":
            "Yes! The generated ad copy works perfectly for Facebook, Instagram, LinkedIn, and other social platforms.",
        },
      ],
      "socialProof": {
        "stats": [
          {"label": "Trusted by", "value": "10,000+ marketers"},
          {"label": "Ads Generated", "value": "1M+"},
          {"label": "Average CTR Increase", "value": "35%"},
        ],
        "badges": ["AI-Powered", "Marketing Favorite 2025", "User-Friendly Tool"],
      },
    },
  }
  },
  {
      toolDetails: {
      productID: "2",
      "productTypeID": productTypes[ 0 ].productTypeID,
      "productTypeName": productTypes[ 0 ].productTypeName,
      "inputTokensPerCall": 300,
      "outputTokensPerCall": 1000,
      "freeUsageAllowance": 2,
      "freeUsageAllowancePostLogin": 5,
      "usageAllowanceSubscription": 300,
      categorisation: {
        "industry": ["Marketing & Advertising AI","E-commerce & Retail AI","Media & Entertainment AI"],
        "jobRole":["AI Tools for Marketers"],
        "useCase": [ "AI for Text & Content Generation" ],
        "tags":["blog","advertisement","seo","HR", "Recruitment", "Hiring"]
      },
      "releaseStatus": "released",
      "pageViewSettings": {
        "hero":true,
        "toolPreview":true,
        "upsell":true,
        "features":true,
        "pricing":true,
        "testimonials":true,
        "faq": true,
        "toolBlog": false,
        "generalBlog": false,
        "promoteAffiliateEarn": false,
        "makeYourOwnTool": false
      }
    },
    genCode: {

      questions: [
        {
          q: "On what topic do you want to make Blog?",
          type: "textbox",
          typeoptions: "none",
        },
        {
          q: "Give some custom instruction",
          type: "textarea",
          typeoptions: "none",
        },
        {
          q: "Do you want emojis?",
          type: "dropdown",
          typeoptions: [ "Don't put emojis", "Put lots of emojis!" ],
        },
        {
          q: "What style of language you want?",
          type: "checkbox",
          typeoptions: [
            "casual",
            "professional",
            "funny",
            "cringe and self centered",
          ],
        },
      ],
      prompt: "Make a blog on <<A1>>. <<A2>>. <<A3>>. Keep the style <<A4>>.",
    },
  toolMeta: {
    title: "AI Blog Maker",
  productID: "2",
  description:
    "Transform your ideas into high-quality blogs with just a few clicks. This AI-powered tool generates engaging, SEO-friendly blog content that captivates readers and <span>boosts your online presence</span>. Save time and stay ahead of the competition by effortlessly creating compelling blogs.",
  bundle: "🚀 Marketing Power Pack",
  subCat: "✍️ Blogging Made Easy",
  membershipLevels: ["free", "bundleLevel", "allPremium"],
  SEO: {
    keywords:
      "AI blog generator, AI content creation, blog writing tool, SEO blog maker, generate blog content",
    metaTitle:
      "AI Blog Maker | Generate High-Quality, SEO-Friendly Blog Content",
    metaDescription:
      "Create engaging, SEO-optimized blogs in minutes with the AI-powered blog maker. Perfect for marketers, writers, and businesses seeking high-quality content.",
    schema: {
      type: "SoftwareApplication",
      name: "AI Blog Maker",
      description:
        "An AI-powered tool to generate high-quality, engaging blog content effortlessly.",
      applicationCategory: "ContentCreationTool",
      offers: [
        {
          "@type": "Offer",
          name: "Free Trial",
          description:
            "Generate up to 3 blogs for free and experience seamless content creation.",
          price: "0",
          priceCurrency: "USD",
          availability: "InStock",
          eligibleCustomerType: "NewCustomer",
        },
        {
          "@type": "Offer",
          name: "Starter Plan",
          description:
            "Create up to 20 blogs per month with standard features.",
          price: "5",
          priceCurrency: "USD",
          availability: "InStock",
          duration: "P1M",
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          description:
            "Unlimited blog generation with advanced SEO optimization and customization options.",
          price: "79.99",
          priceCurrency: "USD",
          availability: "InStock",
          duration: "P1M",
        },
      ],
    },
    og: {
      title: "AI Blog Maker for Seamless Content Creation | Try for Free",
      description:
        "Effortlessly generate SEO-friendly blogs that captivate your audience and boost your digital presence. Perfect for marketers and content creators.",
      image: "/blog-placeholder-2.jpg",
      url: "https://yourwebsite.com/tools/blog-maker",
    },
    twitterCard: {
      title: "Create High-Quality Blogs with AI Blog Maker | Try Now",
      description:
        "Generate engaging, SEO-friendly blogs effortlessly. Save time and elevate your content strategy.",
      image: "/blog-placeholder-2.jpg",
    },
  },
  pageDetails: {
    usecase:
      "Ideal for bloggers, content marketers, and businesses who need high-quality, engaging blogs at scale.",
    keywords:
      "AI blog generator, AI content creation, blog writing tool, SEO blog maker, generate blog content",
    hero: {
      title: "AI Blog Maker for Effortless Content Creation",
      subtitle: "Generate engaging, SEO-friendly blogs in minutes.",
      cta: {
        text: "Generate Your Blog Now",
        link: "/tools/blog-maker",
      },
    },
"features": [
  {
    "title": "Instant Blog Generation",
    "description": "Create high-quality blog posts in seconds.",
    "icon": "⚡",
    "footer": "AI-powered writing that saves you time while maintaining quality.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "SEO Optimization",
    "description": "Enhance your blog's search visibility effortlessly.",
    "icon": "🔍",
    "footer": "Automatically includes keywords and SEO best practices to rank higher.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "Engaging Headlines & Subheadings",
    "description": "Generate attention-grabbing titles and structured content.",
    "icon": "📝",
    "footer": "Creates compelling headlines and sections that improve readability.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "AI-Powered Content Enhancement",
    "description": "Refine tone, style, and clarity with AI suggestions.",
    "icon": "🎯",
    "footer": "Ensures your blog aligns with your brand’s voice and messaging.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "Plagiarism-Free & Original",
    "description": "Unique content every time, free from duplication.",
    "icon": "✅",
    "footer": "Ensures originality with AI-driven content uniqueness checks.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "Automatic Internal Linking",
    "description": "Boost SEO and engagement with intelligent link suggestions.",
    "icon": "🔗",
    "footer": "Automatically inserts relevant links to improve blog navigation and ranking.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "AI-Powered Readability Check",
    "description": "Optimizes sentence structure for better readability.",
    "icon": "📖",
    "footer": "Ensures your blog is easy to read and keeps users engaged.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "Multi-Tone Writing",
    "description": "Adjust the style to suit your audience.",
    "icon": "🎭",
    "footer": "From formal to casual, adapt the tone to match your brand’s needs.",
    "colorBG": "#f3f4f6"
  }
],
    testimonials: [
      {
        user: "Sarah W.",
        feedback:
          "The AI Blog Maker transformed my content strategy. I create blogs in half the time, and they rank well!",
      },
      {
        user: "David T.",
        feedback:
          "It’s a game-changer for bloggers. The AI-generated content feels authentic and saves me hours.",
      },
    ],
    faq: [
      {
        question: "How does the AI generate blog content?",
        answer:
          "The AI leverages advanced language models trained on high-quality content to generate blogs tailored to your preferences and target audience.",
      },
      {
        question: "Is this tool free to use?",
        answer:
          "You can create up to 3 blogs for free. Beyond that, a premium subscription is required.",
      },
      {
        question: "Can I customize the tone and length of the blogs?",
        answer:
          "Absolutely! You can adjust the tone, length, and content structure to suit your brand and audience.",
      },
    ],
    socialProof: {
      stats: [
        {label: "Trusted by", value: "5,000+ content creators"},
        {label: "Blogs Generated", value: "500,000+"},
        {label: "SEO Ranking Success", value: "45% faster"},
      ],
      badges: ["AI-Powered", "Content Creator's Favorite 2025", "SEO-Friendly"],
    },
  },
  localization: {
    supportedLanguages: ["en", "es", "fr", "de"],
    defaultLanguage: "en",
  },
  ctaAnalytics: {
    trackEvent: "generate_blog_click",
    eventCategory: "Button Click",
    eventLabel: "Blog Maker Hero CTA",
  },
}
},
{
    "toolDetails": {
    "productID": "377d13a1-e322-4381-a905-3e49041d8f25",
    "productTypeID": productTypes[ 0 ].productTypeID,
    "productTypeName": productTypes[ 0 ].productTypeName,
    "inputTokensPerCall": 300,
    "outputTokensPerCall": 1000,
    "freeUsageAllowance": 2,
    "freeUsageAllowancePostLogin": 5,
    "usageAllowanceSubscription": 300,
    "categorisation": {
        "industry": ["E-commerce & Retail AI"],
        "jobRole":["AI Tools for Marketers","AI Tools for Writers & Copywriters"],
        "useCase": [ "AI for Text & Content Generation" ],
        "tags":["marketing","advertisement","seo"]
    },
    "releaseStatus": "released",
    "pageViewSettings": {
        "hero":true,
        "toolPreview":true,
        "upsell":true,
        "features":true,
        "pricing":true,
        "testimonials":true,
        "faq": true,
        "toolBlog": false,
        "generalBlog": false,
        "promoteAffiliateEarn": false,
        "makeYourOwnTool": false
      }
    },
    "genCode": {
        "questions": [
            {
                "q": "What is the name of your product or service?",
                "type": "textbox",
                "typeoptions": "none"
            },
            {
                "q": "What is the primary goal of your email campaign? (e.g., sales, awareness, engagement)",
                "type": "textbox",
                "typeoptions": "none"
            },
            {
                "q": "Who is your target audience? (e.g., age, profession, interests)",
                "type": "textbox",
                "typeoptions": "none"
            },
            {
                "q": "What is the tone of your brand? (e.g., professional, casual, humorous)",
                "type": "textbox",
                "typeoptions": "none"
            },
            {
                "q": "What key features or benefits do you want to highlight in the email?",
                "type": "textbox",
                "typeoptions": "none"
            },
            {
                "q": "What is the desired call to action? (e.g., buy now, subscribe, learn more)",
                "type": "textbox",
                "typeoptions": "none"
            },
            {
                "q": "Do you have any specific promotions or offers to include?",
                "type": "checkbox",
                "typeoptions": [
                    "Discounts",
                    "Free trials",
                    "Limited-time offers",
                    "None"
                ]
            },
            {
                "q": "Would you like the email to include customer testimonials or reviews?",
                "type": "radio",
                "typeoptions": [
                    "Yes",
                    "No"
                ]
            }
        ],
        "prompt": "Create a compelling email campaign copy for a product or service named <<A1>>. The main goal of this campaign is <<A2>>, targeting an audience of <<A3>>. Ensure the tone reflects our brand's voice, which is <<A4>>. Highlight key features such as <<A5>>, and make sure to include a strong call to action of <<A6>>. If applicable, incorporate any promotions like <<A7>>, and include customer testimonials? <<A8>>. Deliver the email copy in a structured format suitable for immediate use."
    },
    "toolMeta": {
      "title": "Email Campaign Copy Generator",
        "productID": "377d13a1-e322-4381-a905-3e49041d8f25",
        "description": "<span>Craft engaging email campaigns</span> tailored to your product, service, or newsletter needs. Achieve your campaign goals with expertly generated copy.",
        "bundle": "\ud83d\udce7 Marketing Mastery Kit",
        "subCat": "\u2709\ufe0f Email Marketing Solutions",
        "membershipLevels": [
            "free",
            "bundleLevel",
            "allPremium"
        ],
        "SEO": {
            "keywords": "email copy generator, email campaign, marketing copy, engagement emails, promotional emails, email marketing tool, generate email copy",
            "metaTitle": "Email Campaign Copy Generator | Craft Engaging Emails",
            "metaDescription": "Create tailored email campaigns with our Email Campaign Copy Generator. Easily generate engaging email copy for any product or service to boost your marketing efforts and drive conversions.",
            "schema": {
                "type": "Product",
                "name": "Email Campaign Copy Generator",
                "description": "A tool to generate tailored email campaign copy that engages users and drives action.",
                "applicationCategory": "Marketing",
                "offers": [
                    {
                        "@type": "Offer",
                        "name": "Email Campaign Copy Generator Subscription",
                        "description": "Subscribe to the Email Campaign Copy Generator for unlimited access to create engaging email campaigns.",
                        "price": "1.00",
                        "priceCurrency": "USD",
                        "availability": "InStock",
                        "eligibleCustomerType": "All",
                        "duration": "P1M"
                    }
                ]
            },
            "og": {
                "title": "Email Campaign Copy Generator",
                "description": "Craft engaging email campaigns tailored to your product or service needs. Get started today!",
                "image": "https://example.com/image-email-campaign-generator.png",
                "url": "https://example.com/email-campaign-copy-generator"
            },
            "twitterCard": {
                "title": "Email Campaign Copy Generator",
                "description": "Generate compelling email copy that drives action and engagement.",
                "image": "https://example.com/image-email-campaign-generator.png"
            }
        },
        "pageDetails": {
            "usecase": "Ideal for marketers and businesses looking to create impactful email campaigns quickly and effectively.",
            "keywords": "email marketing, email campaigns, engagement, marketing tools, copywriting",
            "hero": {
                "title": "Transform Your Email Marketing",
                "subtitle": "Generate Engaging Email Copy in Seconds",
                "cta": {
                    "text": "Start My Free Trial",
                    "link": "https://example.com/start-free-trial"
                }
            },
            "features": [
  {
    "title": "Instant Email Copy Generation",
    "description": "Create high-converting email campaigns in seconds.",
    "icon": "⚡",
    "footer": "AI-powered copywriting that saves time while ensuring engagement.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "Personalized Messaging",
    "description": "Tailor emails based on audience preferences and behavior.",
    "icon": "🎯",
    "footer": "Enhances engagement by customizing content for each recipient.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "Persuasive Subject Line Suggestions",
    "description": "Boost open rates with compelling subject lines.",
    "icon": "📩",
    "footer": "Generates attention-grabbing subject lines to maximize email performance.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "Automated Call-to-Action Optimization",
    "description": "Increase conversions with powerful CTAs.",
    "icon": "🚀",
    "footer": "AI suggests action-driven CTAs to encourage clicks and responses.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "A/B Testing Variations",
    "description": "Generate multiple versions of your email for testing.",
    "icon": "🔄",
    "footer": "Helps you test different copy versions to improve performance.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "Spam Score Analysis",
    "description": "Ensure high deliverability with AI-driven spam checks.",
    "icon": "📬",
    "footer": "Detects potential spam triggers to keep your emails out of junk folders.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "Optimized Email Structure",
    "description": "Create well-formatted emails for better readability.",
    "icon": "📄",
    "footer": "Ensures your emails are clear, concise, and visually appealing.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "Brand Tone Customization",
    "description": "Match your brand’s voice effortlessly.",
    "icon": "🎭",
    "footer": "Adjusts tone from professional to casual based on your brand’s style.",
    "colorBG": "#f3f4f6"
  },
  {
    "title": "AI-Driven Follow-Up Suggestions",
    "description": "Never miss a follow-up opportunity.",
    "icon": "⏳",
    "footer": "Generates effective follow-up sequences to nurture leads.",
    "colorBG": "#f3f4f6"
  }
]
,
            "testimonials": [
                {
                    "user": "Marketer 1",
                    "feedback": "This tool has transformed how I create email content\u2014fast and effective!"
                },
                {
                    "user": "Business Owner",
                    "feedback": "I love how easy it is to use this copy generator for my marketing needs."
                }
            ],
            "faq": [
    {
        "question": "How does the email copy generator work?",
        "answer": "Simply provide details about your product, audience, and campaign goals, and the AI will generate high-quality email copy tailored to your needs."
    },
    {
        "question": "Can I customize the tone and style of the emails?",
        "answer": "Yes! The generator allows you to choose from different tones, such as professional, casual, persuasive, or friendly, to match your brand voice."
    },
    {
        "question": "Will the generated emails be optimized for conversions?",
        "answer": "Absolutely! The AI ensures your emails have engaging subject lines, strong CTAs, and persuasive content to maximize open rates and conversions."
    },
    {
        "question": "Does this tool help with A/B testing?",
        "answer": "Yes, it can generate multiple versions of an email, allowing you to test different subject lines, messaging styles, and CTAs to improve performance."
    },
    {
        "question": "Is the generated email content plagiarism-free?",
        "answer": "Yes, all content is uniquely generated by AI, ensuring that your emails are original and free from plagiarism."
    }
],
            "socialProof": {
                "stats": [
                    {
                        "label": "Users Served",
                        "value": "10,000+"
                    },
                    {
                        "label": "Emails Generated",
                        "value": "100,000+"
                    }
                ],
                "badges": [
                    "Easy to Use",
                    "No Credit Card Required",
                    "Trusted by Marketers"
                ]
            }
        }
    }
  },
{
    "toolDetails": {
    "productID": "377d13a1-e322-4381-a905-3e49041d8f30",
    "productTypeID": productTypes[ 1 ].productTypeID,
    "productTypeName": productTypes[ 1 ].productTypeName,
    "productLocation": `/tools/${productTypes[ 1 ].productTypeName}/dynamicGrids`,
      "inputTokensPerCall": 500,
      "outputTokensPerCall": 1500,
      "freeUsageAllowance": 2,
      "freeUsageAllowancePostLogin": 5,
      "usageAllowanceSubscription": 300,
    "categorisation": {
        "industry": ["General"],
        "jobRole":["AI Tools for Marketers","AI Tools for Writers & Copywriters"],
        "useCase": [ "AI for Text & Content Generation" ],
        "tags":["marketing","advertisement","seo"]
    },
    "releaseStatus": "released",
    "pageViewSettings": {
        "hero":true,
        "toolPreview":true,
        "upsell":true,
        "features":true,
        "pricing":true,
        "testimonials":true,
        "faq": true,
        "toolBlog": false,
        "generalBlog": false,
        "promoteAffiliateEarn": false,
        "makeYourOwnTool": false
      }
    },
    "genCode": "NA",
    
  "toolMeta": {
    "title": "Pro Infographic Maker",
    "productID": "377d13a1-e322-4381-a905-3e49041d8f30",
    "description": "Easily <span>create professional, engaging infographics</span> for LinkedIn, Facebook, Instagram, and business presentations. Add your name, social handles, choose tone, and generate unique visuals in seconds.",
    "bundle": "📊 Social Media Growth",
    "subCat": "🎨 Graphic Design & Visual Marketing",
    "SEO": {
      "keywords": "infographic generator, social media infographic maker, LinkedIn infographic tool, create infographics for presentations, AI infographic design, personalized infographic generator, infographic creator for business, content marketing visuals, professional infographic generator, infographic maker with name and handles, AI-based infographic creator, make infographics for social media posts",
      "metaTitle": "Infographic Generator for LinkedIn, Social Media & Presentations | AI-Powered Tool",
      "metaDescription": "Generate stunning infographics for LinkedIn, Facebook, and business presentations. Add your name, social links, and let AI create personalized, professional visuals for marketing and content.",
      "schema": {
        "type": "Product",
        "name": "AI-Powered Infographic Generator",
        "description": "An AI-based infographic maker to create professional visuals for LinkedIn posts, social media, and presentations. Add custom details like your name and topic to generate ready-to-use designs.",
        "applicationCategory": "Marketing, Design, Content Creation",
        "offers": [
          {
            "@type": "Offer",
            "name": "Infographic Generator Subscription",
            "description": "Get unlimited access to the Infographic Generator to create customized visuals for all your social and business content needs.",
            "price": "1.00",
            "priceCurrency": "USD",
            "availability": "InStock",
            "eligibleCustomerType": "All",
            "duration": "P1M"
          }
        ]
      },
      "og": {
        "title": "AI Infographic Generator for LinkedIn, Social & Presentations",
        "description": "Create personalized, professional infographics for LinkedIn, Facebook, and presentations. Add topics, names, and social handles — AI does the rest!",
        "image": "https://example.com/image-infographic-generator.png",
        "url": "https://example.com/infographic-generator"
      },
      "twitterCard": {
        "title": "Create Stunning Infographics for Social Media & LinkedIn",
        "description": "Use AI to generate professional infographics personalized with your name and social links. Perfect for marketing, posts, and presentations.",
        "image": "https://example.com/image-infographic-generator.png"
      }
    },
    "pageDetails": {
      "usecase": "Ideal for marketers, content creators, and professionals who need custom infographics for social media, LinkedIn, and presentations without hiring a designer.",
      "keywords": "social media graphics, LinkedIn infographic posts, content marketing visuals, AI infographic maker, business presentations, create branded infographics, personalized infographics tool",
      "hero": {
        "title": "Infographic Maker for Social Media & LinkedIn",
        "subtitle": "Create Personalized Infographics in Seconds — No Design Skills Needed",
        "cta": {
          "text": "Start Creating Infographics",
          "link": "https://example.com/start-infographic-maker"
        }
      },
      "features": [
        {
          "title": "Customizable Infographics with Your Name & Social Links",
          "description": "Add your name, LinkedIn, Twitter, and Instagram handles to make each infographic uniquely yours.",
          "icon": "📝",
          "footer": "Personal branding made simple — personalize every visual effortlessly.",
          "colorBG": "#f0f9ff"
        },
        {
          "title": "Topic-Based Infographic Generation",
          "description": "Tell the tool what topic you want to cover and instantly get a designed infographic.",
          "icon": "💡",
          "footer": "From industry insights to motivational quotes — choose any topic.",
          "colorBG": "#f0f9ff"
        },
        {
          "title": "Tone and Emoji Control",
          "description": "Select tone (formal, casual, creative) and emoji usage to fit your audience and platform.",
          "icon": "🎨",
          "footer": "Keep content aligned with your brand and personality.",
          "colorBG": "#f0f9ff"
        },
        {
          "title": "Optimized for Social Media and Presentations",
          "description": "Perfect formats for LinkedIn, Facebook, Instagram, and PowerPoint slides.",
          "icon": "📊",
          "footer": "Professional visuals ready for any platform or audience.",
          "colorBG": "#f0f9ff"
        },
        {
          "title": "AI-Powered Design and Copy",
          "description": "Automatically generates visual layout and text — just enter your preferences and go.",
          "icon": "🤖",
          "footer": "Save hours on design — let AI create polished content for you.",
          "colorBG": "#f0f9ff"
        },
        {
          "title": "Download & Share Instantly",
          "description": "Download high-quality images or directly share on social media with one click.",
          "icon": "📤",
          "footer": "Effortless publishing and sharing of your visuals.",
          "colorBG": "#f0f9ff"
        }
      ],
      "testimonials": [
        {
          "user": "Content Marketer",
          "feedback": "Game-changer for my LinkedIn posts — professional designs in seconds!"
        },
        {
          "user": "Small Business Owner",
          "feedback": "I love how I can personalize each infographic with my brand — huge time saver!"
        }
      ],
      "faq": [
        {
          "question": "How does the infographic generator work?",
          "answer": "Just input your name, social handles, the topic you want, and choose your tone — AI will generate a fully designed infographic ready to use."
        },
        {
          "question": "Can I add my social media links to the infographics?",
          "answer": "Yes! You can include your LinkedIn, Twitter, Instagram handles, and more — perfect for personal branding."
        },
        {
          "question": "Are the infographics suitable for presentations?",
          "answer": "Absolutely! You can download high-res files optimized for both social media and PowerPoint slides."
        },
        {
          "question": "Can I choose the design tone and style?",
          "answer": "Yes, select from formal, casual, or creative tones, and even control emoji usage to match your audience."
        },
        {
          "question": "Is any graphic design skill required?",
          "answer": "Not at all! AI does all the designing — you just provide input and download your ready-to-use infographic."
        }
      ],
      "socialProof": {
        "stats": [
          {
            "label": "Infographics Created",
            "value": "50,000+"
          },
          {
            "label": "Active Users",
            "value": "8,000+"
          }
        ],
        "badges": [
          "Easy to Use",
          "No Design Skills Needed",
          "Perfect for LinkedIn & Social Media"
        ]
      }
    }
  }
  },
  {
    "toolDetails": {
      "productID": "377d13a1-e322-4381-a905-3e49041d8f31",
      "productTypeID": productTypes[ 1 ].productTypeID,
      "productTypeName": productTypes[ 1 ].productTypeName,
      "productLocation": `/tools/${productTypes[ 1 ].productTypeName}/cardsRenderDynamic`,
      "inputTokensPerCall": 300,
      "outputTokensPerCall": 1000,
      "freeUsageAllowance": 2,
      "freeUsageAllowancePostLogin": 5,
      "usageAllowanceSubscription": 300,
      "categorisation": {
        "industry": [ "General" ],
        "jobRole": [ "AI Tools for Marketers", "AI Tools for Writers & Copywriters" ],
        "useCase": [ "AI for Text & Content Generation" ],
        "tags": [ "marketing", "advertisement", "seo" ]
      },
      "releaseStatus": "released",
      "pageViewSettings": {
        "hero": true,
        "toolPreview": true,
        "upsell": true,
        "features": true,
        "pricing": true,
        "testimonials": true,
        "faq": true,
        "toolBlog": false,
        "generalBlog": false,
        "promoteAffiliateEarn": false,
        "makeYourOwnTool": false
      }
    },
    "genCode": "NA",
    
    "toolMeta": {
      "title": "Interactive Infographic Maker",
      "productID": "377d13a1-e322-4381-a905-3e49041d8f31",
      "description": "Create <span>fully customizable, interactive infographics and flowcharts.</span> Drag, drop, resize, and arrange blocks to design professional visuals for LinkedIn, social media, or business presentations.",
      "bundle": "📊 Social Media Growth",
      "subCat": "🧩 Flowcharts & Interactive Design Tools",
      "membershipLevels": [
        "free",
        "bundleLevel",
        "allPremium"
      ],
      "SEO": {
        "keywords": "interactive infographic maker, drag and drop infographic builder, flowchart creator online, customizable infographic tool, infographic maker with movable blocks, design interactive flow diagrams, create infographics for LinkedIn, visual flow maker, infographic and chart designer, infographic editor with resize and drag elements, process flowchart builder, business flow infographic generator, AI powered and interactive infographic tool",
        "metaTitle": "Interactive Infographic & Flowchart Generator | Drag & Drop Designer",
        "metaDescription": "Design interactive infographics and flowcharts with ease. Drag, drop, and resize elements to create customized visuals for LinkedIn, social media, and presentations — no design skills needed!",
        "schema": {
          "type": "Product",
          "name": "Drag & Drop Infographic and Flow Builder",
          "description": "An AI-augmented interactive infographic and flowchart maker that allows users to fully customize and arrange design elements for impactful visual communication.",
          "applicationCategory": "Marketing, Design, Workflow Visualization",
          "offers": [
            {
              "@type": "Offer",
              "name": "Interactive Infographic Builder Subscription",
              "description": "Unlimited access to build customized interactive infographics and flowcharts with drag and drop ease.",
              "price": "1.00",
              "priceCurrency": "USD",
              "availability": "InStock",
              "eligibleCustomerType": "All",
              "duration": "P1M"
            }
          ]
        },
        "og": {
          "title": "Create Interactive Infographics & Flowcharts | Drag & Drop Tool",
          "description": "Drag, drop, and customize every part of your infographic or flowchart. Design like a pro — no experience needed!",
          "image": "https://example.com/image-interactive-infographic-maker.png",
          "url": "https://example.com/interactive-infographic-builder"
        },
        "twitterCard": {
          "title": "Drag & Drop Infographic Builder for LinkedIn & Social Media",
          "description": "Build stunning interactive infographics and flowcharts — drag, resize, and fully customize your visuals for any purpose.",
          "image": "https://example.com/image-interactive-infographic-maker.png"
        }
      },
      "pageDetails": {
        "usecase": "Perfect for marketers, educators, consultants, and professionals needing fully customized, interactive infographics or flowcharts for content, presentations, and social media.",
        "keywords": "drag and drop infographic builder, LinkedIn flowchart maker, interactive visual content, flow diagram creator, marketing infographics, process flow infographics, customizable infographic tool",
        "hero": {
          "title": "Interactive Infographic & Flowchart Builder",
          "subtitle": "Design & Customize Your Visuals — Drag, Drop, Resize. No Design Skills Needed.",
          "cta": {
            "text": "Start Building Infographics",
            "link": "https://example.com/start-interactive-builder"
          }
        },
        "features": [
          {
            "title": "Drag & Drop Infographic Design",
            "description": "Easily move, resize, and arrange elements to create personalized layouts.",
            "icon": "🧩",
            "footer": "Your infographic, your way — with total control over design.",
            "colorBG": "#e0f7fa"
          },
          {
            "title": "Flowcharts and Process Visualizations",
            "description": "Perfect for workflows, step-by-step guides, and process charts.",
            "icon": "🔗",
            "footer": "Visually communicate complex ideas with clarity.",
            "colorBG": "#e0f7fa"
          },
          {
            "title": "AI-Assisted Layout Suggestions",
            "description": "Let AI suggest starting points for your design, then tweak as you like.",
            "icon": "🤖",
            "footer": "Get inspired and accelerate design with AI recommendations.",
            "colorBG": "#e0f7fa"
          },
          {
            "title": "Tone, Color, and Font Personalization",
            "description": "Choose tones, themes, fonts, and colors to match your brand or mood.",
            "icon": "🎨",
            "footer": "Stay on-brand and impactful with full design control.",
            "colorBG": "#e0f7fa"
          },
          {
            "title": "Social & Presentation Ready",
            "description": "Optimized output formats for LinkedIn, Instagram, Facebook, or PPT slides.",
            "icon": "📊",
            "footer": "High-quality visuals ready for instant publishing or presentation.",
            "colorBG": "#e0f7fa"
          },
          {
            "title": "Save, Edit & Reuse Designs",
            "description": "Save your work to return anytime and create variations easily.",
            "icon": "💾",
            "footer": "Your designs are stored safely and always editable.",
            "colorBG": "#e0f7fa"
          }
        ],
        "testimonials": [
          {
            "user": "Marketing Consultant",
            "feedback": "Finally, a tool where I can fully customize infographics without paying a designer!"
          },
          {
            "user": "Business Coach",
            "feedback": "The flowchart builder is incredible for visualizing strategies and client roadmaps."
          }
        ],
        "faq": [
          {
            "question": "Can I move and resize elements in my infographic?",
            "answer": "Yes! You can drag, drop, resize, and arrange elements to fully control your infographic’s look and feel."
          },
          {
            "question": "Does it support flowcharts and process maps?",
            "answer": "Absolutely! You can create detailed flowcharts, workflows, and step-by-step diagrams with our flexible design blocks."
          },
          {
            "question": "Are there ready-made templates to start with?",
            "answer": "Yes, AI provides smart layout suggestions based on your topic — which you can fully customize."
          },
          {
            "question": "Can I adjust fonts, colors, and brand elements?",
            "answer": "Yes! Choose tones, fonts, and color schemes to align with your brand or message perfectly."
          },
          {
            "question": "Is it suitable for LinkedIn and business presentations?",
            "answer": "Yes, export options are optimized for both social media and high-res presentations."
          }
        ],
        "socialProof": {
          "stats": [
            {
              "label": "Interactive Infographics Created",
              "value": "30,000+"
            },
            {
              "label": "Professional Users",
              "value": "5,000+"
            }
          ],
          "badges": [
            "Fully Customizable",
            "Drag & Drop",
            "Perfect for LinkedIn & Presentations"
          ]
        }
      }
    }
  },
   {
    "toolDetails": {
      "productID": "377d13a1-e322-4381-a905-3e49041d8f32",
      "productTypeID": productTypes[ 1 ].productTypeID,
      "productTypeName": productTypes[ 1 ].productTypeName,
      "productLocation": `/tools/${productTypes[ 1 ].productTypeName}/youtubesummary`,
      "inputTokensPerCall": 300,
      "outputTokensPerCall": 1000,
      "freeUsageAllowance": 2,
      "freeUsageAllowancePostLogin": 5,
      "usageAllowanceSubscription": 300,
      "categorisation": {
        "industry": [ "General" ],
        "jobRole": [ "AI Tools for Marketers", "AI Tools for Writers & Copywriters" ],
        "useCase": [ "AI for Text & Content Generation" ],
        "tags": [ "marketing", "advertisement", "seo" ]
       },
      "releaseStatus": "released",
      "pageViewSettings": {
        "hero": true,
        "toolPreview": true,
        "upsell": true,
        "features": true,
        "pricing": true,
        "testimonials": true,
        "faq": true,
        "toolBlog": false,
        "generalBlog": false,
        "promoteAffiliateEarn": false,
        "makeYourOwnTool": false
      }
    },
    "genCode": "NA",
    
     "toolMeta": {
    "title": "YouTube Summary & Transcript Generator",
    "productID": "377d13a1-e322-4381-a905-3e49041d8f32",
    "description": "Summarize any YouTube video instantly! <span>Generate AI-powered summaries and transcripts</span> for quick understanding, notes, and sharing — perfect for creators, students, and professionals.",
    "bundle": "🎥 YouTube & Video Tools",
    "subCat": "📝 Summarizers & Content Generators",
    "membershipLevels": [
      "free",
      "bundleLevel",
      "allPremium"
    ],
    "SEO": {
      "keywords": "youtube summary generator, youtube transcript generator, video summary ai, youtube video summarizer, auto transcript youtube, summarize youtube videos, ai youtube content summarizer, youtube to text generator, quick youtube video notes, youtube educational summary, video breakdown tool, generate youtube summaries and transcripts, AI-powered youtube tools",
      "metaTitle": "YouTube Video Summary & Transcript Generator | AI Instant Summarizer",
      "metaDescription": "Summarize YouTube videos instantly with AI. Get quick, editable transcripts and highlights for faster learning, content reuse, and sharing. Perfect for creators, students, and teams!",
      "schema": {
        "type": "Product",
        "name": "YouTube Summary & Transcript Generator",
        "description": "An AI-powered tool to generate fast, editable summaries and transcripts of any YouTube video, helping users capture key points, save time, and reuse content.",
        "applicationCategory": "Productivity, Learning, Video Content Tools",
        "offers": [
          {
            "@type": "Offer",
            "name": "YouTube AI Summary Generator Subscription",
            "description": "Unlimited access to summarize and transcribe YouTube videos with AI, saving hours of time and effort.",
            "price": "1.00",
            "priceCurrency": "USD",
            "availability": "InStock",
            "eligibleCustomerType": "All",
            "duration": "P1M"
          }
        ]
      },
      "og": {
        "title": "AI YouTube Summary & Transcript Generator | Save Hours on Content",
        "description": "Instantly summarize and transcribe YouTube videos with AI. Get accurate, editable content from any video — perfect for learning, repurposing, and sharing!",
        "image": "https://example.com/image-youtube-summary-maker.png",
        "url": "https://example.com/youtube-summary-generator"
      },
      "twitterCard": {
        "title": "AI YouTube Video Summary & Transcript Tool",
        "description": "Turn YouTube videos into editable summaries and transcripts instantly — powered by AI. Save time and effort!",
        "image": "https://example.com/image-youtube-summary-maker.png"
      }
    },
    "pageDetails": {
      "usecase": "Perfect for content creators, educators, students, and professionals looking to quickly understand, summarize, and repurpose YouTube content for learning, blogs, and social media.",
      "keywords": "youtube summary ai, video to text, auto summarize youtube, youtube video notes, video summary maker, youtube to text generator",
      "hero": {
        "title": "Instant YouTube Video Summary & Transcript",
        "subtitle": "Summarize & Transcribe Any Video with AI — Save Time, Learn Faster.",
        "cta": {
          "text": "Generate Summary Now",
          "link": "https://example.com/start-youtube-summary"
        }
      },
      "features": [
        {
          "title": "Instant YouTube Video Summary",
          "description": "Get concise, AI-generated summaries of YouTube videos in seconds.",
          "icon": "⚡",
          "footer": "Skip the fluff — get straight to the point.",
          "colorBG": "#e3f2fd"
        },
        {
          "title": "Editable AI-Powered Transcripts",
          "description": "Full video transcripts you can edit, format, and reuse as needed.",
          "icon": "📝",
          "footer": "Perfect for creating notes, blogs, and repurposing content.",
          "colorBG": "#e3f2fd"
        },
        {
          "title": "Save Hours of Watching Time",
          "description": "Extract key insights without watching long videos.",
          "icon": "⏳",
          "footer": "Get the value of a 30-min video in 30 seconds.",
          "colorBG": "#e3f2fd"
        },
        {
          "title": "Perfect for Learning & Research",
          "description": "Summarize educational videos for faster learning and reference.",
          "icon": "🎓",
          "footer": "Turn videos into instant study notes.",
          "colorBG": "#e3f2fd"
        },
        {
          "title": "Content Repurposing Made Easy",
          "description": "Convert video content into posts, articles, and summaries.",
          "icon": "📢",
          "footer": "Great for content creators and marketers.",
          "colorBG": "#e3f2fd"
        },
        {
          "title": "Share & Export Ready",
          "description": "Download summaries and transcripts in shareable formats.",
          "icon": "📤",
          "footer": "Ready for sharing, blogging, and more.",
          "colorBG": "#e3f2fd"
        }
      ],
      "testimonials": [
        {
          "user": "Content Creator",
          "feedback": "This AI tool saves me hours! I summarize research videos and create posts fast."
        },
        {
          "user": "Student",
          "feedback": "I use it to generate lecture summaries. So much faster than taking manual notes!"
        }
      ],
      "faq": [
        {
          "question": "Can I summarize any YouTube video?",
          "answer": "Yes! Paste any YouTube link and get an AI-generated summary and transcript instantly."
        },
        {
          "question": "Is the summary editable?",
          "answer": "Absolutely. You can edit, format, and adjust both summary and transcript before saving or sharing."
        },
        {
          "question": "Can I export the transcript?",
          "answer": "Yes! You can download the transcript and summary in text format."
        },
        {
          "question": "Is this free to use?",
          "answer": "There’s a free tier, and unlimited use is available for premium members."
        },
        {
          "question": "Can I summarize long videos?",
          "answer": "Yes, the tool handles long videos and condenses them into clear summaries."
        }
      ],
      "socialProof": {
        "stats": [
          {
            "label": "YouTube Videos Summarized",
            "value": "50,000+"
          },
          {
            "label": "Active Users",
            "value": "8,000+"
          }
        ],
        "badges": [
          "AI-Powered",
          "Editable Summaries & Transcripts",
          "Instant Results"
        ]
      }
    }
  }
  }

]