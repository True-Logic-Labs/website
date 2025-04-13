import core
import json

bundles = {
    "categories": [
        {
            "name": "📣 Digital Marketing & Content Creation Hub",
            "description": "A one-stop destination for creating powerful marketing content, including blogs, social media captions, and email campaigns designed to boost brand visibility and engagement.",
            "subcategories": [
                {"name": "📝 Content Domination"},
                {"name": "📱 Social Media Wizardry"},
                {"name": "📬 Email Marketing Vault"},
                {"name": "🔍 SEO Supercharged"},
            ],
        },
        {
            "name": "🚀 Entrepreneur & Startup Founder Suite",
            "description": "Essential text-generation tools designed to help startup founders communicate their value proposition, craft launch strategies, and engage stakeholders.",
            "subcategories": [
                {"name": "💼 Pitch Deck & Investor Kit"},
                {"name": "📢 Go-to-Market Toolkit"},
                {"name": "📑 Product Update & Communication Engine"},
            ],
        },
        {
            "name": "🛍️ E-Commerce Growth Engine",
            "description": "A suite of tools designed to help e-commerce businesses create product listings, advertising content, and engagement campaigns that drive sales and customer loyalty.",
            "subcategories": [
                {"name": "🛒 Product Listing Perfection"},
                {"name": "🎯 Conversion-Boosting Ad Suite"},
                {"name": "❤️ Customer Engagement Hub"},
            ],
        },
        {
            "name": "💻 Tech Developer's Toolkit",
            "description": "Helps developers and technical teams create high-quality documentation, release notes, and content for open-source projects.",
            "subcategories": [
                {"name": "📂 Open Source Contribution Pack"},
                {"name": "📖 Documentation Master Suite"},
                {"name": "🔔 Release Notes & Updates Assistant"},
            ],
        },
        {
            "name": "🏆 Career & Professional Growth Vault",
            "description": "Tools to help job seekers and professionals generate standout resumes, cover letters, and prepare for interviews with confidence.",
            "subcategories": [
                {"name": "📄 Resume Mastery Bundle"},
                {"name": "✍️ Cover Letter & Personal Branding Kit"},
                {"name": "🤖 Interview Prep Suite"},
            ],
        },
        {
            "name": "🧠 Thought Leadership Content Generator",
            "description": "Empowers professionals to establish themselves as industry leaders by creating insightful content for blogs, white papers, and LinkedIn articles.",
            "subcategories": [
                {"name": "📰 Insightful Blogging Hub"},
                {"name": "📑 White Papers & Reports Generator"},
                {"name": "📇 LinkedIn Article Creator"},
            ],
        },
    ]
}


bundle_choosen = bundles["categories"][4]
category_choosen = bundle_choosen["subcategories"][0]
how_many_tools = 5

print(
    f"For Sub-category > {category_choosen['name']} for Parent Bundle > {bundle_choosen['name']}\n\n"
)

with open("./backend_prompts/tools_suggestions.prompt", "r") as file:
    content = file.read()
updated_content = content.replace("<<<BUNDLE>>>", f"{bundle_choosen}")
updated_content = updated_content.replace(
    "<<<SUB_CATEGORY_NAME>>>", f"{category_choosen}"
)

updated_content = updated_content + f"Give only {how_many_tools} tools."

instance = core.AIGenerator()

result = instance.call_openai_api(updated_content)
print(result)
final = json.loads(result)
