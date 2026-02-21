import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'drinkeria-cart-v1'

export const useCartStore = defineStore('cart', () => {
  const isOpen = ref(false)
  const items = ref([])

  const loadFromStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) items.value = parsed
    } catch {
      items.value = []
    }
  }

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  const findItem = (id) => items.value.find((item) => item.id === id)

  const addItem = (produto) => {
    const existing = findItem(produto.id)
    const preco = Number(produto.preco || 0)

    if (existing) {
      existing.quantidade += 1
      return
    }

    items.value.push({
      id: produto.id,
      nome: produto.nome,
      imagem: produto.imagem,
      preco,
      quantidade: 1
    })
  }

  const removeItem = (id) => {
    items.value = items.value.filter((item) => item.id !== id)
  }

  const increaseQty = (id) => {
    const item = findItem(id)
    if (!item) return
    item.quantidade += 1
  }

  const decreaseQty = (id) => {
    const item = findItem(id)
    if (!item) return
    if (item.quantidade <= 1) {
      removeItem(id)
      return
    }
    item.quantidade -= 1
  }

  const clearCart = () => {
    items.value = []
  }

  const toggleCart = () => {
    isOpen.value = !isOpen.value
  }

  const openCart = () => {
    isOpen.value = true
  }

  const closeCart = () => {
    isOpen.value = false
  }

  const totalItems = computed(() => {
    return items.value.reduce((acc, item) => acc + item.quantidade, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
  })

  watch(items, saveToStorage, { deep: true })

  loadFromStorage()

  return {
    isOpen,
    items,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    totalItems,
    totalPrice
  }
})
