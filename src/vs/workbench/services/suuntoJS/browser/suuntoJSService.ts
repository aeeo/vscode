/*---------------------------------------------------------------------------------------------
 *  Based on Visual Studio Code source code.
 *  Original Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License.
 *  Copyright (c) Suunto Corporation. All rights reserved.
 *  This software is proprietary and confidential. See LICENSE-SUUNTO.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { ISuuntoJSService } from '../common/suuntoJS.js';
import { INotificationService } from '../../../../platform/notification/common/notification.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';

export class SuuntoJSService extends Disposable implements ISuuntoJSService {
	constructor(
		@INotificationService private readonly notificationService: INotificationService
	) {
		super();
	}

	showMessage(message: string): void {
		this.notificationService.info(message);
	}

	override dispose(): void {
		super.dispose();
	}
}

registerSingleton(ISuuntoJSService, SuuntoJSService, InstantiationType.Eager);
