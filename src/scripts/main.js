document.addEventListener('DOMContentLoaded', () => {
    const joinCards = document.querySelectorAll('.join-card');

    if (joinCards.length === 0) return;

    joinCards.forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault();

            const img = this.querySelector('.join-img');
            if (!img) return;

            // 1. Clone
            const clone = img.cloneNode(true);
            clone.classList.add('anim-clone');

            // 2. Coords
            const rect = img.getBoundingClientRect();
            clone.style.top = rect.top + 'px';
            clone.style.left = rect.left + 'px';
            clone.style.width = rect.width + 'px';
            clone.style.height = rect.height + 'px';

            document.body.appendChild(clone);

            // 3. Math
            const centerX = window.innerWidth / 2 - rect.width / 2;
            const centerY = window.innerHeight / 2 - rect.height / 2;
            const moveX = centerX - rect.left;
            const moveY = centerY - rect.top;

            clone.style.setProperty('--tx', `${moveX}px`);
            clone.style.setProperty('--ty', `${moveY}px`);

            // 4. Background effect
            const originalBg = document.body.style.backgroundColor;
            document.body.style.transition = 'background-color 0.3s';
            document.body.style.backgroundColor = '#000';

            // 5. Redirect
            setTimeout(() => {
                document.body.style.backgroundColor = originalBg;
                clone.remove();
                // Переход на страницу регистрации
                window.location.href = "site.html";
            }, 800);
        });
    });
});