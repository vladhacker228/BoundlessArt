document.addEventListener('DOMContentLoaded', () => {
    const arrowButtons = document.querySelectorAll('.poster__arrow');
    const modal = document.getElementById('purchaseModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const likeButtons = document.querySelectorAll('.poster__like');

    // --- Modal Logic ---
    if (modal && closeModalButton) {
        const openModal = () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        arrowButtons.forEach(button => {
            button.addEventListener('click', openModal);
        });

        closeModalButton.addEventListener('click', closeModal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // --- Like Logic ---
    // Пути относительно shop.html (src/pages) до src/assets/images/
    const defaultHeartSrc = '../assets/images/heart.png';
    const likedHeartSrc = '../assets/images/liked_heart.png';

    likeButtons.forEach(likeIcon => {
        // Установка начального пути (если не задан)
        if (!likeIcon.src || likeIcon.src.endsWith('heart.png')) {
            likeIcon.src = defaultHeartSrc;
        }

        likeIcon.addEventListener('click', () => {
            const isLiked = likeIcon.getAttribute('data-liked') === 'true';
            if (isLiked) {
                likeIcon.src = defaultHeartSrc;
                likeIcon.setAttribute('data-liked', 'false');
            } else {
                likeIcon.src = likedHeartSrc;
                likeIcon.setAttribute('data-liked', 'true');
            }
        });
    });
});