const cards = document.querySelectorAll("[data-category]");
let total = 0;
cards.forEach((c) => {
  const n = c.querySelectorAll("li").length;
  c.querySelector("span").innerText = `(${n} sites)`;
  total += n;
});
document.getElementById(
  "total"
).innerText = `�9�6 Total geral: ${total} ferramentas`;

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
  btn.innerHTML = "🔗";
  btn.title = "Compartilhar";

  li.appendChild(btn);

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeMenus();

    const menu = document.createElement("div");
    menu.className = "share-menu";

    const url = link.href;

    menu.innerHTML = `
      <button onclick="copyLink('${url}')">📋 Copiar link</button>
      <button onclick="shareWhats('${url}')">🟢 WhatsApp</button>
      <button onclick="shareTwitter('${url}')">🐦 Twitter / X</button>
      <button onclick="shareFacebook('${url}')">🔵 Facebook</button>
    `;

    li.appendChild(menu);
  });
});

// Fecha menus
function removeMenus() {
  document.querySelectorAll(".share-menu").forEach((m) => m.remove());
}

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

//atualização em notificação
const badge = document.getElementById("updateBadge");
const modal = document.getElementById("updateModal");
const closeModal = document.getElementById("closeUpdate");
const container = document.getElementById("versionsContainer");
const toast = document.getElementById("updateToast");

/* TOAST AO ABRIR */
window.addEventListener("load", () => {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
});

/* ABRIR MODAL */
badge.onclick = () => modal.classList.add("active");

/* FECHAR MODAL (badge NÃO some) */
closeModal.onclick = () => modal.classList.remove("active");
modal.onclick = e => {
  if (e.target === modal) modal.classList.remove("active");
};

/* CARREGAR CHANGELOG EXTERNO */
fetch("changelog.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(v => {
      const block = document.createElement("div");
      block.className = "version-block";

      block.innerHTML = `
        <strong>Versão ${v.version}</strong>
        <small>${v.date}</small>
        <ul>
          ${v.changes.map(c => `<li>${c}</li>`).join("")}
        </ul>
      `;

      container.appendChild(block);
    });
  });


  //div ver mais vesão
  document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("updateToast");
  const modal = document.getElementById("updateModal");
  const closeBtn = document.getElementById("closeUpdate");

  // se não existir, não executa (evita quebrar outros JS)
  if (!toast || !modal || !closeBtn) return;

  // mostra toast ao abrir o site
  setTimeout(() => {
    toast.classList.add("show");
  }, 1200);

  // abre modal ao clicar no toast
  toast.addEventListener("click", () => {
    modal.classList.add("active");
    toast.classList.remove("show");
  });

  // fecha modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // fecha modal ao clicar fora
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});


