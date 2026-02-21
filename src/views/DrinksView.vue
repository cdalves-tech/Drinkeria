<template>
  <div class="container">
    <div class="produtos">
      <div
        class="card"
        v-for="produto in produtosPaginados"
        :key="`${produto.id}-${produto.nome}`"
      >
        <div class="badge" v-if="produto.desconto > 0">
          -{{ produto.desconto }}%
        </div>

        <div class="card-image card-clickable" @click="openProduct(produto.id)">
          <img :src="produto.imagem" :alt="produto.nome" />
        </div>
        <span class="categoria">{{ produto.categoria }}</span>

        <h3 class="card-clickable" @click="openProduct(produto.id)">{{ produto.nome }}</h3>
        <div class="preco-wrap card-clickable" @click="openProduct(produto.id)">
          <p class="preco">{{ toMoney(precoFinal(produto)) }}</p>
          <p v-if="produto.desconto > 0" class="preco-antigo">{{ toMoney(produto.preco) }}</p>
        </div>
        <div class="carr-comp">
          <button
            class="btn-carrinho"
            :class="{ added: addedCardKey === `${produto.id}-${produto.nome}` }"
            aria-label="Adicionar ao carrinho"
            @click="adicionarAoCarrinho(produto)"
          >
            <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10" cy="20" r="1.3" stroke="currentColor" stroke-width="1.8" />
              <circle cx="18" cy="20" r="1.3" stroke="currentColor" stroke-width="1.8" />
              <path d="M3 4h2l2.1 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L20 8H7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button class="btn-comprar" @click="comprarAgora(produto)">Comprar</button>
        </div>
      </div>
    </div>

    <p v-if="!produtosFiltrados.length" class="sem-resultados">
      Nenhum produto encontrado com esse filtro.
    </p>

    <div class="paginacao" v-if="totalPaginas > 1">
      <button
        v-for="pagina in totalPaginas"
        :key="pagina"
        @click="paginaAtual = pagina"
        :class="{ ativa: paginaAtual === pagina }"
      >
        {{ pagina }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { produtos } from '@/assets/produtos'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'all'
  }
})

const paginaAtual = ref(1)
const itensPorPagina = 10
const cart = useCartStore()
const router = useRouter()
const addedCardKey = ref('')
let addedTimeout

const produtosFiltrados = computed(() => {
  const text = props.searchQuery.toLowerCase()

  const byText = produtos.filter((item) => item.nome.toLowerCase().includes(text))

  if (props.category === 'gin') {
    return byText.filter((item) => item.categoria.toLowerCase().includes('gin'))
  }

  if (props.category === 'tropical') {
    return byText.filter((item) => item.nome.toLowerCase().includes('tropical'))
  }

  if (props.category === 'classics') {
    return byText.filter((item) => !item.nome.toLowerCase().includes('tropical'))
  }

  if (props.category === 'no_alcohol') {
    return byText.filter((item) => item.categoria.toLowerCase().includes('sem'))
  }

  return byText
})

const produtosPaginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina
  const fim = inicio + itensPorPagina
  return produtosFiltrados.value.slice(inicio, fim)
})

const totalPaginas = computed(() => {
  return Math.ceil(produtosFiltrados.value.length / itensPorPagina)
})

watch([() => props.searchQuery, () => props.category], () => {
  paginaAtual.value = 1
})

const precoFinal = (produto) => {
  if (!produto.desconto) return produto.preco
  return produto.preco * (1 - produto.desconto / 100)
}

const adicionarAoCarrinho = (produto) => {
  cart.addItem(produto)
  addedCardKey.value = `${produto.id}-${produto.nome}`
  clearTimeout(addedTimeout)
  addedTimeout = setTimeout(() => {
    addedCardKey.value = ''
  }, 650)
}

const comprarAgora = (produto) => {
  cart.addItem(produto)
  cart.openCart()
}

const toMoney = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value || 0))
}

const openProduct = (id) => {
  router.push(`/produto/${id}`)
}
</script>

<style scoped>
.container {
  padding: 0;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 22px;
  margin-top: 24px;
}

/* Responsivo */
@media (max-width: 1500px) {
  .produtos {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1200px) {
  .produtos {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .produtos {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .card img {
    height: 165px;
  }

  .card h3 {
    min-height: 48px;
  }
}

@media (max-width: 900px) {
  .produtos {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .produtos {
    grid-template-columns: 1fr;
  }
}

.card {
  background: var(--color-surface);
  border-radius: 20px;
  padding: 12px;
  position: relative;
  box-shadow: 0 8px 22px rgba(36, 60, 34, 0.12);
  border: 1px solid var(--color-border);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 28px rgba(36, 60, 34, 0.18);
}

.card-image {
  border-radius: 14px;
  overflow: hidden;
}

.card-clickable {
  cursor: pointer;
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.card:hover img {
  transform: scale(1.05);
}

.categoria {
  display: inline-flex;
  align-items: center;
  margin-top: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e9f4e6;
  color: #2f6a3b;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.card h3 {
  margin: 10px 0 4px;
  font-size: clamp(20px, 1.35vw, 29px);
  line-height: 1.18;
  min-height: 56px;
  color: #1d2a21;
}

.badge {
  position: absolute;
  top: 18px;
  left: 18px;
  background: var(--cor-dourado);
  color: #2b3b25;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  z-index: 2;
}

.preco-wrap {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 8px 0 12px;
}

.preco {
  font-size: clamp(20px, 1.2vw, 27px);
  font-weight: 800;
  color: #bf4f1e;
  margin: 0;
}

.preco-antigo {
  margin: 0;
  color: #8f8a7b;
  text-decoration: line-through;
  font-size: 14px;
}

.btn-comprar {
  background: linear-gradient(135deg, #2f6a3b, #24512e);
  border: none;
  min-height: 42px;
  padding: 0 20px;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 6px 14px rgba(33, 87, 49, 0.26);
  transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-comprar:hover {
  filter: brightness(1.04);
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(33, 87, 49, 0.34);
}

.btn-carrinho {
  height: 42px;
  width: 54px;
  border: 1px solid #bfd4b8;
  border-radius: 12px;
  background: #f5fbf2;
  color: #2f6a3b;
  cursor: pointer;
  display: grid;
  place-items: center;
  position: relative;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn-carrinho:hover {
  background: #e9f6e2;
  transform: translateY(-1px);
}

.btn-carrinho.added {
  animation: cart-pop 0.45s ease;
  border-color: var(--cor-primaria-roxo);
}

.btn-carrinho.added::after {
  content: '+1';
  position: absolute;
  top: -12px;
  right: -8px;
  font-size: 11px;
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

.carr-comp {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.paginacao {
  margin-top: 34px;
  margin-bottom: 6px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.paginacao button {
  border: none;
  height: 34px;
  min-width: 34px;
  padding: 0 12px;
  border-radius: 8px;
  background: var(--color-chip);
  cursor: pointer;
  font-weight: 600;
}

.paginacao button.ativa {
  background: var(--cor-primaria-roxo);
  color: white;
}

.sem-resultados {
  margin-top: 26px;
  text-align: center;
  color: var(--color-muted);
  font-weight: 600;
}

@media (max-width: 1200px) {
  .card h3 {
    font-size: clamp(18px, 1.8vw, 24px);
  }

  .preco {
    font-size: clamp(18px, 1.7vw, 24px);
  }
}
</style>
