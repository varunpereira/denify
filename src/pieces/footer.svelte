<script>
	import { InstagramIcon, MailIcon } from 'svelte-feather-icons';
	import { goto } from '$app/navigation';
</script>

<div class="grid flex justify-center pt-10 pb-10 ">
	<div class="flex justify-center mb-5">
		<button
			on:click={function () {
				window.open('https://www.instagram.com/denify.shop/');
			}}
			class="mr-2"><InstagramIcon class="w-6 h-6" /></button
		>
		<button
			on:click={function () {
				goto('/email');
			}}><MailIcon class="w-6 h-6" /></button
		>
	</div>
	<div class="font-bold">© 2022 Denify</div>
</div>
