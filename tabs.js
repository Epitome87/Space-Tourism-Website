const tabLists = document.querySelector('[role="tablist"]');
const tabs = tabLists.querySelectorAll('[role="tab"]');

let activeTabIndex = 0;

tabLists.addEventListener('keydown', changeTabFocus);

for (let tab of tabs) {
  tab.addEventListener('click', changeTabPanel);
}

function changeTabFocus(event) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (event.keyCode === keydownLeft || event.keyCode === keydownRight) {
    tabs[activeTabIndex].setAttribute('tabindex', -1);

    // Check if ta left or right were pressed (37, 39 keycode)
    if (event.keyCode === keydownLeft) {
      activeTabIndex--;
      // Move to right end if we move too far to the left
      if (activeTabIndex < 0) {
        activeTabIndex = tabs.length - 1;
      }
    } else if (event.keyCode === keydownRight) {
      // Keep index between 0 and tab length
      activeTabIndex = (activeTabIndex + 1) % tabs.length;
    }

    tabs[activeTabIndex].setAttribute('tabindex', 0);
    tabs[activeTabIndex].focus();
  }
}

function changeTabPanel(event) {
  const targetTab = event.target;
  const targetPanel = targetTab.getAttribute('aria-controls');
  const targetImage = targetTab.getAttribute('data-image');

  const tabContainer = targetTab.parentNode; // The tab list
  const mainContainer = tabContainer.parentNode; // Get the main element

  // Set aria-selected to false on the previously-selected tab
  tabContainer.querySelector('[aria-selected="true"').setAttribute('aria-selected', false);
  // Set aria-selected to true on current tab, and thus give it active styling
  targetTab.setAttribute('aria-selected', true);

  // Hide every panel's contents
  hideContent(mainContainer, '[role="tabpanel"');
  // But show the now-selected panel's contents
  showContent(mainContainer, `#${targetPanel}`);

  // Hide every panel's picture
  hideContent(mainContainer, `#${targetImage}`);
  // But show the now-selected panel's image
  showContent(mainContainer, `#${targetImage}`);

  console.log('TARGET IMAGE', targetImage);
}

function hideContent(parent, content) {
  parent.querySelectorAll(content).forEach((item) => item.setAttribute('hidden', true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute('hidden');
}
