document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation
    const links = document.querySelectorAll('nav ul li a');
    for (const link of links) {
        link.addEventListener('click', function (event) {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                event.preventDefault();
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Carousel scripting
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');

    function showCarouselItem(n) {
        items[currentIndex].classList.remove('active');
        currentIndex = (n + items.length) % items.length;
        items[currentIndex].classList.add('active');
    }

    document.querySelector('.prev').addEventListener('click', () => {
        showCarouselItem(currentIndex - 1);
    });

    document.querySelector('.next').addEventListener('click', () => {
        showCarouselItem(currentIndex + 1);
    });

    showCarouselItem(currentIndex);

    // Add PDF display (make sure you have included pdfjsLib library)
    var url = 'Jack_Kennedy_CV_May_2024.pdf';
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        pdf.getPage(1).then(function (page) {
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale });

            var canvas = document.getElementById('the-canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
});
