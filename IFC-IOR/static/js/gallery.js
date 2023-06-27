var Gallery = function() {
  return {
    init: function() {
      var container = document.querySelector(".container-fluid");
      fetch("/IFC-IOR/static/data/gallery.json")
        .then(function(response) {
          return response.json();
        })
        .then(function(galleryData) {
          const years = Object.keys(galleryData).reverse();
          for (var year of years) {
            var headerRow = document.createElement("div");
            headerRow.className = "row my-2";
            var headerColumn = document.createElement("div");
            headerColumn.className = "col-12 stretched-column text-center";
            var yearText = document.createElement("h2");
            yearText.textContent = year;

            var anchor = document.createElement("a");
            anchor.href = `/IFC-IOR/years/${year}.html`;
            anchor.appendChild(yearText);

            headerColumn.appendChild(anchor);
            headerRow.appendChild(headerColumn);
            container.appendChild(headerRow);

            // Create images row
            var imagesRow = document.createElement("div");
            imagesRow.className = "my-2 slider";

            var images = galleryData[year];
            for (var i = 0; i < images.length; i++) {
              var imageColumn = document.createElement("div");
              imageColumn.className = "marquee-container";

              var card = document.createElement("div");
              card.className = "card my-2 mx-2";

              var img = document.createElement("img");
              img.src = images[i][1];
              img.alt = images[i][0];
              img.className = "card-img-top";

              var caption = document.createElement("div");
              caption.className = "card-body text-center";
              caption.textContent = images[i][0];

              card.appendChild(img);
              card.appendChild(caption);
              imageColumn.appendChild(card);

              // Add click event to show modal
              card.addEventListener("click", function() {
                var modal = document.createElement("div");
                modal.className = "modal";
                modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                modal.style.position = "fixed";
                modal.style.top = "0";
                modal.style.left = "0";
                modal.style.width = "100%";
                modal.style.height = "100%";
                modal.style.display = "flex";
                modal.style.alignItems = "center";
                modal.style.justifyContent = "center";
                modal.style.zIndex = "999";

                var modalImg = document.createElement("img");
                modalImg.src = this.querySelector("img").src;
                modalImg.alt = this.querySelector("img").alt;
                modalImg.style.maxHeight = "90%";
                modalImg.style.maxWidth = "90%";
                modal.appendChild(modalImg);
                modal.addEventListener("click", function() {
                  modal.remove();
                });
                document.body.appendChild(modal);
              });

              imagesRow.appendChild(imageColumn);
            }
            container.appendChild(imagesRow);
          }
        })
        .catch(function(error) {
          console.log("Error fetching JSON data:", error);
        });
    }
  };
}();

jQuery(document).ready(function() {
  Gallery.init();
});
