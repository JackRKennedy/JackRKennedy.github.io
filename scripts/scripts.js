document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation
    const links = document.querySelectorAll('nav ul li a');
    for (const link of links) {
        link.addEventListener('click', function (event) {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) { // check if the target section exists on the page
                event.preventDefault();
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            } // if targetSection does not exist, do nothing and let the browser handle the navigation
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
    // Specify the URL of the PDF file
    var url = 'Jack_Kennedy_CV_May_2024.pdf';

    // Create PDFJS document load task
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        // Fetch the first page
        pdf.getPage(1).then(function (page) {
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale });

            // Prepare canvas using PDF page dimensions
            var canvas = document.getElementById('the-canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
});
