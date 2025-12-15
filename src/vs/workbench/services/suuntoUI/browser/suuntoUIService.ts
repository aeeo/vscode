/*---------------------------------------------------------------------------------------------
 *  Based on Visual Studio Code source code.
 *  Original Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License.
 *  Copyright (c) Suunto Corporation. All rights reserved.
 *  This software is proprietary and confidential. See LICENSE-SUUNTO.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { ISuuntoUIService } from '../common/suuntoUI.js';
import { INotificationService } from '../../../../platform/notification/common/notification.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';

export class SuuntoUIService extends Disposable implements ISuuntoUIService {
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

registerSingleton(ISuuntoUIService, SuuntoUIService, InstantiationType.Eager);
