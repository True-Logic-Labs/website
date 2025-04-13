import { getAIResponse} from "./datatransformer"
// const simplemde = new SimpleMDE({
//   element: document.getElementById("output"),
// });

// Define event handler functions
function preventContextMenu(e) {
  e.preventDefault();
}

function preventCopy(e) {
  if (e.ctrlKey && e.key === "c") {
    e.preventDefault();
    alert("Copying is disabled on this webpage.");
  }
}

// document.addEventListener("contextmenu", preventContextMenu);
// document.addEventListener( "keydown", preventCopy );

// Remove event listeners
export function removeEventListeners() {
  document.removeEventListener("contextmenu", preventContextMenu);
  document.removeEventListener("keydown", preventCopy);
  // console.log("Event listeners removed");
}

export async function dynamicLoad() {
        function getURLParameter(name) {
          const urlParams = new URLSearchParams(window.location.search); // Get the query string
          return urlParams.get(name); // Get the value of the parameter
        }
        window.source = getURLParameter("code")?.trim(); // Replace 'code' with your parameter name
        // alert(window.source);
        // console.log(">>>>>>>>>>>>>", window.source);

        if (window.source == "iframe") {
          // alert("ALKJLKSJLKSJD");
          document.querySelectorAll(".iframeHide").forEach((element) => {
            element.style.display = "none";
          });
          window.dashboardHolder = `<div id="dashboard-center" style="width: 100%;"></div>`;
        } else {
          window.dashboardHolder = `
      <div id="dashboard-container">
        <div id="dashboard-left">
          <div id="subscribedTools" class="box-it">
          </div>
          <div id="promotedTools" class="box-it">
            <h1>Promoted</h1>
          </div>
        </div>
        <div id="dashboard-center"></div>
      </div>
        `;
        }
      }


export async function subscriptionsCheck ( serverObject, subscriptions )
{ 
  const final = serverObject
  const allowedProductIDs = subscriptions.map((sub) => sub.productID);

    const allowedTools = [];
    const notAllowedTools = [];

    // Iterate through categories and subcategories
    final.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.tools.forEach((tool) => {
          const toolData = {
            productID: tool.productID,
            path: tool.path,
            toolName: tool.name,
            subcategory: subcategory.name,
            category: category.name,
          };

          if (allowedProductIDs.includes(tool.productID)) {
            allowedTools.push(toolData);
          } else {
            notAllowedTools.push(toolData);
          }
        });
      });
    });

  //   // console.log("Allowed Tools:", allowedTools);
  // // console.log( "Not Allowed Tools:", notAllowedTools );
  return {subscribedTools: allowedTools,promotedTools:notAllowedTools}
}

export async function getUsageDetails (config)
{ 
  if ( !localStorage.getItem( config[ 'productID' ] ) )
      {
        localStorage.setItem(config['productID'], 0);
  }
  let liveUsageObject = {}
  liveUsageObject['freeUsageAllowance'] = config[ 'freeUsageAllowance' ]
  liveUsageObject['usageAllowanceSubscription'] = config[ 'usageAllowanceSubscription' ]
  liveUsageObject['freeUsageAllowancePostLogin'] = config[ 'freeUsageAllowancePostLogin' ]
  liveUsageObject['totalUsed'] = localStorage.getItem( config[ 'productID' ])
  liveUsageObject['triesLeft'] = config[ 'freeUsageAllowance' ] - localStorage.getItem( config[ 'productID' ] )
  // console.log( "Usage Details freeUsageAllowance: ", liveUsageObject )
  return liveUsageObject
}

async function toolTitleSetter ( config )
{ 
  if ( window.session !== "LoggedIn" )
    {
    let usage = await getUsageDetails (config)
    window.titleis = document.getElementById( "tool-title-page" );
    window.message = `<a href="/login" class="button">Login</a> to try more! or <span class="button">Subscribe</span> to generate ${usage[ 'usageAllowanceSubscription' ]} times! for $1</div>`;
    
    if ( usage[ 'triesLeft' ] == 0 )
      {
        window.titleis.innerHTML = window.message;
      } else
      { 
        
        window.titleis.innerHTML = `<span>Feel free to check the tool. You can try ${usage['triesLeft']} times.</span><a class="button" href="/login">Login</a><a class="button" href="/login">Subscribe</a>`;
      }
  }
}

