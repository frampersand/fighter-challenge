<script>
    import Timer from '@Components/Timer';
	import { currentRun, selectedGame, dataset, playedCharacters, runIndex } from '@Services/store';
    import { SMASH_SELECTED } from '@Utils/constants';
    import {
        toTitleCase,
        getPersonalBest,
        setPersonalBest,
        getPositionStyle,
		shuffle,
        setRunStatus,
        getRunStatus,
    } from '@Utils/utils';

    let personalBest;
    let shownIndex;
    let topReached;

    let runIndexNext;
    let runIndexBack;

    let hour;
    let minute;
    let second;
    let timerInterval;
    let timerRunning;

    const generateNewRun = (random = false) => {
        let newRun = [...Array($dataset.length).keys()];
        if(random)
			newRun = shuffle(newRun);
		currentRun.set(newRun);
        reset();
    }

    export const newPick = (index, newIndex, random = false) => {
        checkIfPlayed(index);
        let pick = random ? randomPick() : newIndex;
        updateIndexes(pick);
    };

    const updateIndexes = (index) => {
        shownIndex = index;
        runIndex.set($currentRun[shownIndex]);
        if (index > 0) {
            runIndexBack = $currentRun[shownIndex - 1];
        }
        if (index < $currentRun.length - 1) {
            runIndexNext = $currentRun[shownIndex + 1]
        }
    }

    const randomPick = () => {
        let validNumber;
        do {
            validNumber = Math.floor((Math.random() * ($dataset.length)));
        } while ($playedCharacters.includes(validNumber) && $playedCharacters.length != $dataset.length);
        return validNumber;
    }

    const checkIfPlayed = (characterIndex) => {
        if (!$playedCharacters.includes(characterIndex)) {
            playedCharacters.set([...$playedCharacters, characterIndex]);
            topReached = $playedCharacters.length;
            if (topReached > personalBest) {
                personalBest = topReached;
                setPersonalBest(topReached, $selectedGame);
            }
        }
    };

    export const reset = () => {
        topReached = 0;
        shownIndex = 0;
        playedCharacters.set([]);
        runIndex.set($currentRun[shownIndex]);
        runIndexNext = $currentRun[1];
        hour = '00';
        minute = '00';
        second = '00';
        timerRunning = false;
        clearInterval(timerInterval);
    }

    const resetRecord = () => {
        setPersonalBest(0, $selectedGame);
        personalBest = 0;
    }

    const getRecord = () => {
        personalBest = getPersonalBest($selectedGame);
    }

    const saveRunState = () => {
        setRunStatus($currentRun, $playedCharacters, `${hour}:${minute}:${second}`, shownIndex, $selectedGame);
    }

    const checkExistingRun = (game) => {
        const [run, played, time, index] = getRunStatus(game);
        console.log(getRunStatus(game));
        console.log('index: ', index);
        run.length && currentRun.set(run.split(',').map(function (x) { return parseInt(x, 10) }));
        played.length && playedCharacters.set(played.split(',').map(function (x) { return parseInt(x, 10) }));
        updateIndexes(parseInt(index));
        topReached = $playedCharacters.length;
        const newTime = time.split(':');
        hour = newTime[0];
        minute = newTime[1];
        second = newTime[2];
    }

    $: $dataset, generateNewRun();
    $: $dataset, checkExistingRun($selectedGame);
    $: $dataset, getRecord();

</script>

<style src="./style.scss">

</style>

<svelte:window on:beforeunload={saveRunState}/>

<div class={`randomizer-card-body ${$selectedGame}`}>

    <div 
        class={`card-character ${$selectedGame} ${$dataset[$runIndex].series}`} 
        style={`background-color: ${$dataset[$runIndex].color}; background-image:
        url("./images/${$selectedGame}/series/${$dataset[$runIndex].series}.png")`}
        >
        <div 
            class={`series ${$dataset[$runIndex].series}`} 
            style={`background-color: ${$dataset[$runIndex].color}; background-image:
            url("./images/${$selectedGame}/series/${$dataset[$runIndex].series}.png")`}
        > 
        </div>
        <div class="character-portrait"
            style={`background-image: url("./images/${$selectedGame}/portraits-min/${$dataset[$runIndex].file}-min.png");
            ${getPositionStyle($dataset[$runIndex].position)}`}
        >
    </div>
    <div class="buttons">
        <button on:click={()=> {newPick($runIndex, shownIndex-1)}}
            class:invisible={shownIndex == 0}>
            {#if shownIndex != 0}
							<img class="character-icon" src={`./images/${$selectedGame}/icons/${$dataset[runIndexBack].file}.png`} alt="">
						{/if}
					</button>

					<span> 
						{$dataset[$runIndex].displayNum} - {toTitleCase($dataset[$runIndex].displayName["en_US"])}  
                        {#if $selectedGame === SMASH_SELECTED }
						    <img class="character-icon" src={`./images/${$selectedGame}/icons/${$dataset[$runIndex].file}.png`} alt="">
                        {/if}
					</span>

					<button 
						on:click={() => {newPick($runIndex, shownIndex+1)}}
						class:invisible={shownIndex == $currentRun.length - 1}> 
						{#if shownIndex < $currentRun.length - 1}
							<img class="character-icon" src={`./images/${$selectedGame}/icons/${$dataset[runIndexNext].file}.png`} alt="">
						{/if}
					</button>
				</div>
			</div>

			<div class="pb-box">
				<div class="pb-alltime">
					<button on:click={resetRecord}> 
						<img src={`./images/common/reset.png`} alt="">
					</button>
					Best record: {personalBest}
				</div>
				<div class="pb-current">
					Current run: {topReached}
				</div>
			</div>
			
			<Timer 
				bind:hour={hour}
				bind:minute={minute}
				bind:second={second}
				bind:timerInterval={timerInterval}
				bind:timerRunning={timerRunning} 
			/>

			<div class="controls">
				<button on:click={() => {generateNewRun(true)}}>Random</button>
				<button on:click={reset}>Reset</button>
				<button on:click={() => {generateNewRun()}}>Ordered</button>
			</div>
		</div>
