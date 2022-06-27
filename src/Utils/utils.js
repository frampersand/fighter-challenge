export const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const getPersonalBest = (game) => {
    return sessionStorage.getItem(`personalBest${game}`) || 0;
}

export const setPersonalBest = (score, game) => {
    sessionStorage.setItem(`personalBest${game}`, score);
}

export const setRunStatus = (run, playedCharacters, timer, index, game) => {
    sessionStorage.setItem(`runStatus-${game}`, run);
    sessionStorage.setItem(`runStatusPlayedCharacters-${game}`, playedCharacters);
    sessionStorage.setItem(`runStatusTimer-${game}`, timer);
    sessionStorage.setItem(`runStatusIndex-${game}`, index);
}

export const getRunStatus = (game) => {
    return [
        sessionStorage.getItem(`runStatus-${game}`) || [],
        sessionStorage.getItem(`runStatusPlayedCharacters-${game}`) || [],
        sessionStorage.getItem(`runStatusTimer-${game}`) || '00:00:00',
        sessionStorage.getItem(`runStatusIndex-${game}`) || '0',
    ];
} 

export const updateDefaultGame = (game) => {
    sessionStorage.setItem("defaultGame", game);
}

export const getDefaultGame = () => {
    return sessionStorage.getItem("defaultGame");
}
export const getPositionStyle = (position) => {
    if(position) {
        return `background-size: ${position.backgroundSize}; background-position: ${position.backgroundPosition}`
    }
    return '';
}
