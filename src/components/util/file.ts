import { ObjType } from './types';
import { TFunction } from 'i18next/typescript/t';

function convertCSVToJson(data: Array<string>) {
  let header, i, len, idx, length, obj: ObjType, temp;
  const json = [];

  if (data && Array.isArray(data) && typeof data[0] === 'string') {
    header = data[0].split(',');

    for (i = 1, len = data.length; i < len; i++) {
      temp = data[i].split(',');
      obj = {};
      for (idx = 0, length = header.length; idx < length; idx++) {
        if (['true', 'false'].indexOf(temp[idx]) > -1) {
          obj[header[idx]] = temp[idx] === 'true';
        } else {
          obj[header[idx]] = temp[idx];
        }
      }

      json.push(obj);
    }
  } else {
    //toastMgrService.setMessage("It's not CSV Format file!! Check the File!!", 5);
  }

  return json;
}

function convertJsonToCSV(data: Array<ObjType>, t: TFunction) {
  let csv = '',
    header,
    i,
    len,
    obj,
    values;

  if (Array.isArray(data) && typeof data[0] === 'object') {
    const arr = [];
    if (typeof t === 'function') {
      header = Object.keys(data[0])
        .map(k => t(k))
        .join(',');
      arr.push(header);
    } else {
      header = Object.keys(data[0]).join(',');
      arr.push(header);
    }

    for (i = 0, len = data.length; i < len; i++) {
      obj = data[i];
      values = Object.values(obj)
        .map(v => `"${v}"`)
        .join(',');
      arr.push(values);
    }

    csv = arr.join('\n');
  }
  return csv;
}

function exportFn(data: Array<ObjType>, option: ObjType, t: TFunction) {
  if (data) {
    option.filename = option.filename || 'export.csv';
    option.type = option.type || 'text/csv';
    if (option.type === 'text/csv') {
      option.data = convertJsonToCSV(data || '', t);
    } else {
      if (typeof data == 'object') {
        option.data = JSON.stringify(data || '');
      }
    }
    // window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, onInitFs(option), errorHandler);
    saveFile(option);
  }
}

async function saveFile(option: ObjType) {
  const accept: ObjType = {};
  const options = {
    suggestedName: option.filename,
    types: [
      {
        description: 'Export CSV File',
        accept: accept,
      },
    ],
  };

  accept[option.type] = ['.csv'];

  try {
    const newHandle = await (<any>window).showSaveFilePicker(options);
    const writableStream = await newHandle.createWritable();
    const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const bb = new Blob([BOM, option.data], { type: option.type });

    await writableStream.write(bb);
    await writableStream.close();
  } catch (err) {
    console.log(err);
  }
}

export { exportFn };
