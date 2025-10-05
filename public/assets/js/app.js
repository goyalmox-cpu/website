const products = [
  {
    id: 'aj4-tan-black-red',
    name: 'Air Jordan 4 Retro',
    colorway: 'Tan/Black/Red',
    price: 249,
    tag: 'New',
    // Image captured from user-provided screenshot; using data URL fallback isn't feasible here.
    // Expect users to replace these URLs or host locally if needed.
    image: './assets/images/aj4-tan-black-red.png',
    fallback: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop'
  },
  {
    id: 'aj4-union-noir',
    name: 'Air Jordan 4 Union',
    colorway: 'Black/Multi',
    price: 279,
    tag: 'Hot',
    image: './assets/images/aj4-union-black.png',
    fallback: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1400&auto=format&fit=crop'
  },
  {
    id: 'aj1-mocha',
    name: 'Air Jordan 1 High',
    colorway: 'Mocha',
    price: 299,
    tag: 'OG',
    image: './assets/images/aj1-mocha.png',
    fallback: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1400&auto=format&fit=crop'
  }
];

function byId(id){ return document.getElementById(id); }

function createCard(product){
  const card = document.createElement('article');
  card.className = 'card';

  const media = document.createElement('div');
  media.className = 'card-media';

  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = product.tag ?? 'Drop';
  media.appendChild(badge);

  const img = document.createElement('img');
  img.alt = `${product.name} – ${product.colorway}`;
  img.src = product.image;
  img.onerror = () => { img.src = product.fallback; };
  media.appendChild(img);

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('div');
  title.className = 'title';

  const name = document.createElement('h4');
  name.textContent = product.name;
  name.style.margin = '0';

  const price = document.createElement('span');
  price.className = 'price';
  price.textContent = `$${product.price}`;

  title.appendChild(name);
  title.appendChild(price);

  const meta = document.createElement('p');
  meta.className = 'meta';
  meta.textContent = product.colorway;

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const btnWish = document.createElement('button');
  btnWish.className = 'btn';
  btnWish.textContent = 'Wishlist';

  const btnBuy = document.createElement('button');
  btnBuy.className = 'btn primary';
  btnBuy.textContent = 'Buy Now';
  btnBuy.addEventListener('click', () => alert(`Added ${product.name} to cart`));

  actions.appendChild(btnWish);
  actions.appendChild(btnBuy);

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(actions);

  card.appendChild(media);
  card.appendChild(body);

  return card;
}

function populate(){
  const grid = byId('productGrid');
  products.forEach(p => grid.appendChild(createCard(p)));
}

function init(){
  document.getElementById('year').textContent = new Date().getFullYear();
  byId('shopNow').addEventListener('click', () => {
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
  });
  populate();
}

window.addEventListener('DOMContentLoaded', init);
