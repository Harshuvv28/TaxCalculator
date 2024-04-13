function validateInputs() {
    let isValid = true;
    const grossIncome = document.getElementById('grossIncome').value;
    const extraIncome = document.getElementById('extraIncome').value;
    const deductions = document.getElementById('deductions').value;

    const temp = grossIncome;

    let flag = 0;
    for (let i = 0; i < temp.length; i++) {
        if (isNaN(temp[i])) {
            document.getElementById("grossError").style.display = "block";
            isValid = false;
            flag = 1;
            break;
        }
    }
    if (flag == 0) {
        document.getElementById("grossError").style.display = "none";
    }

    flag = 0;
    for (let i = 0; i < extraIncome.length; i++) {
        if (isNaN(extraIncome[i])) {
            document.getElementById("extraError").style.display = "block";
            isValid = false;
            flag = 1;
            break;
        }
    }
    if (flag == 0) {
        document.getElementById("extraError").style.display = "none";
    }


    flag = 0;
    for (let i = 0; i < deductions.length; i++) {
        if (isNaN(deductions[i])) {
            document.getElementById("deductionError").style.display = "block";
            isValid = false;
            flag = 1;
            break;
        }
    }
    if (flag == 0) {
        document.getElementById("deductionError").style.display = "none";
    }

    return isValid;
}

const taxForm = document.getElementById('taxForm');
taxForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validate inputs
    if (validateInputs()) {
        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const age = parseInt(document.getElementById('age').value);
        const deductions = parseFloat(document.getElementById('deductions').value);

        // Call function to calculate tax
        const tax = calculateTax(grossIncome, extraIncome, age, deductions);

        displayTaxModal(tax);
    }
});




function calculateTax(grossIncome, extraIncome, age, deductions) {
    let saving = grossIncome + extraIncome - deductions;

    if (saving <= 800000) {
        return 0;
    }

    // Adjust tax based on age group
    let tax;

    if (age < 40) {
        tax = 0.3 * (saving - 800000);
    }
    else if (age >= 60) {
        tax = 0.1 * (saving - 800000);
    }
    else {
        tax = 0.4 * (saving - 800000);
    }


    return saving - tax;
}

// Function to display modal with tax calculation
function displayTaxModal(tax) {
    const modal = document.getElementById('taxModal');
    const modalContent = document.querySelector('.modal-content');
    const taxResult = document.getElementById('taxResult');

    taxResult.innerHTML = ` ${tax.toFixed(2)} <p> after tax deduction</p>`;
    modal.style.display = 'block';

    // Close modal when user clicks close button
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        resetForm();
    });

    // Close modal when user clicks outside the modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// Function to reset form fields
function resetForm() {
    document.getElementById('grossIncome').value = '';
    document.getElementById('extraIncome').value = '';
    document.getElementById('age').value = '';
    document.getElementById('deductions').value = '';
}

