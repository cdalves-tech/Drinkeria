<template>
  <main class="home-view">
    <section class="mobile-app">
      <header class="mobile-topbar">
        <img class="mobile-logo" src="/images/logo-drinkeria.svg" alt="Drinkeria" />

        <button
          v-if="mobileTab !== 'cart'"
          class="mobile-icon-btn"
          type="button"
          aria-label="Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>

        <button
          v-else
          class="mobile-icon-btn is-cart"
          type="button"
          aria-label="Carrinho"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10" cy="20" r="1.5" stroke="currentColor" stroke-width="1.8"/>
            <circle cx="18" cy="20" r="1.5" stroke="currentColor" stroke-width="1.8"/>
            <path d="M3 4h2l2.1 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L20 8H7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="cart.totalItems > 0" class="mobile-badge">{{ cart.totalItems }}</span>
        </button>
      </header>

      <template v-if="mobileTab !== 'cart'">
        <section class="mobile-search-wrap">
          <div class="mobile-search">
            <svg viewBox="0 0 16 16" fill="currentColor" class="mobile-search-icon" aria-hidden="true">
              <path d="M11.74 10.34a6.5 6.5 0 1 0-1.4 1.4l3.85 3.85a1 1 0 1 0 1.42-1.42l-3.86-3.84Zm-5.24 1.16a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" />
            </svg>
            <input v-model.trim="mobileSearch" type="text" placeholder="Buscar Bebidas..." />
            <button class="mobile-search-btn" type="button" aria-label="Buscar">
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M11.74 10.34a6.5 6.5 0 1 0-1.4 1.4l3.85 3.85a1 1 0 1 0 1.42-1.42l-3.86-3.84Zm-5.24 1.16a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" />
              </svg>
            </button>
          </div>
        </section>

        <section class="mobile-chips">
          <button
            v-for="item in mobileCategories"
            :key="item.id"
            type="button"
            class="mobile-chip"
            :class="{ active: mobileCategory === item.id }"
            @click="mobileCategory = item.id"
          >
            {{ item.label }}
          </button>
        </section>

        <section class="mobile-grid">
          <article
            v-for="product in mobileProducts"
            :key="`mobile-${product.id}-${product.nome}`"
            class="mobile-card"
          >
            <img :src="product.imagem" :alt="product.nome" class="mobile-clickable" @click="openProduct(product.id)" />
            <h3 class="mobile-clickable" @click="openProduct(product.id)">{{ product.nome }}</h3>
            <p class="mobile-price mobile-clickable" @click="openProduct(product.id)">{{ toMoney(product.preco) }}</p>
            <div class="mobile-actions">
              <button
                class="mobile-add"
                :class="{ added: mobileAddedKey === `${product.id}-${product.nome}` }"
                type="button"
                @click="addMobileItem(product)"
                aria-label="Adicionar ao carrinho"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="10" cy="20" r="1.3" stroke="currentColor" stroke-width="1.8" />
                  <circle cx="18" cy="20" r="1.3" stroke="currentColor" stroke-width="1.8" />
                  <path d="M3 4h2l2.1 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L20 8H7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <button class="mobile-buy" type="button" @click="cart.addItem(product)">Comprar</button>
            </div>
          </article>
        </section>
      </template>

      <template v-else>
        <section class="mobile-cart">
          <h2>Carrinho de Compras</h2>

          <article v-for="item in cart.items" :key="`mobile-cart-${item.id}`" class="mobile-cart-item">
            <img :src="item.imagem" :alt="item.nome" />
            <div class="mobile-cart-meta">
              <h3>{{ item.nome }}</h3>
              <p>{{ toMoney(item.preco) }}</p>
              <div class="mobile-cart-actions">
                <div class="mobile-qty">
                  <button type="button" @click="cart.decreaseQty(item.id)">-</button>
                  <span>{{ item.quantidade }}</span>
                  <button type="button" @click="cart.increaseQty(item.id)">+</button>
                </div>
                <button class="mobile-buy" type="button" @click="cart.addItem(item)">Comprar</button>
              </div>
            </div>
          </article>

          <div class="mobile-total">
            <div>
              <span>Total:</span>
              <strong>{{ toMoney(cart.totalPrice) }}</strong>
            </div>
            <button type="button" @click="checkout">Finalizar Compra</button>
          </div>
        </section>
      </template>

      <footer class="mobile-bottom-nav">
        <button type="button" class="mobile-tab" :class="{ active: mobileTab === 'home' }" @click="mobileTab = 'home'">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 4.5 3.5 11h1.7v8.5h5.6v-5.4h2.4v5.4h5.6V11h1.7L12 4.5Z" />
          </svg>
          <span>Inicio</span>
        </button>

        <button type="button" class="mobile-tab" :class="{ active: mobileTab === 'drinks' }" @click="mobileTab = 'drinks'">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 4h12l-5 7.5V19l-2 1v-8.5L6 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
          </svg>
          <span>Drinks</span>
        </button>

        <button type="button" class="mobile-tab" :class="{ active: mobileTab === 'offers' }" @click="mobileTab = 'offers'">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 7h10M7 17h10M12 7v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <span>Ofertas</span>
        </button>

        <button type="button" class="mobile-tab" :class="{ active: mobileTab === 'cart' }" @click="mobileTab = 'cart'">
          <div class="mobile-tab-cart">
            <svg class="mobile-cart-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10" cy="20" r="1.4" stroke="currentColor" stroke-width="1.9"/>
              <circle cx="18" cy="20" r="1.4" stroke="currentColor" stroke-width="1.9"/>
              <path d="M3 4h2l2.1 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L20 8H7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span v-if="cart.totalItems > 0" class="mobile-tab-badge">{{ cart.totalItems }}</span>
          </div>
          <span>Carrinho</span>
        </button>
      </footer>
    </section>

    <section class="desktop-app">
      <section name="buscar">
        <div class="fundo">
          <div class="busca-bebidas">
            <input
              type="text"
              placeholder="Buscar Bebidas..."
              class="busca-input"
              v-model.trim="desktopSearch"
            />

            <button class="busca-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section name="selecionar">
        <div class="container">
          <nav class="filtro">
            <ul id="ul-filtro">
              <li :class="{ active: desktopCategory === 'all' }">
                <button type="button" class="link link-btn" @click="desktopCategory = 'all'">Todos</button>
              </li>
              <li :class="{ active: desktopCategory === 'classics' }">
                <button type="button" class="link link-btn" @click="desktopCategory = 'classics'">Classicos</button>
              </li>
              <li :class="{ active: desktopCategory === 'tropical' }">
                <button type="button" class="link link-btn" @click="desktopCategory = 'tropical'">Tropicais</button>
              </li>
              <li :class="{ active: desktopCategory === 'gin' }">
                <button type="button" class="link link-btn" @click="desktopCategory = 'gin'">Gin Tonicas</button>
              </li>
              <li :class="{ active: desktopCategory === 'no_alcohol' }">
                <button type="button" class="link link-btn" @click="desktopCategory = 'no_alcohol'">Sem Alcool</button>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section name="produtos">
        <div class="container">
          <div class="cards"></div>
        </div>
      </section>

      <DrinksView :search-query="desktopSearch" :category="desktopCategory" />
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import DrinksView from '@/views/DrinksView.vue'
import { produtos } from '@/assets/produtos'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const router = useRouter()

