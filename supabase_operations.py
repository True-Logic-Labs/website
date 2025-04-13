import core

# Your Supabase project credentials
supabase_url = "https://ggahkdpgjlxgdftylqqu.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnYWhrZHBnamx4Z2RmdHlscXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2OTMzNzQsImV4cCI6MjA1MzI2OTM3NH0.7ojsZV7pIz9zzdRb1hO4iPMiEKm4vp2pODwn3W8mrDA"

service_role_key = core.os.environ.get("SUPA_SERVICE_ROLE_KEY")

manager = core.SupabaseManager(supabase_url, supabase_key)

response = manager.get_all_users(service_role_key)
print(response)
import json

json_string = json.dumps(response, indent=4)
print(json_string)
