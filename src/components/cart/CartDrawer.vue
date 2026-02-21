<template>
  <Teleport to="body">
    <Transition name="cart-fade">
      <div v-if="cart.isOpen" class="cart-overlay" @click="cart.closeCart"></div>
    </Transition>

    <Transition name="cart-slide">
      <aside v-if="cart.isOpen" class="cart-drawer" role="dialog" aria-modal="true" aria-label="Carrinho">
        <header class="cart-head">
          <h3>Seu carrinho</h3>
          <button class="icon-btn" @click="cart.closeCart" aria-label="Fechar carrinho">x</button>
        </header>

        <section v-if="!cart.items.length" class="cart-empty">
          <p>Seu carrinho esta vazio.</p>
          <button class="ghost-btn" @click="cart.closeCart">Continuar comprando</button>
        </section>

        <section v-else class="cart-body">
          <article class="cart-item" v-for="item in cart.items" :key="`drawer-${item.id}`">
            <img :src="item.imagem" :alt="item.nome">
            <div class="meta">
              <strong>{{ item.nome }}</strong>
              <span>{{ toMoney(item.preco) }}</span>
              <div class="qty">
                <button @click="cart.decreaseQty(item.id)" aria-label="Diminuir quantidade">-</button>
                <span>{{ item.quantidade }}</span>
                <button @click="cart.increaseQty(item.id)" aria-label="Aumentar quantidade">+</button>
              </div>
            </div>
            <button class="remove-btn" @click="cart.removeItem(item.id)">Remover</button>
          </article>
        </section>

        <footer v-if="cart.items.length" class="cart-foot">
          <div class="summary-line">
            <span>Itens</span>
            <strong>{{ cart.totalItems }}</strong>
          </div>
          <div class="summary-line total">
            <span>Total</span>
            <strong>{{ toMoney(cart.totalPrice) }}</strong>
          </div>
          <button class="checkout-btn" @click="checkout">Finalizar compra</button>
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

const toMoney = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value || 0))
}

const checkout = () => {
  alert(`Pedido finalizado. Total: ${toMoney(cart.totalPrice)}`)
  cart.clearCart()
  cart.closeCart()
}
</script>

<style>
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 10, 28, 0.45);
  z-index: 3000;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 100vw;
  height: 100dvh;
  background: var(--color-surface);
  z-index: 3010;
  border-left: 1px solid var(--color-border);
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.cart-head {
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-head h3 {
  color: var(--cor-primaria-roxo);
  font-size: 22px;
}

.icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  color: var(--cor-primaria-roxo);
  cursor: pointer;
}

.cart-empty {
  padding: 20px 16px;
  color: var(--color-muted);
}

.ghost-btn {
  margin-top: 12px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  color: var(--cor-primaria-roxo);
  background: var(--color-surface);
  cursor: pointer;
}

.cart-body {
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 18px;
}

.cart-item {
  display: grid;
  grid-template-columns: 72px 1fr auto;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 8px;
}

.cart-item img {
  width: 72px;
  height: 72px;
  border-radius: 10px;
  object-fit: cover;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta strong {
  color: var(--cor-texto-preto);
  line-height: 1.2;
}

.meta span {
  color: var(--color-price);
  font-weight: 700;
}

.qty {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.qty button {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--cor-primaria-roxo);
  cursor: pointer;
}

.remove-btn {
  border: none;
  background: transparent;
  color: var(--color-danger);
  cursor: pointer;
}

.cart-foot {
  border-top: 1px solid var(--color-border);
  padding: 14px;
  display: grid;
  gap: 10px;
  background: var(--color-surface);
  padding-bottom: calc(14px + env(safe-area-inset-bottom));
}

.summary-line {
  display: flex;
  justify-content: space-between;
  color: var(--color-muted);
}

.summary-line.total {
  color: var(--cor-texto-preto);
  font-size: 18px;
}

.checkout-btn {
  min-height: 44px;
  border: none;
  border-radius: 12px;
  background: var(--cor-primaria-roxo);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.cart-fade-enter-active,
.cart-fade-leave-active {
  transition: opacity 0.2s ease;
}

.cart-fade-enter-from,
.cart-fade-leave-to {
  opacity: 0;
}

.cart-slide-enter-active,
.cart-slide-leave-active {
  transition: transform 0.25s ease;
}

.cart-slide-enter-from,
.cart-slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 640px) {
  .cart-drawer {
    width: 100%;
    border-left: none;
  }

  .cart-head {
    padding-top: calc(16px + env(safe-area-inset-top));
  }

  .cart-body {
    padding-bottom: 22px;
  }

  .cart-foot {
    position: sticky;
    bottom: 0;
    z-index: 2;
    box-shadow: 0 -8px 20px rgba(12, 24, 18, 0.08);
  }

  .checkout-btn {
    min-height: 48px;
    font-size: 15px;
  }
}
</style>
