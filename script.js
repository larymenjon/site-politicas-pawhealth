const tabButtons = [...document.querySelectorAll('.tab-btn')];
const tabPanels = [...document.querySelectorAll('.tab-panel')];

function activateTab(tabId) {
  tabButtons.forEach((button) => {
    const isActive = button.id === tabId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.getAttribute('aria-labelledby') === tabId;
    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
  });
}

function moveFocus(currentIndex, direction) {
  const total = tabButtons.length;
  const nextIndex = (currentIndex + direction + total) % total;
  tabButtons[nextIndex].focus();
  activateTab(tabButtons[nextIndex].id);
}

tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => activateTab(button.id));

  button.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveFocus(index, 1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveFocus(index, -1);
    }
  });
});