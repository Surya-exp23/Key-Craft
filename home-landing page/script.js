document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('video');
            
    if (video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } 
            else {
                video.pause();
                }
            });
        }, 
        { threshold: 0.5 });

        observer.observe(video.closest('section'));

    }
});


function toggleDropdown(section) {
    const dropdown = document.getElementById(`dropdown-${section}`);
    const icon = document.getElementById(`icon-${section}`);
    const button = icon.closest('button');
    
    const isOpen = dropdown.style.maxHeight && dropdown.style.maxHeight !== '0px';
    
    if (isOpen) {
       
        dropdown.style.maxHeight = '0px';
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
        button.style.background = 'transparent';
    } else {
        
        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
        icon.textContent = '−';
        icon.style.transform = 'rotate(180deg)';
        button.style.background = '#7200a7';
        
    }
}
