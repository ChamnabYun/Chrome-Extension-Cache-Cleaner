chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg === "clearCache") {
        toclean({origins: request.origins, data: request.data})
    }
    sendResponse({farewell: true});
});

function toclean({origins, data}) {
    chrome.browsingData.remove({
        origins
    }, data);
}