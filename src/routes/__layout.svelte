<script>
	import '../app.postcss';
	import '../../node_modules/leaflet/dist/leaflet.css';
	import { mdiGlobeModel } from '@mdi/js';
</script>

<nav class="bg-blue-500 p-2 flex items-center">
	<div class="flex items-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="48px"
			height="48px"
			class="text-white fill-current"
		>
			<path d={mdiGlobeModel} />
		</svg>
	</div>
</nav>
<slot />
<footer class="flex items-center justify-between bg-gray-100 p-4">
	<div class="flex items-center justify-items-end">
		<a
			href="https://github.com/EmeraldSnorlax/place/"
			rel="noopener"
			class="text-blue-600 underline">Source on GitHub</a
		>
	</div>
</footer>
