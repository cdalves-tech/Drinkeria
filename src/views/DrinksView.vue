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

        <button>Comprar</button>
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

button {
  background: var(--cor-secundaria-laranja);
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
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
