if (typeof window.ethereum !== 'undefined' ||
    (typeof window.web3 !== 'undefined')) {

    // Web3 browser user detected. You can now use the provider.
    const provider = window['ethereum'] || window.web3.currentProvider
    init();
} else {
    alert('You need a Web3-compatible browser. Consider downloading the MetaMask extension.');
}

async function getAccount() {
    try {
        const accounts = await ethereum.enable()
        return accounts[0];
    } catch (error) {
        // Handle error. Likely the user rejected the login:
        console.log(reason === "User rejected provider access")
    }
}

async function init () {
    const account = await getAccount();
    const body = document.querySelector('body');
    body.innerHTML = '';
    body.append(renderForm(account, true));

}

function renderForm (account, editable, amount) {
    const shareUrl = `http://rps.alacris.io/?c=${account}`;
    const child = `
        ${renderWager(editable, amount)}
        <br>
        ${renderChoiceGroup()}
        <br>
        ${renderSubmit()}
    `;
    const el = document.createElement('form');
    el.style.cssText = "max-width: 16em;";
    el.innerHTML = child;
    el.addEventListener('submit', (e) => {
        e.preventDefault();
        const {wager, choice} = getFormValuesForEvent(e);
        const confirmation = `You wagered ${wager} and played ${getLabelForValue(choice)}.`;
        editable ? 
        window.prompt(
            `${confirmation}\nCopy and share this URL to someone you want to play against:`,
            `${shareUrl}`
        )
        :
        window.alert(confirmation)
        ;
    });
    return el;
}

function renderChoiceGroup () {
    return `
    <fieldset style="margin-top: .25em; text-align: center;">
        <legend>Make your play:</legend>
        ${renderChoice(0)}
        ${renderChoice(1)}
        ${renderChoice(2)}
    </fieldset>
    `;
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