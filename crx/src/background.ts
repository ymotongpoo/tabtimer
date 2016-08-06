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
/// <reference path="../node_modules/@types/node/index.d.ts" />
/// <reference path="../node_modules/@types/moment/index.d.ts" />

import * as url from 'url';
import * as moment from 'moment';

chrome.tabs.onActivated.addListener(onTabActivated);

class UserActivity {
    lastTabId: number;
    lastAction: moment.Moment;
    lastUrl: url.Url;

    constructor() {
        this.lastTabId = 0;
        this.lastAction = moment(new Date());
        this.lastUrl = url.parse("undefined");
    }
};

let activity = new UserActivity();

function onTabActivated(info: chrome.tabs.TabActiveInfo): void {
    const lastAction = activity.lastAction;

    chrome.tabs.get(info.tabId, (tab) => {
        if (tab.url === 'undefined') {
            return;
        }
        if (activity.lastTabId !== info.tabId) {
            const date = moment(new Date());
            const duration = date.diff(activity.lastAction) / 1000;
            const lastUrl = url.format(activity.lastUrl);
            console.log(`Last Tab: ${activity.lastTabId} => ${lastUrl} : ${duration}sec`);

            activity.lastTabId = info.tabId;
            activity.lastAction = date;
            activity.lastUrl = url.parse(tab.url);
        }
    });
}