<script>
	import { currentRun, selectedGame, dataset, playedCharacters, runIndex } from '@Services/store.js';
	import { UNITE_SELECTED } from '@Utils/constants';

	export let newPick;

</script>

<style src="./style.scss">

</style>

<div class="grid">
	{#each $currentRun || [] as index, i}
		<div class="character-box">
			<button
				style={`background-color: ${$dataset[index].color}; background-image: url("./images/${$selectedGame}/icons/${$dataset[index].file}.png")`}
				class="character"
				class:unite={$selectedGame === UNITE_SELECTED }
				class:played={$playedCharacters.includes($currentRun[i])}
				class:selected={$runIndex == index}
				on:click={() => newPick($runIndex, i)}
			>
			
			</button>
			{#if $playedCharacters.includes($currentRun[i])}
				<div class="played-character">
						<img src={`./images/common/cross.png`} alt="">
				</div>
			{/if} 
		</div>
	{/each}
	<div class="character-box">
		<button
			style={`background-color: white; background-image: url("./images/common/random-icon.png")`}
			class="character"
			on:click={() => newPick($runIndex, 0, true)}
		>
		
		</button>
	</div>
</div>
