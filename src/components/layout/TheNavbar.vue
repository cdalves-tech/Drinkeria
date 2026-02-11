<template>
    <footer>
        <div class="container">
            <img src="/images/logo-4.png" alt="">
            <nav class="navegar">
                <ul>
                    <router-link to="/" class="link" active-class="active">Início</router-link>
                    <router-link to="/drinks" class="link" active-class="active">Drinks</router-link>
                    <router-link to="/ofertas" class="link" active-class="active">Ofertas</router-link>
                    <router-link to="/kits" class="link" active-class="active">Kits</router-link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" style="color: var(--cor-primaria-roxo); stroke: currentColor; stroke-width: 0.1;" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/></svg>
                </ul>
            </nav>
        </div>
    </footer>

</template>

<script setup>

</script>


<style scoped>
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        margin-top: 15px;
        padding: 0;

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
        color: var(--cor-primaria-roxo)
    }

    .active {
        border-bottom: 2px solid var(--cor-primaria-roxo);
    }

</style>