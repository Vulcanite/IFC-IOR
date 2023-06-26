var Gallery = function() {
  return {
    init: function() {
      var container = document.querySelector(".container-fluid");
      fetch("/IFC-IOR/static/data/gallery.json")
        .then(function(response) {
          return response.json();
        })
        .then(function(galleryData) {
          for (var year in galleryData) {
            // Create header row
            
            var headerRow = document.createElement("div");
            headerRow.className = "row my-2";
            var headerColumn = document.createElement("div");
            headerColumn.className = "col-12 text-center";
            var yearText = document.createElement("h3");
            yearText.textContent = year;
            headerColumn.appendChild(yearText);
            headerRow.appendChild(headerColumn);
            container.appendChild(headerRow);

            // Create images row
            var imagesRow = document.createElement("div");
            imagesRow.className = "row my-2";

            var images = galleryData[year];
            for (var i = 0; i < images.length; i++) {
              var imageColumn = document.createElement("div");
              imageColumn.className = "col-md-6 col-lg-3";

              var card = document.createElement("div");
              card.className = "card my-2";

              var img = document.createElement("img");
              img.src = images[i][1];
              img.alt = images[i][0];
              img.className = "card-img-top";

              var caption = document.createElement("div");
              caption.className = "card-body";
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

                // Add click event to close modal
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
