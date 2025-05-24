
const injectContentToTab = async (tab: chrome.tabs.Tab) => {
  if (tab.url === undefined) {
    return;
  }

  if (tab.discarded) {
    return;
  }

  if (tab.id === undefined) {
    return;
  }

  if (!tab.url.startsWith('https://github.com/')) {
    return;
  }

  const manifest = chrome.runtime.getManifest();
  const cssFiles = manifest.content_scripts?.[0].css ?? [];
  const jsFiles = manifest.content_scripts?.[0].js ?? [];

  if (cssFiles.length > 0) {
    await chrome.scripting.insertCSS({
      target: {
        tabId: tab.id,
        allFrames: true,
      },
      files: cssFiles,
    });
  }

  if (jsFiles.length > 0) {
    await chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
        allFrames: true,
      },
      files: jsFiles,
    });
  }
};

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

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    injectContentToTab(tab);
  }
});
