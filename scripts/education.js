function toggleEducation(element) {
    const timelineItem = element.closest('.timeline-item');
    const wasActive = timelineItem.classList.contains('active');
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (!wasActive) {
        timelineItem.classList.add('active');
        scrollToElement(element);
    }
}

function initFirstEducationItem() {
    const firstItem = document.querySelector('.timeline-item');
    if (firstItem) {
        firstItem.classList.add('active');
    }
} 