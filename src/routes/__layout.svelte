<script>
	import '../app.postcss';
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
