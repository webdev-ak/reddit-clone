
export default class AuthForm {

    constructor(fields) {

        this.fields = fields

        this.feedback = {}
        
        this.formSubmit = {
            done: false,
            message: ''
        }
        
        this.loading = false
    }

    activateLoading() {
        this.loading = true
    }
    
    disableLoading() {
        this.loading = false
    }

    setFormAsSubmitted(message) {
        this.formSubmit.done = true
        this.formSubmit.message = message
    }
        
    clearAllFeedbacks() {
        this.clearFeedback()        
        this.clearFormSubmit()
    }
    
    clearFeedback() {
        this.feedback = {}
    }
    
    clearFormSubmit() {
        this.formSubmit = {
            done: false,
            message: ''
        }
    }

    areAllFieldsFilled() {
        return Object.keys(this.fields).every(attributeKey => !! this.fields[attributeKey].trim())
    }

    clearFields() {
        Object.keys(this.fields).forEach(attributeKey => {
            this.fields[attributeKey] = ''        
        })
    }
}