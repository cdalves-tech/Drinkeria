<template>
  <main class="detail-wrap" v-if="product">
    <section class="detail-shell">
      <div class="top-strip">
        <button class="back-btn" type="button" @click="goBack">Voltar</button>
        <button class="top-cart-btn" type="button" @click="cart.openCart" aria-label="Abrir carrinho">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10" cy="20" r="1.5" stroke="currentColor" stroke-width="1.9" />
            <circle cx="18" cy="20" r="1.5" stroke="currentColor" stroke-width="1.9" />
            <path
              d="M3 4h2l2.1 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L20 8H7"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span v-if="cart.totalItems > 0" class="top-cart-count">{{ cart.totalItems }}</span>
        </button>
      </div>

      <div class="detail-grid">
        <figure class="media-card">
          <img :src="product.imagem" :alt="product.nome" />
        </figure>

        <aside class="purchase-card">
          <div class="meta-line">
            <span class="category">{{ product.categoria }}</span>
            <span class="rating">4.8 (236 avaliacoes)</span>
          </div>

          <h1>{{ product.nome }}</h1>
          <p class="price">{{ toMoney(product.preco) }}</p>
          <p class="installments">ou 3x de {{ toMoney(product.preco / 3) }} sem juros</p>

          <p class="description">
            Bebida preparada com ingredientes selecionados, sabor marcante e apresentacao premium para sua melhor
            experiencia.
          </p>

          <div class="delivery-highlight">
            <strong>Frete gratis</strong>
            <span>Receba hoje entre 30 e 45 minutos.</span>
          </div>

          <div class="qty-row">
            <span>Quantidade</span>
            <div class="qty">
              <button type="button" @click="decreaseQty">-</button>
              <strong>{{ quantity }}</strong>
              <button type="button" @click="increaseQty">+</button>
            </div>
          </div>

          <div class="actions">
            <button class="ghost" type="button" @click="addToCart">Adicionar ao Carrinho</button>
            <button class="primary" type="button" @click="buyNow">Comprar Agora</button>
          </div>
        </aside>
      </div>
    </section>

    <section class="related" v-if="relatedProducts.length">
      <h2>Produtos Relacionados</h2>
      <div class="related-grid">
        <article class="related-card" v-for="item in relatedProducts" :key="`related-${item.id}`">
          <img :src="item.imagem" :alt="item.nome" @click="openProduct(item.id)" />
          <h3 @click="openProduct(item.id)">{{ item.nome }}</h3>
          <p>{{ toMoney(item.preco) }}</p>
          <button type="button" @click="quickAdd(item)">Adicionar</button>
        </article>
      </div>
    </section>
  </main>

  <main v-else class="not-found">
    <p>Produto nao encontrado.</p>
    <button type="button" @click="goHome">Voltar para o catalogo</button>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { produtos } from '@/assets/produtos'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const quantity = ref(1)

const product = computed(() => {
  const id = Number(route.params.id)
  return produtos.find((item) => item.id === id)
})

const relatedProducts = computed(() => {
  if (!product.value) return []

  return produtos
    .filter((item) => item.id !== product.value.id)
    .sort((a, b) => {
      const sameA = a.categoria === product.value.categoria ? 1 : 0
      const sameB = b.categoria === product.value.categoria ? 1 : 0
      return sameB - sameA
    })
    .slice(0, 4)
})

const increaseQty = () => {
  quantity.value += 1
}

const decreaseQty = () => {
  if (quantity.value > 1) quantity.value -= 1
}

const addToCart = () => {
  if (!product.value) return
  for (let i = 0; i < quantity.value; i += 1) {
    cart.addItem(product.value)
  }
}

const buyNow = () => {
  addToCart()
  cart.openCart()
}

const quickAdd = (item) => {
  cart.addItem(item)
}

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}

const openProduct = (id) => {
  router.push(`/produto/${id}`)
}

const toMoney = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value || 0))
}
</script>

<style scoped>
.detail-wrap {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 0 20px;
  box-sizing: border-box;
}

.detail-shell {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
}

.back-btn {
  border: 1px solid var(--color-border);
  background: var(--color-chip);
  color: var(--cor-primaria-roxo);
  font-weight: 700;
  border-radius: 10px;
  padding: 8px 13px;
  cursor: pointer;
  transition: filter 0.2s ease;
}

.back-btn:hover {
  filter: brightness(0.97);
}

.top-strip {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

.top-cart-btn {
  display: none !important;
  margin-left: auto;
  position: relative;
  min-width: 42px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--cor-branco);
  color: var(--cor-primaria-roxo);
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.top-cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 20px;
  height: 20px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: var(--cor-dourado);
  color: #2e301f;
  font-size: 12px;
  font-weight: 700;
  padding: 0 4px;
}

.detail-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.92fr);
  gap: 14px;
  align-items: start;
  width: 100%;
  box-sizing: border-box;
}

.media-card {
  margin: 0;
}

.media-card img {
  width: 100%;
  aspect-ratio: 4 / 2.48;
  max-height: 500px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  object-fit: cover;
  background: var(--cor-branco);
}

.purchase-card {
  background: var(--cor-branco);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 14px;
  width: 100%;
  box-sizing: border-box;
}

.meta-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.purchase-card h1 {
  margin-top: 8px;
  color: var(--color-title);
  font-size: clamp(34px, 2vw, 40px);
  line-height: 1.06;
}