const desktopSearch = ref('')
const desktopCategory = ref('all')

const mobileTab = ref('home')
const mobileSearch = ref('')
const mobileCategory = ref('all')
const mobileAddedKey = ref('')
let mobileAddedTimeout

const mobileCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'classics', label: 'Classicos' },
  { id: 'tropical', label: 'Tropicais' },
  { id: 'gin', label: 'Gin Tonicas' },
  { id: 'no_alcohol', label: 'Sem Alcool' }
]

const mobileProducts = computed(() => {
  const byText = produtos.filter((item) =>
    item.nome.toLowerCase().includes(mobileSearch.value.toLowerCase())
  )

  if (mobileCategory.value === 'gin') {
    return byText.filter((item) => item.categoria.toLowerCase().includes('gin'))
  }

  if (mobileCategory.value === 'tropical') {
    return byText.filter((item) => item.nome.toLowerCase().includes('tropical'))
  }

  if (mobileCategory.value === 'classics') {
    return byText.filter((item) => !item.nome.toLowerCase().includes('tropical'))
  }

  if (mobileCategory.value === 'no_alcohol') {
    return byText.filter((item) => item.categoria.toLowerCase().includes('sem'))
  }

  return byText
})

const toMoney = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value || 0))
}

const checkout = () => {
  alert(`Pedido finalizado. Total: ${toMoney(cart.totalPrice)}`)
  cart.clearCart()
  mobileTab.value = 'home'
}

const addMobileItem = (product) => {
  cart.addItem(product)
  mobileAddedKey.value = `${product.id}-${product.nome}`
  clearTimeout(mobileAddedTimeout)
  mobileAddedTimeout = setTimeout(() => {
    mobileAddedKey.value = ''
  }, 650)
}

const openProduct = (id) => {
  router.push(`/produto/${id}`)
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}

.desktop-app {
  display: block;
}

