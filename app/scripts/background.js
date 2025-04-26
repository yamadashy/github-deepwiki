// This background.js is kept minimal as all implementation is handled in content_scripts

const injectContentToTab = async (tab) => {
  // Skip if URL is undefined
  if (tab.url === undefined) {
    return;
  }

  // Skip if tab is discarded
  if (tab.discarded) {
    return;
  }

  // Skip if tab ID is undefined
  if (tab.id === undefined) {
    return;
  }

  // Skip if not a GitHub URL
  if (!tab.url.startsWith('https://github.com/')) {
    return;
  }

  const manifest = chrome.runtime.getManifest();
  const cssFiles = manifest.content_scripts?.[0].css ?? [];
  const jsFiles = manifest.content_scripts?.[0].js ?? [];

  // Inject CSS
  if (cssFiles.length > 0) {
    await chrome.scripting.insertCSS({
      target: {
        tabId: tab.id,
        allFrames: true
      },
      files: cssFiles
    });
  }

  // Inject JavaScript
  if (jsFiles.length > 0) {
    await chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
        allFrames: true
      },
      files: jsFiles
    });
  }
};

// Apply content to all tabs when installed or updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, async (tabs) => {
    for (const tab of tabs) {
      try {
        await injectContentToTab(tab);
      } catch (e) {
        console.error('Failed to inject content to tab:', e);
      }
    }
  });
});

// Apply content when a new tab is created
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    injectContentToTab(tab);
  }
}); 