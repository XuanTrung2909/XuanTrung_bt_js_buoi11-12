function Validation() {
    this.checkNull = function (input, spanId, mess) {
        if (input === "") {
            getEle(spanId).innerHTML = mess;
            return false;
        } else {
            getEle(spanId).innerHTML = "";
            return true;
        }
    }
    this.checkDuplicate = function(input, spanId, mess, arr){
        var status = true;
        for(var i = 0; i < arr.length; i++){
            if(input === arr[i].taskName){
                status = false;
                break;
            }
        }
        if(status){
            getEle(spanId).innerHTML = "";
            return true;
        }else{
            getEle(spanId).innerHTML = mess;
            return false;
        }
    }
}