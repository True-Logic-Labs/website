"""
Flow to be made:

## No Idea Case:

When I have no idea what to make, follow below:

1. Pompt AI to find high demand tools to be made and useful per industry per role.
2. Generate the Tool.
3. Generate Page Content
4. Generate All Schema
5. Generate meta and long tail keywords
6. Categorise the tool into specific tags, roles etc
7. Combine All.

## When I have an idea

When we know what to do:

1. Generate the tool as per instruction.
2. Generate Page Content
3. Generate All Schema
4. Generate meta and long tail keywords
5. Put into specific category and add tags etc
6. Combine All.
"""

import os
import core
import json
import uuid

# core.bundle_calculator()

instance = core.AIGenerator()


############## START MAKE TOOL ##################
def appendToJS(file_path, new_dict):
    with open(file_path, "r") as file:
        content = file.read()

    insert_pos = content.rfind("]")
    if insert_pos == -1:
        raise ValueError("Array structure not found in the file.")

    updated_content = (
        content[:insert_pos].rstrip() + ",\n" + json.dumps(new_dict, indent=4) + "\n]"
    )

    with open(file_path, "w") as file:
        file.write(updated_content)

    print("Dictionary successfully appended!")


def make_tool_gen_dict(
    TOOL_REQUESTED, REPLACEMENT_VAR_NAME, PROMPT_TEMPLATE_LOCATION, instance
):
    with open(PROMPT_TEMPLATE_LOCATION, "r") as file:
        content = file.read()
    updated_content = content.replace(REPLACEMENT_VAR_NAME, TOOL_REQUESTED)
    result = instance.call_openai_api(updated_content)
    return result


def make_tool(tool_requested):
    print("1----------------Calling AI")
    PROMPT_TEMPLATE_LOCATION = "./backend_prompts/tool_gen.prompt"
    REPLACEMENT_VAR_NAME = "<<<TOOL_REQUESTED>>>"
    stage1 = make_tool_gen_dict(
        tool_requested, REPLACEMENT_VAR_NAME, PROMPT_TEMPLATE_LOCATION, instance
    )
    print(stage1)
    print("2----------------Calling AI")

    PROMPT_TEMPLATE_LOCATION = "./backend_prompts/tool_SEO.prompt"
    REPLACEMENT_VAR_NAME = "<<<TOOL_GEN_DICT>>>"
    stage2 = make_tool_gen_dict(
        stage1, REPLACEMENT_VAR_NAME, PROMPT_TEMPLATE_LOCATION, instance
    )
    # core.print_md(data_dict)
    print(stage2)
    print("3----------------Dumping Response")

    stage1_dict = json.loads(stage1)
    stage2_dict = json.loads(stage2)
    uid = uuid.uuid4()
    stage1_dict["toolDetails"]["productID"] = str(uid)
    stage1_dict["toolMeta"]["productID"] = str(uid)
    stage1_dict["toolMeta"]["SEO"].update(stage2_dict["SEO"])
    # stage1_dict["toolMeta"]["SEO"] = stage2_dict["SEO"]
    stage1_dict["toolMeta"]["pageDetails"] = stage2_dict["pageDetails"]

    json_string = json.dumps(stage1_dict, indent=4)
    print(json_string)

    with open(
        f"./backend_toolsGenerated/{stage1_dict['toolMeta']['title']}.json", "w"
    ) as file:
        json.dump(stage1_dict, file, indent=4)

    file_path = "./src/coreglobal/products.js"
    appendToJS(file_path, stage1_dict)


tool_name = "Email Campaign Copy Generator"
seo_page_name = tool_name.replace(" ", "-") + ".astro"
specific_instruction_or_expectation = "for any type of product or service or subscription or newsletter, it could be for any industry for any purpose."

tool_requested = f"Make a {tool_name} {specific_instruction_or_expectation}"

print(tool_name)
print(seo_page_name)
print(tool_requested)

make_tool(tool_requested)
############## END MAKE TOOL ##################


############## START MAKE PAGE ##################
# page_template = """---
# import ToolsSEO from "../../components/ToolsGeneral.astro";
# import {configs} from "../../coreglobal/products.js";

# export function findItemByTitle(array, title) {
#   return array.find((item) => item.toolMeta && item.toolMeta.title === title);
# }

# export const toolName = "<<tool_name>>";
# export const specificConfig = findItemByTitle(configs, toolName);
# export const toolMeta = specificConfig["toolMeta"];

# Object.assign(specificConfig["genCode"], specificConfig["toolDetails"]);
# export const toolConfig = specificConfig["genCode"];
# ---

# <ToolsSEO
#   title={toolMeta.title}
#   description={toolMeta.description}
#   toolMeta={toolMeta}
#   toolConfig={toolConfig}
# />
# """

# updated_content = page_template.replace("<<tool_name>>", tool_name)
# print(updated_content)

# with open(f"./src/pages/tools/{seo_page_name}", "w") as file:
#     file.write(updated_content)
############## END MAKE PAGE ##################
