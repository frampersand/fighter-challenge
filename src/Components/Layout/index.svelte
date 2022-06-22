<script>
    import Card from '@Components/Card';
    import Grid from '@Components/Grid';

    let runIndex;
    let newPick;
    let playedCharacters = [];

</script>

<style src="./style.scss">

</style>

<div class="layout col-12">
    <div class="row justify-content-center">
        <div class="col-lg-12 col-xl-3">
            <Card 
				bind:newPick={newPick}
                bind:playedCharacters={playedCharacters} 
				bind:runIndex={runIndex}
				/>
        </div>
        <div class="col-lg-12 col-xl-4">
            <Grid 
				newPick={newPick}
				bind:playedCharacters={playedCharacters}
                bind:runIndex={runIndex}
				/>
        </div>
    </div>
</div>
