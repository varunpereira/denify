import { writable } from 'svelte/store'
import { PUBLIC_apiSecret } from '$env/static/public'
import bcryptjs from 'bcryptjs'

export var auth = writable({})

var apiSecretHashed = bcryptjs.hashSync(PUBLIC_apiSecret, 12)
export var apiSecret = writable(apiSecretHashed)
