// Backend methods
import { dbank_backend } from '../../declarations/dbank_backend';

// On window load
window.addEventListener("load", async () => {
    // Get the current blance
    updateBalance();
});

// Refresh balance every 3 s
window.setInterval(async function () {
    await dbank_backend.compound();
    await updateBalance();
}, 3000);


// When submit button is clicked
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable the submit button
    const button = e.target.querySelector("#submit-btn");
    button.setAttribute("disabled", true);

    // Input from user
    const inputAmount = document.getElementById('input-amount').value;
    const withdrawAmount = document.getElementById('withdraw-amount').value;

    // Call the balance methods
    if (inputAmount > 0) await dbank_backend.topUp(parseFloat(inputAmount));
    if (withdrawAmount > 0) await dbank_backend.withdraw(parseFloat(withdrawAmount));

    // get the new balance
    await dbank_backend.compound();
    await updateBalance();

    button.removeAttribute("disabled");

    // Clear the text fields
    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";


});

// Update balance
async function updateBalance() {
    // the h1 element to display the balance
    const value = document.getElementById("value");
    value.classList.remove("highlight");
    // get balance
    const balance = await dbank_backend.checkBalance();
    // display updated balance
    value.innerHTML = Math.round(balance * 100) / 100;
    // highlight color
    value.classList.add("highlight");
}