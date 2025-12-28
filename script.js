const cards = document.querySelectorAll("[data-category]");
cards.forEach((c) => {
  const n = c.querySelectorAll("li").length;

  c.querySelector("span").innerHTML = `
    ${n} sites <ion-icon name="globe-outline"></ion-icon>
  `;

  total += n;
});




document.getElementById("search").addEventListener("keyup", (e) => {
  const v = e.target.value.toLowerCase();
  cards.forEach((c) => {
    c.style.display = c.innerText.toLowerCase().includes(v) ? "block" : "none";
  });
});
function toggleTheme() {
  document.body.classList.toggle("light");
}

// Prepara todos os <li>
document.querySelectorAll(".card ul li").forEach((li) => {
  const img = li.querySelector("img");
  const link = li.querySelector("a");

  // Agrupa imagem + link
  const left = document.createElement("div");
  left.className = "tool-left";
  left.appendChild(img);
  left.appendChild(link);

  li.prepend(left);

  // Botão compartilhar
  const btn = document.createElement("button");
  btn.className = "share-btn";
  btn.innerHTML = "<ion-icon name=\"link-outline\"></ion-icon>";
  btn.title = "Compartilhar";

  li.appendChild(btn);

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeMenus();

    const menu = document.createElement("div");
    menu.className = "share-menu";

    const url = link.href;

    menu.innerHTML = `
      <button onclick="copyLink('${url}')"><ion-icon name="clipboard-outline"></ion-icon>Copiar link</button>
      <button onclick="shareWhats('${url}')"><ion-icon name="logo-whatsapp"></ion-icon> WhatsApp</button>
      <button onclick="shareTwitter('${url}')"><ion-icon name="logo-twitter"></ion-icon> Twitter / X</button>
      <button onclick="shareFacebook('${url}')"><ion-icon name="logo-facebook"></ion-icon>  Facebook</button>
    `;

    li.appendChild(menu);
  });
});

// Fecha menus
function removeMenus() {
  document.querySelectorAll(".share-menu").forEach((m) => m.remove());
}

const openSidebarBtn = document.getElementById("openSidebar");

let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 10) {
    // rolando para baixo → esconde
    openSidebarBtn.classList.add("hide");
  } else {
    // rolando para cima → mostra
    openSidebarBtn.classList.remove("hide");
  }

  lastScroll = currentScroll;
});


document.addEventListener("click", removeMenus);

// Funções de compartilhamento
function copyLink(url) {
  navigator.clipboard.writeText(url);
  alert("Link copiado!");
}

function shareWhats(url) {
  window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank");
}

function shareTwitter(url) {
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    "_blank"
  );
}

function shareFacebook(url) {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    "_blank"
  );
}
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openBtn = document.getElementById("openSidebar");
const closeBtn = document.getElementById("closeSidebar");
const html = document.documentElement;

function openSidebar() {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  openBtn.classList.add("hide");
}

function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  openBtn.classList.remove("hide");
}

openBtn.onclick = openSidebar;
closeBtn.onclick = closeSidebar;
overlay.onclick = closeSidebar;

document.getElementById("toggleTheme").onclick = () => {
  html.classList.toggle("light");
};


//sobre atualização

const openUpdateInfo = document.getElementById("openUpdateInfo");
const closeUpdateInfo = document.getElementById("closeUpdateInfo");
const updateInfoModal = document.getElementById("updateInfoModal");

openUpdateInfo.onclick = () => {
  updateInfoModal.classList.add("active");
};

closeUpdateInfo.onclick = () => {
  updateInfoModal.classList.remove("active");
};

// fecha ao clicar fora
updateInfoModal.onclick = (e) => {
  if (e.target === updateInfoModal) {
    updateInfoModal.classList.remove("active");
  }
};


  //div ver mais vesão
const toggle = document.getElementById("configToggle");
const menu = toggle.closest(".mini-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("open");
});


//sistema de registro da web app
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/Classify/sw.js')
    .then(() => console.log('Service Worker registrado com sucesso!'));
}
