<script lang="ts">
	import { onMount } from 'svelte';
	import { level } from '../../stores';
	import Level from './Level';
  let fetched = false;
	onMount(async () => {
		$level = new Level();
		await $level.Ready;
		console.log($level);
    fetched = true;
	});
</script>

{#if fetched}
	<div>
		<img src={$level.image} alt="" />
	</div>
{/if}
