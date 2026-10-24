(function () {
  var cfg = window.HP || {};
  document.getElementById("year").textContent = new Date().getFullYear();

  // Instagram
  document.querySelectorAll('[data-link="instagram"]').forEach(function (a) {
    if (cfg.instagramUrl) {
      a.setAttribute("href", cfg.instagramUrl);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });

  // Questionnaire : affiché seulement si un lien est configuré
  var form = cfg.formUrl || "";
  if (form) {
    document.querySelectorAll("[data-need-form]").forEach(function (el) { el.hidden = false; });
    var isLong = /docs\.google\.com\/forms\/.+\/viewform/.test(form);
    var btn = document.getElementById("show-form");
    var zone = document.getElementById("form-zone");
    var note = document.getElementById("form-note");
    if (isLong) {
      btn.addEventListener("click", function () {
        var src = form + (form.indexOf("?") > -1 ? "&" : "?") + "embedded=true";
        var f = document.createElement("iframe");
        f.src = src;
        f.title = "Questionnaire Hors Programme";
        f.loading = "lazy";
        f.className = "form-frame";
        zone.replaceChildren(f);
        if (note) note.hidden = true;
      });
    } else {
      btn.textContent = "Répondre au questionnaire ↗";
      btn.addEventListener("click", function () { window.open(form, "_blank", "noopener"); });
      if (note) note.hidden = true;
    }
  }

  // Bascule face / dos
  document.querySelectorAll(".item").forEach(function (item) {
    var views = item.querySelector(".views");
    var img = item.querySelector(".shot img");
    if (!views || !img) return;
    views.hidden = false;
    views.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-view]");
      if (!b) return;
      var v = b.getAttribute("data-view");
      img.src = "assets/img/" + item.getAttribute("data-slug") + "-" + v + ".svg";
      img.alt = item.getAttribute("data-alt-" + v) || "";
      views.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    });
  });
})();
