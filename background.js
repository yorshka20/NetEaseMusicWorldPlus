let mode;
const title = ["closed", "normal", "enhanced"];
const icon = ["images/grey.svg", "images/red.svg", "images/blue.svg"];

// Function to update declarative net request rules based on mode
const updateRules = async () => {
  // Remove existing rules
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [1, 2],
  });

  // Add rules based on mode
  if (mode > 0) {
    await chrome.declarativeNetRequest.updateSessionRules({
      addRules: [
        {
          id: 1,
          priority: 1,
          action: {
            type: "modifyHeaders",
            requestHeaders: [
              {
                header: "X-Real-IP",
                operation: "set",
                value: "211.161.244.70",
              },
            ],
          },
          condition: {
            urlFilter: "*://music.163.com/*",
            resourceTypes: ["xmlhttprequest"],
          },
        },
        {
          id: 2,
          priority: 1,
          action: {
            type: "modifyHeaders",
            requestHeaders: [
              {
                header: "Cache-Control",
                operation: "set",
                value: "no-cache",
              },
            ],
          },
          condition: {
            urlFilter: "*://*.music.126.net/*m*c*",
            resourceTypes: ["xmlhttprequest"],
          },
        },
      ],
    });
  }
};

const sync = async () => {
  await chrome.storage.local.set({ mode });
  await chrome.action.setIcon({ path: icon[mode] });
  await chrome.action.setTitle({
    title: `${chrome.i18n.getMessage("name")} [${chrome.i18n.getMessage(
      title[mode]
    )}]`,
  });
  await updateRules();
};

// Handle action button click
chrome.action.onClicked.addListener(async () => {
  mode = (mode + 1) % 3;
  await sync();
});

// Initialize on startup
chrome.storage.local.get("mode", async (data) => {
  mode = data.mode == null ? 2 : data.mode;
  await sync();
});
