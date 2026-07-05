const display = document.getElementById('display');
const subDisplay = document.getElementById('subDisplay');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistory');
const themeToggle = document.getElementById('themeToggle');
const installButton = document.getElementById('installButton');
const languageToggle = document.getElementById('languageToggle');
const headerSubtitle = document.getElementById('headerSubtitle');
const copyResultButton = document.getElementById('copyResult');
const scientificToggle = document.getElementById('scientificToggle');
const historyToggle = document.getElementById('historyToggle');
const memoryIndicator = document.getElementById('memoryIndicator');
const connectionStatus = document.getElementById('connectionStatus');
const userNameInput = document.getElementById('userName');
const buttons = document.querySelectorAll('.btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const panes = document.querySelectorAll('.pane');
const unitCategory = document.getElementById('unitCategory');
const unitValue = document.getElementById('unitValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const unitResult = document.getElementById('unitResult');
const convertButton = document.getElementById('convertButton');
const currencyAmount = document.getElementById('currencyAmount');
const currencyFrom = document.getElementById('currencyFrom');
const currencyTo = document.getElementById('currencyTo');
const currencyResult = document.getElementById('currencyResult');
const currencyStatus = document.getElementById('currencyStatus');
const currencyButton = document.getElementById('currencyButton');
const percentMode = document.getElementById('percentMode');
const percentAmount = document.getElementById('percentAmount');
const percentRate = document.getElementById('percentRate');
const percentResult = document.getElementById('percentResult');
const percentButton = document.getElementById('percentButton');
const emiPrincipal = document.getElementById('emiPrincipal');
const emiRate = document.getElementById('emiRate');
const emiYears = document.getElementById('emiYears');
const emiResult = document.getElementById('emiResult');
const emiButton = document.getElementById('emiButton');
const gstAmount = document.getElementById('gstAmount');
const gstRate = document.getElementById('gstRate');
const gstType = document.getElementById('gstType');
const gstResult = document.getElementById('gstResult');
const gstButton = document.getElementById('gstButton');
const dobInput = document.getElementById('dobInput');
const ageResult = document.getElementById('ageResult');
const ageButton = document.getElementById('ageButton');
const bmiWeight = document.getElementById('bmiWeight');
const bmiHeight = document.getElementById('bmiHeight');
const bmiResult = document.getElementById('bmiResult');
const bmiButton = document.getElementById('bmiButton');
const graphExpression = document.getElementById('graphExpression');
const graphExpressionsInput = document.getElementById('graphExpressions');
const graphQuickPickers = document.getElementById('graphQuickPickers');
const graphKeypad = document.querySelector('.graph-keypad');
const graphButton = document.getElementById('graphButton');
const graphZoomIn = document.getElementById('graphZoomIn');
const graphZoomOut = document.getElementById('graphZoomOut');
const graphReset = document.getElementById('graphReset');
const graphCanvas = document.getElementById('graphCanvas');
const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const photoResult = document.getElementById('photoResult');
const cameraButton = document.getElementById('cameraButton');
const capturePhotoButton = document.getElementById('capturePhotoButton');
const closeCameraButton = document.getElementById('closeCameraButton');
const photoVideo = document.getElementById('photoVideo');
const googleSearchButton = document.getElementById('googleSearchButton');
let selectedPhotoFile = null;
let cameraStream = null;

let expression = '';
let history = JSON.parse(localStorage.getItem('ai-calc-history') || '[]');
let memory = Number(localStorage.getItem('ai-calc-memory') || 0);
let language = localStorage.getItem('ai-calc-language') || 'en';
let theme = localStorage.getItem('ai-calc-theme') || 'dark';
let userName = localStorage.getItem('ai-calc-user-name') || '';
let deferredInstallPrompt = null;

const translations = {
  en: {
    appTitle: 'RO Calculator',
    appSubtitle: 'Fast • Smart • Elegant',
    navCalculator: 'Calculator',
    navConverter: 'Converter',
    navFinance: 'Finance',
    navHealth: 'Health',
    navGraph: 'Graph',
    navPhoto: 'Photo',
    helperScientific: 'Scientific',
    helperCopy: 'Copy',
    historyTitle: 'History',
    historyClear: 'Clear',
    converterTitle: 'Unit Converter',
    converterCategory: 'Category',
    converterValue: 'Value',
    converterFrom: 'From',
    converterTo: 'To',
    convertButton: 'Convert',
    currencyTitle: 'Currency Converter',
    currencyAmount: 'Amount',
    currencyFrom: 'From',
    currencyTo: 'To',
    percentageTitle: 'Percentage Calculator',
    percentMode: 'Mode',
    percentAmount: 'Amount',
    percentRate: 'Rate',
    calculateButton: 'Calculate',
    emiTitle: 'EMI Calculator',
    emiPrincipal: 'Loan Amount',
    emiRate: 'Interest Rate (%)',
    emiYears: 'Years',
    gstTitle: 'GST Calculator',
    gstAmount: 'Amount',
    gstRate: 'GST Rate (%)',
    gstType: 'Type',
    ageTitle: 'Age Calculator',
    dobLabel: 'Date of Birth',
    bmiTitle: 'BMI Calculator',
    bmiWeight: 'Weight (kg)',
    bmiHeight: 'Height (cm)',
    graphTitle: 'Graph Calculator',
    graphExpression: 'Function',
    plotButton: 'Plot Graph',
    photoTitle: 'Photo Calculator',
    photoText: 'Upload photos of any issues only in online mode.'
  },
  hi: {
    appTitle: 'एआई कैलकुलेटर',
    appSubtitle: 'तेज़ • स्मार्ट • आकर्षक',
    navCalculator: 'कैलकुलेटर',
    navConverter: 'कन्वर्टर',
    navFinance: 'वित्त',
    navHealth: 'स्वास्थ्य',
    navGraph: 'ग्राफ',
    navPhoto: 'फोटो',
    helperScientific: 'वैज्ञानिक',
    helperCopy: 'कॉपी',
    historyTitle: 'इतिहास',
    historyClear: 'साफ करें',
    converterTitle: 'यूनिट कन्वर्टर',
    converterCategory: 'श्रेणी',
    converterValue: 'मान',
    converterFrom: 'से',
    converterTo: 'तक',
    convertButton: 'कन्वर्ट करें',
    currencyTitle: 'मुद्रा कन्वर्टर',
    currencyAmount: 'राशि',
    currencyFrom: 'से',
    currencyTo: 'तक',
    percentageTitle: 'प्रतिशत कैलकुलेटर',
    percentMode: 'मोड',
    percentAmount: 'राशि',
    percentRate: 'दर',
    calculateButton: 'गणना करें',
    emiTitle: 'ईएमआई कैलकुलेटर',
    emiPrincipal: 'ऋण राशि',
    emiRate: 'ब्याज दर (%)',
    emiYears: 'वर्ष',
    gstTitle: 'GST कैलकुलेटर',
    gstAmount: 'राशि',
    gstRate: 'GST दर (%)',
    gstType: 'प्रकार',
    ageTitle: 'आयु कैलकुलेटर',
    dobLabel: 'जन्म तिथि',
    bmiTitle: 'BMI कैलकुलेटर',
    bmiWeight: 'वज़न (kg)',
    bmiHeight: 'ऊँचाई (cm)',
    graphTitle: 'ग्राफ कैलकुलेटर',
    graphExpression: 'फलन',
    plotButton: 'ग्राफ बनाएं',
    photoTitle: 'फोटो कैलकुलेटर',
    photoText: 'ऑफ़लाइन मोड में जांच के लिए गणित समस्या वाली फोटो अपलोड करें।'
  }
};

const unitTables = {
  length: [
    ['meter', 1],
    ['kilometer', 1000],
    ['centimeter', 0.01],
    ['mile', 1609.344],
    ['foot', 0.3048]
  ],
  weight: [
    ['kilogram', 1],
    ['gram', 0.001],
    ['pound', 0.45359237],
    ['ounce', 0.0283495231],
    ['ton', 1000]
  ],
  temperature: [
    ['celsius', 1],
    ['fahrenheit', 1],
    ['kelvin', 1]
  ],
  speed: [
    ['meterPerSecond', 1],
    ['kilometerPerHour', 0.2777777778],
    ['milePerHour', 0.44704],
    ['knot', 0.5144444444]
  ],
  area: [
    ['squareMeter', 1],
    ['squareKilometer', 1000000],
    ['hectare', 10000],
    ['acre', 4046.8564224],
    ['squareFoot', 0.09290304]
  ]
};

const unitLabels = {
  en: {
    meter: 'Meter',
    kilometer: 'Kilometer',
    centimeter: 'Centimeter',
    mile: 'Mile',
    foot: 'Foot',
    kilogram: 'Kilogram',
    gram: 'Gram',
    pound: 'Pound',
    ounce: 'Ounce',
    ton: 'Ton',
    celsius: 'Celsius',
    fahrenheit: 'Fahrenheit',
    kelvin: 'Kelvin',
    meterPerSecond: 'm/s',
    kilometerPerHour: 'km/h',
    milePerHour: 'mph',
    knot: 'knot',
    squareMeter: 'Square Meter',
    squareKilometer: 'Square Kilometer',
    hectare: 'Hectare',
    acre: 'Acre',
    squareFoot: 'Square Foot'
  },
  hi: {
    meter: 'मीटर',
    kilometer: 'किलोमीटर',
    centimeter: 'सेंटीमीटर',
    mile: 'मील',
    foot: 'फुट',
    kilogram: 'किलोग्राम',
    gram: 'ग्राम',
    pound: 'पाउंड',
    ounce: 'औंछ',
    ton: 'टन',
    celsius: 'सेल्सियस',
    fahrenheit: 'फारेनहाइट',
    kelvin: 'केल्विन',
    meterPerSecond: 'मीटर/सेकेंड',
    kilometerPerHour: 'किमी/घंटा',
    milePerHour: 'मील/घंटा',
    knot: 'नॉट',
    squareMeter: 'वर्ग मीटर',
    squareKilometer: 'वर्ग किलोमीटर',
    hectare: 'हेक्टेयर',
    acre: 'एकड़',
    squareFoot: 'वर्ग फुट'
  }
};

const rates = {
  INR: 1,
  USD: 95.22,
  EUR: 108.89,
  GBP: 106.2,
  JPY: 0.57,
  AED: 22.7
};

const fallbackRates = {
  INR: 1,
  USD: 95.22,
  EUR: 108.89,
  GBP: 106.2,
  JPY: 0.57,
  AED: 22.7
};

async function fetchCurrencyRates() {
  const symbols = ['USD', 'EUR', 'GBP', 'JPY', 'AED'];
  const apiUrl = `https://api.exchangerate.host/latest?base=INR&symbols=${symbols.join(',')}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || !data.rates) {
      throw new Error('Invalid currency API response');
    }

    rates.INR = 1;
    symbols.forEach((code) => {
      const value = Number(data.rates[code]);
      if (Number.isFinite(value) && value > 0) {
        rates[code] = 1 / value;
      } else {
        rates[code] = fallbackRates[code];
      }
    });

    const updatedAt = new Date().toLocaleString(language === 'hi' ? 'hi-IN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    currencyStatus.textContent = language === 'hi'
      ? `लाइव दरें अपडेट हुईं: ${updatedAt}`
      : `Live rates updated: ${updatedAt}`;
    convertCurrency();
  } catch (error) {
    Object.assign(rates, fallbackRates);
    currencyStatus.textContent = language === 'hi'
      ? 'लाइव दरें लोड नहीं हो पाईं। फॉल बैक उपयोग हो रहा है।'
      : 'Unable to load live rates. Using fallback values.';
    convertCurrency();
  }
}

function scheduleCurrencyRateUpdates() {
  fetchCurrencyRates();
  setInterval(fetchCurrencyRates, 60000);
}

function persistState() {
  localStorage.setItem('ai-calc-history', JSON.stringify(history));
  localStorage.setItem('ai-calc-memory', String(memory));
  localStorage.setItem('ai-calc-language', language);
  localStorage.setItem('ai-calc-theme', theme);
  localStorage.setItem('ai-calc-user-name', userName);
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return 'Error';
  }
  const absValue = Math.abs(value);
  const precision = absValue >= 1000 ? 2 : absValue >= 1 ? 3 : absValue >= 0.01 ? 4 : 6;
  const rounded = Number(value).toFixed(precision);
  return rounded.replace(/(\.\d*?[1-9])0+$|\.0+$/g, '$1');
}

function adjustDisplayFontSize() {
  const rawValue = display.value || '0';
  const length = rawValue.replace(/[^ -~]/g, '').length;
  let fontSize = 2.35;

  if (length > 12) fontSize = 1.8;
  if (length > 18) fontSize = 1.45;
  if (length > 24) fontSize = 1.2;

  display.style.fontSize = `${Math.max(1.1, fontSize)}rem`;
}

function updateDisplays() {
  display.value = expression || '0';
  adjustDisplayFontSize();

  if (expression) {
    try {
      const liveResult = calculateValue(expression);
      if (Number.isFinite(liveResult)) {
        const rounded = formatNumber(liveResult);
        subDisplay.textContent = `= ${rounded}`;
        subDisplay.classList.add('active');
      } else {
        subDisplay.textContent = '';
        subDisplay.classList.remove('active');
      }
    } catch (error) {
      subDisplay.textContent = '';
      subDisplay.classList.remove('active');
    }
  } else {
    subDisplay.textContent = '0';
    subDisplay.classList.remove('active');
  }
}

function renderHistory() {
  historyList.innerHTML = '';
  if (!history.length) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'history-item';
    emptyItem.textContent = language === 'hi' ? 'अब तक कोई गणना नहीं' : 'No calculations yet';
    historyList.appendChild(emptyItem);
    return;
  }

  history.slice().reverse().forEach((item) => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function addToHistory(entry) {
  history.push(entry);
  if (history.length > 10) {
    history.shift();
  }
  persistState();
  renderHistory();
}

function updateMemoryIndicator() {
  if (memoryIndicator) {
    memoryIndicator.textContent = `M: ${memory}`;
  }
  persistState();
}

function calculateValue(expr) {
  const sanitized = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/√\(/g, 'Math.sqrt(')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/%/g, '*0.01')
    .replace(/\^/g, '**')
    .replace(/x²/g, '**2');

  return Function('"use strict"; return (' + sanitized + ')')();
}

function evaluateExpression() {
  try {
    const result = calculateValue(expression);
    if (!Number.isFinite(result)) {
      display.value = expression || '0';
      subDisplay.textContent = '';
      subDisplay.classList.remove('active');
      return expression || '0';
    }

    const rounded = formatNumber(result);
    const expressionText = expression || '0';
    display.value = expressionText;
    subDisplay.textContent = `${expressionText} = ${rounded}`;
    subDisplay.classList.add('active');
    addToHistory(`${expressionText} = ${rounded}`);
    return expressionText;
  } catch (error) {
    display.value = expression || '0';
    subDisplay.textContent = '';
    subDisplay.classList.remove('active');
    return expression || '0';
  }
}

function appendValue(rawValue, visibleValue) {
  expression += visibleValue ?? rawValue;
  updateDisplays();
}

function toggleLanguage() {
  language = language === 'en' ? 'hi' : 'en';
  applyLanguage();
  persistState();
}

function applyLanguage() {
  document.documentElement.lang = language;
  const mapping = translations[language];
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (mapping[key]) {
      element.textContent = mapping[key];
    }
  });
  document.querySelectorAll('[data-i18n-option]').forEach((element) => {
    const key = element.getAttribute('data-i18n-option');
    if (mapping[key]) {
      element.textContent = mapping[key];
    }
  });
  if (languageToggle) {
    languageToggle.textContent = language === 'en' ? 'EN' : 'हि';
  }
  updateHeaderSubtitle();
  renderHistory();
  populateUnits();
}

function applyTheme() {
  document.body.classList.toggle('light', theme === 'light');
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀';
  }
  persistState();
}

function updateHeaderSubtitle() {
  if (!headerSubtitle) {
    return;
  }

  const trimmedName = userName.trim();
  headerSubtitle.textContent = trimmedName ? `Welcome, ${trimmedName}` : translations[language].appSubtitle;
}

function syncUserNameField() {
  if (userNameInput) {
    userNameInput.value = userName;
  }
  updateHeaderSubtitle();
  persistState();
}

function switchPane(targetId) {
  tabButtons.forEach((button) => button.classList.toggle('active', button.dataset.target === targetId));
  panes.forEach((pane) => pane.classList.toggle('active', pane.id === targetId));
}

function populateUnits() {
  const category = unitCategory.value;
  const entries = unitTables[category] || unitTables.length;
  const labels = unitLabels[language];
  const options = entries.map(([value]) => `<option value="${value}">${labels[value] || value}</option>`).join('');
  fromUnit.innerHTML = options;
  toUnit.innerHTML = options;
  toUnit.selectedIndex = 1 < entries.length ? 1 : 0;
}

function convertUnits() {
  const category = unitCategory.value;
  const amount = Number(unitValue.value);
  const from = fromUnit.value;
  const to = toUnit.value;
  if (Number.isNaN(amount)) {
    unitResult.textContent = language === 'hi' ? 'कृपया वैध मान दर्ज करें।' : 'Please enter a valid value.';
    return;
  }

  if (category === 'temperature') {
    const celsiusValue = convertTemperature(amount, from, 'celsius');
    const result = convertTemperature(celsiusValue, 'celsius', to);
    unitResult.textContent = `${amount} ${fromUnit.options[fromUnit.selectedIndex].text} = ${formatNumber(result)} ${toUnit.options[toUnit.selectedIndex].text}`;
    addToHistory(`${amount} ${from} = ${formatNumber(result)} ${to}`);
    return;
  }

  const baseValue = amount * (unitTables[category].find(([value]) => value === from)[1]);
  const converted = baseValue / (unitTables[category].find(([value]) => value === to)[1]);
  unitResult.textContent = `${amount} ${fromUnit.options[fromUnit.selectedIndex].text} = ${formatNumber(converted)} ${toUnit.options[toUnit.selectedIndex].text}`;
  addToHistory(`${amount} ${from} = ${formatNumber(converted)} ${to}`);
}

function convertTemperature(value, from, to) {
  if (from === 'celsius') {
    return to === 'fahrenheit' ? (value * 9) / 5 + 32 : to === 'kelvin' ? value + 273.15 : value;
  }
  if (from === 'fahrenheit') {
    const celsius = ((value - 32) * 5) / 9;
    return to === 'celsius' ? celsius : to === 'kelvin' ? celsius + 273.15 : value;
  }
  if (from === 'kelvin') {
    const celsius = value - 273.15;
    return to === 'celsius' ? celsius : to === 'fahrenheit' ? (celsius * 9) / 5 + 32 : value;
  }
  return value;
}

function convertCurrency() {
  const amount = Number(currencyAmount.value);
  const from = currencyFrom.value;
  const to = currencyTo.value;
  if (Number.isNaN(amount)) {
    currencyResult.textContent = language === 'hi' ? 'कृपया वैध राशि दर्ज करें।' : 'Please enter a valid amount.';
    return;
  }
  const converted = amount * (rates[from] / rates[to]);
  currencyResult.textContent = `${amount} ${from} = ${formatNumber(converted)} ${to}`;
  addToHistory(`${amount} ${from} = ${formatNumber(converted)} ${to}`);
}

function calculatePercentage() {
  const amount = Number(percentAmount.value);
  const rate = Number(percentRate.value);
  const mode = percentMode.value;
  if (Number.isNaN(amount) || Number.isNaN(rate)) {
    percentResult.textContent = language === 'hi' ? 'कृपया वैध मान दर्ज करें।' : 'Please enter valid values.';
    return;
  }
  if (mode === 'discount') {
    const discounted = amount - (amount * rate) / 100;
    percentResult.textContent = `${language === 'hi' ? 'छूट वाला मूल्य' : 'Discounted value'}: ${formatNumber(discounted)}`;
    addToHistory(`Discount ${rate}% on ${amount} = ${formatNumber(discounted)}`);
  } else if (mode === 'gst') {
    const tax = (amount * rate) / 100;
    const total = amount + tax;
    percentResult.textContent = `${language === 'hi' ? 'GST' : 'GST'}: ${formatNumber(tax)} | ${language === 'hi' ? 'कुल' : 'Total'}: ${formatNumber(total)}`;
    addToHistory(`GST ${rate}% on ${amount} = ${formatNumber(total)}`);
  } else {
    const profit = amount * (rate / 100);
    percentResult.textContent = `${language === 'hi' ? 'लाभ/हानि' : 'Profit/Loss'}: ${formatNumber(profit)}`;
    addToHistory(`Profit/Loss ${rate}% on ${amount} = ${formatNumber(profit)}`);
  }
}

function calculateEmi() {
  const principal = Number(emiPrincipal.value);
  const rate = Number(emiRate.value) / 100 / 12;
  const years = Number(emiYears.value);
  const months = years * 12;
  if (!principal || !rate || !months) {
    emiResult.textContent = language === 'hi' ? 'कृपया वैध मान दर्ज करें।' : 'Please enter valid values.';
    return;
  }
  const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
  const total = emi * months;
  emiResult.textContent = `${language === 'hi' ? 'मासिक ईएमआई' : 'Monthly EMI'}: ${formatNumber(emi)} | ${language === 'hi' ? 'कुल' : 'Total'}: ${formatNumber(total)}`;
  addToHistory(`EMI ${principal} @ ${emiRate.value}% = ${formatNumber(emi)}`);
}

function calculateGst() {
  const amount = Number(gstAmount.value);
  const rate = Number(gstRate.value);
  if (Number.isNaN(amount) || Number.isNaN(rate)) {
    gstResult.textContent = language === 'hi' ? 'कृपया वैध मान दर्ज करें।' : 'Please enter valid values.';
    return;
  }
  if (gstType.value === 'inclusive') {
    const taxable = amount / (1 + rate / 100);
    const tax = amount - taxable;
    gstResult.textContent = `${language === 'hi' ? 'कर योग्य राशि' : 'Taxable amount'}: ${formatNumber(taxable)} | ${language === 'hi' ? 'GST' : 'GST'}: ${formatNumber(tax)}`;
    addToHistory(`GST inclusive ${amount} @ ${rate}%`);
  } else {
    const tax = (amount * rate) / 100;
    const total = amount + tax;
    gstResult.textContent = `${language === 'hi' ? 'GST' : 'GST'}: ${formatNumber(tax)} | ${language === 'hi' ? 'कुल' : 'Total'}: ${formatNumber(total)}`;
    addToHistory(`GST exclusive ${amount} @ ${rate}%`);
  }
}

function calculateAge() {
  if (!dobInput.value) {
    ageResult.textContent = language === 'hi' ? 'कृपया जन्म तिथि चुनें।' : 'Please select a date of birth.';
    return;
  }

  const dob = new Date(`${dobInput.value}T12:00:00`);
  if (Number.isNaN(dob.getTime())) {
    ageResult.textContent = language === 'hi' ? 'कृपया वैध जन्म तिथि चुनें।' : 'Please select a valid date of birth.';
    return;
  }

  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dobDate = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());

  if (dobDate > todayDate) {
    ageResult.textContent = language === 'hi' ? 'जन्म तिथि भविष्य की नहीं हो सकती।' : 'Date of birth cannot be in the future.';
    return;
  }

  let years = todayDate.getFullYear() - dobDate.getFullYear();
  let months = todayDate.getMonth() - dobDate.getMonth();
  let days = todayDate.getDate() - dobDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const formatAgeValue = (value) => String(value).padStart(2, '0');
  ageResult.textContent = `${formatAgeValue(years)} ${language === 'hi' ? 'वर्ष' : 'years'}, ${formatAgeValue(months)} ${language === 'hi' ? 'माह' : 'months'}, ${formatAgeValue(days)} ${language === 'hi' ? 'दिन' : 'days'}`;
  addToHistory(`Age ${dobInput.value}`);
}

function calculateBmi() {
  const weight = Number(bmiWeight.value);
  const heightCm = Number(bmiHeight.value);
  if (!weight || !heightCm) {
    bmiResult.textContent = language === 'hi' ? 'कृपया वैध मान दर्ज करें।' : 'Please enter valid values.';
    return;
  }
  const bmi = weight / ((heightCm / 100) ** 2);
  let status = language === 'hi' ? 'सामान्य' : 'Normal';
  if (bmi < 18.5) status = language === 'hi' ? 'कम वजन' : 'Underweight';
  else if (bmi < 24.9) status = language === 'hi' ? 'सामान्य' : 'Normal';
  else if (bmi < 29.9) status = language === 'hi' ? 'अधिक वजन' : 'Overweight';
  else status = language === 'hi' ? 'मोटापा' : 'Obese';
  bmiResult.textContent = `${formatNumber(bmi)} — ${status}`;
  addToHistory(`BMI ${formatNumber(bmi)}`);
}

let graphZoom = 1;

function getGraphExpressions() {
  const fromCurves = graphExpressionsInput?.value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (fromCurves.length) {
    return fromCurves;
  }

  const singleExpression = graphExpression?.value?.trim();
  return singleExpression ? [singleExpression] : [];
}

function evaluateGraphExpression(expr, x) {
  const normalized = expr
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/abs\(/g, 'Math.abs(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/\^/g, '**');
  const safeExpr = normalized.replace(/\bx\b/g, `(${x})`);
  return Function('return ' + safeExpr)();
}

function plotGraph() {
  const expressions = getGraphExpressions();

  if (!graphCanvas) {
    return;
  }

  if (!expressions.length) {
    graphCanvas.innerHTML = '';
    return;
  }

  const svg = graphCanvas;
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.innerHTML = '';
  const width = 320;
  const height = 240;
  const padding = 24;
  const range = 8 * graphZoom;
  const steps = 700;
  const xAxisY = height / 2;
  const yAxisX = width / 2;
  const colors = ['#38bdf8', '#f59e0b', '#34d399', '#f472b6', '#a78bfa'];

  const createSvgEl = (tag, attrs = {}) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  };

  for (let i = 0; i <= 10; i += 1) {
    const offset = padding + ((i / 10) * (width - padding * 2));
    svg.appendChild(createSvgEl('line', { x1: offset, y1: padding, x2: offset, y2: height - padding, stroke: 'rgba(148,163,184,0.2)', 'stroke-width': '1' }));
    const yOffset = padding + ((i / 10) * (height - padding * 2));
    svg.appendChild(createSvgEl('line', { x1: padding, y1: yOffset, x2: width - padding, y2: yOffset, stroke: 'rgba(148,163,184,0.2)', 'stroke-width': '1' }));
  }

  svg.appendChild(createSvgEl('line', { x1: padding, y1: xAxisY, x2: width - padding, y2: xAxisY, stroke: '#64748b', 'stroke-width': '1.2' }));
  svg.appendChild(createSvgEl('line', { x1: yAxisX, y1: padding, x2: yAxisX, y2: height - padding, stroke: '#64748b', 'stroke-width': '1.2' }));

  svg.appendChild(createSvgEl('text', { x: width - 8, y: xAxisY - 6, 'text-anchor': 'end', fill: '#cbd5e1', 'font-size': '10' })).textContent = 'x';
  svg.appendChild(createSvgEl('text', { x: yAxisX + 6, y: 14, 'text-anchor': 'start', fill: '#cbd5e1', 'font-size': '10' })).textContent = 'y';

  expressions.forEach((expr, index) => {
    const path = createSvgEl('path', { fill: 'none', stroke: colors[index % colors.length], 'stroke-width': '2.2', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
    let d = '';
    let hasPoint = false;

    for (let i = 0; i <= steps; i += 1) {
      const x = -range + (i / steps) * (range * 2);
      try {
        const y = evaluateGraphExpression(expr, x);
        if (!Number.isFinite(y)) {
          continue;
        }
        const px = padding + ((x + range) / (range * 2)) * (width - padding * 2);
        const py = height - padding - ((y + range) / (range * 2)) * (height - padding * 2);
        d += `${hasPoint ? 'L' : 'M'} ${px.toFixed(2)} ${py.toFixed(2)} `;
        hasPoint = true;
      } catch (error) {
        continue;
      }
    }

    if (hasPoint) {
      path.setAttribute('d', d.trim());
      svg.appendChild(path);
    }
  });

  if (!svg.querySelectorAll('path').length) {
    const text = createSvgEl('text', { x: width / 2, y: height / 2, 'text-anchor': 'middle', fill: '#f8fafc', 'font-size': '14' });
    text.textContent = 'Invalid expression';
    svg.appendChild(text);
  }
}

function changeGraphZoom(delta) {
  graphZoom = Math.max(0.5, Math.min(3, graphZoom + delta));
  plotGraph();
}

function resetGraphZoom() {
  graphZoom = 1;
  plotGraph();
}

function updateConnectionStatus() {
  if (!connectionStatus) {
    return;
  }

  const isOnline = navigator.onLine;
  const statusText = connectionStatus.querySelector('.status-text');
  const statusLabel = isOnline ? (language === 'hi' ? 'ऑनलाइन' : 'Online') : (language === 'hi' ? 'ऑफ़लाइन' : 'Offline');

  if (statusText) {
    statusText.textContent = statusLabel;
  } else {
    connectionStatus.textContent = statusLabel;
  }

  connectionStatus.classList.toggle('online', isOnline);
  connectionStatus.classList.toggle('offline', !isOnline);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const rawValue = button.dataset.value;
    const visibleValue = button.dataset.display;
    const action = button.dataset.action;

    if (action === 'clear') {
      expression = '';
      updateDisplays();
      return;
    }

    if (action === 'delete') {
      expression = expression.slice(0, -1);
      updateDisplays();
      return;
    }

    if (action === 'equals') {
      evaluateExpression();
      return;
    }

    if (action === 'parenthesis-open') {
      appendValue(rawValue, '(');
      return;
    }

    if (action === 'parenthesis-close') {
      appendValue(rawValue, ')');
      return;
    }

    if (action === 'pi') {
      appendValue(rawValue, 'π');
      return;
    }

    if (action === 'euler') {
      appendValue(rawValue, 'e');
      return;
    }

    if (action === 'square') {
      appendValue(rawValue, '^2');
      return;
    }

    if (action === 'sqrt') {
      appendValue(rawValue, '√(');
      return;
    }

    if (['sin', 'cos', 'tan', 'log', 'ln'].includes(action)) {
      appendValue(rawValue, `${action}(`);
      return;
    }

    if (action === 'pow') {
      appendValue(rawValue, '^');
      return;
    }

    if (action === 'percent') {
      appendValue(rawValue, '%');
      return;
    }

    if (action === 'memory-clear') {
      memory = 0;
      updateMemoryIndicator();
      return;
    }

    if (action === 'memory-recall') {
      expression += String(memory);
      updateDisplays();
      return;
    }

    if (action === 'memory-add') {
      const currentValue = Number(calculateValue(expression || display.value));
      if (!Number.isNaN(currentValue)) {
        memory += currentValue;
        updateMemoryIndicator();
      }
      return;
    }

    if (action === 'memory-subtract') {
      const currentValue = Number(calculateValue(expression || display.value));
      if (!Number.isNaN(currentValue)) {
        memory -= currentValue;
        updateMemoryIndicator();
      }
      return;
    }

    if (rawValue !== undefined) {
      appendValue(rawValue, visibleValue ?? rawValue);
    }
  });
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => switchPane(button.dataset.target));
});

scientificToggle.addEventListener('click', () => {
  document.body.classList.toggle('scientific-mode');
  scientificToggle.classList.toggle('active');
});

historyToggle.addEventListener('click', () => {
  document.body.classList.toggle('history-open');
  historyToggle.classList.toggle('active');
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    applyTheme();
  });
}

if (userNameInput) {
  userNameInput.addEventListener('input', () => {
    userName = userNameInput.value;
    updateHeaderSubtitle();
    persistState();
  });
}

syncUserNameField();

if (installButton) {
  installButton.addEventListener('click', async () => {
    if (!deferredInstallPrompt) {
      return;
    }
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      installButton.textContent = '✓';
      setTimeout(() => {
        installButton.textContent = '⬇';
      }, 1000);
    }
  });
}

if (languageToggle) {
  languageToggle.addEventListener('click', toggleLanguage);
}
if (copyResultButton) {
  copyResultButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(display.value);
      copyResultButton.textContent = '✓';
      setTimeout(() => {
        copyResultButton.textContent = language === 'hi' ? 'कॉपी' : 'Copy';
      }, 1000);
    } catch (error) {
      copyResultButton.textContent = '✕';
    }
  });
}

clearHistoryButton.addEventListener('click', () => {
  history = [];
  persistState();
  renderHistory();
});

unitCategory.addEventListener('change', populateUnits);
fromUnit.addEventListener('change', convertUnits);
toUnit.addEventListener('change', convertUnits);
unitValue.addEventListener('input', convertUnits);
convertButton.addEventListener('click', convertUnits);

currencyButton.addEventListener('click', convertCurrency);
currencyAmount.addEventListener('input', convertCurrency);
currencyFrom.addEventListener('change', convertCurrency);
currencyTo.addEventListener('change', convertCurrency);

percentButton.addEventListener('click', calculatePercentage);
percentMode.addEventListener('change', calculatePercentage);
percentAmount.addEventListener('input', calculatePercentage);
percentRate.addEventListener('input', calculatePercentage);

emiButton.addEventListener('click', calculateEmi);
emiPrincipal.addEventListener('input', calculateEmi);
emiRate.addEventListener('input', calculateEmi);
emiYears.addEventListener('input', calculateEmi);

gstButton.addEventListener('click', calculateGst);
gstAmount.addEventListener('input', calculateGst);
gstRate.addEventListener('input', calculateGst);
gstType.addEventListener('change', calculateGst);

ageButton.addEventListener('click', calculateAge);
dobInput.addEventListener('change', calculateAge);

bmiButton.addEventListener('click', calculateBmi);
bmiWeight.addEventListener('input', calculateBmi);
bmiHeight.addEventListener('input', calculateBmi);

graphButton.addEventListener('click', plotGraph);
graphExpression?.addEventListener('input', plotGraph);
graphExpression?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    plotGraph();
  }
});
graphExpressionsInput?.addEventListener('input', plotGraph);
graphExpressionsInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    plotGraph();
  }
});
graphZoomIn.addEventListener('click', () => changeGraphZoom(0.25));
graphZoomOut.addEventListener('click', () => changeGraphZoom(-0.25));
graphReset.addEventListener('click', resetGraphZoom);

let touchStartX = 0;
let touchStartY = 0;

graphCanvas.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

graphCanvas.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;
  if (Math.abs(deltaX) > 40 || Math.abs(deltaY) > 40) {
    if (deltaY < -40) {
      changeGraphZoom(0.25);
    } else if (deltaY > 40) {
      changeGraphZoom(-0.25);
    }
  }
});

graphQuickPickers?.querySelectorAll('.graph-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const expression = chip.dataset.expression;
    if (graphExpression) {
      graphExpression.value = expression;
    }
    if (graphExpressionsInput) {
      graphExpressionsInput.value = expression;
    }
    plotGraph();
  });
});

graphKeypad?.querySelectorAll('.graph-key').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;
    const activeInput = document.activeElement === graphExpression ? graphExpression : graphExpressionsInput;

    if (action === 'backspace') {
      if (activeInput) {
        activeInput.value = activeInput.value.slice(0, -1);
      }
      plotGraph();
      return;
    }

    if (action === 'clear') {
      if (activeInput) {
        activeInput.value = '';
      }
      plotGraph();
      return;
    }

    if (action === 'plot') {
      plotGraph();
      return;
    }

    if (value && activeInput) {
      activeInput.value += value;
      plotGraph();
    }
  });
});

function handlePhotoSelection(file) {
  if (!file) {
    selectedPhotoFile = null;
    return;
  }

  selectedPhotoFile = file;
  const previewUrl = URL.createObjectURL(file);
  photoPreview.src = previewUrl;
  photoPreview.style.display = 'block';
  photoVideo.style.display = 'none';
  photoResult.textContent = language === 'hi'
    ? 'फोटो चयनित हो गई है। नीचे Google पर खोजें बटन दबाएँ।'
    : 'Photo selected. Click the Search on Google button below.';
}

photoInput.addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  handlePhotoSelection(file);
});

async function openCameraStream() {
  if (!navigator.mediaDevices?.getUserMedia) {
    photoResult.textContent = language === 'hi'
      ? 'कैमरा उपलब्ध नहीं है।'
      : 'Camera not available.';
    photoInput.click();
    return;
  }

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    });
    photoVideo.srcObject = cameraStream;
    await photoVideo.play();
    photoVideo.style.display = 'block';
    photoPreview.style.display = 'none';
    capturePhotoButton.style.display = 'inline-flex';
    closeCameraButton.style.display = 'inline-flex';
    photoResult.textContent = language === 'hi'
      ? 'कैमरा खुल गया है। फोटो लेने के लिए बटन दबाएँ।'
      : 'Camera opened. Tap Take Photo to capture.';
  } catch (error) {
    photoResult.textContent = language === 'hi'
      ? 'कैमरा चालू नहीं हो सका।'
      : 'Unable to open camera.';
    photoInput.click();
  }
}

function stopCameraStream() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }
  if (photoVideo) {
    photoVideo.srcObject = null;
    photoVideo.style.display = 'none';
  }
  if (capturePhotoButton) {
    capturePhotoButton.style.display = 'none';
  }
  if (closeCameraButton) {
    closeCameraButton.style.display = 'none';
  }
}

function capturePhotoFromCamera() {
  if (!photoVideo || !photoVideo.videoWidth || !photoVideo.videoHeight) {
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.width = photoVideo.videoWidth;
  canvas.height = photoVideo.videoHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  ctx.drawImage(photoVideo, 0, 0, canvas.width, canvas.height);
  canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
    handlePhotoSelection(file);
    stopCameraStream();
  }, 'image/jpeg', 0.92);
}

cameraButton.addEventListener('click', () => {
  openCameraStream();
});

if (capturePhotoButton) {
  capturePhotoButton.addEventListener('click', capturePhotoFromCamera);
}

if (closeCameraButton) {
  closeCameraButton.addEventListener('click', () => {
    stopCameraStream();
    photoResult.textContent = language === 'hi'
      ? 'कैमरा बंद कर दिया गया।'
      : 'Camera closed.';
  });
}

if (googleSearchButton) {
  googleSearchButton.addEventListener('click', () => {
    if (!selectedPhotoFile) {
      photoResult.textContent = language === 'hi'
        ? 'कृपया पहले फ़ोटो चुनें।'
        : 'Please choose a photo first.';
      photoInput.click();
      return;
    }

    const form = document.createElement('form');
    form.action = 'https://www.google.com/searchbyimage/upload';
    form.method = 'POST';
    form.enctype = 'multipart/form-data';
    form.target = '_blank';
    form.style.display = 'none';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.name = 'encoded_image';
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(selectedPhotoFile);
    fileInput.files = dataTransfer.files;

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'image_content';
    hiddenInput.value = ' '; 

    form.appendChild(fileInput);
    form.appendChild(hiddenInput);
    document.body.appendChild(form);
    form.submit();
    setTimeout(() => form.remove(), 1000);
  });
}

function isEditableTarget(target) {
  if (!target) {
    return false;
  }
  const tagName = target.tagName;
  return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || target.isContentEditable;
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  const target = event.target;

  if (isEditableTarget(target)) {
    if (target.id === 'graphExpression' && key === 'Enter') {
      event.preventDefault();
      plotGraph();
    }
    return;
  }

  if (/^[0-9.]$/.test(key)) {
    appendValue(key, key);
    event.preventDefault();
  } else if (['+', '-', '*', '/', '(', ')', '%', '^'].includes(key)) {
    const mapped = key === '*' ? '×' : key === '/' ? '÷' : key === '-' ? '−' : key;
    expression += mapped;
    updateDisplays();
    event.preventDefault();
  } else if (key === 'Enter') {
    evaluateExpression();
    event.preventDefault();
  } else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
    updateDisplays();
    event.preventDefault();
  } else if (key.toLowerCase() === 'c') {
    expression = '';
    updateDisplays();
    event.preventDefault();
  } else if (key.toLowerCase() === 'm') {
    document.body.classList.toggle('scientific-mode');
    scientificToggle.classList.toggle('active');
    event.preventDefault();
  } else if (key.toLowerCase() === 't') {
    theme = theme === 'light' ? 'dark' : 'light';
    applyTheme();
    event.preventDefault();
  } else if (key === 'Escape') {
    expression = '';
    updateDisplays();
  }
});

window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateConnectionStatus();
  }
});
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installButton) {
    installButton.style.display = 'inline-flex';
  }
});
scheduleCurrencyRateUpdates();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

applyTheme();
applyLanguage();
populateUnits();
renderHistory();
updateMemoryIndicator();
updateConnectionStatus();
plotGraph();
