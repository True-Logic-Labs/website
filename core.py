import os
import requests
from dotenv import load_dotenv
import re
import google.generativeai as genai
from groq import Groq
import asyncio

load_dotenv()


from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel


def print_md(md, width=80):
    md = Markdown(md)
    panel = Panel(
        md,
        title="[bold green]Start[/bold green]",
        border_style="bright_yellow",
        subtitle="[dim]End[/dim]",
    )
    console = Console(width=width, color_system="auto")
    console.print(panel)


class AIGenerator:

    def __init__(self):
        self.api_key_openai = os.environ.get("OPENAI_API_KEY")
        self.api_key_gemini = os.environ.get("GOOGLE_GEMINI")
        self.gemini_model = genai.GenerativeModel("gemini-1.5-flash")
        genai.configure(api_key=self.api_key_gemini)
        self.openai_model = "gpt-4o-mini"
        self.groq_client = Groq(api_key=os.environ.get("GROQ"))

    def call_gemini(self, prompt):
        response = self.gemini_model.generate_content(prompt)
        return response.text

    def call_openai_api(self, prompt):
        headers = {
            "Authorization": f"Bearer {self.api_key_openai}",
            "Content-Type": "application/json",
        }
        data = {
            "model": self.openai_model,
            "messages": [{"role": "user", "content": prompt}],
        }

        response = requests.post(
            "https://api.openai.com/v1/chat/completions", headers=headers, json=data
        )
        if response.status_code == 200:
            result = response.json()
            return result["choices"][0]["message"]["content"]
        else:
            raise Exception(
                f"API call failed with status code {response.status_code}: {response.text}"
            )

    def load_from_file(self, file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                python_file_contents = file.read()
        except FileNotFoundError:
            print(f"Error: The file {file_path} was not found.")
        except Exception as e:
            print(f"An error occurred: {e}")

        return python_file_contents

    def extract_code_blocks(self, text):
        pattern = r"```(?:\w+)?\n(.*?)```"
        code_blocks = re.findall(pattern, text, re.DOTALL)
        return [block.strip() for block in code_blocks]

    def write_output_to_file(self, content, output_location):
        with open(output_location, "w", encoding="utf-8") as file:
            file.write(content)

    def call_with_prompt(self, prompt_template_location, prompt, ai_to_use="gemini"):
        print(f"Using {ai_to_use} to generate.")
        base_prompt = self.load_from_file(prompt_template_location)
        if ai_to_use == "gemini":
            result = self.call_gemini(base_prompt + prompt)
        elif ai_to_use == "openai":
            result = self.call_openai_api(base_prompt + prompt)
        return {"status": 200, "message": "Success", "result": result}


from supabase import create_client, Client


class SupabaseManager:
    def __init__(self, supabase_url, supabase_key):
        """
        Initialize the Supabase client.
        """
        self.supabase_url = supabase_url
        self.supabase: Client = create_client(self.supabase_url, supabase_key)

    def get_all_users(self, service_role_key):
        """
        Use the REST API to interact with the admin auth client.
        """
        headers = {
            "apikey": service_role_key,
            "Authorization": f"Bearer {service_role_key}",
        }
        admin_auth_url = f"{self.supabase_url}/auth/v1/admin"

        # Example: Get a list of users
        response = requests.get(f"{admin_auth_url}/users", headers=headers)
        return response.json()

    # async def _get_table_data_async(self, table_name):
    #     return self.supabase.table(table_name).select("*").execute()

    # def runSync(self, anyAsyncFunction):
    #     return asyncio.run(anyAsyncFunction())

    # async def insert_data(self):
    #     data = {"username": "user1", "email": "user1@example.com"}
    #     response = await self.supabase.from_("users").insert([data]).execute()
    #     if response.error:
    #         print("Error:", response.error)
    #         return response
    #     else:
    #         print("Data inserted successfully!")
    #         return response


def bundle_calculator():
    bundle_flat_price = 12
    complete_access = 25
    cost_million_per_dollar = 0.6

    per_call_token_expected = 800

    per_call_cost = cost_million_per_dollar * per_call_token_expected / 1000000
    possible_calls_per_dollar = cost_million_per_dollar / per_call_cost

    customer_expected_monthly_use_calls = 100 * 31
    total_spent_by_us = customer_expected_monthly_use_calls * per_call_cost
    we_charge = 3
    profit = round(we_charge - total_spent_by_us, 2)

    print(f"\nIf token used by tool is {per_call_token_expected} per call")
    print(f"Total Calls Possible per Dollar: {int(possible_calls_per_dollar)}\n")
    # print(f"Estimated Profit for average usage: $ {profit}")

    if_we_charge_dollar = 1.99
    cost_to_us = possible_calls_per_dollar * if_we_charge_dollar
    profit_ratio = 2
    we_allow_how_many_calls = cost_to_us / profit_ratio
    total_cost_on_allowed_limit = we_allow_how_many_calls * per_call_cost
    print(
        f"If we Charge $ {if_we_charge_dollar}, total tool calls possible is {int(cost_to_us)}. We allow {int(we_allow_how_many_calls)}"
    )
    print(
        f"So we spend $ {total_cost_on_allowed_limit} hence profit is ${if_we_charge_dollar-total_cost_on_allowed_limit} ie Rs {int((if_we_charge_dollar-total_cost_on_allowed_limit)*86)}\n"
    )
    print(
        f"per 1000 signups, MRR: ${(if_we_charge_dollar-total_cost_on_allowed_limit)*1000} ie Rs {int(1000*(if_we_charge_dollar-total_cost_on_allowed_limit)*86)}\n"
    )
