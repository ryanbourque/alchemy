import {
    accounts,
    facilities,
    samplePoints,
    contacts,
    samples,
    waterAnalyses,
    oilAnalyses,
    bacteriaAnalyses,
    atpBacteriaAnalyses,
    millipores,
    corrosionInhibitorResiduals,
    scaleInhibitorResiduals,
    couponAnalyses
} from './mockData';

// Simulated fetch functions to mimic async CRUD operations
const simulateDelay = (ms: number, label = ''): Promise<void> => {
  console.log(`[API] Request: ${label}`);
  return new Promise<void>(resolve => setTimeout(() => {
    console.log(`[API] Response: ${label}`);
    resolve();
  }, ms));
};

// Fetch functions
export const fetchAccounts = async (): Promise<typeof accounts> => {
  console.log('[API] fetchAccounts called');
  await simulateDelay(300, 'fetchAccounts');
  console.log('[API] fetchAccounts returned', accounts);
  return accounts;
};
export const fetchFacilities = async (): Promise<typeof facilities> => {
  console.log('[API] fetchFacilities called');
  await simulateDelay(300, 'fetchFacilities');
  console.log('[API] fetchFacilities returned', facilities);
  return facilities;
};
export const fetchSamplePoints = async (): Promise<typeof samplePoints> => {
  console.log('[API] fetchSamplePoints called');
  await simulateDelay(300, 'fetchSamplePoints');
  console.log('[API] fetchSamplePoints returned', samplePoints);
  return samplePoints;
};
export const fetchContacts = async (): Promise<typeof contacts> => {
  console.log('[API] fetchContacts called');
  await simulateDelay(300, 'fetchContacts');
  console.log('[API] fetchContacts returned', contacts);
  return contacts;
};
export const fetchSamples = async (): Promise<typeof samples> => {
  console.log('[API] fetchSamples called');
  await simulateDelay(300, 'fetchSamples');
  console.log('[API] fetchSamples returned', samples);
  return samples;
};
export const fetchWaterAnalyses = async (): Promise<typeof waterAnalyses> => {
  console.log('[API] fetchWaterAnalyses called');
  await simulateDelay(300, 'fetchWaterAnalyses');
  console.log('[API] fetchWaterAnalyses returned', waterAnalyses);
  return waterAnalyses;
};
export const fetchOilAnalyses = async (): Promise<typeof oilAnalyses> => {
  console.log('[API] fetchOilAnalyses called');
  await simulateDelay(300, 'fetchOilAnalyses');
  console.log('[API] fetchOilAnalyses returned', oilAnalyses);
  return oilAnalyses;
};
export const fetchBacteriaAnalyses = async (): Promise<typeof bacteriaAnalyses> => {
  console.log('[API] fetchBacteriaAnalyses called');
  await simulateDelay(300, 'fetchBacteriaAnalyses');
  console.log('[API] fetchBacteriaAnalyses returned', bacteriaAnalyses);
  return bacteriaAnalyses;
};
export const fetchAtpBacteriaAnalyses = async (): Promise<typeof atpBacteriaAnalyses> => {
  console.log('[API] fetchAtpBacteriaAnalyses called');
  await simulateDelay(300, 'fetchAtpBacteriaAnalyses');
  console.log('[API] fetchAtpBacteriaAnalyses returned', atpBacteriaAnalyses);
  return atpBacteriaAnalyses;
};
export const fetchMillipores = async (): Promise<typeof millipores> => {
  console.log('[API] fetchMillipores called');
  await simulateDelay(300, 'fetchMillipores');
  console.log('[API] fetchMillipores returned', millipores);
  return millipores;
};
export const fetchCorrosionInhibitorResiduals = async (): Promise<typeof corrosionInhibitorResiduals> => {
  console.log('[API] fetchCorrosionInhibitorResiduals called');
  await simulateDelay(300, 'fetchCorrosionInhibitorResiduals');
  console.log('[API] fetchCorrosionInhibitorResiduals returned', corrosionInhibitorResiduals);
  return corrosionInhibitorResiduals;
};
export const fetchScaleInhibitorResiduals = async (): Promise<typeof scaleInhibitorResiduals> => {
  console.log('[API] fetchScaleInhibitorResiduals called');
  await simulateDelay(300, 'fetchScaleInhibitorResiduals');
  console.log('[API] fetchScaleInhibitorResiduals returned', scaleInhibitorResiduals);
  return scaleInhibitorResiduals;
};
export const fetchCouponAnalyses = async (): Promise<typeof couponAnalyses> => {
  console.log('[API] fetchCouponAnalyses called');
  await simulateDelay(300, 'fetchCouponAnalyses');
  console.log('[API] fetchCouponAnalyses returned', couponAnalyses);
  return couponAnalyses;
};

