document.addEventListener('DOMContentLoaded', function() {
            
            const images = [
                'images/1.png',
                'images/2.png',
                'images/3.png',
                'images/4.png',
                'images/5.png',
                'images/6.png',
                'images/7.png',
                'images/8.png'
            ];
            
            const gallerySlider = document.querySelector('.gallery-slider');
            const pagerDots = document.querySelector('.pager-dots');
            const currentPageSpan = document.getElementById('current-page');
            const totalPagesSpan = document.getElementById('total-pages');
            const arrowLeft = document.querySelector('.arrow-left');
            const arrowRight = document.querySelector('.arrow-right');
            
            let currentSlide = 0;
            let slidesPerView = 3; 
            
            
            function updateSlidesPerView() {
                if (window.innerWidth <= 768) {
                    slidesPerView = 1;
                } else {
                    slidesPerView = 3;
                }
                updateGallery();
            }
            
            function createSlides() {
                gallerySlider.innerHTML = '';
                images.forEach((imageUrl, index) => {
                    const slide = document.createElement('div');
                    slide.className = 'slide';
                    slide.innerHTML = `<img src="${imageUrl}" alt="Изображение ${index + 1}">`;
                    gallerySlider.appendChild(slide);
                });
            }

            function createPagerDots() {
                pagerDots.innerHTML = '';
                const totalPages = Math.ceil(images.length / slidesPerView);
                totalPagesSpan.textContent = totalPages;
                
                for (let i = 0; i < totalPages; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'dot';
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => {
                        goToSlide(i * slidesPerView);
                    });
                    pagerDots.appendChild(dot);
                }
            }
            
            function updateGallery() {
                const slideWidth = 100 / slidesPerView;
                document.querySelectorAll('.slide').forEach(slide => {
                    slide.style.flex = `0 0 ${slideWidth}%`;
                });
                
                createPagerDots();
                goToSlide(currentSlide);
            }
            
            function goToSlide(slideIndex) {
                const totalSlides = images.length;
                const maxSlideIndex = totalSlides - slidesPerView;
                const gap = 0;
                
                if (slideIndex <= 0) {
                    slideIndex = 0;
                    arrowLeft.style.display = 'none';    // Скрываем левую стрелку
                } else {
                    arrowLeft.style.display = 'block';   // Показываем левую стрелку
                }
                
                if (slideIndex >= maxSlideIndex) {
                    slideIndex = maxSlideIndex;
                    arrowRight.style.display = 'none';   // Скрываем правую стрелку
                } else {
                    arrowRight.style.display = 'block';  // Показываем правую стрелку
                }
                
                currentSlide = slideIndex;
                
                const slideWidth = (100 - (gap * (slidesPerView - 1))) / slidesPerView;
                const translateX = -currentSlide * (slideWidth + gap);
    
                gallerySlider.style.transform = `translateX(${translateX}%)`;
                updatePager();
            }
            
            function updatePager() {
                const totalPages = Math.ceil(images.length / slidesPerView);

                let currentPage;
                if (currentSlide >= images.length - slidesPerView) {
                    currentPage = totalPages; 
                } else {
                    currentPage = Math.floor(currentSlide / slidesPerView) + 1;
                }

                currentPageSpan.textContent = currentPage;
                totalPagesSpan.textContent = totalPages;

                document.querySelectorAll('.dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentPage - 1);
                });
            }
            
            
            arrowLeft.addEventListener('click', function(){
                goToSlide(currentSlide - slidesPerView);
            });
            
            arrowRight.addEventListener('click', function(){
                goToSlide(currentSlide + slidesPerView);
            });
            
            
            createSlides();
            updateSlidesPerView();
            
            window.addEventListener('resize', updateSlidesPerView);
        });
