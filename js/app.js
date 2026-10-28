(function () {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  const backdrop = document.getElementById("sidebarBackdrop");
  const searchInput = document.getElementById("docSearch");
  const searchEmpty = document.getElementById("searchEmpty");
  const tocList = document.querySelector("#toc ul");
  const sections = Array.from(document.querySelectorAll(".section"));
  const navLinks = Array.from(document.querySelectorAll(".sidebar-links a"));

  sections.forEach((section) => {
    const heading = section.querySelector("h2");
    if (!heading || !section.id) return;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + section.id;
    a.textContent = heading.textContent;
    li.appendChild(a);
    tocList.appendChild(li);
  });

  const tocLinks = Array.from(document.querySelectorAll("#toc a"));

  document.querySelectorAll(".sidebar-group-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("collapsed");
    });
  });

  function closeNav() {
    document.body.classList.remove("nav-open");
  }

  menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });
  backdrop.addEventListener("click", closeNav);
  navLinks.forEach((link) => link.addEventListener("click", closeNav));

  function setActive(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
    document.querySelectorAll(".sidebar-group").forEach((group) => {
      group.classList.toggle("active", Boolean(group.querySelector(".sidebar-links a.active")));
    });
    tocLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] }
  );

  sections.forEach((section) => observer.observe(section));

  if (location.hash) {
    setActive(location.hash.slice(1));
  } else if (sections[0]) {
    setActive(sections[0].id);
  }

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    let matches = 0;

    navLinks.forEach((link) => {
      const text = link.textContent.toLowerCase();
      const show = !q || text.includes(q);
      link.parentElement.style.display = show ? "" : "none";
      if (show) matches += 1;
    });

    document.querySelectorAll(".sidebar-group").forEach((group) => {
      const anyVisible = Array.from(group.querySelectorAll(".sidebar-links li")).some(
        (li) => li.style.display !== "none"
      );
      group.style.display = anyVisible ? "" : "none";
      if (q && anyVisible) group.classList.remove("collapsed");
    });

    searchEmpty.style.display = q && matches === 0 ? "block" : "none";
  });
})();