.category {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: var(--cor-primaria-roxo);
  background: #e4f1e8;
  padding: 5px 10px;
  border-radius: 999px;
}

.rating {
  font-size: 12px;
  color: var(--color-muted);
  font-weight: 700;
}

.price {
  margin-top: 4px;
  color: #b33f10;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  font-size: clamp(34px, 2vw, 42px);
  font-weight: 800;
}

.installments {
  margin-top: 2px;
  font-size: 13px;
  color: var(--color-muted);
  font-weight: 600;
}

.description {
  margin-top: 10px;
  color: var(--color-muted);
  line-height: 1.45;
  font-size: 16px;
}

.delivery-highlight {
  margin-top: 10px;
  display: grid;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #c2dcc8;
  background: linear-gradient(180deg, #ecf7ee, #e4f1e8);
}

.delivery-highlight strong {
  color: var(--cor-primaria-roxo-vibrante);
  font-size: 16px;
}

.delivery-highlight span {
  color: #36543d;
  font-size: 15px;
}

.qty-row {
  margin-top: 10px;
  display: grid;
  gap: 6px;
}

.qty-row span {
  color: var(--color-title);
  font-weight: 700;
  font-size: 13px;
}

.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
  background: var(--cor-branco);
  width: fit-content;
  min-width: 150px;
}

.qty button {
  width: 44px;
  height: 38px;
  border: none;
  background: transparent;
  color: var(--cor-primaria-roxo);
  font-size: 24px;
  cursor: pointer;
}

.qty strong {
  width: 60px;
  text-align: center;
  color: var(--color-title);
  font-size: 17px;
}

.actions {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.ghost,
.primary {
  min-height: 44px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  padding: 0 12px;
  cursor: pointer;
  transition: filter 0.2s ease;
  white-space: nowrap;
}

.ghost {
  background: #edf6f0;
  color: var(--cor-primaria-roxo-vibrante);
  border: 1px solid #bfd6c5;
}

.ghost:hover {
  filter: brightness(0.98);
}

.primary {
  border: 1px solid transparent;
  background: linear-gradient(135deg, var(--cor-primaria-roxo), var(--cor-primaria-roxo-vibrante));
  color: #fff;
}

.primary:hover {
  filter: brightness(1.05);
}

.related {
  margin-top: 10px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.related h2 {
  color: var(--color-title);
  font-size: clamp(24px, 1.5vw, 32px);
  margin-bottom: 8px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}

.related-card {
  min-width: 0;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface-alt);
  padding: 8px;
  transition: transform 0.2s ease;
}

.related-card:hover {
  transform: translateY(-1px);
}

.related-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
}

.related-card h3 {
  margin-top: 6px;
  font-size: 15px;
  color: var(--color-title);
  cursor: pointer;
  min-height: 40px;
}

.related-card p {
  color: var(--color-price);
  font-weight: 800;
  margin: 2px 0 6px;
}

.related-card button {
  width: 100%;
  min-height: 34px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: linear-gradient(135deg, var(--cor-primaria-roxo), var(--cor-primaria-roxo-vibrante));
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  font-size: 13px;
}

.not-found {
  max-width: 760px;
  margin: 40px auto;
  text-align: center;
  display: grid;
  gap: 12px;
}

.not-found button {
  justify-self: center;
  border: none;
  background: var(--cor-primaria-roxo);
  color: #fff;
  border-radius: 10px;
  min-height: 42px;
  padding: 0 14px;
}

@media (max-width: 1100px) {
  .top-cart-btn {
    display: inline-flex !important;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .top-strip {
    align-items: center;
    flex-direction: row;
  }

  .purchase-card h1 {
    font-size: clamp(30px, 4.6vw, 36px);
  }

  .price {
    font-size: clamp(32px, 5vw, 38px);
  }

  .media-card img {
    min-height: 0;
    aspect-ratio: 16 / 10;
    max-height: none;
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .detail-wrap {
    padding: 6px 0 12px;
  }

  .detail-shell {
    padding: 8px;
    border-radius: 14px;
  }

  .back-btn {
    padding: 7px 12px;
    font-size: 14px;
  }

  .meta-line {
    flex-wrap: wrap;
    gap: 6px;
  }

  .purchase-card {
    padding: 12px;
  }

  .purchase-card h1 {
    font-size: clamp(28px, 8vw, 33px);
    line-height: 1.1;
    margin-top: 7px;
  }

  .price {
    font-size: clamp(31px, 9vw, 36px);
  }

  .installments {
    font-size: 12px;
  }

  .description {
    font-size: 15px;
    line-height: 1.4;
  }

  .qty {
    min-width: 150px;
  }

  .actions {
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  .ghost,
  .primary {
    min-height: 40px;
    font-size: 13px;
    padding: 0 8px;
  }

  .related {
    margin-top: 10px;
    padding: 10px;
  }

  .related h2 {
    font-size: 34px;
    font-size: clamp(20px, 7vw, 30px);
    margin-bottom: 8px;
  }

  .related-grid {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 4px;
    scroll-snap-type: x mandatory;
  }

  .related-card {
    min-width: 240px;
    scroll-snap-align: start;
  }

  .related-card h3 {
    min-height: 0;
  }
}
</style>
