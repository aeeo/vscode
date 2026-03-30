/*---------------------------------------------------------------------------------------------
 *  Based on Visual Studio Code source code.
 *  Original Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License.
 *  Copyright (c) Suunto Corporation. All rights reserved.
 *  This software is proprietary and confidential. See LICENSE-SUUNTO.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerSuuntoJSAction2Action } from './actions/suuntoJSAction2.contribution.js';
import { registerSuuntoJSSimulatorAction } from './actions/suuntoJSSimulator.contribution.js';
import { registerSuuntoJSBuildAction } from './actions/suuntoJSBuild.contribution.js';

registerSuuntoJSSimulatorAction();
registerSuuntoJSBuildAction();
registerSuuntoJSAction2Action();
