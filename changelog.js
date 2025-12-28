const details = document.getElementById("versionDetails");

const data = {
  "1.3.0": [
    "Novo sistema de badges",
    "Melhoria no desempenho"
  ],
  "1.2.0": [
    "Layout inicial",
    "Sistema de busca"
  ],
  "1.1.0": [
    "Primeira versão pública"
  ]
};

document.querySelectorAll(".version-btn").forEach(btn => {
  btn.onclick = () => {
    const version = btn.dataset.version;
    details.innerHTML = `
      <h4>Versão ${version}</h4>
      <ul>
        ${data[version].map(i => `<li>${i}</li>`).join("")}
      </ul>
    `;
    details.classList.remove("hidden");
  };
});
