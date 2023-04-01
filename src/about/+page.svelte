<script>
	import axios from 'axios'
	import { onMount } from 'svelte'
	import { auth } from '@src/all/store.js'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'

	var error = null

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
	})
</script>

<svelte:head><title>About - Denify</title></svelte:head>

<div class="mt-6">
	<p class="flex justify-center text-xl font-semibold">Our Mission</p>
	<div class="flex justify-start">
		<img
			src="https://www.ahh.biz/boycott-amazon/images/boycott-amazon-today.jpg"
			alt=""
			class="w-[400px] h-[300px] rounded-md mb-4 mr-4 rounded-xl"
		/>
		<p>
			Zenify is guided by four principles: customer obsession rather than competitor focus, passion
			for invention, commitment to operational excellence, and long-term thinking - no we're not
			joking.
		</p>
	</div>
</div>

<div class="">
	<p class="flex justify-center mt-5 text-xl font-semibold ">Our Story</p>
	<div class="flex justify-start">
		<iframe
			class="mr-4 rounded-xl"
			width="400"
			height="300"
			src="https://www.youtube-nocookie.com/embed/XpCw8CAZYsg?start=233"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
		<p>
			Zenify's humble origins began in... oh wait we're still being humbled lol. Here's our theme
			song - it really captures the mood.
		</p>
	</div>
</div>

<div class="mb-6">
	<p class="flex justify-center mt-5 text-xl font-semibold ">Our Office</p>
	<div class="flex justify-start">
		<iframe
			class="mr-4 rounded-xl"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d805184.6317849847!2d144.49269473369353!3d-37.97123702210555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC!5e0!3m2!1sen!2sau!4v1667183315272!5m2!1sen!2sau"
			width="400"
			height="300"
			style="border:0;"
			allowfullscreen=""
			loading="lazy"
			title=""
			referrerpolicy="no-referrer-when-downgrade"
		/>
		<p>Come and pay us a visit at 123 Noneyabusiness St, Melbourne VIC 3000.</p>
	</div>
</div>
