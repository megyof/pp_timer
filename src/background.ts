chrome.action.onClicked.addListener(() => chrome.browserAction.setPopup({ popup: 'popup.html' })); // open popup
chrome.runtime.onInstalled.addListener(({ reason }) => reason === chrome.runtime.OnInstalledReason.INSTALL && chrome.runtime.openOptionsPage()); // open options
