/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';

export const ISuuntoUIService = createDecorator<ISuuntoUIService>('ISuuntoUIService');

export interface ISuuntoUIService {
	/**
	 * Show a message to the user.
	 */
	showMessage(message: string): void;
}
