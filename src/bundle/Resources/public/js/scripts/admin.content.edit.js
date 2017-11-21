(function (global, doc) {
    const form = doc.querySelector('form[name="ezrepoforms_content_edit"]');

    form.setAttribute('novalidate', true);
    form.onsubmit = (event) => {
        event.preventDefault();

        const validators = global.eZ.fieldTypeValidators;
        const isFormValid = validators.every(validator => !validator.isValid().isError);

        if (isFormValid) {
            form.submit();
        }
    };
})(window, document);
