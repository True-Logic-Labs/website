export function getAllProducts(configs) {
  const toolLinks = Object.entries(configs).map(([a, b]) => {
    const title = b.toolMeta?.title || "Untitled Tool";
    const description = b.toolMeta?.description || "No description available";
    const genCode = b.genCode;
    const toolDetails = b.toolDetails;
    return {
      title,
      description,
      genCode: genCode,
      meta: b.toolMeta,
      productDetails: toolDetails
    };
  });
  return toolLinks;
}

export function makeBundles (configs)
{ 
  
  const toolLinks = getAllProducts(configs);
  const bundles = { categories: [] };
  toolLinks.forEach( ( tool ) =>
  {
    if (tool.meta) {
      const {bundle, subCat, title, description} = tool.meta;
      let category = bundles.categories.find(
        (category) => category.name === bundle
      );
      if (!category) {
        category = {name: bundle, subcategories: []};
        bundles.categories.push(category);
      }
  
      let subcategory = category.subcategories.find((sub) => sub.name === subCat);
      if (!subcategory) {
        subcategory = {name: subCat, tools: []};
        category.subcategories.push(subcategory);
      }
      let pageLocation
      if ( tool.productDetails.productType === 1 )
      {
        pageLocation = `/tools/${ tool.productDetails.productID }`
      } else
      { 
        pageLocation = `/tools/${ tool.productDetails.productTypeName }/${ tool.productDetails.productID }`
      }

      const final = {
        name: title,
        description,
        productID: tool.productDetails.productID,
        pageLink: pageLocation,
      }
      subcategory.tools.push(final);
    }
  }); return bundles
}

export async function getProductDumpByProductID(tools, productID) {
  return tools.find((item) => item.meta.productID === productID) || null;
}

export async function getProductPageProductID ( tools, productID )
{
  let final = tools.find( ( item ) => item.meta.productID === productID )
  return final.meta
}
export function extractToolsFromSuite(data) {
  return data.subcategories.flatMap((subcategory) => subcategory.tools);
}
export async function getSuitebyToolProductID(data, productID) {
  if (!Array.isArray(data)) {
    console.error("Expected an array but got:", data);
    return null;
  }

  for (const category of data) {
    for (const subcategory of category.subcategories || []) {
      for (const tool of subcategory.tools || []) {
        if (tool.productID === productID) {
          return category;
        }
      }
    }
  }
  return null; // Return null if the tool is not found
}

export async function getBundlebyToolProductID(data, productID) {
  if (!Array.isArray(data)) {
    console.error("Expected an array but got:", data);
    return null;
  }

  for (const category of data) {
    for (const subcategory of category.subcategories || []) {
      for (const tool of subcategory.tools || []) {
        if (tool.productID === productID) {
          return subcategory;
        }
      }
    }
  }
  return null; // Return null if the tool is not found
}


export async function getAIResponse(prompt) {
    const response = await fetch(
      "https://edgetools.netlify.app/.netlify/edge-functions/openai",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({prompt}),
      }
    );

    const data = await response.json();
    return data
}
  
const basePriceOfTool = "$4"

export async function totalPriceOfBundle() {
    // console.log("This needs to count total tools in the bundle and return dollars multiplied by per tool price. Eg presently we think per tool intro price should be $4, so if 4 tools in this bundle, then $16 to be returned")
    return null
}
  
export async function totalPriceOfSuit() {
    // console.log("This needs to count total tools in the suite and return dollars multiplied by per tool price. Eg presently we think per tool intro price should be $4, so if 10 tools in this suit, then $40 to be returned")
    return null
}

export async function totalPriceOfEveything() {
    // console.log("This needs to count total tools we have and return dollars multiplied by per tool price. Eg presently we think per tool intro price should be $4, so if 100 tools in total, in all suits and bundles, then $400 to be returned")
    return null
}
  
export function groupByCategory(items, categoryType) {
  let result = {};

  items.forEach( item =>
  {
    let categories = item.toolDetails.categorisation[categoryType]; 
    if (item.toolDetails.releaseStatus == "released")
        { 
          if (categories) {
            categories.forEach(category => {
              if (!result[category]) {
                result[category] = [];
              }
      
            let pageLocation
              if ( item.toolDetails.productTypeID === 1 )
              {
                pageLocation = `/tools/${ item.toolDetails.productID }`
              } else { 
                pageLocation = `/tools/${item.toolDetails.productTypeName}/${ item.toolDetails.productID }`
              }
              
              let toolObject = {
                "title": item.toolMeta.title,
                "description": item.toolMeta.description,
                "productID": item.toolDetails.productID,
                "productLocation": pageLocation
              }
                result[category].push(toolObject);
            });
          }
        }
  });
  return result;
}
