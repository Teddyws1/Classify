const cards = document.querySelectorAll("[data-category]");
cards.forEach((c) => {
  const n = c.querySelectorAll("li").length;

  c.querySelector("span").innerHTML = `
    ${n} sites <ion-icon name="globe-outline"></ion-icon>
  `;

  total += n;
});

const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clearSearch");
const searchBox = document.querySelector(".search-box");

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  // controla botão limpar
  if (value.length > 0) {
    searchBox.classList.add("has-text");
  } else {
    searchBox.classList.remove("has-text");
  }

  cards.forEach((card) => {
    const lis = card.querySelectorAll("li");
    let cardHasMatch = false;

    lis.forEach((li) => {
      const link = li.querySelector("a");
      const name = link.innerText;
      const lower = name.toLowerCase();

      // remove destaque anterior
      link.innerHTML = name;

      if (lower.includes(value) && value !== "") {
        const start = lower.indexOf(value);
        const end = start + value.length;

        link.innerHTML =
          name.substring(0, start) +
          `<mark>${name.substring(start, end)}</mark>` +
          name.substring(end);

        li.style.display = "flex";
        cardHasMatch = true;
      } else if (value === "") {
        li.style.display = "flex";
      } else {
        li.style.display = "none";
      }
    });

    card.style.display = cardHasMatch || value === "" ? "block" : "none";
  });
});

/* botão limpar */
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  searchBox.classList.remove("has-text");

  // dispara o filtro novamente vazio
  searchInput.dispatchEvent(new KeyboardEvent("keyup"));
});

/* tema */
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

const closeSidebarBtn = document.getElementById("closeSidebar");

/* FUNÇÕES CLARAS */
function lockScroll() {
  document.body.classList.add("no-scroll");
}

function unlockScroll() {
  document.body.classList.remove("no-scroll");
}

/* EVENTOS */
openSidebarBtn.addEventListener("click", () => {
  lockScroll();
});

closeSidebarBtn.addEventListener("click", () => {
  unlockScroll();
});

overlay.addEventListener("click", unlockScroll);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") unlockScroll();
});

//card de aviso
document.addEventListener("DOMContentLoaded", () => {
  const warning = document.getElementById("cacheWarning");
  const closeBtn = document.getElementById("closeWarning");
  const sound = document.getElementById("alertSound");

  if (!warning || !closeBtn) {
    console.error("Aviso não encontrado no HTML.");
    return;
  }

  function lockScroll() {
    document.body.classList.add("no-scroll");
  }

  function unlockScroll() {
    document.body.classList.remove("no-scroll");
  }

  function showWarning() {
    warning.style.display = "flex";
    lockScroll();

    // toca som
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // alguns navegadores bloqueiam som automático
        console.warn("Som bloqueado pelo navegador.");
      });
    }
  }

  function hideWarning() {
    warning.style.display = "none";
    unlockScroll();
  }

  // MOSTRA AO ENTRAR NO SITE
  showWarning();

  // botão fechar
  closeBtn.addEventListener("click", hideWarning);

  // tecla ESC fecha
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") hideWarning();
  });
});
//fim do card de aviso

// Adição de novos sites
const DAYS_NEW = 30;

document.querySelectorAll(".ia-list li").forEach((li) => {
  const added = li.dataset.added;
  if (!added) return;

  const addedDate = new Date(added);
  const today = new Date();
  const diffDays = (today - addedDate) / (1000 * 60 * 60 * 24);

  const badge = li.querySelector(".ia-badge");

  if (diffDays > DAYS_NEW && badge) {
    badge.remove();
  }
});