// Simulated CRUD operations for each resource
// Accounts
export const createAccount = async (newItem: typeof accounts[number]): Promise<typeof accounts[number]> => {
  console.log('[API] createAccount called with payload', newItem);
  await simulateDelay(300, 'createAccount');
  accounts.push(newItem);
  console.log('[API] createAccount completed');
  return newItem;
};
export const updateAccount = async (id: string, updatedData: Partial<typeof accounts[number]>): Promise<boolean> => {
  console.log('[API] updateAccount called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateAccount');
  const idx = accounts.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateAccount failed: id not found');
    return false;
  }
  accounts[idx] = { ...accounts[idx], ...updatedData };
  console.log('[API] updateAccount succeeded');
  return true;
};
export const deleteAccount = async (id: string): Promise<boolean> => {
  console.log('[API] deleteAccount called with id', id);
  await simulateDelay(300, 'deleteAccount');
  const idx = accounts.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteAccount failed: id not found');
    return false;
  }
  accounts.splice(idx, 1);
  console.log('[API] deleteAccount succeeded');
  return true;
};
// Facilities
export const createFacility = async (newItem: typeof facilities[number]): Promise<typeof facilities[number]> => {
  console.log('[API] createFacility called with payload', newItem);
  await simulateDelay(300, 'createFacility');
  facilities.push(newItem);
  console.log('[API] createFacility completed');
  return newItem;
};
export const updateFacility = async (id: string, updatedData: Partial<typeof facilities[number]>): Promise<boolean> => {
  console.log('[API] updateFacility called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateFacility');
  const idx = facilities.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateFacility failed: id not found');
    return false;
  }
  facilities[idx] = { ...facilities[idx], ...updatedData };
  console.log('[API] updateFacility succeeded');
  return true;
};
export const deleteFacility = async (id: string): Promise<boolean> => {
  console.log('[API] deleteFacility called with id', id);
  await simulateDelay(300, 'deleteFacility');
  const idx = facilities.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteFacility failed: id not found');
    return false;
  }
  facilities.splice(idx, 1);
  console.log('[API] deleteFacility succeeded');
  return true;
};
// Sample Points
export const createSamplePoint = async (newItem: typeof samplePoints[number]): Promise<typeof samplePoints[number]> => {
  console.log('[API] createSamplePoint called with payload', newItem);
  await simulateDelay(300, 'createSamplePoint');
  samplePoints.push(newItem);
  console.log('[API] createSamplePoint completed');
  return newItem;
};
export const updateSamplePoint = async (id: string, updatedData: Partial<typeof samplePoints[number]>): Promise<boolean> => {
  console.log('[API] updateSamplePoint called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateSamplePoint');
  const idx = samplePoints.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateSamplePoint failed: id not found');
    return false;
  }
  samplePoints[idx] = { ...samplePoints[idx], ...updatedData };
  console.log('[API] updateSamplePoint succeeded');
  return true;
};
export const deleteSamplePoint = async (id: string): Promise<boolean> => {
  console.log('[API] deleteSamplePoint called with id', id);
  await simulateDelay(300, 'deleteSamplePoint');
  const idx = samplePoints.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteSamplePoint failed: id not found');
    return false;
  }
  samplePoints.splice(idx, 1);
  console.log('[API] deleteSamplePoint succeeded');
  return true;
};
// Contacts
export const createContact = async (newItem: typeof contacts[number]): Promise<typeof contacts[number]> => {
  console.log('[API] createContact called with payload', newItem);
  await simulateDelay(300, 'createContact');
  contacts.push(newItem);
  console.log('[API] createContact completed');
  return newItem;
};
export const updateContact = async (id: string, updatedData: Partial<typeof contacts[number]>): Promise<boolean> => {
  console.log('[API] updateContact called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateContact');
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateContact failed: id not found');
    return false;
  }
  contacts[idx] = { ...contacts[idx], ...updatedData };
  console.log('[API] updateContact succeeded');
  return true;
};
export const deleteContact = async (id: string): Promise<boolean> => {
  console.log('[API] deleteContact called with id', id);
  await simulateDelay(300, 'deleteContact');
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteContact failed: id not found');
    return false;
  }
  contacts.splice(idx, 1);
  console.log('[API] deleteContact succeeded');
  return true;
};
// Samples
export const createSample = async (newItem: typeof samples[number]): Promise<typeof samples[number]> => {
  console.log('[API] createSample called with payload', newItem);
  await simulateDelay(300, 'createSample');
  samples.push(newItem);
  console.log('[API] createSample completed');
  return newItem;
};
export const updateSample = async (id: string, updatedData: Partial<typeof samples[number]>): Promise<boolean> => {
  console.log('[API] updateSample called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateSample');
  const idx = samples.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateSample failed: id not found');
    return false;
  }
  samples[idx] = { ...samples[idx], ...updatedData };
  console.log('[API] updateSample succeeded');
  return true;
};
export const deleteSample = async (id: string): Promise<boolean> => {
  console.log('[API] deleteSample called with id', id);
  await simulateDelay(300, 'deleteSample');
  const idx = samples.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteSample failed: id not found');
    return false;
  }
  samples.splice(idx, 1);
  console.log('[API] deleteSample succeeded');
  return true;
};
// Analyses (Water, Oil, Bacteria, ATP, Millipore, Corrosion, Scale, Coupon)
// Water Analyses
export const createWaterAnalysis = async (newItem: typeof waterAnalyses[number]): Promise<typeof waterAnalyses[number]> => {
  console.log('[API] createWaterAnalysis called with payload', newItem);
  await simulateDelay(300, 'createWaterAnalysis');
  waterAnalyses.push(newItem);
  console.log('[API] createWaterAnalysis completed');
  return newItem;
};
export const updateWaterAnalysis = async (id: string, updatedData: Partial<typeof waterAnalyses[number]>): Promise<boolean> => {
  console.log('[API] updateWaterAnalysis called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateWaterAnalysis');
  const idx = waterAnalyses.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateWaterAnalysis failed: id not found');
    return false;
  }
  waterAnalyses[idx] = { ...waterAnalyses[idx], ...updatedData };
  console.log('[API] updateWaterAnalysis succeeded');
  return true;
};
export const deleteWaterAnalysis = async (id: string): Promise<boolean> => {
  console.log('[API] deleteWaterAnalysis called with id', id);
  await simulateDelay(300, 'deleteWaterAnalysis');
  const idx = waterAnalyses.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteWaterAnalysis failed: id not found');
    return false;
  }
  waterAnalyses.splice(idx, 1);
  console.log('[API] deleteWaterAnalysis succeeded');
  return true;
};
// Oil Analyses
export const createOilAnalysis = async (newItem: typeof oilAnalyses[number]): Promise<typeof oilAnalyses[number]> => {
  console.log('[API] createOilAnalysis called with payload', newItem);
  await simulateDelay(300, 'createOilAnalysis');
  oilAnalyses.push(newItem);
  console.log('[API] createOilAnalysis completed');
  return newItem;
};
export const updateOilAnalysis = async (id: string, updatedData: Partial<typeof oilAnalyses[number]>): Promise<boolean> => {
  console.log('[API] updateOilAnalysis called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateOilAnalysis');
  const idx = oilAnalyses.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateOilAnalysis failed: id not found');
    return false;
  }
  oilAnalyses[idx] = { ...oilAnalyses[idx], ...updatedData };
  console.log('[API] updateOilAnalysis succeeded');
  return true;
};
export const deleteOilAnalysis = async (id: string): Promise<boolean> => {
  console.log('[API] deleteOilAnalysis called with id', id);
  await simulateDelay(300, 'deleteOilAnalysis');
  const idx = oilAnalyses.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteOilAnalysis failed: id not found');
    return false;
  }
  oilAnalyses.splice(idx, 1);
  console.log('[API] deleteOilAnalysis succeeded');
  return true;
};
// Bacteria Analyses
export const createBacteriaAnalysis = async (newItem: typeof bacteriaAnalyses[number]): Promise<typeof bacteriaAnalyses[number]> => {
  console.log('[API] createBacteriaAnalysis called with payload', newItem);
  await simulateDelay(300, 'createBacteriaAnalysis');
  bacteriaAnalyses.push(newItem);
  console.log('[API] createBacteriaAnalysis completed');
  return newItem;
};
export const updateBacteriaAnalysis = async (id: string, updatedData: Partial<typeof bacteriaAnalyses[number]>): Promise<boolean> => {
  console.log('[API] updateBacteriaAnalysis called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateBacteriaAnalysis');
  const idx = bacteriaAnalyses.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateBacteriaAnalysis failed: id not found');
    return false;
  }
  bacteriaAnalyses[idx] = { ...bacteriaAnalyses[idx], ...updatedData };
  console.log('[API] updateBacteriaAnalysis succeeded');
  return true;
};
export const deleteBacteriaAnalysis = async (id: string): Promise<boolean> => {
  console.log('[API] deleteBacteriaAnalysis called with id', id);
  await simulateDelay(300, 'deleteBacteriaAnalysis');
  const idx = bacteriaAnalyses.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteBacteriaAnalysis failed: id not found');
    return false;
  }
  bacteriaAnalyses.splice(idx, 1);
  console.log('[API] deleteBacteriaAnalysis succeeded');
  return true;
};
// ATP Bacteria Analyses
export const createAtpBacteriaAnalysis = async (newItem: typeof atpBacteriaAnalyses[number]): Promise<typeof atpBacteriaAnalyses[number]> => {
  console.log('[API] createAtpBacteriaAnalysis called with payload', newItem);
  await simulateDelay(300, 'createAtpBacteriaAnalysis');
  atpBacteriaAnalyses.push(newItem);
  console.log('[API] createAtpBacteriaAnalysis completed');
  return newItem;
};
export const updateAtpBacteriaAnalysis = async (id: string, updatedData: Partial<typeof atpBacteriaAnalyses[number]>): Promise<boolean> => {
  console.log('[API] updateAtpBacteriaAnalysis called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateAtpBacteriaAnalysis');
  const idx = atpBacteriaAnalyses.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateAtpBacteriaAnalysis failed: id not found');
    return false;
  }
  atpBacteriaAnalyses[idx] = { ...atpBacteriaAnalyses[idx], ...updatedData };
  console.log('[API] updateAtpBacteriaAnalysis succeeded');
  return true;
};
export const deleteAtpBacteriaAnalysis = async (id: string): Promise<boolean> => {
  console.log('[API] deleteAtpBacteriaAnalysis called with id', id);
  await simulateDelay(300, 'deleteAtpBacteriaAnalysis');
  const idx = atpBacteriaAnalyses.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteAtpBacteriaAnalysis failed: id not found');
    return false;
  }
  atpBacteriaAnalyses.splice(idx, 1);
  console.log('[API] deleteAtpBacteriaAnalysis succeeded');
  return true;
};
// Millipore Analyses
export const createMillipore = async (newItem: typeof millipores[number]): Promise<typeof millipores[number]> => {
  console.log('[API] createMillipore called with payload', newItem);
  await simulateDelay(300, 'createMillipore');
  millipores.push(newItem);
  console.log('[API] createMillipore completed');
  return newItem;
};
export const updateMillipore = async (id: string, updatedData: Partial<typeof millipores[number]>): Promise<boolean> => {
  console.log('[API] updateMillipore called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateMillipore');
  const idx = millipores.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateMillipore failed: id not found');
    return false;
  }
  millipores[idx] = { ...millipores[idx], ...updatedData };
  console.log('[API] updateMillipore succeeded');
  return true;
};
export const deleteMillipore = async (id: string): Promise<boolean> => {
  console.log('[API] deleteMillipore called with id', id);
  await simulateDelay(300, 'deleteMillipore');
  const idx = millipores.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteMillipore failed: id not found');
    return false;
  }
  millipores.splice(idx, 1);
  console.log('[API] deleteMillipore succeeded');
  return true;
};
// Corrosion Inhibitor Residuals
export const createCorrosionInhibitorResidual = async (newItem: typeof corrosionInhibitorResiduals[number]): Promise<typeof corrosionInhibitorResiduals[number]> => {
  console.log('[API] createCorrosionInhibitorResidual called with payload', newItem);
  await simulateDelay(300, 'createCorrosionInhibitorResidual');
  corrosionInhibitorResiduals.push(newItem);
  console.log('[API] createCorrosionInhibitorResidual completed');
  return newItem;
};
export const updateCorrosionInhibitorResidual = async (id: string, updatedData: Partial<typeof corrosionInhibitorResiduals[number]>): Promise<boolean> => {
  console.log('[API] updateCorrosionInhibitorResidual called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateCorrosionInhibitorResidual');
  const idx = corrosionInhibitorResiduals.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateCorrosionInhibitorResidual failed: id not found');
    return false;
  }
  corrosionInhibitorResiduals[idx] = { ...corrosionInhibitorResiduals[idx], ...updatedData };
  console.log('[API] updateCorrosionInhibitorResidual succeeded');
  return true;
};
export const deleteCorrosionInhibitorResidual = async (id: string): Promise<boolean> => {
  console.log('[API] deleteCorrosionInhibitorResidual called with id', id);
  await simulateDelay(300, 'deleteCorrosionInhibitorResidual');
  const idx = corrosionInhibitorResiduals.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteCorrosionInhibitorResidual failed: id not found');
    return false;
  }
  corrosionInhibitorResiduals.splice(idx, 1);
  console.log('[API] deleteCorrosionInhibitorResidual succeeded');
  return true;
};
// Scale Inhibitor Residuals
export const createScaleInhibitorResidual = async (newItem: typeof scaleInhibitorResiduals[number]): Promise<typeof scaleInhibitorResiduals[number]> => {
  console.log('[API] createScaleInhibitorResidual called with payload', newItem);
  await simulateDelay(300, 'createScaleInhibitorResidual');
  scaleInhibitorResiduals.push(newItem);
  console.log('[API] createScaleInhibitorResidual completed');
  return newItem;
};
export const updateScaleInhibitorResidual = async (id: string, updatedData: Partial<typeof scaleInhibitorResiduals[number]>): Promise<boolean> => {
  console.log('[API] updateScaleInhibitorResidual called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateScaleInhibitorResidual');
  const idx = scaleInhibitorResiduals.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] updateScaleInhibitorResidual failed: id not found');
    return false;
  }
  scaleInhibitorResiduals[idx] = { ...scaleInhibitorResiduals[idx], ...updatedData };
  console.log('[API] updateScaleInhibitorResidual succeeded');
  return true;
};
export const deleteScaleInhibitorResidual = async (id: string): Promise<boolean> => {
  console.log('[API] deleteScaleInhibitorResidual called with id', id);
  await simulateDelay(300, 'deleteScaleInhibitorResidual');
  const idx = scaleInhibitorResiduals.findIndex(item => item.id === id);
  if (idx === -1) {
    console.log('[API] deleteScaleInhibitorResidual failed: id not found');
    return false;
  }
  scaleInhibitorResiduals.splice(idx, 1);
  console.log('[API] deleteScaleInhibitorResidual succeeded');
  return true;
};
// Coupon Analyses
export const createCouponAnalysis = async (newItem: typeof couponAnalyses[number]): Promise<typeof couponAnalyses[number]> => {
  console.log('[API] createCouponAnalysis called with payload', newItem);
  await simulateDelay(300, 'createCouponAnalysis');
  couponAnalyses.push(newItem);
  console.log('[API] createCouponAnalysis completed');
  return newItem;
};
export const updateCouponAnalysis = async (id: string, updatedData: Partial<typeof couponAnalyses[number]>): Promise<boolean> => {
  console.log('[API] updateCouponAnalysis called with id', id, 'and payload', updatedData);
  await simulateDelay(300, 'updateCouponAnalysis');
  const idx = couponAnalyses.findIndex(item => String(item.id) === id);
  if (idx === -1) {
    console.log('[API] updateCouponAnalysis failed: id not found');
    return false;
  }
  couponAnalyses[idx] = { ...couponAnalyses[idx], ...updatedData };
  console.log('[API] updateCouponAnalysis succeeded');
  return true;
};
export const deleteCouponAnalysis = async (id: string): Promise<boolean> => {
  console.log('[API] deleteCouponAnalysis called with id', id);
  await simulateDelay(300, 'deleteCouponAnalysis');
  const idx = couponAnalyses.findIndex(item => String(item.id) === id);
  if (idx === -1) {
    console.log('[API] deleteCouponAnalysis failed: id not found');
    return false;
  }
  couponAnalyses.splice(idx, 1);
  console.log('[API] deleteCouponAnalysis succeeded');
  return true;
};