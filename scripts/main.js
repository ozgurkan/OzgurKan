// Performans ve kullanıcı deneyimi iyileştirmeleri
document.addEventListener('DOMContentLoaded', function() {
    // Tema değiştirici
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const root = document.documentElement;
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme); // Tema tercihini kaydet
        });
    }

    // Tercih edilen temayı yükle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Mobil menü kontrolü
    const menuToggle = document.querySelector('.menu-toggle');
    const sidenav = document.querySelector('.ok-sidenav');
    if (menuToggle && sidenav) {
        menuToggle.addEventListener('click', () => {
            sidenav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Menü dışına tıklandığında kapat
        document.addEventListener('click', (e) => {
            if (!sidenav.contains(e.target) && !menuToggle.contains(e.target)) {
                sidenav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
});

// İyileştirilmiş Modal Yönetimi
class ImageModal {
    constructor() {
        this.createModal();
        this.initializeEvents();
        this.preloadImages();
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-content-wrapper">
                <span class="modal-close">&times;</span>
                <span class="modal-nav modal-prev" data-tooltip="Önceki">&#10094;</span>
                <span class="modal-nav modal-next" data-tooltip="Sonraki">&#10095;</span>
                <img class="modal-content" id="modalImage">
                <div class="modal-counter"></div>
            </div>
        `;
        document.body.appendChild(this.modal);

        this.modalImg = this.modal.querySelector('#modalImage');
        this.counter = this.modal.querySelector('.modal-counter');
        this.images = Array.from(document.querySelectorAll('.diploma-image-container img'));
        this.currentIndex = 0;
    }

    initializeEvents() {
        // Resim tıklama olayları
        this.images.forEach((img, index) => {
            img.addEventListener('click', () => this.openModal(index));
        });

        // Modal kontrolleri
        this.modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        this.modal.querySelector('.modal-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigate(-1);
        });
        this.modal.querySelector('.modal-next').addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigate(1);
        });

        // Modal dışına tıklama
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Klavye kontrolleri
        document.addEventListener('keydown', (e) => {
            if (!this.modal.style.display === 'block') return;
            
            switch(e.key) {
                case 'Escape': this.closeModal(); break;
                case 'ArrowLeft': this.navigate(-1); break;
                case 'ArrowRight': this.navigate(1); break;
            }
        });

        // Touch olayları
        let touchStartX = 0;
        let touchEndX = 0;

        this.modal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.modal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.navigate(1); // Sola kaydırma
            } else {
                this.navigate(-1); // Sağa kaydırma
            }
        }
    }

    preloadImages() {
        // Sonraki ve önceki resimleri önceden yükle
        this.images.forEach(img => {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = img.src;
            document.head.appendChild(preloadLink);
        });
    }

    openModal(index) {
        this.modal.style.display = 'block';
        this.currentIndex = index;
        this.updateModalImage();
        document.body.style.overflow = 'hidden';
        this.modalImg.classList.add('fade-in');
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.modalImg.classList.remove('fade-in');
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
        this.modalImg.classList.remove('fade-in');
        setTimeout(() => {
            this.updateModalImage();
            this.modalImg.classList.add('fade-in');
        }, 300);
    }

    updateModalImage() {
        this.modalImg.src = this.images[this.currentIndex].src;
        this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }
}

// Modal'ı başlat
new ImageModal(); 