async function updateToolTitle (config,filledPrompt)
{ 
  let usage = await getUsageDetails (config)

      if ( !localStorage.getItem( config[ 'productID' ] ) )
      {
        localStorage.setItem(config['productID'], 0);
    }
    
    // console.log( usage[ 'freeUsageAllowance' ] )
        
    if ( localStorage.getItem( config[ 'productID' ] ) >= usage[ 'freeUsageAllowance' ] )
        {
          alert( `Please login to try more! - Counter exceeded ${config[ 'freeUsageAllowance' ]} ` );
        } else
    { 
      window.result = callOpenAI( filledPrompt );
      let counter = parseInt( localStorage.getItem( config[ 'productID' ] ) );
      counter++
      localStorage.setItem(config[ 'productID' ], counter);
      // console.log( `Counter: ${ counter }` );

      if ( window.session == "LoggedIn" )
      {
  
      } else
      {    window.titleis = document.getElementById( "tool-title-page" );
    let triesLeft = config[ 'freeUsageAllowance' ]-localStorage.getItem( config[ 'productID' ] )   
    if ( triesLeft == 0 )
    {
      window.titleis.innerHTML = window.message;
    } else
    { 
      
      window.titleis.innerHTML = `<div>Feel free to check the tool. You can try ${ triesLeft } times</div>`;
    } }

    }
}

export async function generate ( config )
{ 
  const app = document.getElementById("app");
  const form = document.createElement("form");
  form.id = "dynamicForm";

  config.questions.forEach((question, index) => {
    const formGroup = document.createElement("div");
    formGroup.className = "form-group";

    const label = document.createElement("div");
    label.innerText = question.q;

    formGroup.appendChild(label);

    // Create the appropriate input element based on the type
    let inputElement;
    const fieldName = `A${index + 1}`;

    switch (question.type) {
      case "textbox":
        inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.name = fieldName;
        // inputElement.placeholder = question.q;
        break;

      case "textarea":
        inputElement = document.createElement("textarea");
        inputElement.name = fieldName;
        // inputElement.placeholder = question.q;
        break;

      case "dropdown":
        inputElement = document.createElement("select");
        inputElement.name = fieldName;

        question.typeoptions.forEach((option) => {
          const opt = document.createElement("option");
          opt.value = option;
          opt.textContent = option;
          inputElement.appendChild(opt);
        });
        break;

      case "checkbox":
        inputElement = document.createElement("div");
        question.typeoptions.forEach((option) => {
          const checkboxWrapper = document.createElement("div");
          const checkboxInputContainer = document.createElement("div");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.name = fieldName;
          checkbox.value = option;

          const checkboxLabel = document.createElement("div");
          checkboxLabel.textContent = option;
          checkboxInputContainer.appendChild(checkbox);
          checkboxWrapper.appendChild(checkboxInputContainer);
          checkboxWrapper.appendChild(checkboxLabel);
          inputElement.appendChild(checkboxWrapper);
          checkboxWrapper.classList.add("flexH");
        });
        break;

      case "radio":
        inputElement = document.createElement("div");
        question.typeoptions.forEach((option) => {
          const radioWrapper = document.createElement("div");
          const radio = document.createElement("input");
          radio.type = "radio";
          radio.name = fieldName;
          radio.value = option;

          const radioLabel = document.createElement("div");
          radioLabel.textContent = option;

          radioWrapper.appendChild(radio);
          radioWrapper.appendChild(radioLabel);
          inputElement.appendChild( radioWrapper );
          radioWrapper.classList.add("flexH");
        });
        break;

      default:
        console.error(`Unsupported input type: ${question.type}`);
        break;
    }

    if (inputElement) {
      formGroup.appendChild(inputElement);
    }
    form.appendChild( formGroup );
    toolTitleSetter ( config )
  });

  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", () => {
    const formData = new FormData(form);
    let filledPrompt = config.prompt;

    config.questions.forEach((question, index) => {
      const fieldName = `A${index + 1}`;
      if (question.type === "checkbox") {
        const selectedOptions = Array.from(formData.getAll(fieldName)).join(
          ", "
        );
        filledPrompt = filledPrompt.replace(
          `<<${fieldName}>>`,
          selectedOptions || `<<${fieldName}>>`
        );
      } else {
        const value = formData.get(fieldName);
        filledPrompt = filledPrompt.replace(
          `<<${fieldName}>>`,
          value || `<<${fieldName}>>`
        );
      }
    });

    // let output = document.getElementById("output");
    // output.value = filledPrompt; // Display generated prompt in the textarea
    updateToolTitle (config,filledPrompt)
    //  window.result = callOpenAI( filledPrompt );
    //   let counter = parseInt( localStorage.getItem( config[ 'productID' ] ) );
    //   counter++
    //   localStorage.setItem(config[ 'productID' ], counter);
    //   // console.log( `Counter: ${ counter }` );
    });


  form.appendChild(submitButton);
  app.appendChild(form);
}

