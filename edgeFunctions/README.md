npm install -g netlify-cli
netlify login
netlify init

mkdir -p netlify/edge-functions
touch netlify/edge-functions/openai.js

netlify env:set OPENAI_API_KEY your_openai_api_key_here

touch ./netlify.toml

```toml
[[edge_functions]]
function = "openai"
path = "/.netlify/edge-functions/openai"
```

TRY THIS > netlify deploy --prod --dir=.
OR TRY > netlify deploy --prod

netlify status

curl -X POST "https://edgetools.netlify.app/.netlify/edge-functions/openai" \
 -H "Content-Type: application/json" \
 -d '{"prompt": "Hello, AI!"}'

```text
Build logs: https://app.netlify.com/sites/edgetools/deploys/67af18b14a07982c1b043929
Function logs: https://app.netlify.com/sites/edgetools/logs/functions
Edge function Logs: https://app.netlify.com/sites/edgetools/logs/edge-functions
Unique deploy URL: https://67af18b14a07982c1b043929--edgetools.netlify.app
Website URL: https://edgetools.netlify.app
```