.mobile-app {
  display: none;
}

.container {
  padding: 0;
}

.fundo {
  display: flex;
  align-items: center;
  height: 80px;
  background-color: var(--dr-fundo-busca);
  justify-content: center;
}

.busca-bebidas {
  position: relative;
  width: 100%;
  max-width: 1400px;
}

.busca-input {
  width: 100%;
  padding: 15px 65px 15px 40px;
  border-radius: 17px;
  border: 1px solid var(--color-border);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23264e2f' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 15px center;
}

.busca-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  height: 36px;
  width: 70px;
  border: none;
  border-radius: 12px;
  background: var(--cor-secundaria-laranja);
  color: #fff;
  cursor: pointer;
}

.busca-btn:hover {
  opacity: 0.9;
}

#ul-filtro {
  display: flex;
  gap: 50px;
  list-style: none;
  padding: 0;
  margin-top: 20px;
  justify-content: space-between;
}

#ul-filtro li {
  background-color: var(--color-chip);
  border-radius: 15px;
  min-width: 170px;
  text-align: center;
  transition: background-color 0.3s ease;
}

#ul-filtro li.active {
  background-color: var(--color-chip-active);
}

#ul-filtro li.active .link {
  color: var(--cor-primaria-roxo-vibrante);
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  text-decoration: none;
  color: var(--cor-primaria-roxo);
  font-size: 21px;
  font-weight: 580;
}

.link-btn {
  border: none;
  background: transparent;
  width: 100%;
  cursor: pointer;
}

#ul-filtro li:hover {
  background-color: var(--color-chip-active);
}

#ul-filtro li:hover .link {
  color: var(--cor-primaria-roxo-vibrante);
}

@media (max-width: 1440px) {
  #ul-filtro {
    gap: 18px;
  }

  #ul-filtro li {
    min-width: 145px;
  }

  .link {
    font-size: 19px;
    padding: 10px 14px;
  }
}

@media (max-width: 1200px) {
  .fundo {
    height: 74px;
  }

  .busca-input {
    padding: 13px 62px 13px 38px;
  }

  #ul-filtro {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 6px;
    scrollbar-width: none;
  }

  #ul-filtro::-webkit-scrollbar {
    display: none;
  }

  #ul-filtro li {
    flex: 0 0 auto;
    min-width: 132px;
  }

  .link {
    font-size: 16px;
    padding: 9px 12px;
  }
}

@media (min-width: 901px) and (max-width: 1024px) {
  .container {
    padding: 0 10px;
  }

  .busca-btn {
    width: 62px;
  }
}

