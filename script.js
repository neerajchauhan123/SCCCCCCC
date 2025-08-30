document.addEventListener('DOMContentLoaded', () => {
    // --- Initial Setup ---
    const mainContent = document.getElementById('main-content');
    const flames = document.querySelectorAll('.flame');
    const cutCakeBtn = document.getElementById('cut-cake-btn');
    const cakeContainer = document.getElementById('cake-container');
    const blowText = document.getElementById('blow-text');
    const messageSection = document.getElementById('message-section');
    const gallerySection = document.getElementById('gallery-section');
    const subHeading = document.getElementById('sub-heading');
    const audio = document.getElementById('bg-music');
    const musicToggleBtn = document.getElementById('music-toggle');
    
    // Make the main content visible
    mainContent.style.opacity = '1';

    // --- Cake Interactivity ---
    let candlesOut = 0;

    flames.forEach(flame => {
        flame.addEventListener('click', () => {
            if (!flame.classList.contains('out')) {
                flame.classList.add('out');
                candlesOut++;
                if (candlesOut === flames.length) {
                    blowText.classList.add('fade-in');
                    blowText.textContent = "Make a wish! ✨";
                    subHeading.textContent = "Your wish is my command... always."

                    // Play music and show toggle button
                    setTimeout(() => {
                        audio.play().catch(error => console.log("Audio autoplay prevented by browser.", error));
                        musicToggleBtn.classList.remove('hidden');
                        updateMusicIcon();
                    }, 500);
                    
                    setTimeout(() => {
                        cutCakeBtn.classList.remove('hidden');
                        cutCakeBtn.classList.add('fade-in-up');
                    }, 1000);
                }
            }
        });
    });

    cutCakeBtn.addEventListener('click', () => {
        cakeContainer.classList.add('cut');
        cutCakeBtn.style.display = 'none';
        blowText.style.display = 'none';
        
        setTimeout(() => {
            messageSection.classList.remove('hidden');
            gallerySection.classList.remove('hidden');
            messageSection.classList.add('fade-in-up');
            gallerySection.classList.add('fade-in-up');
            messageSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // --- Add Lights on Cake Cut ---
            const bulbContainer = document.createElement('div');
            bulbContainer.className = 'bulb-container';
            document.body.prepend(bulbContainer); // Add container to the top of the page

            const bulbColors = ['#f1c40f', '#e74c3c', '#3498db', '#9b59b6', '#2ecc71'];
            const numBulbs = Math.floor(window.innerWidth / 50);

            for (let i = 0; i < numBulbs; i++) {
                const bulb = document.createElement('div');
                bulb.className = 'bulb';
                bulb.style.backgroundColor = bulbColors[i % bulbColors.length];
                bulb.style.boxShadow = `0 0 10px ${bulbColors[i % bulbColors.length]}`;
                bulb.style.animationDelay = `${(i * 0.2)}s`;
                bulbContainer.appendChild(bulb);
            }
            // Add class to trigger fade-in animation from CSS
            setTimeout(() => bulbContainer.classList.add('fade-in'), 100);

        }, 1500);
    });

    // --- Music Controls ---
    const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" viewBox="0 0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;

    const updateMusicIcon = () => {
        musicToggleBtn.innerHTML = audio.paused ? playIcon : pauseIcon;
    };

    musicToggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.onplay = updateMusicIcon;
    audio.onpause = updateMusicIcon;

    // --- Image Modal Logic ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModalBtn = document.getElementById('close-modal');
    const galleryImages = document.querySelectorAll('.gallery-img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = img.src;
        });
    });

    const closeModal = () => {
        modal.style.display = "none";
    };

    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});

