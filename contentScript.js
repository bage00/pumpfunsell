(() => {
  // Set the bonding curve value
  const BONDING_CURVE_VÄRDE = 50;
  
  // Function to log text within the target div, extract percentage, and click buttons based on conditions
  const logDivTextAndClick = () => {
    // Select the div with the class "grid grid-cols-2 gap-2 mb-4"
    const gridDiv = document.querySelector(".grid.grid-cols-2.gap-2.mb-4");

    if (gridDiv) {
      console.log("Found grid div with class 'grid grid-cols-2 gap-2 mb-4'.");

      // Find the div with the class "text-sm text-gray-400 mb-1" and log its text content
      const textDiv = document.querySelector(".text-sm.text-gray-400.mb-1");

      if (textDiv) {
        // Start polling for progress value
        let lastProgressValue = -1; // Initialize last progress value to a value less than 0

        const checkProgress = setInterval(() => {
          const divText = textDiv.textContent;
          console.log(`Text inside div: ${divText}`);

          // Extract the percentage number from the text using regex
          const percentageMatch = divText.match(/progress:\s*(\d+)%/);
          if (percentageMatch) {
            const progressValue = parseInt(percentageMatch[1], 10); // Convert extracted string to an integer
            console.log(`Extracted progress value: ${progressValue}%`);

            // Check if the progress value has increased
            if (progressValue > lastProgressValue) {
              lastProgressValue = progressValue; // Update last progress value
              console.log(`Progress has increased to: ${progressValue}%`);

              // Check if the progress value is equal to or greater than the bonding curve value
              if (progressValue >= BONDING_CURVE_VÄRDE) {

                const button = document.querySelector('.p-2.text-center.rounded.bg-gray-800.text-grey-600');

                if (button) {
                  button.click();
                  console.log("Progress is % or more, initial button clicked.");

                // Click the fourth button with the specified class
                const allButtons = document.querySelectorAll(
                  ".text-xs.py-1.px-2.ml-1.rounded.bg-primary.text-gray-400.hover\\:bg-gray-800.hover\\:text-gray-300"
                );

                if (allButtons.length >= 3) {
                  const fourthButton = allButtons[2]; // Select the third button (index 2)
                  fourthButton.click(); // Simulate a click on the fourth button
                  console.log("Fourth button clicked.");
                } else {
                  console.log("Less than four buttons found.");
                }

                // Now click the button with the specified class
                const targetButtons = document.querySelectorAll(".flex.flex-col.gap-2 > button");
                if (targetButtons.length > 0) {
                  targetButtons[0].click(); // Click the first button in the NodeList
                  console.log("Button clicked.");
                } else {
                  console.log("No buttons found.");
                }
              } else {
                console.log("Progress is less than 25%, button not clicked.");
              }
            } else {
              console.log("sell button is not avalaible")
            }
            }
          } else {
            console.log("No progress percentage found in the text.");
          }
        }, 1); // Poll every millisecond

        // Optionally, you can stop polling after a certain condition is met or a timeout
        // For example, stop polling after 10 seconds
      } else {
        console.log("Div with class 'text-sm text-gray-400 mb-1' not found.");
      }
    } else {
      console.log("Div with class 'grid grid-cols-2 gap-2 mb-4' not found.");
    }
  };

  // Listen for messages from background.js
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "CLICK_BUTTON") {
      logDivTextAndClick(); // Log the button names and click the button if the condition is met
    }
  });

  // Run the function right away if needed
  document.addEventListener("DOMContentLoaded", () => {
    logDivTextAndClick(); // This will run the logging and clicking when the content script is loaded
  });
})();
