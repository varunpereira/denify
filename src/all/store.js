import { writable } from 'svelte/store'

export var auth = writable({})

export var signedOutCart = writable({ price: 0, quantity: 0, products: [] })
