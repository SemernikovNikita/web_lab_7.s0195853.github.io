
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
            
            // Создаем слайды
            function createSlides() {
                gallerySlider.innerHTML = '';
                images.forEach((imageUrl, index) => {
                    const slide = document.createElement('div');
                    slide.className = 'slide';
                    slide.innerHTML = `<img src="${imageUrl}" alt="Изображение ${index + 1}">`;
                    gallerySlider.appendChild(slide);
                });
            }
            
            // Создаем точки пейджера
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
                
                
                if (slideIndex < 0) {
                    slideIndex = 0;
                } else if (slideIndex > maxSlideIndex) {
                    slideIndex = maxSlideIndex;
                }
                
                currentSlide = slideIndex;
                const translateX = -currentSlide * (100 / slidesPerView);
                gallerySlider.style.transform = `translateX(${translateX}%)`;
                
                
                updatePager();
            }
            
            function updatePager() {
                const currentPage = Math.floor(currentSlide / slidesPerView) + 1;
                currentPageSpan.textContent = currentPage;
                
                document.querySelectorAll('.dot').forEach((dot, index) => {
                    if (index === currentPage - 1) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            
            arrowLeft.addEventListener('click', () => {
                goToSlide(currentSlide - slidesPerView);
            });
            
            arrowRight.addEventListener('click', () => {
                goToSlide(currentSlide + slidesPerView);
            });
            
            
            createSlides();
            updateSlidesPerView();
            
            window.addEventListener('resize', updateSlidesPerView);
        });