<script>
    import Card from '@Components/Card';
    import Grid from '@Components/Grid';
    import { GAMELIST_TITLES } from '@Utils/constants';
    import { selectedGame } from '@Services/store';

    let newPick;
    let playedCharacters = [];

</script>

<style src="./style.scss">

</style>

<div class="layout col-12">
    <h1> Frampersand's {GAMELIST_TITLES[$selectedGame]} fighter challenge tracker</h1>
    <div class="row justify-content-center">
        <div class="col-lg-12 col-xl-3">
            <Card 
				bind:newPick={newPick}
                bind:playedCharacters={playedCharacters} 
				/>
        </div>
        <div class="col-lg-12 col-xl-4">
            <Grid 
				newPick={newPick}
				bind:playedCharacters={playedCharacters}
				/>
        </div>
    </div>
</div>
