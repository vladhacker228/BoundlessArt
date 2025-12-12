document.addEventListener('DOMContentLoaded', () => {
    // Добавляем стили для анимации прямо через JS, чтобы не менять CSS файл
    const style = document.createElement('style');
    style.innerHTML = `
                /* Ключевые кадры полета и вращения */
                @keyframes flyToCenterAndSpin {
                    0% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: translate(var(--tx), var(--ty)) scale(1.5) rotate(180deg);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(var(--tx), var(--ty)) scale(3) rotate(360deg);
                        opacity: 0;
                    }
                }
                
                /* Класс для клонированного элемента */
                .anim-clone {
                    position: fixed;
                    z-index: 9999;
                    pointer-events: none;
                    transform-origin: center center;
                    border-radius: 20px;
                    box-shadow: 0 0 50px rgba(0,0,0,0.8);
                }
            `;
    document.head.appendChild(style);

    const joinCards = document.querySelectorAll('.join-card');

    joinCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Предотвращаем стандартный переход по ссылке сразу
            e.preventDefault();

            const img = this.querySelector('.join-img');
            if (!img) return; // Если картинки нет, выходим

            // 1. Создаем клон картинки
            const clone = img.cloneNode(true);
            clone.classList.add('anim-clone');

            // 2. Получаем координаты оригинальной картинки
            const rect = img.getBoundingClientRect();
            clone.style.top = rect.top + 'px';
            clone.style.left = rect.left + 'px';
            clone.style.width = rect.width + 'px';
            clone.style.height = rect.height + 'px';

            // 3. Добавляем клон в body
            document.body.appendChild(clone);

            // 4. Вычисляем смещение до центра экрана
            const centerX = window.innerWidth / 2 - rect.width / 2;
            const centerY = window.innerHeight / 2 - rect.height / 2;
            const moveX = centerX - rect.left;
            const moveY = centerY - rect.top;

            // Устанавливаем CSS переменные для анимации
            clone.style.setProperty('--tx', `${moveX}px`);
            clone.style.setProperty('--ty', `${moveY}px`);

            // 5. Запускаем анимацию
            clone.style.animation = 'flyToCenterAndSpin 0.8s forwards ease-in-out';

            // 6. Меняем цвет фона сайта на черный (цвета сайта #FFE4CA и #000)
            const originalBg = document.body.style.backgroundColor;
            const originalTransition = document.body.style.transition;

            document.body.style.transition = 'background-color 0.3s';
            document.body.style.backgroundColor = '#000'; // Затемняем фон

            // 7. После окончания анимации переходим по ссылке
            setTimeout(() => {
                // Возвращаем фон (на всякий случай, если пользователь вернется назад)
                document.body.style.backgroundColor = originalBg;

                // Удаляем клон
                clone.remove();

                // Имитация перехода на страницу (так как это демо, просто переходим на site.html)
                window.location.href = "site.html";
            }, 800);
        });
    });
});