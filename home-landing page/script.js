// document.addEventListener('DOMContentLoaded', function() {
//     const video = document.querySelector('video');
            
//     if (video) {
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 video.play();
//             } 
//             else {
//                 video.pause();
//                 }
//             });
//         }, 
//         { threshold: 0.5 });

//         observer.observe(video.closest('section'));

//     }
// });


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


// this is for the effect on which the blur must be applied when the scrol a bit

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
    
        navbar.classList.add('backdrop-blur-md', 'bg-black/70');
    } else {
      
        navbar.classList.remove('backdrop-blur-md', 'bg-black/70');
    }
});



// this is where the arrow button works
const scrollup = () => {
  const scrollupElement = document.getElementById("scrollup");
  if (window.scrollY >= 250) {
    scrollupElement.classList.remove("-bottom-1/2");
    scrollupElement.classList.add("bottom-4");
  }
  else {
    scrollupElement.classList.add("-bottom-1/2");
    scrollupElement.classList.remove("bottom-4");
  }
}

window.addEventListener('scroll', scrollup);


// scrolling animation

const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 300,
  reset: true
})


sr.reveal(`.headdata`)
sr.reveal(`.qoute12`,{delay: 400})


sr.reveal(`.year23`,{delay: 600})

sr.reveal(`.headtext12`)
sr.reveal(`.headimg12`,{delay: 400})

sr.reveal(`.dropdown-item`,{interval: 100})


sr.reveal(`.keyimg`,{scale: 0.85})
sr.reveal(`.ability12`,{interval: 100})

sr.reveal(`.levelup12`)



sr.reveal(`.review12`)
sr.reveal(`.revcard12`,{delay:300,interval: 100})

