/* eslint-disable no-useless-escape */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-throw-literal */
/* eslint-disable valid-typeof */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// import { auth, EmailAuthProvider } from '@database/Firebase';

const String = 'string';
const Number = 'number';
const Object = 'object';
const DateType = 'date';
const Array = 'object';
const ID_FAVORITE = '1b4db7eb-4057-5ddf-91e0-36dec72071f5';

const keys = obj => {
  const keysInObj = [];
  for (const key in obj) {
    keysInObj.push(key);
  }
  return keysInObj;
};

const validateDataType = (fields, types, isUpdate) => {
  for (const key in fields) {
    const props = types[key];
    const value = fields[key];
    // console.log(props, value);

    const findProp = keys(types).includes(key);
    if (!findProp) {
      throw `field ${key} not declared in Schema`;
    }

    if (props.type === DateType && typeof value !== Number && value) {
      const date = new window.Date(value);
      // console.log(date, value);
      if (!date.getDate()) throw `${key} is not ${props.type}`;
    }

    if (typeof value !== props.type) {
      throw `field ${key} is not ${props.type}`;
    }

    if (!isUpdate && props.isRequired && !value) {
      throw `field ${key} Is Required`;
    }
  }
  if (!isUpdate) {
    for (const key in types) {
      const prop = types[key];
      if (prop.isRequired) {
        const findProp = keys(fields).includes(key);
        if (!findProp) throw `field ${key} Is Required`;
      }
    }
  }
  return fields;
};

const unionAndCompareArrays = array => {
  if (typeof array[0].length === 'number') {
    const arrayTmp = [];
    array.forEach(arr => arr.forEach(arr2 => arrayTmp.push(arr2)));
    array = arrayTmp;
  }
  const result = [];
  const duplicates = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const arrayFiltred = array.filter(
      (arr, i2) => JSON.stringify(element) === JSON.stringify(arr) && i2 !== i
    );
    if (!arrayFiltred.length) {
      result.push(element);
    } else if (!duplicates.includes(JSON.stringify(arrayFiltred[0]))) {
      duplicates.push(JSON.stringify(arrayFiltred[0]));
    }
  }
  let oneOfDuplicates = [];
  if (duplicates.length) {
    oneOfDuplicates = duplicates.map(c => JSON.parse(c));
  }
  return [].concat([...result, ...oneOfDuplicates]);
};

const currencyFormat = (value, decimal = 2, prefix = '') => {
  if (value === '') {
    return '';
  }
  value = parseFloat(value) || 0;
  value = value
    .toFixed(decimal)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return `${prefix}${value}`;
};

const unCurrencyFormat = (value = '') => {
  let unFormatValue = value.replace(/\s/g, '');
  if (unFormatValue.indexOf(',') > -1) {
    unFormatValue = unFormatValue.substring(0, unFormatValue.indexOf(','));
  }
  unFormatValue = unFormatValue.replace(/[a-zA-Z]|[!@#$%^&*$(),.?":{}|<>]/g, '');
  return unFormatValue;
};

const validateEmail = email => {
  const regExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email);
};

/* const reauthenticate = password => {
  const user = auth().currentUser;
  const credentials = EmailAuthProvider.credential(user.email, password);
  return user.reauthenticateWithCredential(credentials);
}; */

const getBaseUrlApi = () => {
  const env = process.env.NEXT_APP_ENV;
  // console.log('env', env);
  let url = '';
  if (env === 'dev') {
    url = 'http://localhost:3000/';
  } else if (env === 'test') {
    url = 'https://test.kcfashion.store/';
  } else if (env === 'production') {
    url = 'https://kcfashion.store/';
  } else {
    url = `${window.location.protocol}//${window.location.host}`;
  }
  return url;
};

const randomDelay = () =>
  new Promise(resolve => {
    const max = 350;
    const min = 100;
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;

    setTimeout(resolve, delay);
  });

const getImages = UPC => {
  let allImages = localStorage.getItem('allImages');
  if (allImages) {
    allImages = JSON.parse(allImages);
    const result = allImages.filter(img => img.includes(UPC));
    if (result.length) {
      return result;
    }
  }
  return [
    'https://firebasestorage.googleapis.com/v0/b/ihuman360.appspot.com/o/default.jpg?alt=media&token=2f326bcd-2008-4523-8239-3185fd9c7523'
  ];
};

const getSlugName = (name, id = '0') => {
  const newName = name.trim().replace(/ /gi, '-').replace(/\//gi, '-');
  return `${newName}-${id}`;
};

const getFavorite = productID => {
  const favorites = localStorage.getItem(ID_FAVORITE);
  if (!favorites) return false;
  const favoritesParsed = JSON.parse(favorites);
  return favoritesParsed.includes(productID);
};

const toggleFavorite = (productID, callBack = () => {}) => {
  const favorites = localStorage.getItem(ID_FAVORITE);
  let favoritesParsed = JSON.parse(favorites) || [];
  if (favoritesParsed.includes(productID)) {
    favoritesParsed = favoritesParsed.filter(pId => pId !== productID);
  } else {
    favoritesParsed.push(productID);
  }
  localStorage.setItem(ID_FAVORITE, JSON.stringify(favoritesParsed));
  callBack();
};

const sortArrayObjet = (array, orderBy) => {
  array.sort((a, b) => {
    if (a[orderBy] > b[orderBy]) {
      return 1;
    }
    if (a[orderBy] < b[orderBy]) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return array;
};

const capitalCase = str => {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

module.exports = {
  String,
  Number,
  Object,
  DateType,
  Array,
  validateDataType,
  unionAndCompareArrays,
  currencyFormat,
  unCurrencyFormat,
  validateEmail,
  // reauthenticate,
  getBaseUrlApi,
  randomDelay,
  getImages,
  getSlugName,
  getFavorite,
  toggleFavorite,
  sortArrayObjet,
  capitalCase
};
