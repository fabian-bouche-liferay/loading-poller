import ApiService from './ApiService';

class PollingService {

    constructor(baseURL, authString, client, objectName, pollingStatusFieldName,
        pollingStatusFieldPending, pollingStatusFieldSuccess) {
        this.baseURL = baseURL;
        this.authString = authString;
        this.client = client;
        this.objectName = objectName;
        this.pollingStatusFieldName = pollingStatusFieldName;
        this.pollingStatusFieldPending = pollingStatusFieldPending;
        this.pollingStatusFieldSuccess = pollingStatusFieldSuccess;
    }

    getStatus(objectEntryId) {

        console.log(this.baseURL + this.objectName + "/" + objectEntryId + "?fields=" + this.pollingStatusFieldName);

        return ApiService.makeCall(this.baseURL + this.objectName + "/" + objectEntryId + "?fields=" + this.pollingStatusFieldName,
            this.authString, this.client, "GET").then(data => {

            const newStatus = data[this.pollingStatusFieldName].key;
            if(newStatus == this.pollingStatusFieldPending) {
                return "PENDING";
            } else if(newStatus == this.pollingStatusFieldSuccess) {
                return "SUCCESS";
            } else {
                return "FAILURE";
            }

        });

        //return Promise.resolve('pending');

    }

}

export default PollingService;