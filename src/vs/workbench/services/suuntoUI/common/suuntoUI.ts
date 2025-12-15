/*---------------------------------------------------------------------------------------------
 *  Based on Visual Studio Code source code.
 *  Original Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License.
 *  Copyright (c) Suunto Corporation. All rights reserved.
 *  This software is proprietary and confidential. See LICENSE-SUUNTO.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';

export const ISuuntoUIService = createDecorator<ISuuntoUIService>('ISuuntoUIService');

export interface ISuuntoUIService {
	/**
	 * Show a message to the user.
	 */
	showMessage(message: string): void;
}
