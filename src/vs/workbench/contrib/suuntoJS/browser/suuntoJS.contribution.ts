/*---------------------------------------------------------------------------------------------
 *  Based on Visual Studio Code source code.
 *  Original Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License.
 *  Copyright (c) Suunto Corporation. All rights reserved.
 *  This software is proprietary and confidential. See LICENSE-SUUNTO.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Codicon } from '../../../../base/common/codicons.js';
import { localize, localize2 } from '../../../../nls.js';
import { Action2, MenuId, MenuRegistry, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { ISuuntoJSService } from '../../../services/suuntoJS/common/suuntoJS.js';

const SUUNTO_JS_ACTION_ID = 'suuntoJS.action';

class SuuntoJSAction extends Action2 {
	constructor() {
		super({
			id: SUUNTO_JS_ACTION_ID,
			title: localize2('suuntoJS.action', "SuuntoJS Action"),
			f1: false
		});
	}

	run(accessor: ServicesAccessor, ...args: unknown[]) {
		const suuntoJSService = accessor.get(ISuuntoJSService);

		suuntoJSService.showMessage('SuuntoJS Action 1 executed');
		console.log('SuuntoJS Action 1 executed');

		const actionType = args[0];
		switch (actionType) {
			case 'openSimulator':
				// suuntoJSService.openSimulator();
				break;
			case 'action2':
				break;
			default:
				break;
		}
	}
}

registerAction2(SuuntoJSAction);

MenuRegistry.appendMenuItem(MenuId.SuuntoJSContext, {
	group: '2_configuration',
	order: 0,
	command: {
		id: SUUNTO_JS_ACTION_ID,
		title: localize('suuntoJS.action.openSimulator', "Open SuuntoJS Simulator"),
		// arguments: ['openSimulator']
	},
	when: undefined
});

MenuRegistry.appendMenuItem(MenuId.SuuntoJSContext, {
	group: '2_configuration',
	order: 1,
	command: {
		id: SUUNTO_JS_ACTION_ID,
		title: localize('suuntoJS.action.action2', "Action 2"),
	},
	when: undefined
});
