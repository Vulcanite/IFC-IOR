var Archive = function() {
    var currentImageIndex = 0; // Track the current image index in the modal carousel
    
    function filterAndRepositionCards(category) {
      $('.card').each(function() {
        var card = $(this);
        var cardCategory = card.attr('data-category');
    
        if (category === 'all' || cardCategory === category) {
          card.fadeIn('fast');
        } else {
          card.fadeOut('fast');
        }
      });
    
      var visibleCards = $('.card:visible');
      var row = null;
      $('#gallery').empty();
    
      visibleCards.each(function(index) {
        if (index % 4 === 0) {
          row = $('<div>').addClass('row');
          $('#gallery').append(row);
        }
    
        var card = $(this);
        card.removeClass('col-md-3 p-0 my-2 text-center');
        card.addClass('col-md-3 p-0 my-2 text-center');
        row.append(card);
    
        card.hide().delay(index * 100).fadeIn('fast');
      });
    }

    return {
      init: function() {
        fetch('/IFC-IOR/static/data/filter.json')
          .then(response => response.json())
          .then(data => {
            var year = $('#year').text();
            var items = data[year];
            var row;
  
            for (var i = 0; i < items.length; i++) {
              var caption = items[i][0];
              var imagePath = items[i][1];
              var category = items[i][2];
  
              if (i % 4 === 0) {
                row = $('<div>').addClass('row');
                $('#gallery').append(row);
              }
  
              //var col = $('<div>').addClass('col-md-3 p-0 my-2 text-center').attr('data-category', category);
              var card = $('<div>').addClass('card mx-auto my-auto p-0').attr('category', category);
              var cardImage = $('<img>').addClass('card-img-top').attr('src', imagePath).attr('alt', caption).attr('data-index', i);
              var cardBody = $('<div>').addClass('card-body');
              var cardCaption = $('<h6>').addClass('card-title caption-center').text(caption);
              cardBody.append(cardCaption);
              card.append(cardImage).append(cardBody);
              row.append(card);
            }
            // Add click event handler for card images
            $('.card-img-top').click(function() {
              currentImageIndex = parseInt($(this).attr('data-index'));
              var imageModal = $('#imageModal');
              imageModal.find('.carousel-indicators').html('');
              imageModal.find('.carousel-inner').html('');
  
              // Add carousel indicators and images with captions
              for (var j = 0; j < items.length; j++) {
                var indicator = $('<li>').attr('data-target', '#imageCarousel').attr('data-slide-to', j);
                if (j === currentImageIndex) {
                  indicator.addClass('active');
                }
                imageModal.find('.carousel-indicators').append(indicator);
  
                var carouselImage = $('<div>').addClass('carousel-item');
                if (j === currentImageIndex) {
                  carouselImage.addClass('active');
                }
                var image = $('<img>').addClass('d-block w-100').attr('src', items[j][1]).attr('alt', items[j][0]);
                carouselImage.append(image);
                imageModal.find('.carousel-inner').append(carouselImage);
              }
              // Show the modal and set the initial active carousel item
              imageModal.modal('show');
              imageModal.find('.carousel-item').first().addClass('active');
              imageModal.addClass('modal-dark-overlay');
            });
          })
          .catch(error => {
            console.error('Error:', error);
          });
  
          $('#filterButtons button').click(function() {
            $('#filterButtons button').removeClass('active');
            $(this).addClass('active');
            filter = $(this).attr('data-filter');
            filterAndRepositionCards(filter);
          });
      }
    };
  }();
  
  jQuery(document).ready(function() {
    Archive.init();
  });