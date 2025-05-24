function addDeepWikiButton(): void {
  if (document.querySelector('.deepwiki-button')) {
    return;
  }

  const navActions = document.querySelector('ul.pagehead-actions');
  if (!navActions) {
    return;
  }

  const pathMatch = window.location.pathname.match(/^\/([^/]+)\/([^/]+)/);
  if (!pathMatch) {
    return;
  }

  const [, owner, repo] = pathMatch;

  const container = document.createElement('li');
  container.className = 'deepwiki-container';

  const btnGroup = document.createElement('div');
  btnGroup.setAttribute('data-view-component', 'true');
  btnGroup.className = 'BtnGroup';

  const button = document.createElement('a');
  button.className = 'btn-sm btn BtnGroup-item deepwiki-button';
  button.href = `https://deepwiki.com/${owner}/${repo}`;
  button.setAttribute('data-view-component', 'true');

  const icon = document.createElement('span');
  icon.className = 'octicon';
  icon.innerHTML = `
    <img src="${chrome.runtime.getURL('images/icon-64.png')}" width="16" height="16" alt="DeepWiki">
  `;

  const text = document.createTextNode('DeepWiki');
  button.appendChild(icon);
  button.appendChild(text);
  btnGroup.appendChild(button);
  container.appendChild(btnGroup);

  navActions.insertBefore(container, navActions.firstChild);
}

addDeepWikiButton();
document.addEventListener('DOMContentLoaded', () => {
  addDeepWikiButton();

  let lastUrl = location.href;
  let isProcessing = false;

  const observer = new MutationObserver((mutations) => {
    if (isProcessing) return;
    isProcessing = true;

    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(() => {
        addDeepWikiButton();
        isProcessing = false;
      }, 500);
      return;
    }

    const navActions = document.querySelector('ul.pagehead-actions');
    const deepWikiButton = document.querySelector('.deepwiki-button');
    if (navActions && !deepWikiButton) {
      addDeepWikiButton();
    }

    isProcessing = false;
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
});
