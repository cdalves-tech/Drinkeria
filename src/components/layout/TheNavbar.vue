<template>
  <header class="navbar-wrap">
    <div class="container">
      <img src="/images/logo-drinkeria.svg" alt="Logo Drinkeria" class="brand-logo">
      <nav class="navegar">
        <ul>
          <router-link to="/" class="link" active-class="active">Início</router-link>
          <router-link to="/drinks" class="link" active-class="active">Cardápio</router-link>
          <router-link to="/ofertas" class="link link-highlight" active-class="active">
            Promoções
            <span class="offer-pill">HOT</span>
          </router-link>
          <router-link to="/kits" class="link" active-class="active">Combos</router-link>

          <div v-if="cart.totalItems > 0" class="cart-summary" @click="cart.openCart">
            <small>{{ cart.totalItems }} item(ns)</small>
            <strong>{{ toMoney(cart.totalPrice) }}</strong>
          </div>

          <button
            v-if="cart.totalItems > 0"
            type="button"
            class="checkout-shortcut"
            @click="cart.openCart"
          >
            Finalizar
          </button>

          <button class="cart-trigger" @click="cart.toggleCart" aria-label="Abrir carrinho">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10" cy="20" r="1.5" stroke="currentColor" stroke-width="1.9" />
              <circle cx="18" cy="20" r="1.5" stroke="currentColor" stroke-width="1.9" />
              <path d="M3 4h2l2.1 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L20 8H7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span v-if="cart.totalItems > 0" class="cart-count">{{ cart.totalItems }}</span>
          </button>
        </ul>
      </nav>
    </div>
    <CartDrawer />
  </header>
</template>

<script setup>
import CartDrawer from '@/components/cart/CartDrawer.vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

const toMoney = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value || 0))
}
</script>

<style scoped>
.navbar-wrap {
  position: relative;
  z-index: 10;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 15px;
  padding: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding-left: 10px;
  padding-right: 10px;
}

.brand-logo {
  width: 240px;
  height: auto;
  display: block;
}

.navegar ul {
  display: flex;
  align-items: center;
  gap: 50px;
  list-style: none;
}

.link {
  list-style: none;
  text-decoration: none;
  font-size: 21px;
  font-weight: 540;
  color: var(--cor-primaria-roxo);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.link.active {
  border-bottom: 2px solid var(--cor-primaria-roxo);
}

.link-highlight {
  color: var(--cor-secundaria-laranja);
}

.offer-pill {
  font-size: 10px;
  font-weight: 700;
  color: #2e301f;
  background: var(--cor-dourado);
  border-radius: 999px;
  padding: 2px 7px;
}

.cart-summary {
  display: grid;
  gap: 2px;
  justify-items: end;
  color: #4d5b43;
  cursor: pointer;
}

.cart-summary small {
  font-size: 11px;
  opacity: 0.9;
}

.cart-summary strong {
  font-size: 14px;
  color: var(--cor-primaria-roxo);
}

.checkout-shortcut {
  border: none;
  background: var(--cor-primaria-roxo);
  color: #fff;
  height: 34px;
  padding: 0 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}

.cart-trigger {
  position: relative;
  border: none;
  background: transparent;
  color: var(--cor-primaria-roxo);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.cart-count {
  position: absolute;
  top: -16px;
  left: 57%;
  transform: translateX(-50%);
  background: var(--cor-dourado);
  color: #2e301f;
  min-width: 20px;
  height: 20px;
  border-radius: 999px;
  font-size: 12px;
  display: grid;
  place-items: center;
  padding: 0 4px;
  font-weight: 700;
}

@media (max-width: 1440px) {
  .navegar ul {
    gap: 34px;
  }

  .link {
    font-size: 19px;
  }
}

@media (max-width: 1200px) {
  .container {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 8px;
    border-radius: 12px;
  }

  .navegar ul {
    gap: 18px;
  }

  .link {
    font-size: 16px;
  }

  .checkout-shortcut {
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
  }

  .cart-summary strong {
    font-size: 12px;
  }

  .cart-trigger svg {
    width: 24px;
    height: 24px;
  }

  .brand-logo {
    width: 198px;
  }
}

@media (max-width: 900px) {
  .navbar-wrap {
    display: none;
  }
}
</style>
