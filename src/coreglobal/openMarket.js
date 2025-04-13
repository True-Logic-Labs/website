export class MobileDeviceUIControl
{ 

 constructor() {
      this.startX = 0;
    this.currentTab = 0;
  }
  updateTabState(index) {
        const tabs = document.querySelectorAll(".tab-btn");
        const contents = document.querySelectorAll(".tab-content");
  
        // Reset all tabs and contents
        tabs.forEach((tab) => tab.classList.remove("active"));
        contents.forEach((content) => (content.style.display = "none"));
  
        // Show the selected tab and set active color
        tabs[index].classList.add("active");
        contents[index].style.display = "block";
  }

   handleTouchStart(e) {
      this.startX = e.touches[0].clientX;
    }

     handleTouchMove(e) {
      if (!startX) return;

      const endX = e.touches[0].clientX;
      const diffX = this.startX - endX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe left, move to next tab
          this.currentTab = Math.min(this.currentTab + 1, 2);
        } else {
          // Swipe right, move to previous tab
          this.currentTab = Math.max(this.currentTab - 1, 0);
        }
        this.updateTabState(this.currentTab);
        startX = 0; // Reset start position
      }
    }

     handleTabClick(index) {
      this.currentTab = index;
      this.updateTabState(index);
     }
     enterFullscreen() {
      const element = document.documentElement; // The whole page
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        // Safari compatibility
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // Older IE/Edge compatibility
        element.msRequestFullscreen();
      }
      //  document.body.style.height = "100vh";
     }
     getOrientation() {
      return window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";
    }
}


export const UIManger = new MobileDeviceUIControl()

export async function getPathByProductID ( data, productID )
{
    for (const category of data) {
        for (const subcategory of category.subcategories) {
            for (const tool of subcategory.tools) {
              if ( tool.productID === productID )
              {
                     document.querySelectorAll(".tool-title").forEach( ( element ) =>
                {
                  element.style.background = "none"
                  // element.style.color = "white"
                  element.style.scale = "1"
                  })
                document.getElementById( productID ).style.background = "yellow"
                document.getElementById( productID ).style.color = "black"
                document.getElementById( productID ).style.scale = "1.1"
                    return [tool.path,tool.name];
                }
            }
        }
    }
    return null;
}

export async function generate ( config )
{
  
    const app = document.getElementById("app");
    app.innerHTML = "";
    const form = document.createElement("form");
    form.id = "dynamicForm";

    config.questions.forEach((question, index) => {
      const formGroup = document.createElement("div");
      formGroup.className = "form-group";

      const label = document.createElement("div");
      label.innerText = question.q;
      label.classList.add("question")

      formGroup.appendChild(label);

      // Create the appropriate input element based on the type
      let inputElement;
      const fieldName = `A${index + 1}`;

      switch (question.type) {
        case "textbox":
          inputElement = document.createElement("input");
          inputElement.type = "text";
          inputElement.name = fieldName;
          inputElement.placeholder = question.q;
          break;

        case "textarea":
          inputElement = document.createElement("textarea");
          inputElement.name = fieldName;
          inputElement.placeholder = question.q;
          break;

        case "dropdown":
          inputElement = document.createElement("select");
          inputElement.name = fieldName;

          question.typeoptions.forEach((option) => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            opt.classList.add("flexH");
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
            checkbox.classList.add('input-options')

            const checkboxLabel = document.createElement("div");
            checkboxLabel.textContent = option;
            checkboxInputContainer.appendChild(checkbox);
            checkboxWrapper.appendChild(checkboxInputContainer);
            checkboxWrapper.appendChild(checkboxLabel);
            checkboxWrapper.classList.add("flexH");
            inputElement.appendChild(checkboxWrapper);
          });
          break;

        case "radio":
          inputElement = document.createElement("div");
          question.typeoptions.forEach((option) => {
            const radioWrapper = document.createElement( "div" );
            const radioInputContainer = document.createElement("div");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = fieldName;
            radio.value = option;
            radio.classList.add('input-options')

            const radioLabel = document.createElement("div");
            radioLabel.textContent = option;

            radioInputContainer.appendChild(radio);
            radioWrapper.appendChild( radioInputContainer );
            radioWrapper.appendChild(radioLabel);
            radioWrapper.classList.add("flexH");
            inputElement.appendChild( radioWrapper );
          });
          break;

        default:
          console.error(`Unsupported input type: ${question.type}`);
          break;
      }

      if (inputElement) {
        formGroup.appendChild(inputElement);
      }
      form.appendChild(formGroup);
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

      let output = document.getElementById("output");
      output.value = filledPrompt;
      window.result = callOpenAI( filledPrompt );
    });

    form.appendChild(submitButton);
    
  app.appendChild( form );
  }

