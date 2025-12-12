/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Codicon } from '../../../../base/common/codicons.js';
import { localize, localize2 } from '../../../../nls.js';
import { Action2, MenuId, MenuRegistry, registerAction2 } from '../../../../platform/actions/common/actions.js';

class SuuntoJSAction extends Action2 {
	constructor() {
		super({
			id: 'suuntojs.action1',
			title: localize2('suuntojs.action1', "SuuntoJS Action 1"),
			icon: Codicon.settings,
			f1: false
		});
	}

	run(accessor: any) {
		console.log('SuuntoJS Action 1 executed');
	}
}

registerAction2(SuuntoJSAction);

MenuRegistry.appendMenuItem(MenuId.SuuntoJSContext, {
	group: '2_configuration',
	order: 1,
	command: {
		id: 'suuntojs.action1',
		title: localize('suuntojs.action1', "SuuntoJS Action 1"),
		icon: Codicon.settings
	},
	when: undefined
});
