function toggleProject(element) {
    const projectItem = element.closest('.project-item');
    const projectDetails = projectItem.querySelector('.project-details');
    const wasActive = projectItem.classList.contains('active');
    
    // Tüm projeleri kapat
    document.querySelectorAll('.project-item').forEach(item => {
        if (item !== projectItem) {
            item.classList.remove('active');
            item.querySelector('.project-details').style.display = 'none';
        }
    });
    
    if (!wasActive) {
        projectItem.classList.add('active');
        projectDetails.style.display = 'block';
        scrollToElement(element);
    } else {
        projectItem.classList.remove('active');
        projectDetails.style.display = 'none';
    }
}

function initVideoHandlers() {
    const videos = document.querySelectorAll('.project-video');
    
    videos.forEach(video => {
        video.addEventListener('error', handleVideoError);
        video.addEventListener('loadeddata', handleVideoLoad);
    });
} 