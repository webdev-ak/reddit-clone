
export default class SearchResult {

    constructor(type) {

        this.type = type
        
        this.data = []
        this.dataInfo = {}

        this.loading =  {
            activated: false,
            type: '',
            occurrences: 0
        }

        this.feedback = {
            status: '',
            message: ''
        }

        this.dataFetchUrl  = ''
        this.dataFetchParams = {}
    }

    setLoadingOccurrences(occurrencesCount) {
        this.loading.occurrences = occurrencesCount
    }

    getLoadingOccurrences() {
        return this.loading.occurrences
    }
    
    setLoadingType(type) {
        this.loading.type = type
    }

    getLoadingType() {
        return this.loading.type
    }

    setDataFetchUrl(url) {
        this.dataFetchUrl = url
    }
    
    setDataFetchParams(params) {
        this.dataFetchParams = params
    }

    getQuery() {
        return this.dataFetchParams.query
    }

    async fetchData() {
        
        this.activateLoading()
        
        const url = this.dataInfo.next_page_url ? this.dataInfo.next_page_url : this.dataFetchUrl;
        
        await Axios.post(url,this.dataFetchParams)
        .then( ({ data })  => {
            
            this.saveLoadedData(data)
                
                this.deactivateLoading()
            })
            .catch( ({ response }) => {

                this.deactivateLoading()

                if(response.status === 404) {
                    this.setEmptyResultsFeedback(response.data.message)
                    return;
                }

                this.setErrorFeedback()
            });
    }
    
    saveLoadedData(data) {

        if(data.data instanceof Object) data.data = Object.values(data.data);

        let currentLoadingParams = this.loading;
        
        this.data =  [...this.data,...data.data]
        this.loading = currentLoadingParams

        delete data.data

        this.dataInfo = data
    }
    
    resetData() {
        this.data = []  
        this.dataInfo = {}
    }

    setEmptyResultsFeedback(message) {
        this.feedback.status = 'empty'
        this.feedback.message = message
    }

    setErrorFeedback() {
        this.feedback.status = 'error'
        this.feedback.message = 'Something went wrong...'
    }
    
    feedbackMessage() {
        return this.feedback.message
    }
    
    getTotalDataToBeLoaded() {
        return this.dataInfo.total
    }

    dataIsLoading() {
        return this.loading.activated
    }

    dataFailedToLoad() {
        return this.feedback.status === 'error'
    }

    loadedDataIsEmpty() {
        return !this.dataIsLoading() & this.data.length === 0
    }

    activateLoading() {
        this.loading.activated = true
    }

    deactivateLoading() {
        this.loading.activated = false
    }

}

