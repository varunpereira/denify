<script>
	import { InstagramIcon, MailIcon, ShoppingBagIcon } from 'svelte-feather-icons'
	import { goto } from '$app/navigation'
</script>

<div class="py-4 bg-white px-4 md:px-10 min-w-[400px] ">
	<div class="md:flex md:justify-between mb-6">
		<div class="mb-6 md:mb-0">
			<button
				on:click={() => {
					goto('/')
				}}
				class="flex items-center hover:text-gray-700"
			>
				<ShoppingBagIcon class="w-6 h-6 mr-1" />
				<p class="self-center text-2xl font-semibold whitespace-nowrap">Denify</p>
			</button>
		</div>
		<div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
			<div>
				<p class="mb-6 text-sm font-semibold uppercase">Pages</p>
				<div class=" ">
					<div class="mb-4">
						<button
							on:click={() => {
								goto('/about')
							}}
							class="hover:text-gray-700">About</button
						>
					</div>
				</div>
			</div>
			<div>
				<p class="mb-6 text-sm font-semibold uppercase ">Contact</p>
				<div class=" ">
					<div class="mb-[10px]">
						<button
							on:click={() => {
								window.open('https://www.instagram.com/denify.shop/')
							}}
							class="hover:text-gray-700"><InstagramIcon class="w-[20px] h-[20px]" /></button
						>
					</div>
					<div>
						<button
							on:click={() => {
								window.open('https://www.instagram.com/denify.shop/')
							}}
							class="hover:text-gray-700"
						>
							<MailIcon class="w-[20px] h-[20px]" />
						</button>
					</div>
				</div>
			</div>
			<div>
				<p class="mb-6 text-sm font-semibold uppercase ">Legal</p>
				<div class=" ">
					<div class="mb-4">
						<button
							on:click={() => {
								window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
							}}
							class="hover:text-gray-700">Privacy Policy</button
						>
					</div>
					<div>
						<button
							on:click={() => {
								window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
							}}
							class="hover:text-gray-700"
							>Terms &amp; Conditions
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="sm:flex sm:items-center sm:justify-center">
		<p class="text-sm sm:text-center ">© 2022 Denify All Rights Reserved</p>
	</div>
</div>
