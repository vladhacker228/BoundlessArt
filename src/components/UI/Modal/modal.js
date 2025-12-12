export function initModal() {
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
    // Change paths according to your structure if needed, e.g. ../assets/images/...
    const defaultHeartSrc = 'images/heart.png'; 
    const likedHeartSrc = 'images/liked_heart.png';

    likeButtons.forEach(likeIcon => {
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
}