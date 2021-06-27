<script lang="ts">
	import Guess from './Guess.svelte';
import Level from './Level.svelte';
</script>

<div class="w-auto xl:flex xl:items-center h-full m-4" style="height: calc(100vh - 128px);">
  <div class="h-full w-full">
    <Level />
  </div>
  <div class="xl:w-full h-full" >
    <Guess />
  </div>
</div>

