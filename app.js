// if (!window.Web3) {
//     alert('You need a Web3-compatible browser. Consider downloading the MetaMask extension.');
// } else {
// const web3 = new window.Web3(window.Web3.givenProvider);
// const token = '0x2bD86E33628C797939dC5D92888590be1c84882B';
// if (!web3.currentProvider)
//     web3.setProvider(new web3.providers.HttpProvider(`https://rinkeby.infura.io/${token}`));

document.querySelector('body').innerHTML = renderForm(true);
// }

function renderForm(editable, amount) {
    return `
    <form>
        <label>
            Wager 
            ${editable ? 
                `<input type="number" name="wager" required pattern="[A-Za-z]+">`
                :
                `<output name="wager">${amount}</output>`
            }
        </label>
        <br>
        ${renderChoice('🗿', 'Rock', 0)}
        ${renderChoice('📰', 'Paper', 0)}
        ${renderChoice('✂', 'Scissors', 0)}
        <br>
        <button>Shoot!</button>
    </form>
    `;
}

function renderChoice(icon, label, value) {
    return `
    <label><input type="radio" value="${value}" name="choice">${icon} ${label}</label>
    `;
}