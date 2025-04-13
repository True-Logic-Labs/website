export async function editAll() {
    let textarea = null;
    let targetElement = null;

    // Function to remove the textarea editor
    function removeEditor() {
      if (textarea) {
        textarea.remove();
        textarea = null;
        targetElement = null;
      }
    }

    // Main listener for right-click
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault(); // Stop default context menu

      removeEditor(); // Remove existing editor if any

      targetElement = e.target;

      // Create a real textarea
      textarea = document.createElement("textarea");
      textarea.value = targetElement.innerText.trim();
      textarea.className = "inline-editor";
      textarea.style.position = "absolute";

      const rect = targetElement.getBoundingClientRect();

      // Match dimensions and font styles
      textarea.style.left = `${rect.left + window.scrollX}px`;
      textarea.style.top = `${rect.top + window.scrollY}px`;
      textarea.style.width = `${rect.width}px`;
      textarea.style.height = `${rect.height}px`;

      // Get computed styles for font matching
      const computedStyle = window.getComputedStyle(targetElement);
      textarea.style.fontSize = computedStyle.fontSize;
      textarea.style.fontFamily = computedStyle.fontFamily;
      textarea.style.lineHeight = computedStyle.lineHeight;
      textarea.style.fontWeight = computedStyle.fontWeight;
      textarea.style.color = computedStyle.color;
      textarea.style.textAlign = computedStyle.textAlign;

      // Optional: More nice UI adjustments
      textarea.style.padding = computedStyle.padding || "4px";
      textarea.style.margin = "0";
      textarea.style.border = "2px solid #333";
      textarea.style.borderRadius = "6px";
      textarea.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
      textarea.style.background = "#fff";
      textarea.style.zIndex = 9999;
      textarea.style.resize = "both"; // Optional: allow resizing if you want

      // Insert and focus
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select(); // Auto-select content

      // Save on Ctrl + Enter
      textarea.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && event.ctrlKey) {
          targetElement.innerText = textarea.value;
          removeEditor();
        } else if (event.key === "Escape") {
          removeEditor(); // Cancel on Esc
        }
      });

      // Click outside to remove editor
      setTimeout(() => {
        document.addEventListener("click", function handler(ev) {
          if (ev.target !== textarea) {
            removeEditor();
            document.removeEventListener("click", handler);
          }
        });
      }, 0);
    });
}