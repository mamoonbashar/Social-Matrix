const expandSidebar = document.querySelector(".fa-chevron-right");
// get  the sidebar
const sidebar = document.querySelector(".sideBar");
const arrowPosition = document.querySelector(".OpenAndClosingContainer");
expandSidebar.addEventListener("click", () => {
  //   expandSidebar.classList.contains("rotated")
  //     ? expandSidebar.classList.remove("rotated")
  //     : expandSidebar.classList.add("rotated");.
  const isRotated = expandSidebar.classList.toggle("rotated");

  sidebar.classList.toggle("minimiseSidebar", isRotated);
  sidebar.classList.toggle("sideBar", !isRotated);

  arrowPosition.style.justifyContent = isRotated ? "center" : "space-between";
  
});

