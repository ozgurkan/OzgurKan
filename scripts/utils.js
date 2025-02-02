function scrollToElement(element, offset = 100) {
    const headerOffset = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: headerOffset - offset,
        behavior: 'smooth'
    });
}

function handleVideoError(e) {
    console.error('Video yükleme hatası:', e);
    this.innerHTML = 'Video yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.';
}

function handleVideoLoad() {
    console.log('Video başarıyla yüklendi');
} 