@media (max-width: 900px) {
  .desktop-app {
    display: none;
  }

  .mobile-app {
    max-width: 430px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 14px 14px 96px;
    background: var(--cor-fundo-site);
    display: block;
  }

  .mobile-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 10px;
  }

  .mobile-logo {
    width: 200px;
    height: auto;
  }

  .mobile-icon-btn {
    width: 34px;
    height: 34px;
    border: none;
    background: transparent;
    color: var(--cor-primaria-roxo);
    position: relative;
    display: grid;
    place-items: center;
  }

  .mobile-icon-btn svg {
    width: 24px;
    height: 24px;
  }

  .mobile-icon-btn.is-cart {
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: 10px;
  }

  .mobile-badge {
    position: absolute;
    top: -4px;
    right: -6px;
    min-width: 18px;
    height: 18px;
    border-radius: 999px;
    background: var(--cor-dourado);
    color: #2e301f;
    font-size: 11px;
    display: grid;
    place-items: center;
  }

  .mobile-search-wrap {
    margin-top: 10px;
    background: var(--dr-fundo-busca);
    padding: 12px 10px;
  }

  .mobile-search {
    position: relative;
  }

  .mobile-search input {
    width: 100%;
    height: 44px;
    border-radius: 14px;
    border: 1px solid var(--color-border);
    padding: 0 74px 0 38px;
    font-size: 15px;
    outline: none;
  }

  .mobile-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: var(--cor-primaria-roxo);
  }

  .mobile-search-btn {
    position: absolute;
    right: 5px;
    top: 5px;
    height: 34px;
    width: 62px;
    border: none;
    border-radius: 11px;
    background: var(--cor-secundaria-laranja);
    color: #fff;
    display: grid;
    place-items: center;
  }

  .mobile-search-btn svg {
    width: 18px;
    height: 18px;
  }

  .mobile-chips {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 12px 0 8px;
    scrollbar-width: none;
  }

  .mobile-chips::-webkit-scrollbar {
    display: none;
  }

  .mobile-chip {
    border: none;
    border-radius: 12px;
    background: var(--color-chip);
    color: var(--cor-primaria-roxo);
    height: 40px;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
  }

  .mobile-chip.active {
    background: var(--color-chip-active);
  }

  .mobile-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .mobile-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 8px;
  }

  .mobile-card img {
    width: 100%;
    height: 118px;
    object-fit: cover;
    border-radius: 12px;
  }

  .mobile-clickable {
    cursor: pointer;
  }

  .mobile-card h3 {
    margin-top: 10px;
    min-height: 56px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 21px;
    line-height: 1.2;
    color: #1d2a21;
  }

  .mobile-price {
    margin: 6px 0;
    font-family: Georgia, 'Times New Roman', serif;
    color: #bf4f1e;
    font-weight: 800;
    font-size: 34px;
    font-size: clamp(20px, 5.3vw, 34px);
  }

  .mobile-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .mobile-add {
    width: 42px;
    height: 34px;
    border: 1px solid #bfd4b8;
    border-radius: 10px;
    background: #f5fbf2;
    color: #2f6a3b;
    display: grid;
    place-items: center;
    position: relative;
  }

  .mobile-add svg {
    width: 22px;
    height: 22px;
  }

  .mobile-add.added {
    animation: cart-pop 0.45s ease;
    border-color: var(--cor-primaria-roxo);
  }

  .mobile-add.added::after {
    content: '+1';
    position: absolute;
    top: -11px;
    right: -8px;
    font-size: 10px;
    font-weight: 800;
    color: #fff;
    background: var(--cor-primaria-roxo);
    border-radius: 999px;
    line-height: 1;
    padding: 4px 5px;
  }

  @keyframes cart-pop {
    0% {
      transform: scale(1);
    }
    35% {
      transform: scale(1.16);
    }
    100% {
      transform: scale(1);
    }
  }

  .mobile-buy {
    min-width: 96px;
    height: 34px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #2f6a3b, #24512e);
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    box-shadow: 0 6px 14px rgba(33, 87, 49, 0.26);
  }

  .mobile-cart h2 {
    margin-top: 14px;
    margin-bottom: 12px;
    color: #2c4029;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 37px;
    font-size: clamp(24px, 6.2vw, 37px);
  }

  .mobile-cart-item {
    display: flex;
    gap: 10px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 14px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .mobile-cart-item img {
    width: 104px;
    height: 96px;
    border-radius: 12px;
    object-fit: cover;
  }

  .mobile-cart-meta {
    flex: 1;
  }

  .mobile-cart-meta h3 {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 21px;
    line-height: 1.2;
    color: var(--color-title);
  }

  .mobile-cart-meta p {
    color: #bf4f1e;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 34px;
    font-size: clamp(20px, 5.3vw, 34px);
    margin: 4px 0;
  }

  .mobile-cart-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .mobile-qty {
    display: inline-flex;
    align-items: center;
    height: 34px;
    border: 1px solid var(--color-border);
    border-radius: 9px;
    overflow: hidden;
    color: var(--cor-primaria-roxo);
    background: var(--color-surface-alt);
  }

  .mobile-qty button {
    width: 32px;
    height: 100%;
    border: none;
    background: transparent;
    color: inherit;
    font-size: 22px;
  }

  .mobile-qty span {
    width: 30px;
    text-align: center;
    font-size: 19px;
    font-weight: 700;
  }

  .mobile-total {
    margin-top: 14px;
    border-top: 1px solid var(--color-border);
    padding-top: 12px;
  }

  .mobile-total div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #49603d;
    font-size: 24px;
    font-size: clamp(18px, 5.2vw, 24px);
    margin-bottom: 14px;
  }

  .mobile-total button {
    width: 100%;
    height: 54px;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #2f6a3b, #24512e);
    color: #fff;
    font-size: 23px;
    font-weight: 700;
  }

  .mobile-bottom-nav {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: min(430px, 100vw);
    height: 74px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--color-border);
    background: var(--color-surface-alt);
    z-index: 50;
  }

  .mobile-tab {
    border: none;
    background: transparent;
    color: var(--cor-primaria-roxo);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 13px;
  }

  .mobile-tab svg {
    width: 24px;
    height: 24px;
  }

  .mobile-cart-nav-icon {
    width: 24px;
    height: 24px;
  }

  .mobile-tab.active {
    font-weight: 700;
  }

  .mobile-tab-cart {
    position: relative;
  }

  .mobile-tab-badge {
    position: absolute;
    top: -7px;
    right: -11px;
    background: var(--cor-dourado);
    color: #2e301f;
    width: 19px;
    height: 19px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    font-size: 11px;
  }
}
</style>
