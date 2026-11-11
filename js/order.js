// Каталог: фильтрация карточек товаров по категориям и цене
document.addEventListener('DOMContentLoaded', () => {
  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const resetFilter = document.getElementById('resetFilter');
  const productGrid = document.getElementById('productGrid');
  const noResultsAlert = document.getElementById('noResultsAlert');
  const cards = productGrid ? productGrid.querySelectorAll('.col') : [];

  const priceRanges = {
    low: { min: 0, max: 2000 },
    mid: { min: 2000, max: 4000 },
    high: { min: 4000, max: 999999 },
  };

  function priceValue(card) {
    const text = card.querySelector('.fw-bold')?.textContent || '';
    const num = parseInt(text.replace(/\D/g, ''), 10);
    return isNaN(num) ? 0 : num;
  }

  function filter() {
    const cat = categoryFilter.value;
    const price = priceFilter.value;
    let visible = 0;

    cards.forEach((card) => {
      const cardCat = card.dataset.category;
      const cardPrice = priceValue(card);

      const matchCat = cat === 'all' || cardCat === cat;
      let matchPrice = true;
      if (price !== 'all' && priceRanges[price]) {
        matchPrice = cardPrice >= priceRanges[price].min && cardPrice < priceRanges[price].max;
      }

      if (matchCat && matchPrice) {
        card.classList.remove('d-none');
        visible++;
      } else {
        card.classList.add('d-none');
      }
    });

    if (noResultsAlert) {
      noResultsAlert.classList.toggle('d-none', visible > 0);
    }
  }

  if (categoryFilter) categoryFilter.addEventListener('change', filter);
  if (priceFilter) priceFilter.addEventListener('change', filter);
  if (resetFilter) resetFilter.addEventListener('click', () => {
    categoryFilter.value = 'all';
    priceFilter.value = 'all';
    filter();
  });
});

// Страница товара: быстрый заказ из карточки
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('orderFromProduct');
  const titleEl = document.getElementById('productTitle');
  const modalTitleEl = document.getElementById('modalProductName');

  if (btn && titleEl && modalTitleEl) {
    btn.addEventListener('click', () => {
      modalTitleEl.textContent = titleEl.textContent;
    });
  }
});

// Форма заказа: валидация и сообщение об успехе (alert)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const success = document.getElementById('orderSuccess');

  if (form && success) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
      }

      form.reset();
      form.classList.remove('was-validated');
      success.classList.remove('d-none');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
});
