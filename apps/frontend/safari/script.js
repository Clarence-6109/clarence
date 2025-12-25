// script.js

document.addEventListener("DOMContentLoaded", () => {
  const tabList = document.getElementById("tabList");
  const addTabBtn = document.getElementById("addTab");
  const omnibox = document.getElementById("omnibox");
  const refreshIcon = document.querySelector(".refresh-icon");
  const zoomBtn = document.getElementById("zoomBtn");
  const addFavBtn = document.querySelector(".add-fav-card");
  const favGrid = document.querySelector(".fav-grid");
  const dashboard = document.querySelector(".dashboard");

  let tabCount = 1;
  let currentZoom = 100;

  // Function to create a new tab
  function createTab(title = "New Tab", isActive = true) {
    const tab = document.createElement("div");
    tab.classList.add("tab");
    if (isActive) tab.classList.add("active");
    tab.role = "tab";
    tab.draggable = true;

    tab.innerHTML = `
      <i class="fa-solid fa-compass tab-icon"></i>
      <span class="tab-title">${title}</span>
      <button class="close-tab"><i class="fa-solid fa-xmark"></i></button>
    `;

    // Activate tab on click
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      // Simulate loading the page (update omnibox, etc.)
      omnibox.value = title === "New Tab" ? "" : title;
      loadContent(title);
    });

    // Close tab
    tab.querySelector(".close-tab").addEventListener("click", (e) => {
      e.stopPropagation();
      tab.remove();
      if (tab.classList.contains("active") && tabList.children.length > 0) {
        tabList.children[0].classList.add("active");
        const newTitle =
          tabList.children[0].querySelector(".tab-title").textContent;
        omnibox.value = newTitle === "New Tab" ? "" : newTitle;
        loadContent(newTitle);
      }
    });

    // Drag and drop for tabs
    tab.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", "");
      tab.classList.add("dragging");
    });

    tab.addEventListener("dragend", () => {
      tab.classList.remove("dragging");
    });

    tab.addEventListener("dragover", (e) => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      if (dragging !== tab) {
        const rect = tab.getBoundingClientRect();
        const next = (e.clientX - rect.left) / rect.width > 0.5;
        tabList.insertBefore(dragging, next ? tab.nextSibling : tab);
      }
    });

    tabList.appendChild(tab);
    tabCount++;
  }

  // Add new tab
  addTabBtn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    createTab();
    loadContent("New Tab");
  });

  // Omnibox enter key to "load" page
  omnibox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const activeTab = document.querySelector(".tab.active");
      if (activeTab) {
        const url = omnibox.value.trim();
        activeTab.querySelector(".tab-title").textContent = url || "New Tab";
        activeTab.querySelector(".tab-icon").className =
          "fa-solid fa-globe tab-icon"; // Change icon to globe
        loadContent(url || "New Tab");
      }
    }
  });

  // Refresh icon click
  refreshIcon.addEventListener("click", () => {
    const activeTab = document.querySelector(".tab.active");
    if (activeTab) {
      const title = activeTab.querySelector(".tab-title").textContent;
      loadContent(title);
      alert("Refreshing page...");
    }
  });

  // Zoom button (simple toggle)
  zoomBtn.addEventListener("click", () => {
    currentZoom = currentZoom === 100 ? 125 : 100;
    zoomBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass-plus"></i> ${currentZoom}%`;
    document.body.style.zoom = `${currentZoom}%`;
  });

  // Add favorite
  addFavBtn.addEventListener("click", () => {
    const name = prompt("Enter favorite name:");
    const url = prompt("Enter URL (e.g., https://example.com):");
    if (name && url) {
      const newFav = document.createElement("a");
      newFav.href = url;
      newFav.classList.add("fav-card");
      newFav.innerHTML = `
        <div class="fav-icon"><i class="fa-solid fa-link"></i></div>
        <span>${name}</span>
      `;
      favGrid.insertBefore(newFav, addFavBtn);
    }
  });

  // Handle clicks on favorites and news cards (event delegation)
  document.addEventListener("click", (e) => {
    const favCard = e.target.closest(".fav-card");
    if (favCard) {
      e.preventDefault();
      const activeTab = document.querySelector(".tab.active");
      if (activeTab) {
        const url = favCard.href;
        const title = favCard.querySelector("span").textContent;
        activeTab.querySelector(".tab-title").textContent = title;
        activeTab.querySelector(".tab-icon").className =
          "fa-solid fa-globe tab-icon";
        omnibox.value = url;
        loadContent(title);
      }
    }

    const newsCard = e.target.closest(".news-card");
    if (newsCard) {
      const activeTab = document.querySelector(".tab.active");
      if (activeTab) {
        const title = newsCard.querySelector("h3").textContent;
        activeTab.querySelector(".tab-title").textContent = title;
        activeTab.querySelector(".tab-icon").className =
          "fa-solid fa-newspaper tab-icon";
        omnibox.value = `news/${title.toLowerCase().replace(/\s/g, "-")}`;
        loadContent(title);
      }
    }
  });

  // Simulate loading content (for now, just show/hide dashboard or add loading effect)
  function loadContent(title) {
    dashboard.classList.add("loading");
    setTimeout(() => {
      dashboard.classList.remove("loading");
      if (title !== "New Tab") {
        // Could hide dashboard or load iframe, but for mockup, just alert
        alert(`Loaded: ${title}`);
      }
    }, 500);
  }

  // Initialize with first tab
  createTab();
  loadContent("New Tab");
});
