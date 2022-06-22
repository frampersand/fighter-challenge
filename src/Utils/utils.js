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