export async function subscriptionsCheck ( serverObject )
{ 
    const final = serverObject
  const allowedTools = [];

    // Iterate through categories and subcategories
    final.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.tools.forEach((tool) => {
          const toolData = {
            productID: tool.productID,
            toolName: tool.name,
            toolDescription: tool.description,
            subcategory: subcategory.name,
            category: category.name,
            pageLink: tool.pageLink,
          };
            allowedTools.push(toolData);
        });
      });
    } );
  return {allTools: allowedTools}
}
export async function loadDashBoard ( productBank )
{
      window.productBank= productBank
      window.subscriptionsCheck = await subscriptionsCheck(
        window.productBank,
        window.subsciptions
      );
  
  function groupToolsByCategoryAndSubcategory ( tools )
  {
        const groupedData = {};
  
        tools.forEach( ( tool ) =>
        {
          
          const {category, subcategory, toolName,productID,toolDescription,pageLink} = tool;
  
          // Ensure category exists
          if (!groupedData[category]) {
            groupedData[category] = {};
          }
  
          // Ensure subcategory exists under category
          if (!groupedData[category][subcategory]) {
            groupedData[category][subcategory] = [];
          }
  
          // Push tool into the appropriate subcategory
          groupedData[category][subcategory].push({toolName, productID,toolDescription,pageLink});
        });
        return groupedData;
      }
  
  async function renderGroupedTools ( containerId, groupedData )
  {
        // console.log("GROUPED", groupedData)
        const container = document.getElementById(containerId);
  
        Object.entries(groupedData).forEach(([category, subcategories]) => {
  
          Object.entries(subcategories).forEach(([subcategory, tools]) => {
            tools.forEach( ( tool ) =>
            {
              const toolDiv = document.createElement("div");
              toolDiv.className = "tool-item";
              toolDiv.style.cursor = "pointer";
              toolDiv.innerHTML = `
                <a class="tool-card" href="tools/${tool.productID}">
                  <div class="tool-tags">
                    <span class="tool-suite">Part of ${category} suite</span>
                    <span class="tool-bundle">Part of ${subcategory} bundle</span>
                  </div>
                  <div class="tool-title" id="${tool.productID}">${tool.toolName}</div>
                  <div class="tool-description">${tool.toolDescription}</div>
                </a>
              `;


              container.appendChild( toolDiv );
              // container.classList.add("animateIt")
            });
          });
        });
  
        document.querySelectorAll( ".tool-title" ).forEach( ( title ) =>
        {
          title.addEventListener("click", async (event) => {
            event.preventDefault();
            const toolToBeLoaded = await getPathByProductID(productBank, title.id)
            await generate( toolToBeLoaded[ 0 ] )
            localStorage.setItem('currentToolUsed', title.id);
            document.getElementById( 'tool-title' ).innerText = toolToBeLoaded[ 1 ]
            window.simplemde.value("");
          });
        });
      }
  
  const groupedTools = groupToolsByCategoryAndSubcategory(
    window.subscriptionsCheck.allTools
  );
      await renderGroupedTools("tools-container", groupedTools);
}


function getRandomHslaColor() {
    const hue = Math.floor(Math.random() * 360); // Range [0, 360] for hue
    const saturation = Math.floor(Math.random() * 100); // Range [0, 100] for saturation
    const lightness = Math.floor(Math.random() * 100); // Range [0, 100] for lightness
    const alpha = Math.random().toFixed(2); // Range [0, 1] for alpha

    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
export async function generateGridString(sections, heightVH, uid) {
    let stylestring = `<style>
      .grid-container {
        display: grid;
        width: 100vw;
        max-width: 100%;
      }

      .grid-item {
        background-color: #92e3ee;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        color: #004d40;
        /* height: 100%;  */
      }
      </style>
      
        `;
    let gridHtml = `<div class="grid-container" style="display: grid; grid-template-rows: repeat(${sections}, ${heightVH}vh);">`;

    for (let i = 1; i <= sections; i++) {
      const placementId = `placement-${i}-${uid}`;
      gridHtml += `
        <div class="grid-item" id="${placementId}" style="background: ${getRandomHslaColor()};">
            Placement ID: ${placementId} ${getRandomHslaColor()}
        </div>`;
    }

    gridHtml += `</div>`;
    stylestring += gridHtml;
    return stylestring;
  }