export default class Socket {
    port = chrome.extension.connect({name:"popupToBackground"});

    constructor() {
        window.socket = this;

        chrome.extension.onConnect.addListener(function(port) {
            console.log('sockettttttttttttttttttttt');

            if(port.name == "backgroundToPopup") {

            } else if(port.name == "popupToBackground") {
                window.socket.port = chrome.extension.connect({name:"backgroundToPopup"});
            }
            else {
                return;
            }

            port.onMessage.addListener(function(msg) {
                console.log(msg);
                try {
                    window[msg.namespace][msg.literal][msg.method].apply(this, msg.args);
                }
                catch(error) {
                    // your failed action goes here.
                }
            });
        });
    }
    post (msg) {
        try {
            if(!msg) {
                msg = {};
            }
            msg.type = "message";
            Socket.port.postMessage(msg);
        } catch(PortPostException) {}
    }



}
