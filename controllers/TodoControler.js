const data = require('../public/data.json');
const presetData = require('../public/preset.json');
module.exports = {

    readDataFromJson(callback) {
        const string = JSON.stringify(data);
        const key = string.split(',');
        const array = [];
        const returnObject = [];
        key.forEach(element => {
            const string2 = element.split(':');
            let str, value;
            string2.forEach(element => {
                if (element.includes('{')) {
                    str = element.replace(/{/g, '');
                } else if (element.includes('}')) {
                    if (isNaN(element.replace(/}/g, ''))) {
                        str = element.replace(/}/g, '');
                    } else {
                        value = element.replace(/}/g, '');
                    }
                } else if (element.includes('"')) {
                    if (isNaN(element.replace(/"/g, ''))) {
                        str = element.replace(/"/g, '');
                    } else {
                        value = element.replace(/"/g, '');
                    }
                } else {
                    value = element;
                }
            });
            if (isNaN(str)) {
                array.push({ 'key': str, 'value': value });
            }

        });
        const finalObj = [];
        let presets;
        let weighers;
        let weight = 0;
        array.forEach(data1 => {
            if (data1.key !== undefined) {
                let preset;
                presetData.forEach(element => {
                    if (data1.key.includes(element.PRESET)) {
                        preset = element.data;
                    }
                });
                presets = preset;
                weighers = data1.key.charAt(data1.key.indexOf('_PR') - 1);
                weight = data1.value;
            }
            finalObj.push({ 'Preset': presets, 'Weigher': weighers, 'Weight': weight });
        });

        presetData.forEach(element => {
            let sum = 0;
            let weighers1;
            finalObj.forEach(value => {
                if (element.data === value['Preset'] && value['Weigher'] !== undefined) {
                    presets = value['Preset'];
                    sum = sum + Number(value['Weight']);
                    if (weighers1 !== undefined) {
                        weighers1 = weighers1 + ', Weigher ' + value['Weigher'];
                    } else {
                        weighers1 = 'Weigher ' + value['Weigher'];
                    }
                }
            });

            if (weighers1 !== undefined) {
                returnObject.push({ 'Preset': presets, 'Weighers': weighers1, 'Total KG Per Hour': sum });
            }

        });
        callback(null, returnObject);
    }

};