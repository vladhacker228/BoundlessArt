export function initArtCardAlert() {
    const items = document.querySelectorAll('.art-item');
    if (items.length === 0) return;

    items.forEach(function (item) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function () {
            const authorElement = item.querySelector('.art-item__author');
            const ratingElement = item.querySelector('.art-item__rating');
            let message = "Вы нажали на карточку!";

            if (authorElement && ratingElement) {
                const author = authorElement.innerText.trim();
                const rating = ratingElement.innerText.trim();
                message = `Вы открыли работу:\nАвтор: ${author}\nРейтинг: ${rating}`;
            }
            alert(message);
        });
    });
}