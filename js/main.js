document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Год в подвале ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Липкая шапка: тень при прокрутке ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 10) header.style.boxShadow = '0 4px 14px rgba(75,51,25,.08)';
    else header.style.boxShadow = 'none';

    const toTop = document.getElementById('toTop');
    if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  document.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Мобильное меню ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    nav.classList.toggle('is-open');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-active');
      nav.classList.remove('is-open');
    });
  });

  /* ---------- Кнопка "наверх" ---------- */
  const toTop = document.getElementById('toTop');
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ==========================================================
     КАТАЛОГ ТОВАРОВ
     Чтобы добавить/убрать товар, просто отредактируйте
     этот список — карточки создаются автоматически.
     wholesalePrice — цена от 10 шт.
  ========================================================== */
  const products = [
    { category: 'sofa',     name: 'Диван "Комфорт" 3-местный',   price: 34990, wholesalePrice: 29990, color: '#C68B59' },
    { category: 'sofa',     name: 'Кресло "Уют"',                 price: 15990, wholesalePrice: 12990, color: '#B97A46' },
    { category: 'bed',      name: 'Кровать "Классик" 160×200',    price: 24990, wholesalePrice: 20990, color: '#8B5E3C' },
    { category: 'bed',      name: 'Кровать-чердак детская',       price: 21990, wholesalePrice: 18490, color: '#A9744A' },
    { category: 'wardrobe', name: 'Шкаф-купе 3-дверный',          price: 27990, wholesalePrice: 23990, color: '#6b4527' },
    { category: 'wardrobe', name: 'Гардеробная система "Лофт"',   price: 39990, wholesalePrice: 33990, color: '#7a5333' },
    { category: 'table',    name: 'Обеденный стол "Дуб" 140 см',  price: 18990, wholesalePrice: 15990, color: '#C68B59' },
    { category: 'table',    name: 'Стул мягкий (комплект 4 шт.)', price: 12990, wholesalePrice: 9990,  color: '#B97A46' },
    { category: 'kitchen',  name: 'Кухонный гарнитур "Модерн" 3м',price: 89990, wholesalePrice: 76990, color: '#8B5E3C' },
    { category: 'office',   name: 'Стол офисный руководителя',    price: 22990, wholesalePrice: 18990, color: '#6b4527' },
    { category: 'kids',     name: 'Детский набор "Радуга"',       price: 16990, wholesalePrice: 13990, color: '#E07A3F' },
    { category: 'mattress', name: 'Матрас ортопедический 160×200',price: 19990, wholesalePrice: 16490, color: '#A9744A' },
  ];

  const categoryLabels = {
    sofa: 'Диваны', bed: 'Кровати', wardrobe: 'Шкафы', table: 'Столы и стулья',
    kitchen: 'Кухни', office: 'Офис', kids: 'Детская', mattress: 'Матрасы'
  };

  const iconPath = {
    sofa: 'M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1 1 1.7V17a2 2 0 0 1-2 2h-1v2h-2v-2H8v2H6v-2H5a2 2 0 0 1-2-2v-4.3A2 2 0 0 1 4 11Zm2-3v3h12V8H6Z',
    bed: 'M3 18v-9h4v4h10a3 3 0 0 1 3 3v2h-2v-2a1 1 0 0 0-1-1H5v3H3ZM7 9V5h5v4H7Z',
    wardrobe: 'M4 2h16v20H4V2Zm2 2v16h5V4H6Zm7 0v16h5V4h-5ZM8 11h1v2H8v-2Zm7 0h1v2h-1v-2Z',
    table: 'M2 7h20v2H2V7Zm2 3h2v9H4v-9Zm14 0h2v9h-2v-9ZM8 13h8v2H8v-2Z',
    kitchen: 'M3 3h18v8H3V3Zm2 2v4h14V5H5ZM3 13h18v8H3v-8Zm2 2v4h6v-4H5Zm8 0v4h6v-4h-6Z',
    office: 'M9 3h6a2 2 0 0 1 2 2v2h4v13H3V7h4V5a2 2 0 0 1 2-2Zm0 2v2h6V5H9ZM5 9v9h14V9H5Z',
    kids: 'M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.8 7.1 17.2l.9-5.5-4-3.9L9.5 7 12 2Z',
    mattress: 'M3 6h18v12H3V6Zm2 2v8h14V8H5Zm2 2h2v2H7v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Z'
  };

  const formatPrice = (value) => value.toLocaleString('ru-RU') + ' ₽';

  const grid = document.getElementById('catalogGrid');
  const commentField = document.getElementById('orderComment');

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.category = product.category;

    card.innerHTML = `
      <div class="product-card__media" style="background:${product.color}">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="${iconPath[product.category]}"/></svg>
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${categoryLabels[product.category]}</span>
        <h3 class="product-card__title">${product.name}</h3>
        <div class="product-card__prices">
          <span class="product-card__price">${formatPrice(product.price)}<span>розница / шт.</span></span>
          <span class="product-card__wholesale">${formatPrice(product.wholesalePrice)}<span>опт от 10 шт.</span></span>
        </div>
        <button type="button" class="product-card__btn">Заказать</button>
      </div>
    `;

    card.querySelector('.product-card__btn').addEventListener('click', () => {
      if (commentField) commentField.value = `Интересует: ${product.name}`;
      document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
    });

    grid.appendChild(card);
  });

  /* ---------- Фильтрация каталога ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const applyFilter = (filter) => {
    filterButtons.forEach(btn => btn.classList.toggle('is-active', btn.dataset.filter === filter));
    grid.querySelectorAll('.product-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  document.querySelectorAll('.category-card[data-filter]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      applyFilter(card.dataset.filter);
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- Форма заявки ---------- */
  const form = document.getElementById('orderForm');
  const note = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !phone) {
      note.textContent = 'Пожалуйста, заполните имя и телефон.';
      note.classList.add('is-error');
      return;
    }

    // ЗАМЕНИТЕ этот блок на реальную отправку данных (например, через
    // сервис Formspree или свой сервер), когда сайт будет готов к запуску.
    note.classList.remove('is-error');
    note.textContent = 'Спасибо! Заявка отправлена, наш менеджер свяжется с вами в ближайшее время.';
    form.reset();
  });

});
