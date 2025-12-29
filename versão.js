// ===============================
// DADOS DAS VERSÕES
// ===============================
const versionsData = [
  {
    version: "1.4.1",
    date: "29/12/2025",
    isCurrent: true,
    summary: "Melhorias na pesquisa, filtragem e visual dos resultados",
    changes: [
      {
        type: "improvement",
        text: "A pesquisa agora considera apenas o nome das ferramentas (<li><a>)"
      },
      {
        type: "fix",
        text: "Evita resultados incorretos ao buscar textos genéricos"
      },
      {
        type: "feature",
        text: "Filtragem inteligente exibindo apenas ferramentas compatíveis"
      },
      {
        type: "feature",
        text: "Categorias sem resultados são ocultadas automaticamente"
      },
      {
        type: "feature",
        text: "Destaque visual do termo pesquisado usando <mark>"
      },
      {
        type: "improvement",
        text: "Novo estilo visual para os itens (tiktok-preview)"
      },
      {
        type: "improvement",
        text: "Gradientes, sombras e animações suaves para melhor feedback"
      },
      {
        type: "improvement",
        text: "JavaScript mais limpo e organizado mantendo compatibilidade total"
      },
      {
        type: "fix",
        text: "Nenhuma quebra de layout existente e suporte a modo claro e escuro"
      }
    ]
  },
  {
    version: "1.4.0",
    date: "28/12/2025",
    isCurrent: false,
    summary: "Performance, estabilidade e novo sistema de versões",
    changes: [
      { type: "improvement", text: "Interface mais organizada" },
      { type: "fix", text: "Correções de bugs gerais" },
      { type: "feature", text: "Nova aba de versões" }
    ]
  },
  {
    version: "1.3.0",
    date: "28/12/2025",
    isCurrent: false,
    summary: "Melhorias significativas de UI e acessibilidade",
    changes: [
      { type: "feature", text: "Novo sistema de acordeon responsivo" },
      { type: "feature", text: "Indicadores visuais para versão atual" },
      { type: "improvement", text: "Design moderno com gradientes e sombras" },
      { type: "fix", text: "Correções de acessibilidade ARIA" },
      { type: "improvement", text: "Otimização para mobile e desktop" }
    ]
  },
  {
    version: "1.2.0",
    date: "15/11/2025",
    isCurrent: false,
    summary: "Performance e estabilidade",
    changes: [
      { type: "improvement", text: "Carregamento 40% mais rápido" },
      { type: "fix", text: "Correção de bugs em navegadores antigos" },
      { type: "feature", text: "Suporte a temas escuro e claro" },
      { type: "fix", text: "Melhorias no tratamento de erros" }
    ]
  },
  {
    version: "1.1.0",
    date: "01/10/2025",
    isCurrent: false,
    summary: "Primeira versão pública",
    changes: [
      { type: "feature", text: "Interface inicial completa" },
      { type: "feature", text: "Sistema de navegação por versões" },
      { type: "fix", text: "Correções básicas de layout" }
    ]
  }
];

// ===============================
// CLASSE CHANGELOG
// ===============================
class Changelog {
  constructor() {
    this.init();
  }

  init() {
    this.renderVersions();
    this.bindEvents();
  }

  renderVersions() {
    const grid = document.getElementById("versionsGrid");
    if (!grid) return;

    grid.innerHTML = versionsData
      .map((data, index) => this.createVersionCard(data, index))
      .join("");
  }

  createVersionCard(data, index) {
    const badgeClass = data.isCurrent ? "badge-current" : "badge-new";
    const badgeText = data.isCurrent ? "Atual" : "Nova";

    return `
      <article class="version-card" tabindex="0" role="button" aria-expanded="false">
        <header class="version-header">
          <div class="version-info">
            <h3>v${data.version}</h3>
            <div class="version-meta">
              <span>Lançado em ${data.date}</span>
              <span class="version-badge ${badgeClass}">${badgeText}</span>
            </div>
          </div>
          <span class="arrow">▼</span>
        </header>

        <div class="version-content">
          <p class="change-summary">${data.summary}</p>
          <ul class="change-list">
            ${data.changes
              .map(
                (change) => `
              <li class="change-item">
                <span class="change-type type-${change.type}">
                  ${change.type.charAt(0).toUpperCase()}
                </span>
                <span class="change-description">${change.text}</span>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      </article>
    `;
  }

  bindEvents() {
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".version-card");
      if (card) this.toggleVersion(card);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest(".version-card");
        if (card) {
          e.preventDefault();
          this.toggleVersion(card);
        }
      }
    });
  }

  toggleVersion(card) {
    const isActive = card.classList.contains("active");

    document.querySelectorAll(".version-card").forEach((c) => {
      c.classList.remove("active");
      c.setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      card.classList.add("active");
      card.setAttribute("aria-expanded", "true");
    }
  }
}

// ===============================
// INICIALIZAÇÃO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  new Changelog();
});
