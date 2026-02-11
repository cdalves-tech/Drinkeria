<template>
  <section name="buscar">
    <div class="fundo">
      <div class="busca-bebidas">
        <input
          type="text"
          placeholder="Buscar Bebidas..."
          class="busca-input"
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
          <li>
            <router-link to="/todos" class="link">Todos</router-link>
          </li>
          <li>
            <router-link to="/classicos" class="link">Clássicos</router-link>
          </li>
          <li>
            <router-link to="/tropicais" class="link">Tropicais</router-link>
          </li>
          <li>
            <router-link to="/gin" class="link">Gin Tônicas</router-link>
          </li>
          <li>
            <router-link to="/semalcool" class="link">Sem Álcool</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
  <section name="produtos">
    <div class="container">
      <div class="cards">

      </div>
    </div>
  </section>
  <DrinksView />
</template>


<script setup>
import DrinksView from '@/views/DrinksView.vue';
</script>

<style scoped>
.container {
  padding: 0;
}

/* BUSCA */
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
  border: 1px solid #ddd;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236A1B9A' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0'/%3E%3C/svg%3E");
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
  background: linear-gradient(135deg, #ff8a00, #ff6a00);
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
  background-color: var(--dr-fundo-busca);
  border-radius: 15px;
  min-width: 170px;      /* 👈 resolve o problema */
  text-align: center;
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


#ul-filtro li:hover {
  background-color: var(--cor-primaria-roxo);
}

#ul-filtro li:hover .link {
  color: #fff;
}

</style>