export async function callOpenAI ( prompt )
{
    let output_div = document.getElementById( "output-container-id")
    

try {
    const result = await getAIResponse(prompt)
    // console.log("OpenAI Response:", result.message);
    let output = document.getElementById("output");
    output.value = result.message
    window.simplemde.value(result.message);
    output_div.style.display = "block"
} catch (error) {
    console.error("Error calling OpenAI API:", error);
}
}

  // // Function to read query parameters
  // function getQueryParam(param) {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   return urlParams.get(param);
  // }

  // // Alert the parameter value
  // window.onload = function () {
  //   const value = getQueryParam("case");
  //   if (value) {
  //     alert(`The value of yourParam is: ${value}`);
  //   } else {
  //     alert("No parameter found for 'case'");
  //   }
// };
  
export async function allPageHeaderControl ()
{
    if (window.session == "LoggedIn") {
      document.querySelectorAll(".loggedOut").forEach(async (element) => {
        // // console.log(element);
        // element.style.display = "none";
        element.classList.add("hide")
      } );
      document.querySelectorAll(".loggedIn").forEach(async (element) => {
        // // console.log(element);
        // element.style.display = "none";
        element.classList.remove("hide")
      });
    } else {
       document.querySelectorAll(".loggedOut").forEach(async (element) => {
        // // console.log(element);
        // element.style.display = "none";
        element.classList.remove("hide")
      } );
      document.querySelectorAll(".loggedIn").forEach(async (element) => {
        // // console.log(element);
        // element.style.display = "none";
        element.classList.add("hide")
      });
    }
}
  
