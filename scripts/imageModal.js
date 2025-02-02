document.addEventListener('DOMContentLoaded', function() {
    // Modal HTML'ini oluştur
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="modal-close">&times;</span>
        <span class="modal-nav modal-prev">&#10094;</span>
        <span class="modal-nav modal-next">&#10095;</span>
        <img class="modal-content" id="modalImage">
    `;
    document.body.appendChild(modal);

    const images = document.querySelectorAll('.diploma-image-container img');
    const modalImg = document.getElementById('modalImage');
    let currentIndex = 0;

    // Modal'ı aç
    function openModal(index) {
        modal.style.display = 'block';
        currentIndex = index;
        updateModalImage();
        document.body.style.overflow = 'hidden';
    }

    // Modal'ı kapat
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Modal içindeki resmi güncelle
    function updateModalImage() {
        modalImg.src = images[currentIndex].src;
    }

    // Önceki resme git
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModalImage();
    }

    // Sonraki resme git
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateModalImage();
    }

    // Resimlere tıklama olayı
    images.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    // Kapatma butonuna tıklama
    modal.querySelector('.modal-close').addEventListener('click', closeModal);

    // Modal dışına tıklama
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Gezinme butonlarına tıklama
    modal.querySelector('.modal-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

    modal.querySelector('.modal-next').addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });

    // Klavye kontrolleri
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });
}); 