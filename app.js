/**
 * Universal Unit Converter Pro — Gamility Tools
 * Precision High-Performance Metric & Imperial Mathematical Engine
 * Copyright © 2026 Gamility. All rights reserved.
 */

(() => {
  'use strict';

  // ==========================================================================
  // UNIT DEFINITIONS & CONVERSION MULTIPLIERS
  // Standardized against official SI base units
  // ==========================================================================

  const CATEGORIES = {
    length: {
      name: 'Length & Distance',
      base: 'm',
      defaultFrom: 'm',
      defaultTo: 'ft',
      units: [
        { id: 'mm', name: 'Millimeters', symbol: 'mm', ratio: 0.001 },
        { id: 'cm', name: 'Centimeters', symbol: 'cm', ratio: 0.01 },
        { id: 'm', name: 'Meters', symbol: 'm', ratio: 1.0 },
        { id: 'km', name: 'Kilometers', symbol: 'km', ratio: 1000.0 },
        { id: 'in', name: 'Inches', symbol: 'in', ratio: 0.0254 },
        { id: 'ft', name: 'Feet', symbol: 'ft', ratio: 0.3048 },
        { id: 'yd', name: 'Yards', symbol: 'yd', ratio: 0.9144 },
        { id: 'mi', name: 'Miles', symbol: 'mi', ratio: 1609.344 },
        { id: 'nmi', name: 'Nautical Miles', symbol: 'nmi', ratio: 1852.0 }
      ],
      presets: [
        { label: '100m Sprint', val: 100, from: 'm', to: 'ft' },
        { label: 'Marathon (42.195 km)', val: 42.195, from: 'km', to: 'mi' },
        { label: '1 Mile', val: 1, from: 'mi', to: 'm' },
        { label: '6 Feet', val: 6, from: 'ft', to: 'cm' }
      ]
    },

    weight: {
      name: 'Weight & Mass',
      base: 'kg',
      defaultFrom: 'kg',
      defaultTo: 'lb',
      units: [
        { id: 'mg', name: 'Milligrams', symbol: 'mg', ratio: 0.000001 },
        { id: 'g', name: 'Grams', symbol: 'g', ratio: 0.001 },
        { id: 'kg', name: 'Kilograms', symbol: 'kg', ratio: 1.0 },
        { id: 't', name: 'Metric Tons', symbol: 't', ratio: 1000.0 },
        { id: 'oz', name: 'Ounces', symbol: 'oz', ratio: 0.028349523125 },
        { id: 'lb', name: 'Pounds', symbol: 'lb', ratio: 0.45359237 },
        { id: 'st', name: 'Stones', symbol: 'st', ratio: 6.35029318 }
      ],
      presets: [
        { label: '1 Kilogram', val: 1, from: 'kg', to: 'lb' },
        { label: '1 Pound', val: 1, from: 'lb', to: 'g' },
        { label: 'Gold Ounce', val: 1, from: 'oz', to: 'g' },
        { label: 'Average Human (70 kg)', val: 70, from: 'kg', to: 'lb' }
      ]
    },

    temperature: {
      name: 'Temperature',
      base: 'c',
      defaultFrom: 'c',
      defaultTo: 'f',
      units: [
        { id: 'c', name: 'Celsius', symbol: '°C' },
        { id: 'f', name: 'Fahrenheit', symbol: '°F' },
        { id: 'k', name: 'Kelvin', symbol: 'K' }
      ],
      presets: [
        { label: 'Freezing Point (0 °C)', val: 0, from: 'c', to: 'f' },
        { label: 'Boiling Point (100 °C)', val: 100, from: 'c', to: 'f' },
        { label: 'Body Temp (98.6 °F)', val: 98.6, from: 'f', to: 'c' },
        { label: 'Room Temp (72 °F)', val: 72, from: 'f', to: 'c' }
      ]
    },

    area: {
      name: 'Area',
      base: 'sq_m',
      defaultFrom: 'sq_m',
      defaultTo: 'sq_ft',
      units: [
        { id: 'sq_cm', name: 'Square Centimeters', symbol: 'cm²', ratio: 0.0001 },
        { id: 'sq_m', name: 'Square Meters', symbol: 'm²', ratio: 1.0 },
        { id: 'sq_km', name: 'Square Kilometers', symbol: 'km²', ratio: 1000000.0 },
        { id: 'sq_in', name: 'Square Inches', symbol: 'in²', ratio: 0.00064516 },
        { id: 'sq_ft', name: 'Square Feet', symbol: 'ft²', ratio: 0.09290304 },
        { id: 'sq_yd', name: 'Square Yards', symbol: 'yd²', ratio: 0.83612736 },
        { id: 'ac', name: 'Acres', symbol: 'ac', ratio: 4046.8564224 },
        { id: 'ha', name: 'Hectares', symbol: 'ha', ratio: 10000.0 }
      ],
      presets: [
        { label: '1 Acre', val: 1, from: 'ac', to: 'sq_m' },
        { label: '1 Hectare', val: 1, from: 'ha', to: 'ac' },
        { label: '1,000 Sq Ft Apartment', val: 1000, from: 'sq_ft', to: 'sq_m' }
      ]
    },

    volume: {
      name: 'Volume & Capacity',
      base: 'l',
      defaultFrom: 'l',
      defaultTo: 'gal',
      units: [
        { id: 'ml', name: 'Milliliters', symbol: 'mL', ratio: 0.001 },
        { id: 'l', name: 'Liters', symbol: 'L', ratio: 1.0 },
        { id: 'cu_m', name: 'Cubic Meters', symbol: 'm³', ratio: 1000.0 },
        { id: 'fl_oz', name: 'Fluid Ounces (US)', symbol: 'fl oz', ratio: 0.0295735295625 },
        { id: 'cup', name: 'Cups (US)', symbol: 'cup', ratio: 0.2365882365 },
        { id: 'pt', name: 'Pints (US)', symbol: 'pt', ratio: 0.473176473 },
        { id: 'qt', name: 'Quarts (US)', symbol: 'qt', ratio: 0.946352946 },
        { id: 'gal', name: 'Gallons (US)', symbol: 'gal', ratio: 3.785411784 },
        { id: 'imp_gal', name: 'Imperial Gallons (UK)', symbol: 'imp gal', ratio: 4.54609 }
      ],
      presets: [
        { label: '1 US Gallon', val: 1, from: 'gal', to: 'l' },
        { label: '1 Liter', val: 1, from: 'l', to: 'fl_oz' },
        { label: '1 Pint of Beer', val: 1, from: 'pt', to: 'ml' }
      ]
    },

    speed: {
      name: 'Speed & Velocity',
      base: 'm_s',
      defaultFrom: 'km_h',
      defaultTo: 'mph',
      units: [
        { id: 'm_s', name: 'Meters per Second', symbol: 'm/s', ratio: 1.0 },
        { id: 'km_h', name: 'Kilometers per Hour', symbol: 'km/h', ratio: 0.2777777777777778 },
        { id: 'mph', name: 'Miles per Hour', symbol: 'mph', ratio: 0.44704 },
        { id: 'kn', name: 'Knots (Nautical)', symbol: 'kn', ratio: 0.5144444444444445 },
        { id: 'ft_s', name: 'Feet per Second', symbol: 'ft/s', ratio: 0.3048 }
      ],
      presets: [
        { label: '60 MPH Highway', val: 60, from: 'mph', to: 'km_h' },
        { label: '100 km/h Highway', val: 100, from: 'km_h', to: 'mph' },
        { label: 'Speed of Sound', val: 343, from: 'm_s', to: 'km_h' },
        { label: 'Cruise Ship (25 Knots)', val: 25, from: 'kn', to: 'mph' }
      ]
    },

    data: {
      name: 'Digital Data Storage',
      base: 'B',
      defaultFrom: 'GB',
      defaultTo: 'MB',
      units: [
        { id: 'b', name: 'Bits', symbol: 'b', decimalMult: 0.125, binaryMult: 0.125 },
        { id: 'B', name: 'Bytes', symbol: 'B', decimalMult: 1, binaryMult: 1 },
        { id: 'KB', name: 'Kilobytes', symbol: 'KB', decimalMult: 1e3, binaryMult: 1024 },
        { id: 'MB', name: 'Megabytes', symbol: 'MB', decimalMult: 1e6, binaryMult: 1024 ** 2 },
        { id: 'GB', name: 'Gigabytes', symbol: 'GB', decimalMult: 1e9, binaryMult: 1024 ** 3 },
        { id: 'TB', name: 'Terabytes', symbol: 'TB', decimalMult: 1e12, binaryMult: 1024 ** 4 },
        { id: 'PB', name: 'Petabytes', symbol: 'PB', decimalMult: 1e15, binaryMult: 1024 ** 5 }
      ],
      presets: [
        { label: '1 Gigabyte', val: 1, from: 'GB', to: 'MB' },
        { label: '1 Terabyte SSD', val: 1, from: 'TB', to: 'GB' },
        { label: '100 Megabits Internet', val: 100, from: 'MB', to: 'KB' }
      ]
    },

    time: {
      name: 'Time & Duration',
      base: 's',
      defaultFrom: 'h',
      defaultTo: 'min',
      units: [
        { id: 'ms', name: 'Milliseconds', symbol: 'ms', ratio: 0.001 },
        { id: 's', name: 'Seconds', symbol: 's', ratio: 1.0 },
        { id: 'min', name: 'Minutes', symbol: 'min', ratio: 60.0 },
        { id: 'h', name: 'Hours', symbol: 'h', ratio: 3600.0 },
        { id: 'd', name: 'Days', symbol: 'd', ratio: 86400.0 },
        { id: 'wk', name: 'Weeks', symbol: 'wk', ratio: 604800.0 },
        { id: 'mo', name: 'Months (Avg)', symbol: 'mo', ratio: 2629746.0 },
        { id: 'yr', name: 'Years (Avg)', symbol: 'yr', ratio: 31556952.0 }
      ],
      presets: [
        { label: '1 Day', val: 1, from: 'd', to: 'h' },
        { label: '1 Hour', val: 1, from: 'h', to: 's' },
        { label: '1 Year in Days', val: 1, from: 'yr', to: 'd' }
      ]
    }
  };

  // --- DOM Elements ---
  const catTabs = document.querySelectorAll('.cat-tab');
  const inputFrom = document.getElementById('input-from');
  const inputTo = document.getElementById('input-to');
  const selectFrom = document.getElementById('select-from');
  const selectTo = document.getElementById('select-to');
  const badgeFromSymbol = document.getElementById('badge-from-symbol');
  const badgeToSymbol = document.getElementById('badge-to-symbol');
  const btnSwap = document.getElementById('btn-swap');
  const formulaDisplay = document.getElementById('formula-display');
  const btnCopyResult = document.getElementById('btn-copy-result');

  // Controls
  const selectPrecision = document.getElementById('select-precision');
  const groupDataMode = document.getElementById('group-data-mode');
  const selectDataBase = document.getElementById('select-data-base');
  const presetsChipsContainer = document.getElementById('presets-chips-container');

  // Comparison Matrix
  const comparisonGrid = document.getElementById('comparison-grid');
  const matrixSubtitle = document.getElementById('matrix-subtitle');

  // Toast
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // State
  let currentCategory = 'length';
  let activeDirection = 'from'; // 'from' | 'to'
  let toastTimer = null;

  // --- Toast Notification ---
  function showToast(msg) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // --- Numerical Formatting Engine ---
  function formatNumber(num) {
    if (isNaN(num)) return '';
    if (num === 0) return '0';

    const precisionSetting = selectPrecision.value;

    if (precisionSetting !== 'auto') {
      const decimals = parseInt(precisionSetting, 10);
      return Number(num.toFixed(decimals)).toString();
    }

    // Auto Precision Mode: smart handling of tiny and huge values
    const abs = Math.abs(num);
    if (abs >= 1e9 || (abs < 1e-5 && abs > 0)) {
      return num.toExponential(4);
    }

    // Round away floating point quirks like 3.2808399999999996
    const rounded = Number(Math.round(num + 'e+8') + 'e-8');
    return rounded.toString();
  }

  // --- Core Calculation Logic ---

  /**
   * Converts a value between any two units within the active category
   */
  function convertValue(val, fromUnitId, toUnitId) {
    if (isNaN(val)) return NaN;
    if (fromUnitId === toUnitId) return val;

    const catData = CATEGORIES[currentCategory];

    // Specialized Temperature Conversion (affine offset math)
    if (currentCategory === 'temperature') {
      let celsius = val;
      if (fromUnitId === 'f') celsius = (val - 32) * (5 / 9);
      else if (fromUnitId === 'k') celsius = val - 273.15;

      if (toUnitId === 'c') return celsius;
      if (toUnitId === 'f') return (celsius * (9 / 5)) + 32;
      if (toUnitId === 'k') return celsius + 273.15;
      return celsius;
    }

    // Digital Data Storage (handles decimal vs binary multipliers)
    if (currentCategory === 'data') {
      const mode = selectDataBase.value; // 'decimal' or 'binary'
      const fromUnit = catData.units.find(u => u.id === fromUnitId);
      const toUnit = catData.units.find(u => u.id === toUnitId);
      const fromMult = mode === 'binary' ? fromUnit.binaryMult : fromUnit.decimalMult;
      const toMult = mode === 'binary' ? toUnit.binaryMult : toUnit.decimalMult;

      const bytes = val * fromMult;
      return bytes / toMult;
    }

    // Standard Linear Ratio Multipliers
    const fromUnit = catData.units.find(u => u.id === fromUnitId);
    const toUnit = catData.units.find(u => u.id === toUnitId);

    if (!fromUnit || !toUnit) return val;

    // Convert to category base, then to target unit
    const baseValue = val * fromUnit.ratio;
    return baseValue / toUnit.ratio;
  }

  // --- UI Update Functions ---

  function updateConversion(direction = 'from') {
    activeDirection = direction;
    const catData = CATEGORIES[currentCategory];
    const fromId = selectFrom.value;
    const toId = selectTo.value;

    const fromUnit = catData.units.find(u => u.id === fromId);
    const toUnit = catData.units.find(u => u.id === toId);

    badgeFromSymbol.textContent = fromUnit ? fromUnit.symbol : '';
    badgeToSymbol.textContent = toUnit ? toUnit.symbol : '';

    if (direction === 'from') {
      const fromVal = parseFloat(inputFrom.value);
      if (isNaN(fromVal)) {
        inputTo.value = '';
      } else {
        const result = convertValue(fromVal, fromId, toId);
        inputTo.value = formatNumber(result);
      }
    } else {
      const toVal = parseFloat(inputTo.value);
      if (isNaN(toVal)) {
        inputFrom.value = '';
      } else {
        const result = convertValue(toVal, toId, fromId);
        inputFrom.value = formatNumber(result);
      }
    }

    updateFormulaDisplay(fromUnit, toUnit);
    updateComparisonMatrix();
  }

  function updateFormulaDisplay(fromUnit, toUnit) {
    if (!fromUnit || !toUnit) return;

    if (currentCategory === 'temperature') {
      if (fromUnit.id === 'c' && toUnit.id === 'f') {
        formulaDisplay.textContent = 'Formula: (°C × 9/5) + 32 = °F';
      } else if (fromUnit.id === 'f' && toUnit.id === 'c') {
        formulaDisplay.textContent = 'Formula: (°F − 32) × 5/9 = °C';
      } else if (fromUnit.id === 'c' && toUnit.id === 'k') {
        formulaDisplay.textContent = 'Formula: °C + 273.15 = K';
      } else if (fromUnit.id === 'k' && toUnit.id === 'c') {
        formulaDisplay.textContent = 'Formula: K − 273.15 = °C';
      } else if (fromUnit.id === 'f' && toUnit.id === 'k') {
        formulaDisplay.textContent = 'Formula: (°F − 32) × 5/9 + 273.15 = K';
      } else {
        formulaDisplay.textContent = `${fromUnit.name} = ${toUnit.name}`;
      }
      return;
    }

    const unitFactor = convertValue(1, fromUnit.id, toUnit.id);
    formulaDisplay.textContent = `1 ${fromUnit.name} = ${formatNumber(unitFactor)} ${toUnit.name}`;
  }

  function updateComparisonMatrix() {
    const catData = CATEGORIES[currentCategory];
    const fromId = selectFrom.value;
    const toId = selectTo.value;
    const fromVal = parseFloat(inputFrom.value) || 0;

    matrixSubtitle.textContent = `Equivalent values across all ${catData.name.toLowerCase()} units simultaneously`;

    let html = '';
    catData.units.forEach(unit => {
      const converted = convertValue(fromVal, fromId, unit.id);
      const isTarget = unit.id === toId;

      html += `
        <div class="matrix-item ${isTarget ? 'is-target' : ''}" data-unit="${unit.id}" title="Set ${unit.name} as target unit">
          <div class="matrix-item-top">
            <span class="matrix-item-name">${escapeHtml(unit.name)}</span>
            <span class="matrix-item-symbol">${escapeHtml(unit.symbol)}</span>
          </div>
          <span class="matrix-item-value">${formatNumber(converted)}</span>
        </div>
      `;
    });

    comparisonGrid.innerHTML = html;

    // Click on any matrix card to set as target unit
    comparisonGrid.querySelectorAll('.matrix-item').forEach(item => {
      item.addEventListener('click', () => {
        const clickedUnitId = item.getAttribute('data-unit');
        if (clickedUnitId !== selectTo.value) {
          selectTo.value = clickedUnitId;
          updateConversion('from');
          showToast(`Target unit set to ${item.querySelector('.matrix-item-name').textContent}`);
        }
      });
    });
  }

  // --- Category Initialization & Switching ---

  function setCategory(catKey) {
    if (!CATEGORIES[catKey]) return;
    currentCategory = catKey;
    const catData = CATEGORIES[catKey];

    // Toggle data mode option
    groupDataMode.style.display = (catKey === 'data') ? 'flex' : 'none';

    // Populate dropdowns
    selectFrom.innerHTML = '';
    selectTo.innerHTML = '';

    catData.units.forEach(u => {
      const optFrom = document.createElement('option');
      optFrom.value = u.id;
      optFrom.textContent = `${u.name} (${u.symbol})`;
      selectFrom.appendChild(optFrom);

      const optTo = document.createElement('option');
      optTo.value = u.id;
      optTo.textContent = `${u.name} (${u.symbol})`;
      selectTo.appendChild(optTo);
    });

    selectFrom.value = catData.defaultFrom;
    selectTo.value = catData.defaultTo;

    // Reset default input value if empty
    if (!inputFrom.value) inputFrom.value = '1';

    // Populate presets
    renderPresets(catData.presets);

    updateConversion('from');
  }

  function renderPresets(presets) {
    presetsChipsContainer.innerHTML = '';
    if (!presets || presets.length === 0) return;

    presets.forEach(p => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'preset-chip';
      chip.textContent = p.label;
      chip.addEventListener('click', () => {
        selectFrom.value = p.from;
        selectTo.value = p.to;
        inputFrom.value = p.val;
        updateConversion('from');
        showToast(`Loaded preset: ${p.label}`);
      });
      presetsChipsContainer.appendChild(chip);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // --- Event Listeners ---

  // Category Tabs
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const catKey = tab.getAttribute('data-cat');
      setCategory(catKey);
    });
  });

  // Inputs
  inputFrom.addEventListener('input', () => updateConversion('from'));
  inputTo.addEventListener('input', () => updateConversion('to'));

  selectFrom.addEventListener('change', () => updateConversion('from'));
  selectTo.addEventListener('change', () => updateConversion('from'));

  selectPrecision.addEventListener('change', () => updateConversion(activeDirection));
  selectDataBase.addEventListener('change', () => updateConversion(activeDirection));

  // Swap Units Action
  btnSwap.addEventListener('click', () => {
    const tempUnit = selectFrom.value;
    selectFrom.value = selectTo.value;
    selectTo.value = tempUnit;

    const tempVal = inputFrom.value;
    inputFrom.value = inputTo.value;
    inputTo.value = tempVal;

    updateConversion('from');
    showToast('Swapped measurement units');
  });

  // Copy Result
  btnCopyResult.addEventListener('click', async () => {
    const resultVal = inputTo.value;
    const catData = CATEGORIES[currentCategory];
    const toUnit = catData.units.find(u => u.id === selectTo.value);
    const textToCopy = `${resultVal} ${toUnit ? toUnit.symbol : ''}`;

    if (!resultVal) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const ta = document.createElement('textarea');
        ta.value = textToCopy;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      showToast(`Copied "${textToCopy}" to clipboard!`);
    } catch (e) {
      showToast('Copied result to clipboard!');
    }
  });

  // --- Initialize ---
  window.addEventListener('DOMContentLoaded', () => {
    setCategory('length');
  });

})();
