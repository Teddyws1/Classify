 // Dados das versões (substitua pelos seus dados reais)
        const versionsData = [
            {
                version: "1.3.0",
                date: "28/12/2025",
                isCurrent: true,
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
                    { type: "feature", text: "Suporte a temas escuro/claro" },
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

        class Changelog {
            constructor() {
                this.activeVersion = null;
                this.init();
            }

            init() {
                this.renderVersions();
                this.bindEvents();
            }

            renderVersions() {
                const grid = document.getElementById('versionsGrid');
                grid.innerHTML = versionsData.map((data, index) => this.createVersionCard(data, index)).join('');
            }

            createVersionCard(data, index) {
                const badgeClass = data.isCurrent ? 'badge-current' : 'badge-new';
                const badgeText = data.isCurrent ? 'Atual' : 'Nova';
                
                return `
                    <article class="version-card" tabindex="0" role="button" aria-expanded="false" aria-label="Versão ${data.version}">
                        <header class="version-header">
                            <div class="version-info">
                                <h3>${data.version}</h3>
                                <div class="version-meta">
                                    <span>Lançado em ${data.date}</span>
                                    <span class="version-badge ${badgeClass}">${badgeText}</span>
                                </div>
                            </div>
                            <span class="arrow" aria-hidden="true">▼</span>
                        </header>
                        <div class="version-content">
                            <p class="change-summary">${data.summary}</p>
                            <ul class="change-list" role="list">
                                ${data.changes.map(change => `
                                    <li class="change-item" role="listitem">
                                        <span class="change-type type-${change.type}" aria-hidden="true">${change.type.charAt(0).toUpperCase()}</span>
                                        <span class="change-description">${change.text}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </article>
                `;
            }

            bindEvents() {
                document.addEventListener('click', (e) => {
                    if (e.target.closest('.version-card')) {
                        this.toggleVersion(e.target.closest('.version-card'));
                    }
                });

                // Suporte a teclado
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        const card = e.target.closest('.version-card');
                        if (card) {
                            e.preventDefault();
                            this.toggleVersion(card);
                        }
                    }
                });
            }

            toggleVersion(card) {
                const isActive = card.classList.contains('active');
                const ariaExpanded = card.getAttribute('aria-expanded') === 'true';

                // Fecha todas as outras versões
                document.querySelectorAll('.version-card').forEach(c => {
                    c.classList.remove('active');
                    c.setAttribute('aria-expanded', 'false');
                });

                // Toggle da versão clicada
                if (!isActive) {
                    card.classList.add('active');
                    card.setAttribute('aria-expanded', 'true');
                    card.querySelector('.change-summary').focus();
                }
            }
        }

        // Inicializa quando o DOM carregar
        document.addEventListener('DOMContentLoaded', () => {
            new Changelog();
        });