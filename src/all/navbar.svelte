<script>
	import {
		ShoppingBagIcon,
		ShoppingCartIcon,
		MenuIcon,
		UserIcon,
		ChevronDownIcon,
	} from 'svelte-feather-icons'
	import { auth, signedOutCart } from '@src/all/store.js'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'
	import SearchBar from '@src/all/searchbar.svelte'

	var dropdownSelected = false
	var menuStatus = false
	var width = null
	var accountList = []

	$: if ($auth.user) {
		accountList = [
			{ href: '/account/profile?email=' + $auth.user.email, title: 'Profile' },
			{ href: '/account/chats', title: 'Contacts' },
			{ href: '/account/info', title: 'Info' },
			{ href: '/account/payments', title: 'Payments' },
			{ href: '/account/sales', title: 'Sales' },
			{ href: '/account/reviews', title: 'Reviews' },
		]
	}

	function signOut() {
		cookie.remove('auth')
		$auth = {}
		goto('/')
	}
</script>

<svelte:window bind:innerWidth={width} />

<div class="px-4 md:px-10 min-w-[400px] relative bg-white min-w-min py-2 text-xs md:flex md:items-center md:justify-between">
	<div class="md:mr-5 mb-1 px-0 flex items-center justify-between ">
		<p class="text-xl">
			<button
				on:click={() => {
					goto('/')
				}}
				class="flex font-bold no-underline hover:text-gray-700 pt-1"
			>
				<ShoppingBagIcon class="w-6 h-6 mr-1 pt-1" />
				<p class="justify-end pb-1">Denify</p>
			</button>
		</p>
		<button
			on:click|preventDefault={() => {
				menuStatus = !menuStatus
			}}
			class=""
		>
			<MenuIcon class="mb-1 h-7 w-7 hover:text-gray-700 md:hidden" />
		</button>
	</div>

	{#if menuStatus == true || width >= 768}
		<div
			class="absolute bg-white w-full md:static list-reset md:flex md:items-center md:justify-end"
		>
			<SearchBar />

			{#if $auth.user}
				<div class="nav-item mr-5">
					<button
						on:click={() => {
							goto('/product/sell')
						}}
						class="block py-2 no-underline hover:text-gray-700 "
					>
						Sell
					</button>
				</div>
				<div class="nav-item mr-3">
					<button
						on:click={() => {
							goto('/cart')
						}}
						class="block flex py-2 no-underline hover:text-gray-700 md:border-none md:p-0"
					>
						<ShoppingCartIcon class="h-5 w-5" />
						<sup class="justify-end font-bold">
							{$auth.cartQuantity}
						</sup>
					</button>
				</div>
				<div class="nav-item flow-root md:pb-3">
					<div class="rounded-sm hover:text-gray-700 md:mx-2 relative">
						<button
							on:click|preventDefault={() => {
								dropdownSelected = !dropdownSelected
							}}
							class="h-8 rounded-full pt-2 md:pt-0 md:flex md:flex-wrap md:justify-center"
						>
							<UserIcon class="h-5 w-5 border border-1 rounded-full" />
							<div class="flex justify-start">
								{$auth.user.email}
								<ChevronDownIcon class="w-4 h-4 mt-1" />
							</div>
						</button>
						{#if dropdownSelected}
							<div
								class="absolute bg-white md:w-[16rem] w-full md:right-0 md:mt-2 md:pl-4 text-white rounded-b-md"
							>
								{#each accountList as account}
									<button
										on:click={() => {
											goto(account.href)
											dropdownSelected = !dropdownSelected
										}}
										class="block py-2 rounded text-black hover:text-gray-700">{account.title}</button
									>
								{/each}
								<button
									on:click|preventDefault={() => {
										signOut()
									}}
									class="w-full text-left block py-2 rounded text-black hover:text-gray-700"
								>
									Sign out
								</button>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<button
					on:click={() => {
						goto('/signin')
					}}
					class="py-1 hover:text-gray-700 flex-none"
				>
					Sign in
				</button>
				<button
					on:click={() => {
						goto('/cart')
					}}
					class="ml-3 py-2 flex hover:text-gray-700"
				>
					<ShoppingCartIcon class="h-5 w-5" />
					<sup class="justify-end font-bold">
						{$signedOutCart.quantity}
					</sup>
				</button>
			{/if}
		</div>
	{/if}
</div>
