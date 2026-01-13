const cards = document.querySelectorAll("[data-category]");
cards.forEach((c) => {
  const n = c.querySelectorAll("li").length;

  c.querySelector("span").innerHTML = `
    ${n} sites <ion-icon name="globe-outline"></ion-icon>
  `;

  total += n;
});
//sistam de cards da divs
const MAX_VISIBLE = 4;

/* fundo escuro */
const overlayBg = document.createElement("div");
overlayBg.className = "overlay-bg";
document.body.appendChild(overlayBg);

let cardAberto = null;

/* =========================
   CONTROLE DE SCROLL
========================= */
function bloquearScroll() {
  document.body.style.overflow = "hidden";
}

function liberarScroll() {
  document.body.style.overflow = "";
}

/* =========================
   SISTEMA VER MAIS
========================= */

cards.forEach((card) => {
  const list = card.querySelector("ul");
  if (!list) return;

  const items = [...list.querySelectorAll("li")];
  if (items.length <= MAX_VISIBLE) return;

  /* esconde a partir do 5º */
  items.slice(MAX_VISIBLE).forEach((li) => li.classList.add("hidden"));

  /* botão ver mais */
  const btnVerMais = document.createElement("button");
  btnVerMais.className = "ver-mais-btn";
  btnVerMais.innerHTML = `Ver mais <ion-icon name="eye-outline" class="icon-ver-mais"></ion-icon>`;

  /* botão fechar */
  const btnFechar = document.createElement("button");
  btnFechar.className = "btn-close";
  btnFechar.innerHTML = "✕";

  function abrirModal() {
    items.forEach((li) => li.classList.remove("hidden"));

    card.classList.add("overlay-open");
    overlayBg.classList.add("active");

    list.appendChild(btnFechar);
    cardAberto = card;

    bloquearScroll(); // 🔒 trava scroll
  }

  function fecharModal() {
    card.classList.remove("overlay-open");
    overlayBg.classList.remove("active");

    items.slice(MAX_VISIBLE).forEach((li) => li.classList.add("hidden"));

    btnFechar.remove();
    cardAberto = null;

    liberarScroll(); // 🔓 libera scroll
  }

  /* clique em ver mais */
  btnVerMais.addEventListener("click", (e) => {
    e.stopPropagation();
    abrirModal();
  });

  /* clique no X */
  btnFechar.addEventListener("click", (e) => {
    e.stopPropagation();
    fecharModal();
  });

  list.after(btnVerMais);
});

/* =========================
   CLICAR FORA FECHA
========================= */
overlayBg.addEventListener("click", () => {
  if (!cardAberto) return;

  const btn = cardAberto.querySelector(".btn-close");
  if (btn) btn.click();
});

/* =========================
   SEARCH
========================= */
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clearSearch");
const searchBox = document.querySelector(".search-box");

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

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
      if (!link) return;

      const name = link.innerText;
      const lower = name.toLowerCase();

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

//card de div ver mais/meno
/* botão limpar */
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  searchBox.classList.remove("has-text");

  // dispara o filtro novamente vazio
  searchInput.dispatchEvent(new KeyboardEvent("keyup"));
});

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
  btn.className = "share-btn minimal auto-theme";
  btn.innerHTML = '<ion-icon name="copy-outline"></ion-icon>';
  btn.title = "Copiar link";

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
      <button onclick="shareTwitter('${url}')">
  <span class="icon-x">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M18.244 2H21l-6.53 7.458L22 22h-6.828l-5.345-7.004L3.88 22H1l7.07-8.077L2 2h6.828l4.835 6.41L18.244 2Zm-2.39 18h1.884L8.25 4H6.23l9.624 16Z"
        fill="currentColor"
      />
    </svg>
  </span>
  X
