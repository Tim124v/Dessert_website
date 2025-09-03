# 🍰 Ludziarnia - Dessert Website

Современный веб-сайт для кондитерской с функциональностью интернет-магазина, админ-панелью и системой корзины.

## ✨ Особенности

- **Адаптивный дизайн** - работает на всех устройствах
- **Динамический каталог** - фильтрация по категориям и поиск
- **Система корзины** - мини-корзина, подсчет суммы, localStorage
- **Админ-панель** - управление товарами через Decap CMS
- **EmailJS интеграция** - отправка заказов на email
- **SEO оптимизация** - мета-теги, семантическая разметка
- **Производительность** - lazy loading, оптимизированные изображения

## 🏗️ Структура проекта

```
Dessert_website/
├── admin/                 # Админ-панель Decap CMS
│   ├── index.html        # CMS интерфейс
│   └── config.yml        # Конфигурация CMS
├── css/
│   └── styles.css        # Основные стили
├── js/
│   ├── script.js         # Основная логика
│   ├── cart.js           # Система корзины
│   ├── product.js        # Страница товара
│   └── checkout.js       # Оформление заказа
├── data/
│   └── products.json     # Данные товаров
├── images/               # Изображения
├── index.html            # Главная страница
├── product.html          # Страница товара
├── checkout.html         # Оформление заказа
├── thank-you.html        # Страница благодарности
└── netlify.toml          # Конфигурация Netlify
```

## 🚀 Быстрый старт

### Локальная разработка

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/Tim124v/Dessert_website.git
cd Dessert_website
```

2. **Запустите локальный сервер:**
```bash
# Python 3
python3 -m http.server 8000

# Или Node.js
npx serve . --listen 8000
```

3. **Откройте в браузере:**
```
http://localhost:8000
```

### Деплой на Netlify

1. **Подключите репозиторий к Netlify**
2. **Включите Identity:**
   - Site settings → Identity → Enable Identity
   - Registration: Invite only
3. **Включите Git Gateway:**
   - Identity → Services → Enable Git Gateway
4. **Пригласите админа:**
   - Identity → Invite users → ваш email
5. **Откройте админку:**
   - `https://your-site.netlify.app/admin`

## 🛠️ Технологии

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **CMS:** Decap CMS (ранее Netlify CMS)
- **Хостинг:** Netlify
- **Стили:** CSS Grid, Flexbox, CSS Custom Properties
- **Анимации:** CSS Transitions, Keyframes
- **Хранение:** localStorage для корзины

## 📱 Адаптивность

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** до 767px

## 🎨 Дизайн-система

### Цвета
- **Primary:** #1a365d (темно-синий)
- **Secondary:** #98d8b6 (мята)
- **Accent:** #ff69b4 (розовый)
- **Text:** #333 (темно-серый)
- **Background:** #ffffff (белый)

### Типографика
- **Заголовки:** Playfair Display (serif)
- **Основной текст:** Inter (sans-serif)

### Компоненты
- **Кнопки:** градиенты, hover-эффекты, анимации
- **Карточки:** тени, скругленные углы, hover-трансформации
- **Формы:** фокус-состояния, валидация, анимации

## 🔧 API и интеграции

### EmailJS
```javascript
// Конфигурация в checkout.js
const FORMSPREE_ENDPOINT = 'your-endpoint';
const PAYMENT_LINK = 'your-payment-link';
```

### Decap CMS
```yaml
# admin/config.yml
backend:
  name: git-gateway
  branch: main

collections:
  - name: "products"
    fields:
      - { label: "Name", name: "name", widget: "string" }
      - { label: "Price", name: "price", widget: "number" }
      - { label: "Category", name: "category", widget: "select" }
```

## 📊 Производительность

- **Lazy loading** для изображений
- **Debounced search** (300ms)
- **Оптимизированные CSS** без дублирования
- **Минифицированные изображения**
- **Efficient DOM manipulation** с DocumentFragment

## 🔒 Безопасность

- **XSS protection** через безопасный innerHTML
- **Input validation** на клиенте и сервере
- **CSRF protection** через EmailJS
- **Secure localStorage** для корзины

## 🧪 Тестирование

### Функциональные тесты
- [ ] Добавление товаров в корзину
- [ ] Фильтрация по категориям
- [ ] Поиск товаров
- [ ] Оформление заказа
- [ ] Отправка EmailJS

### Кросс-браузерное тестирование
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## 📈 Мониторинг

### Аналитика
- Google Analytics (готов к подключению)
- Netlify Analytics
- Performance monitoring

### Логирование
- Console logging для ошибок
- Error boundaries
- User interaction tracking

## 🚀 Развертывание

### Автоматический деплой
1. Push в `main` ветку
2. Netlify автоматически собирает и деплоит
3. CMS обновляется в реальном времени

### Ручной деплой
```bash
git add .
git commit -m "Update description"
git push origin main
```

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch
3. Commit изменения
4. Push в branch
5. Создайте Pull Request

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл

## 📞 Поддержка

- **Issues:** [GitHub Issues](https://github.com/Tim124v/Dessert_website/issues)
- **Email:** info@sweetcakes.pl
- **Telegram:** @support_ludziarnia

## 🔮 Планы развития

- [ ] PWA функциональность
- [ ] Push уведомления
- [ ] Офлайн режим
- [ ] Многоязычность (PL/EN/RU)
- [ ] Интеграция с CRM
- [ ] Аналитика продаж
- [ ] Система отзывов
- [ ] Программа лояльности

---

**Сделано с ❤️ для Ludziarnia**