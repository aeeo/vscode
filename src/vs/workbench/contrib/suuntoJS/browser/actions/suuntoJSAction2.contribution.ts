/*---------------------------------------------------------------------------------------------
 *  Based on Visual Studio Code source code.
 *  Original Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License.
 *  Copyright (c) Suunto Corporation. All rights reserved.
 *  This software is proprietary and confidential. See LICENSE-SUUNTO.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../../nls.js';
import { MenuId, MenuRegistry, registerAction2 } from '../../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../../platform/instantiation/common/instantiation.js';
import { SuuntoJSBaseAction } from './suuntoJSBaseAction.js';

const SUUNTO_JS_ACTION2_ID = 'suuntoJS.action2';

class SuuntoJSAction2 extends SuuntoJSBaseAction {
	constructor() {
		super({
			id: SUUNTO_JS_ACTION2_ID,
			title: localize2('suuntoJS.action.action2', "Action 2"),
			f1: false
		});
	}

	run(accessor: ServicesAccessor) {
		this.runAction(accessor, 'action2');
	}
}

export function registerSuuntoJSAction2Action(): void {
	MenuRegistry.appendMenuItem(MenuId.SuuntoJSContext, {
		group: '2_configuration',
		order: 1,
		command: {
			id: SUUNTO_JS_ACTION2_ID,
			title: localize('suuntoJS.action.action2', "Action 2"),
		},
		when: undefined
	});

	registerAction2(SuuntoJSAction2);
}
