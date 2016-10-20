/**
 * Created by chibs on 27/09/2016.
 */
// import jQuery from 'jquery';
// import Socket from '../../app/utils/socket'

// const socket = new Socket();

var tabId ;

// var flag = false;
// var currentTabId;
// chrome.browserAction.onClicked.addListener(function(tab) {
//     counter = 40;
//     console.log('Turning ' + tab.url);
//     flag = true;
//     currentTabId = tab.id;
//     chrome.tabs.getSelected(null, function(tab) {
//         sendMsg(tab.id);
//     });
// });

function sendMsg( tabid ,action){
    // console.log(tabid + "--sendMsg()----eventPage.js");
    // console.log(chrome.tabs);
    chrome.tabs.sendMessage(tabid, action, function(response) {});
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "crawlFunc"){

            var newURL = "http://profile.alibaba.com/receive_list.htm?export=true";
            chrome.tabs.create({ url: newURL },function (tab){
                tabId = tab.id;
            });
        }else if(request.msg == "crawlKeywordFunc"){
            console.log(request);
            chrome.storage.local.set({
                query_keywords: request.keywords
            }, function(){
                console.log('保存成功');
            })

            var newURL = "https://sycm.1688.com/keyword/keyword_helper.htm?export=true";
            chrome.tabs.create({ url: newURL },function (tab){
                tabId = tab.id;
            });
            //

        }
    }
);
chrome.tabs.onUpdated.addListener(function (_tabId, changeInfo, tab) {
    if(_tabId==tabId && (changeInfo.url && changeInfo.url.indexOf("login") > 0)){
        window.setTimeout(function () {
            sendMsg(_tabId,{type:"ALERT",msg:'Please login first...'});
        },1500);
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type == 'SAVEDATA'){
            // socket.post({ namespace: "myNamespace",
            //     literal: "myLiteral",
            //     method: "myMethod",
            //     args: ["argOne", "argTwo"]
            // });
            chrome.storage.local.get(['cards'], function(obj){

                if(!obj.cards){
                    obj.cards=[];
                }

                obj.cards.push(...request.data);

                chrome.storage.local.set({
                    cards: obj.cards
                }, function(){
                    console.log('保存成功');
                })
            });

        }else if(request.type == 'UPDATEPROGRESS'){
            chrome.browserAction.setBadgeText(request.data);
        }else if(request.type == 'SAVEDATAKW'){
            chrome.storage.local.get(['keywords'], function(obj){

                if(!obj.keywords){
                    obj.keywords=[];
                }

                obj.keywords.push(...request.data);

                chrome.storage.local.set({
                    keywords: obj.keywords
                }, function(){
                    console.log('保存成功');
                })
            });
        }else if(request.type == 'GETQUERYKEYWORDS'){
            chrome.storage.local.get(['query_keywords'], function(obj){
                sendMsg(tabId,{type:"GETQUERYKEYWORDS",msg:obj.query_keywords});
            })

        }
});