export async function logginLogic() {
    if (window.session == "LoggedIn") {
      removeEventListeners();

      document.querySelectorAll(".seo").forEach(async (element) => {
        // // console.log(element);
        element.style.display = "none";
      });

      document.querySelectorAll(".loggedOut").forEach(async (element) => {
        // // console.log(element);
        element.style.display = "none";
      });

      const element2 = document.getElementById("ToolHolder");
      element2.innerHTML = window.dashboardHolder;
      loadDashBoard();
      await placeToolHolderInDom("dashboard-center");
    } else {
      await placeToolHolderInDom("ToolHolder");

      document.querySelectorAll(".loggedIn").forEach(async (element) => {
        // // console.log(element);
        element.style.display = "none";
      });
    }
  }

  async function loadDashBoard() {
    window.subsciptions = await window.authManager.getSubscriptions();

    window.subscriptionsCheck = await subscriptionsCheck(
      window.productBank,
      window.subsciptions
    );
    // console.log(window.subscriptionsCheck);

    function groupToolsByCategoryAndSubcategory(tools) {
      const groupedData = {};

      tools.forEach((tool) => {
        const {category, subcategory, toolName, path} = tool;

        // Ensure category exists
        if (!groupedData[category]) {
          groupedData[category] = {};
        }

        // Ensure subcategory exists under category
        if (!groupedData[category][subcategory]) {
          groupedData[category][subcategory] = [];
        }

        // Push tool into the appropriate subcategory
        groupedData[category][subcategory].push({toolName, path});
      });

      return groupedData;
    }

    async function renderGroupedTools(containerId, groupedData) {
      const container = document.getElementById(containerId);

      Object.entries(groupedData).forEach(([category, subcategories]) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category-section";
        categoryDiv.innerHTML = `<div>${category}</div>`;

        Object.entries(subcategories).forEach(([subcategory, tools]) => {
          const subcategoryDiv = document.createElement("div");
          subcategoryDiv.className = "subcategory-section";
          subcategoryDiv.innerHTML = `<div>${subcategory}</div>`;

          tools.forEach((tool) => {
            const toolDiv = document.createElement("div");
            toolDiv.className = "tool-item";

            // Highlight if path matches the current page
            if (tool.path === window.location.pathname) {
              toolDiv.style.cursor = "pointer";
              toolDiv.innerHTML = `<div class="tool-title" data-path="${tool.path}">${tool.toolName}</div>`;
            } else {
              // toolDiv.style.backgroundColor = "grey";
              toolDiv.style.cursor = "pointer";
              toolDiv.innerHTML = `<div class="tool-title" data-path="${tool.path}">${tool.toolName}</div>`;
            }

            // toolDiv
            //   .querySelector(".tool-title")
            //   .addEventListener("click", () => {
            //     window.location.href = tool.path;
            //   });
            subcategoryDiv.appendChild(toolDiv);
          });

          categoryDiv.appendChild(subcategoryDiv);
        });

        container.appendChild(categoryDiv);
      });

      document.querySelectorAll(".tool-title").forEach((title) => {
        title.addEventListener("click", (event) => {
          event.preventDefault();
          const toolLink = event.target.getAttribute("data-path");
          document
            .querySelectorAll(".tool-title")
            .forEach(async (element) => {
              element.style.borderColor = "rgba(0,0,0,1)";
              element.classList.remove("infinte");
            });
          title.style.borderColor = "green";
          title.classList.add("infinte");
          // title.style.border = "0.2rem solid black";
          openInIframe(`${toolLink}?code=iframe`);

          // document.body.classList.add("fade-out");
          // const path = title.dataset.path;
          // setTimeout(() => {
          //   window.location.href = `{$path}?code=iframe`;
          // }, 100); // Timeout matches the animation duration
        });
      });
    }

    const groupedTools = groupToolsByCategoryAndSubcategory(
      window.subscriptionsCheck.subscribedTools
    );
    await renderGroupedTools("subscribedTools", groupedTools);
    const promotedgroupedTools = groupToolsByCategoryAndSubcategory(
      window.subscriptionsCheck.promotedTools
    );
    await renderGroupedTools("promotedTools", promotedgroupedTools);
  }

  function openInIframe(url) {
    const dashboardCenter = document.getElementById("dashboard-center");

    // Create iframe element
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "100%"; // Adjust the height as needed
    iframe.frameBorder = "0"; // Optional: remove border

    // Clear any existing iframe and append the new one
    dashboardCenter.innerHTML = ""; // Clear existing content (if needed)
    dashboardCenter.appendChild(iframe);
  }

  async function placeToolHolderInDom(id) {
    let toolCode = `
        <main style="width:90%;">
    <div id="tool-title-page"></div>
    <!-- <Button>Hello World</Button> -->
    <div class="main-container">
      <div id="app" class="form-container"></div>
      <div id="output-container-id" class="output-container">
        <textarea
          id="output"
          readonly
          placeholder="Your generated prompt will appear here..."></textarea>
      </div>
    </div>
  </main>
    
    `;
    const element = document.getElementById(id);
    element.innerHTML = toolCode;
    window.simplemde = new SimpleMDE({
      element: document.getElementById("output"),
    });
  }