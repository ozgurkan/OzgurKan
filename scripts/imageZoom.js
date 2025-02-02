document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.zoomable-image');
    
    images.forEach(img => {
        const MIN_SCALE = 1;
        const MAX_SCALE = 4;
        const SCALE_STEP = 0.1;
        
        let currentScale = 1;
        let isZoomed = false;
        let currentPos = { x: 0, y: 0 };
        
        // Mouse wheel ile zoom
        img.addEventListener('wheel', function(e) {
            e.preventDefault();
            
            const delta = e.deltaY > 0 ? -1 : 1;
            let newScale = currentScale + (delta * SCALE_STEP);
            newScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
            
            if (newScale !== currentScale) {
                currentScale = newScale;
                isZoomed = currentScale > 1;
                
                if (!isZoomed) {
                    resetZoom();
                } else {
                    // Zoom yaparken mouse pozisyonunu merkez al
                    const rect = img.getBoundingClientRect();
                    const mouseX = (e.clientX - rect.left) / rect.width;
                    const mouseY = (e.clientY - rect.top) / rect.height;
                    
                    const moveX = (mouseX - 0.5) * 2;
                    const moveY = (mouseY - 0.5) * 2;
                    
                    currentPos = {
                        x: -moveX * (rect.width * (currentScale - 1)) / 2,
                        y: -moveY * (rect.height * (currentScale - 1)) / 2
                    };
                }
                
                updateTransform();
            }
        });
        
        // Mouse hareketi ile pan
        img.addEventListener('mousemove', function(e) {
            if (!isZoomed) return;
            
            const rect = img.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width;
            const mouseY = (e.clientY - rect.top) / rect.height;
            
            const moveX = (mouseX - 0.5) * 2;
            const moveY = (mouseY - 0.5) * 2;
            
            const maxMoveX = (rect.width * currentScale - rect.width) / 2;
            const maxMoveY = (rect.height * currentScale - rect.height) / 2;
            
            currentPos = {
                x: -moveX * maxMoveX,
                y: -moveY * maxMoveY
            };
            
            updateTransform();
        });
        
        // Mouse leave olayı
        img.addEventListener('mouseleave', function() {
            resetZoom();
        });
        
        // Transform güncelleme fonksiyonu
        function updateTransform() {
            img.style.transform = `translate(${currentPos.x}px, ${currentPos.y}px) scale(${currentScale})`;
            img.classList.toggle('zoomed', isZoomed);
        }
        
        // Zoom'u resetleme fonksiyonu
        function resetZoom() {
            currentScale = 1;
            currentPos = { x: 0, y: 0 };
            isZoomed = false;
            updateTransform();
        }
    });
}); 