</button>

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
document.addEventListener("keydown", (e) => {
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
  document.addEventListener("keydown", (e) => {
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

//sistema de novas ia com (li)
document.addEventListener("DOMContentLoaded", () => {
  const DAYS_AS_NEW = 30; // quantos dias o item fica como NOVO

  const today = new Date();

  document.querySelectorAll("li[data-new]").forEach((li) => {
    const addedDate = new Date(li.dataset.new);
    const diffTime = today - addedDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays <= DAYS_AS_NEW) {
      const badge = document.createElement("span");
      badge.className = "ia-badge";
      badge.innerHTML = `
        <ion-icon name="sparkles-outline"></ion-icon>
        NOVO
      `;
      li.appendChild(badge);
    }
  });
});
//fim sistema de novas ia com (li)

//card coisas novas
document.addEventListener("DOMContentLoaded", () => {
  const CARD_KEY = "new_feature_seen_v1";

  const card = document.getElementById("newFeatureCard");
  const closeBtn = document.getElementById("closeFeatureCard");

  // se não existir o card, não faz nada (evita erro)
  if (!card || !closeBtn) return;

  // mostra só se ainda não foi visto
  if (!localStorage.getItem(CARD_KEY)) {
    setTimeout(() => {
      card.classList.remove("hidden");
    }, 800);
  }

  // ao fechar
  closeBtn.addEventListener("click", () => {
    card.classList.add("hidden");
    localStorage.setItem(CARD_KEY, "true");
  });
});
//fim card coisas novas

//modal das infomação
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalNews");
  const modalBox = modal.querySelector(".modal-box");
  const closeBtn = modal.querySelector(".close-modal");
  const openBtn = document.querySelector(".btn-news");

  // 👉 ABRIR PELO BOTÃO "NOVIDADES"
  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  // 👉 FECHAR NO X
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // 👉 FECHAR CLICANDO FORA DO MODAL
  modal.addEventListener("click", (e) => {
    if (!modalBox.contains(e.target)) {
      modal.classList.remove("active");
    }
  });
});

//fim modal das infomação

///card altas
// #1. Lógica de Troca de Abas
const buttons = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active de tudo
    buttons.forEach((b) => b.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));

    // Adiciona no clicado
    btn.classList.add("active");
    const tabId = btn.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");
  });
});

// #2. Lógica para Adicionar Números de Ranking (#1, #2...)
// Isso percorre todas as listas e coloca o número antes do nome da IA
const listas = document.querySelectorAll(".lista-ia");

listas.forEach((lista) => {
  const itens = lista.querySelectorAll("li");
  itens.forEach((item, index) => {
    const link = item.querySelector("a");
    if (link) {
      // Adiciona o número com base na posição (index + 1)
      link.innerHTML = `<b>#${index + 1}</b> ${link.innerText}`;
    }
  });
});

// #3. Lógica para Arrastar com o Mouse (Desktop Drag)
const sliders = document.querySelectorAll(".scroll-wrapper");

sliders.forEach((slider) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.style.cursor = "grabbing"; // Feedback visual de agarrar
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.style.cursor = "grab";
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.style.cursor = "grab";
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do scroll
    slider.scrollLeft = scrollLeft - walk;
  });
});

///fim card altas
//sisteam de ia nova para divs

document.addEventListener("DOMContentLoaded", () => {
  const DAYS_AS_NEW = 30;
  const today = new Date();

  document.querySelectorAll(".card").forEach((card) => {
    let count = 0;

    card.querySelectorAll("ul li[data-new]").forEach((li) => {
      const addedDate = new Date(li.dataset.new);
      const diffDays = (today - addedDate) / (1000 * 60 * 60 * 24);

      if (diffDays <= DAYS_AS_NEW) {
        count++;
      }
    });

    if (count > 0) {
      const title = card.querySelector("h2");
      if (!title) return;

      if (title.querySelector(".badge-new-ia-count")) return;

      const badge = document.createElement("span");
      badge.className = "badge-new-ia-count";
      badge.innerHTML = `
        <ion-icon name="sparkles-outline"></ion-icon>
        ${count} IA nova${count > 1 ? "s" : ""}
      `;

      title.appendChild(badge);
    }
  });
});

//fim de sisteam de ia nova para divs
