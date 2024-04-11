window.onload = function () {
  carregarImagens();
};

document.getElementById("addButton").addEventListener("click", function () {
  var input = document.getElementById("imageInput");
  var galeria = document.getElementById("galeria");
  for (var i = 0; i < input.files.length; i++) {
    (function (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = document.createElement("img");
        img.src = e.target.result;
        img.style.cursor = "pointer";
        img.onclick = function () {
          this.classList.toggle("selected");
        };
        galeria.appendChild(img);

        localStorage.setItem("imagem" + Date.now(), e.target.result);
      };
      reader.readAsDataURL(file);
    })(input.files[i]);
  }
});

document.getElementById("removeButton").addEventListener("click", function () {
  var imagensSelecionadas = document.querySelectorAll(".selected");
  imagensSelecionadas.forEach(function (img) {
    var galeria = document.getElementById("galeria");
    galeria.removeChild(img);

    for (var key in localStorage) {
      if (localStorage[key] === img.src) {
        localStorage.removeItem(key);
        break;
      }
    }
  });
});

function carregarImagens() {
  var galeria = document.getElementById("galeria");
  for (var key in localStorage) {
    if (key.startsWith("imagem")) {
      var imgData = localStorage.getItem(key);
      var img = document.createElement("img");
      img.src = imgData;
      img.style.cursor = "pointer";
      img.onclick = function () {
        this.classList.toggle("selected");
      };
      galeria.appendChild(img);
    }
  }
}
