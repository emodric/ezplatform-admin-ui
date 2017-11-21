(function (global) {
    const SELECTOR_FIELD = '.ez-field-edit--ezemail';

    class EzEmailValidator extends global.eZ.BaseFieldValidator {
        /**
         * Validates the input
         *
         * @method validateInput
         * @param {Event} event
         * @returns {Object}
         * @memberof EzEmailValidator
         */
        validateInput(event) {
            const isRequired = event.target.required;
            const isEmpty =  !event.target.value.trim();
            const isValid = global.eZ.errors.emailRegexp.test(event.target.value);
            const isError = (isRequired && isEmpty) || !isValid;
            const fieldNode = event.target.closest(SELECTOR_FIELD);
            const result = {isError};

            if (isEmpty) {
                result.errorMessage = global.eZ.errors.emptyField.replace('{fieldName}', fieldNode.querySelector('.ez-field-edit__label').innerHTML);
            } else if (!isValid) {
                result.errorMessage = global.eZ.errors.invalidEmail;
            }

            return result;
        }
    };

    const validator = new EzEmailValidator({
        classInvalid: 'is-invalid',
        fieldSelector: SELECTOR_FIELD,
        eventsMap: [
            {
                selector: '.ez-field-edit--ezemail input',
                eventName: 'blur',
                callback: 'validateInput',
                invalidStateSelectors: [SELECTOR_FIELD],
                errorNodeSelectors: ['.ez-field-edit__label-wrapper'],
            },
        ],
    });

    validator.init();

    global.eZ.fieldTypeValidators = global.eZ.fieldTypeValidators ?
        [...global.eZ.fieldTypeValidators, validator] :
        [validator];
})(window);
