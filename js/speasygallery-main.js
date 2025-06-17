/**
 * @package custom_speasyimagegallery
 * @author Grok (inspired by JoomShaper's SpeasyImageGallery)
 * @copyright Copyright (c) 2025 xAI
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Находим все галереи
        const galleries = document.querySelectorAll('.speasyimagegallery-gallery');

        galleries.forEach(gallery => {
            // Получаем настройки из атрибутов данных
            const showTitle = gallery.dataset.showtitle === 'true';
            const showDescription = gallery.dataset.showdescription === 'true';
            const showCounter = gallery.dataset.showcounter === 'true';

            // Находим элементы галереи
            const items = gallery.querySelectorAll('.speasyimagegallery-gallery-item');
            if (!items.length) {
                console.warn('No items found in gallery:', gallery);
                return;
            }

            // Создаем модальное окно
            const modal = document.createElement('div');
            modal.className = 'speasyimagegallery-modal';
            modal.innerHTML = `
                <span class="speasyimagegallery-close">×</span>
                <div class="speasyimagegallery-modal-content">
                    <img src="" alt="" class="speasyimagegallery-modal-image">
                    <div class="speasyimagegallery-info"></div>
                </div>
            `;
            document.body.appendChild(modal);

            const modalImage = modal.querySelector('.speasyimagegallery-modal-image');
            const modalInfo = modal.querySelector('.speasyimagegallery-info');
            const closeBtn = modal.querySelector('.speasyimagegallery-close');

            // Подсчитываем общее количество изображений для счетчика
            const totalItems = items.length;

            // Обработчик клика для каждого элемента
            items.forEach((item, index) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Получаем данные изображения
                    const imgSrc = item.querySelector('img').src;
                    const title = item.dataset.title || '';
                    const description = item.dataset.description || '';

                    // Обновляем модальное окно
                    modalImage.src = imgSrc;
                    modalImage.alt = title;

                    let infoContent = '';
                    if (showTitle && title) {
                        infoContent += `<h3>${title}</h3>`;
                    }
                    if (showDescription && description) {
                        infoContent += `<p>${description}</p>`;
                    }
                    if (showCounter) {
                        infoContent += `<p>${index + 1} / ${totalItems}</p>`;
                    }
                    modalInfo.innerHTML = infoContent;

                    // Показываем модальное окно
                    modal.style.display = 'flex';
                });
            });

            // Закрытие модального окна
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // Закрытие при клике вне изображения
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });

            // Закрытие по клавише Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    modal.style.display = 'none';
                }
            });
        });
    });
})();