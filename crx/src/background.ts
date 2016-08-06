//    Copyright 2016 Yoshi Yamaguchi
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

/// <reference path="../node_modules/@types/chrome/index.d.ts" />

chrome.tabs.onActivated.addListener(onTabActivated);

function onTabActivated(info: chrome.tabs.TabActiveInfo): void {
    chrome.tabs.get(info.tabId, (tab) => {
        const url = tab.url;
        console.log(`activated: ${url}`);
    })
}