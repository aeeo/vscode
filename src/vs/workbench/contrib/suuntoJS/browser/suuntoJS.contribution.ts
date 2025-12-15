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

class SuuntoJSAction extends Action2 {
	constructor() {
		super({
			id: 'suuntoJS.action1',
			title: localize2('suuntoJS.action1', "SuuntoJS Action 1"),
			icon: Codicon.settings,
			f1: false
		});
	}

	run(accessor: ServicesAccessor) {
		const suuntoJSService = accessor.get(ISuuntoJSService);

		suuntoJSService.showMessage('SuuntoJS Action 1 executed');

		console.log('SuuntoJS Action 1 executed');
	}
}

registerAction2(SuuntoJSAction);

MenuRegistry.appendMenuItem(MenuId.SuuntoJSContext, {
	group: '2_configuration',
	order: 1,
	command: {
		id: 'suuntoJS.action1',
		title: localize('suuntoJS.action1', "SuuntoJS Action 1"),
		icon: Codicon.settings
	},
	when: undefined
});
