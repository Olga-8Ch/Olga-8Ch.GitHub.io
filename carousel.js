 const images = [
        'images/image1.jpg',
        'images/image2.jpg',
        'images/image3.jpg',
        'images/image4.jpg',
        'images/image5.jpg',
        'images/image6.jpg',
        'images/image7.jpg'
    ];

    let currentPage = 0;
    let slidesPerView = 3;

    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageEl = document.getElementById('currentPage');
    const totalPagesEl = document.getElementById('totalPages');
    const pagerDots = document.getElementById('pagerDots');
    const slidesPerViewInfo = document.getElementById('slidesPerViewInfo');
    const totalPagesInfo = document.getElementById('totalPagesInfo');

    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width <= 576) return 1;
        if (width <= 992) return 2;
        return 3;
    }

    function calculateTotalPages() {
        return Math.ceil(images.length / slidesPerView);
    }

    function createSlides() {
        slider.innerHTML = '';
        for (let i = 0; i < images.length; i++) {
            const slide = document.createElement('div');
            slide.className = 'slide';

            const img = document.createElement('img');
            img.src = images[i];
            img.alt = 'Изображение ' + (i + 1);

            slide.appendChild(img);
            slider.appendChild(slide);
        }
    }

    function createPagerDots(totalPages) {
        pagerDots.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === currentPage) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', function() {
                goToPage(i);
            });
            pagerDots.appendChild(dot);
        }
    }

    function updateDisplay() {
        const totalPages = calculateTotalPages();

        currentPageEl.textContent = currentPage + 1;
        totalPagesEl.textContent = totalPages;
        slidesPerViewInfo.textContent = slidesPerView;
        totalPagesInfo.textContent = totalPages;

        createPagerDots(totalPages);

        const translateX = -currentPage * (100 / slidesPerView) * slidesPerView;
        slider.style.transform = 'translateX(' + translateX + '%)';
    }

    function goToPage(page) {
        const totalPages = calculateTotalPages();
        if (page >= 0 && page < totalPages) {
            currentPage = page;
            updateDisplay();
        }
    }

    function nextPage() {
        const totalPages = calculateTotalPages();
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateDisplay();
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            updateDisplay();
        }
    }

    function handleResize() {
        const newSlidesPerView = getSlidesPerView();
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;

            const totalPages = calculateTotalPages();
            if (currentPage >= totalPages) {
                currentPage = totalPages - 1;
            }

            updateDisplay();
        }
    }

    function init() {
        slidesPerView = getSlidesPerView();
        createSlides();
        updateDisplay();

        prevBtn.addEventListener('click', prevPage);
        nextBtn.addEventListener('click', nextPage);
        window.addEventListener('resize', handleResize);
    }

    document.addEventListener('DOMContentLoaded', init);
