/*---------------------------------------------------------------------------------------------
 *  Based on Visual Studio Code source code.
 *  Original Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License.
 *  Copyright (c) Suunto Corporation. All rights reserved.
 *  This software is proprietary and confidential. See LICENSE-SUUNTO.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ServicesAccessor } from '../../../../../editor/browser/editorExtensions.js';
import { Action2 } from '../../../../../platform/actions/common/actions.js';
import { ICommandService } from '../../../../../platform/commands/common/commands.js';
import { ISuuntoJSService } from '../../../../services/suuntoJS/common/suuntoJS.js';

export abstract class SuuntoJSBaseAction extends Action2 {
	protected async runAction(accessor: ServicesAccessor, actionType: string) {
		const suuntoJSService = accessor.get(ISuuntoJSService);
		const commandService: ICommandService = accessor.get(ICommandService);

		switch (actionType) {
			case 'openSimulator':
				// suuntoJSService.openSimulator();
				commandService.executeCommand('suuntoplus.simulatorDefault');
				suuntoJSService.showMessage('Opening SuuntoJS Simulator');
				break;
			case 'action2':
				suuntoJSService.showMessage('Executing Action 2');
				break;
			default:
				suuntoJSService.showMessage('Unknown action type');
				break;
		}
	}
}
