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
  }

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

function changeTabPanel(event) {
    
  event.target.classList.add('active');

  const targetTab = event.target;
  const targetPanel = targetTab.getAttribute('aria-controls');

  const tabContainer = targetTab.parentNode; // The tab list
  const mainContainer = tabContainer.parentNode; // Get the main element

  console.log(targetTab);
  console.log(targetPanel);

  // Hide every panel's contents
  mainContainer.querySelectorAll('[role="tabpanel"').forEach((panel) => panel.setAttribute('hidden', true));

  // But show the now-selected panel's contents
  mainContainer.querySelector(`#${targetPanel}`).removeAttribute('hidden');
}
