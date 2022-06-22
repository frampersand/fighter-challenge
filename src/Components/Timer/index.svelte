<script>
	import { selectedGame } from '@Services/store';
	import { UNITE_SELECTED } from '@Utils/constants';
    export let hour = '00';
	export let minute = '00';
	export let second = '00';
    export let timerInterval;
    export let timerRunning = false;

    const toggleTimer = () => {
		timerRunning = !timerRunning;
		if (timerRunning) {
			timerInterval = setInterval(timerCycle, 1000);
		} else {
			clearInterval(timerInterval);
		}
	}
    const timerCycle = () => {
		second = parseInt(second);
		minute = parseInt(minute);
		hour = parseInt(hour);

		second = second + 1;

		if (second == 60) {
			minute = minute + 1;
			second = 0;
		}
		if (minute == 60) {
			hour = hour + 1;
			minute = 0;
			second = 0;
		}

		if (second < 10 || second == 0) {
			second = '0' + second;
		}
		if (minute < 10 || minute == 0) {
			minute = '0' + minute;
		}
		if (hour < 10 || hour == 0) {
			hour = '0' + hour;
		}
	}
</script>

<style src="./style.scss">

</style>

<div class="timer" on:click={toggleTimer} class:unite={$selectedGame === UNITE_SELECTED}>
    <div class="timer-title">Current run timer</div>
    <div class="timer-count">{hour}:{minute}:{second}</div>
</div>
