<script>
    import { UNITE_SELECTED, SMASH_SELECTED } from '@Utils/constants';
    import { updateDefaultGame } from '@Utils/utils';
    import { selectedGame, dataset } from '@Services/store';
    import { ssbDataset, uniteDataset } from '@Services/datasets';

    const changeGame = (game, data) => {
        updateDefaultGame(game)
        selectedGame.set(game);
        dataset.set(data);
    }
</script>

<style src="./style.scss">

</style>

<div class="col-6 selector">
    <div class="game-selection-box">
        <div class="game" class:selected={$selectedGame === SMASH_SELECTED}>
            <button on:click={() => { changeGame(SMASH_SELECTED, ssbDataset)}}>
                <img src={`./images/common/smash-logo.png`} alt="">
            </button>
        </div>
        <div class="game" class:selected={$selectedGame === UNITE_SELECTED}>
            <button on:click={() => { changeGame(UNITE_SELECTED, uniteDataset)}}>
                <img src={`./images/common/unite-logo.png`} alt="">
            </button>
        </div>
    </div>
</div>
