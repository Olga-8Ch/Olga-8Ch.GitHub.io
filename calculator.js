 document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('calculator-form');
            const quantityInput = document.getElementById('quantity');
            const rollTypeRadios = document.getElementsByName('roll-type');
            const optionsGroup = document.getElementById('options-group');
            const optionsSelect = document.getElementById('options');
            const propertyGroup = document.getElementById('property-group');
            const propertyCheckbox = document.getElementById('property');
            const resultDiv = document.getElementById('result');
            const quantityError = document.getElementById('quantity-error');

            const basePrices = {
                classic: 120,
                special: 200,
                premium: 190
            };

            quantityInput.addEventListener('input', calculateTotal);

            for (let radio of rollTypeRadios) {
                radio.addEventListener('change', function() {
                    updateFormVisibility();
                    calculateTotal();
                });
            }

            optionsSelect.addEventListener('change', calculateTotal);
            propertyCheckbox.addEventListener('change', calculateTotal);

            function updateFormVisibility() {
                const selectedType = document.querySelector('input[name="roll-type"]:checked').value;

                optionsGroup.classList.add('hidden');
                propertyGroup.classList.add('hidden');

                if (selectedType === 'special') {
                    optionsGroup.classList.remove('hidden');
                } else if (selectedType === 'premium') {
                    propertyGroup.classList.remove('hidden');
                }
            }

            function calculateTotal() {
                const quantity = quantityInput.value.trim();
                const quantityPattern = /^[1-9]\d*$/;

                if (!quantityPattern.test(quantity)) {
                    quantityError.textContent = 'Введите корректное количество (целое число больше 0)';
                    quantityError.classList.remove('hidden');
                    resultDiv.textContent = 'Стоимость: 0 руб.';
                    return;
                } else {
                    quantityError.classList.add('hidden');
                }

                const selectedType = document.querySelector('input[name="roll-type"]:checked').value;

                let total = basePrices[selectedType] * parseInt(quantity);

                if (selectedType === 'special') {
                    const optionsValue = parseInt(optionsSelect.value);
                    total += optionsValue * parseInt(quantity);
                }

                if (selectedType === 'premium' && propertyCheckbox.checked) {
                    const propertyValue = parseInt(propertyCheckbox.value);
                    total += propertyValue * parseInt(quantity);
                }

                resultDiv.textContent = `Стоимость: ${total} руб.`;
            }

            updateFormVisibility();
            calculateTotal();
        });
