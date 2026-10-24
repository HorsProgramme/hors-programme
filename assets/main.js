(function () {
  var cfg = window.HP || {};
  document.getElementById("year").textContent = new Date().getFullYear();

  function wire(kind, url) {
    var nodes = document.querySelectorAll('[data-link="' + kind + '"]');
    nodes.forEach(function (a) {
      if (url) {
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      } else if (kind === "form") {
        // Pas encore de lien : les boutons mènent à la section liste d'attente.
        if (a.getAttribute("href") === "#") a.setAttribute("href", "#liste");
      } else {
        a.setAttribute("aria-disabled", "true");
        a.style.opacity = ".5";
        a.style.pointerEvents = "none";
      }
    });
  }
  wire("form", cfg.formUrl);
  wire("instagram", cfg.instagramUrl);

  // Si le formulaire est branché, le bouton principal de la liste d'attente l'ouvre ; sinon on le signale.
  var cta = document.getElementById("cta-form");
  if (cta && !cfg.formUrl) {
    cta.textContent = "Formulaire bientôt disponible";
    cta.setAttribute("aria-disabled", "true");
    cta.style.opacity = ".6";
    cta.style.pointerEvents = "none";
  }
})();
