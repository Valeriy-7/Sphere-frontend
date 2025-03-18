/*import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

export default maskitoPhoneOptionsGenerator({
    metadata,
    strict: false,
    countryIsoCode: 'RU',
});*/

import { MaskitoOptions } from '@maskito/core';

export const digitsOnlyMask: MaskitoOptions = {
  mask: /^[+\d](?:.*\d)?$/,
};
