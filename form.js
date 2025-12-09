document.addEventListener('DOMContentLoaded', function() {
    const openFormBtn = document.getElementById('openFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const feedbackForm = document.getElementById('feedbackForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    const STORAGE_KEY = 'feedbackFormData';

    const FORM_SUBMIT_URL = 'https://formcarry.com/s/49Y0gT8YujF';

    openFormBtn.addEventListener('click', function() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        history.pushState({ formOpen: true }, '', '#feedback');

        restoreFormData();
    });

    function closeForm() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';

        if (window.location.hash === '#feedback') {
            history.back();
        }
    }

    closeFormBtn.addEventListener('click', closeForm);

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeForm();
        }
    });

    window.addEventListener('popstate', function(e) {
        if (modalOverlay.classList.contains('active')) {
            closeForm();
        }
    });

    function saveFormData() {
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            message: document.getElementById('message').value,
            privacyPolicy: document.getElementById('privacyPolicy').checked
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }

    function restoreFormData() {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById('fullName').value = formData.fullName || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('organization').value = formData.organization || '';
            document.getElementById('message').value = formData.message || '';
            document.getElementById('privacyPolicy').checked = formData.privacyPolicy || false;
        }
    }

    function clearFormData() {
        localStorage.removeItem(STORAGE_KEY);
        feedbackForm.reset();
    }

    const formInputs = feedbackForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', saveFormData);
    });

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';


        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        const formData = new FormData(feedbackForm);

        fetch(FORM_SUBMIT_URL, {
            method: 'POST',
            body: formData,
            headers: {
                    'Accept': 'application/json'
                }
        })
        .then(response => {
            if (response.status === 200) {
                return response.text().then(text => {
                    try {
                        return JSON.parse(text);
                    } catch {
                        return { status: 'success' };
                    }
                });
            } else {
                throw new Error('Ошибка сети: ' + response.status);
            }
        })
        .then(data => {
            if (data.status === 'success' || data.code === 200 || data.success === true) {
                    successMessage.style.display = 'block';
                    clearFormData();
                    setTimeout(() => {
                        closeForm();
                    }, 2000);
                } else {
                    throw new Error(data.message || 'Ошибка отправки формы');
                }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            errorMessage.style.display = 'block';
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        });
    });

    feedbackForm.addEventListener('input', function() {
        const requiredFields = feedbackForm.querySelectorAll('[required]');
        let allValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allValid = false;
            }
        });

        const privacyChecked = document.getElementById('privacyPolicy').checked;

        submitBtn.disabled = !allValid || !privacyChecked;
    });
});
