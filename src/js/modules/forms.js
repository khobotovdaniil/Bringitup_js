export default class Form {
    constructor (forms) {
        this.forms = document.querySelectorAll(forms);
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с Вами свяжемся.',
            failure: 'Что-то пошло не так...',
        };
        this.path = 'assets/question.php';
    }

    async postData (url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data,
        });
    
        return await res.text();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    });
            });
        });
    }
}