<template>
  <div class="container">
    
    <div class="produtos">
      <div 
        class="card" 
        v-for="produto in produtosPaginados" 
        :key="produto.id"
      >
        <div class="badge" v-if="produto.desconto">
          -{{ produto.desconto }}%
        </div>

        <img :src="produto.imagem" :alt="produto.nome" />

        <h3>{{ produto.nome }}</h3>
        <p class="preco">R$ {{ produto.preco.toFixed(2) }}</p>
        <div class="carr-comp">
          <button id="btn-carrinho"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="26" style="color: var(--cor-primaria-roxo); stroke: currentColor; stroke-width: 0.1;" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/></svg></button>
          <button id="btn-comprar">Comprar</button>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <div class="paginacao">
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
import { ref, computed } from 'vue'
import { produtos } from '@/assets/produtos'

const paginaAtual = ref(1)
const itensPorPagina = 10

const produtosPaginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina
  const fim = inicio + itensPorPagina
  return produtos.slice(inicio, fim)
})

const totalPaginas = computed(() => {
  return Math.ceil(produtos.length / itensPorPagina)
})
</script>

<style>
.container {
  padding: 0;
}

/* GRID 4 POR LINHA */
.produtos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 20px;
}

/* Responsivo */
@media (max-width: 1200px) {
  .produtos {
    grid-template-columns: repeat(3, 1fr);
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

/* CARD */
.card {
  background: #fff;
  border-radius: 16px;
  padding: 10px;
  position: relative;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  border-radius: 12px;
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--cor-secundaria-laranja);
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
}

.preco {
  font-weight: bold;
  color: #7b2cbf;
  margin: 8px 0;
}

#btn-comprar {
  background: var(--cor-secundaria-laranja);
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
}

#btn-carrinho {
  background: transparent;
  border: 1px solid var(--cor-primaria-roxo);
  border-radius: 20px;
  cursor: pointer;
}

.carr-comp {
  display: flex;
  align-items: center;
  gap: 10px;
}


/* PAGINAÇÃO */
.paginacao {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.paginacao button {
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  background: #eee;
  cursor: pointer;
}

.paginacao button.ativa {
  background: #7b2cbf;
  color: white;
}
</style>
