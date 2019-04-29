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

function renderForm(editable, amount) {
    const child = `
        <label>
            Wager 
            ${editable ? 
                `<input type="number" name="wager" required pattern="[A-Za-z]+">`
                :
                `<output name="wager">${amount}</output>`
            }
        </label>
        <br>
        ${renderChoice('🗿', 0)}
        ${renderChoice('📰', 1)}
        ${renderChoice('✂', 2)}
        <br>
        <button>Shoot!</button>
    `;
    const el = document.createElement('form');
    el.innerHTML = child;
    el.addEventListener('submit', (e) => {
        e.preventDefault();
        const {wager, choice} = getFormValuesForEvent(e);
        alert(`You wagered ${wager} and chose ${getLabelForValue(choice)}.`);
    });
    return el;
}

function renderChoice(icon, value) {
    return `
    <label><input type="radio" value="${value}" required name="choice">${icon} ${getLabelForValue(value)}</label>
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