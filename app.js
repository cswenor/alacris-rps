// if (!window.Web3) {
//     alert('You need a Web3-compatible browser. Consider downloading the MetaMask extension.');
// } else {
// const web3 = new window.Web3(window.Web3.givenProvider);
// const token = '0x2bD86E33628C797939dC5D92888590be1c84882B';
// if (!web3.currentProvider)
//     web3.setProvider(new web3.providers.HttpProvider(`https://rinkeby.infura.io/${token}`));
const body = document.querySelector('body');
body.innerHTML = '';
body.append(renderForm(true));
// }

function renderForm (editable, amount) {
    const shareUrl = `http://rps.alacris.io/?c=8675309eyine`;
    const child = `
        ${renderWager(editable, amount)}
        <br>
        ${renderChoice(0)}
        ${renderChoice(1)}
        ${renderChoice(2)}
        <br>
        ${renderSubmit()}
    `;
    const el = document.createElement('form');
    el.style.cssText = "max-width: 16em;";
    el.innerHTML = child;
    el.addEventListener('submit', (e) => {
        e.preventDefault();
        const {wager, choice} = getFormValuesForEvent(e);
        window.prompt(`
        You wagered ${wager} and chose ${getLabelForValue(choice)}.\n
        Copy and share this URL to someone you want to play against:
        `, `${shareUrl}`);
    });
    return el;
}

function renderChoice (value) {
    return `
    <label style="display: inline-block; margin: .5em; text-align: center;">
        <input type="radio" value="${value}" required name="choice">
        <br>
        ${getIconForValue(value)}
        <br>
        ${getLabelForValue(value)}
    </label>
    `;
}

function renderWager (editable, amount) {
    const wagerStyle = 'font-size: 18pt;';
    return `
    <label style="text-align: center;">
        Wager 
        <br>
        ${editable ? 
            `<input style="${wagerStyle}" type="number" name="wager" required pattern="[A-Za-z]+" min="1">`
            :
            `<output style="${wagerStyle}" name="wager">${amount}</output>`
        }
    </label>
        `;
}

function renderSubmit (editable, amount) {
    return `
    <button style="width: 100%;">Shoot!</button>
    `;
}


function getFormValuesForEvent (e) {
    return {
        wager: e.target.querySelector('[name=wager]').value,
        choice: e.target.querySelector('[name=choice]:checked').value
    };
}

function getLabelForValue (choice) {
    return ['Rock', 'Paper', 'Scissors'][choice] || '';
}

function getIconForValue (choice) {
    return ['🗿', '📰', '✂'][choice] || '';
}