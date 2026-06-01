(function () {
  const STORAGE_KEY = "toc-open-sections";
  const detailsList = document.querySelectorAll(".toc details.toc-group");
  const tocLinks = document.querySelectorAll(".toc a[href]");
  const currentPath = location.pathname.split("/").pop();

  /* Restore saved state */
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  detailsList.forEach(details => {
    const summaryText = details.querySelector("summary")?.innerText.trim();
    if (savedState.includes(summaryText)) details.open = true;
  });

  /* Auto-open & mark active */
  if (currentPath) {
    tocLinks.forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
        let parent = link.parentElement;
        while (parent) {
          if (parent.tagName === "DETAILS") parent.open = true;
          parent = parent.parentElement;
        }
      }
    });
  }

  /* Save state on toggle */
  function saveState() {
    const openSections = [];
    detailsList.forEach(details => {
      if (details.open) {
        const summaryText = details.querySelector("summary")?.innerText.trim();
        if (summaryText) openSections.push(summaryText);
      }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(openSections));
  }
  detailsList.forEach(details => details.addEventListener("toggle", saveState));
})();
