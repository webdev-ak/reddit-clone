
export default class UserActivity {

    constructor() {

        this.data = []

        this.dataInfo = {}

        this.params =  {
            loadingType: '',
            loading: false,
        }

        this.feedback = {
            status: '',
            message: ''
        }

        this.dataFetchUrl  = ''
    }

    setDataFetchUrl(url) {
        this.dataFetchUrl = url
    }

    async fetchData() {

        this.activateLoading()

        const url = this.dataInfo.next_page_url ? this.dataInfo.next_page_url : this.dataFetchUrl;
        
        await Axios.get(url)
            .then( ({ data })  => {
                this.saveLoadedData(data);
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

    setEmptyResultsFeedback(message) {
        this.feedback.status = 'empty'
        this.feedback.message = message
    }

    setErrorFeedback() {
        this.feedback.status = 'error'
        this.feedback.message = 'Something went wrong...'
    }

    setLoadingType(loadingType) {
        this.params.loadingType = loadingType
    }

    activateLoading() {
        this.params.loading = true
    }

    deactivateLoading() {
        this.params.loading = false
    }

    saveLoadedData(data) {

        if(data instanceof Object) data.data = Object.values(data.data);

        let currentActivityParams = this.params;
        
        this.data =  [...this.data,...data.data]
        this.params = currentActivityParams

        delete data.data

        this.dataInfo = data
    }

    setActivityAsFetched() {
        this.feedback.message = '';
        this.feedback.status = 'fetched';
    }

}

