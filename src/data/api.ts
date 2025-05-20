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
const simulateDelay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const fetchAccounts = async (): Promise<typeof accounts> => {
  await simulateDelay(300);
  return accounts;
};
export const fetchFacilities = async (): Promise<typeof facilities> => {
  await simulateDelay(300);
  return facilities;
};
export const fetchSamplePoints = async (): Promise<typeof samplePoints> => {
  await simulateDelay(300);
  return samplePoints;
};
export const fetchContacts = async (): Promise<typeof contacts> => {
  await simulateDelay(300);
  return contacts;
};
export const fetchSamples = async (): Promise<typeof samples> => {
  await simulateDelay(300);
  return samples;
};
export const fetchWaterAnalyses = async (): Promise<typeof waterAnalyses> => {
  await simulateDelay(300);
  return waterAnalyses;
};
export const fetchOilAnalyses = async (): Promise<typeof oilAnalyses> => {
  await simulateDelay(300);
  return oilAnalyses;
};
export const fetchBacteriaAnalyses = async (): Promise<typeof bacteriaAnalyses> => {
  await simulateDelay(300);
  return bacteriaAnalyses;
};
export const fetchAtpBacteriaAnalyses = async (): Promise<typeof atpBacteriaAnalyses> => {
  await simulateDelay(300);
  return atpBacteriaAnalyses;
};
export const fetchMillipores = async (): Promise<typeof millipores> => {
  await simulateDelay(300);
  return millipores;
};
export const fetchCorrosionInhibitorResiduals = async (): Promise<typeof corrosionInhibitorResiduals> => {
  await simulateDelay(300);
  return corrosionInhibitorResiduals;
};
export const fetchScaleInhibitorResiduals = async (): Promise<typeof scaleInhibitorResiduals> => {
  await simulateDelay(300);
  return scaleInhibitorResiduals;
};
export const fetchCouponAnalyses = async (): Promise<typeof couponAnalyses> => {
  await simulateDelay(300);
  return couponAnalyses;
};

// Simulated CRUD operations for each resource
// Accounts
export const createAccount = async (newItem: typeof accounts[number]): Promise<typeof accounts[number]> => {
  await simulateDelay(300);
  accounts.push(newItem);
  return newItem;
};
export const updateAccount = async (id: string, updatedData: Partial<typeof accounts[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = accounts.findIndex(item => item.id === id);
  if (idx === -1) return false;
  accounts[idx] = { ...accounts[idx], ...updatedData };
  return true;
};
export const deleteAccount = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = accounts.findIndex(item => item.id === id);
  if (idx === -1) return false;
  accounts.splice(idx, 1);
  return true;
};
// Facilities
export const createFacility = async (newItem: typeof facilities[number]): Promise<typeof facilities[number]> => {
  await simulateDelay(300);
  facilities.push(newItem);
  return newItem;
};
export const updateFacility = async (id: string, updatedData: Partial<typeof facilities[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = facilities.findIndex(item => item.id === id);
  if (idx === -1) return false;
  facilities[idx] = { ...facilities[idx], ...updatedData };
  return true;
};
export const deleteFacility = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = facilities.findIndex(item => item.id === id);
  if (idx === -1) return false;
  facilities.splice(idx, 1);
  return true;
};
// Sample Points
export const createSamplePoint = async (newItem: typeof samplePoints[number]): Promise<typeof samplePoints[number]> => {
  await simulateDelay(300);
  samplePoints.push(newItem);
  return newItem;
};
export const updateSamplePoint = async (id: string, updatedData: Partial<typeof samplePoints[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = samplePoints.findIndex(item => item.id === id);
  if (idx === -1) return false;
  samplePoints[idx] = { ...samplePoints[idx], ...updatedData };
  return true;
};
export const deleteSamplePoint = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = samplePoints.findIndex(item => item.id === id);
  if (idx === -1) return false;
  samplePoints.splice(idx, 1);
  return true;
};
// Contacts
export const createContact = async (newItem: typeof contacts[number]): Promise<typeof contacts[number]> => {
  await simulateDelay(300);
  contacts.push(newItem);
  return newItem;
};
export const updateContact = async (id: string, updatedData: Partial<typeof contacts[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) return false;
  contacts[idx] = { ...contacts[idx], ...updatedData };
  return true;
};
export const deleteContact = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) return false;
  contacts.splice(idx, 1);
  return true;
};
// Samples
export const createSample = async (newItem: typeof samples[number]): Promise<typeof samples[number]> => {
  await simulateDelay(300);
  samples.push(newItem);
  return newItem;
};
export const updateSample = async (id: string, updatedData: Partial<typeof samples[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = samples.findIndex(item => item.id === id);
  if (idx === -1) return false;
  samples[idx] = { ...samples[idx], ...updatedData };
  return true;
};
export const deleteSample = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = samples.findIndex(item => item.id === id);
  if (idx === -1) return false;
  samples.splice(idx, 1);
  return true;
};
// Analyses (Water, Oil, Bacteria, ATP, Millipore, Corrosion, Scale, Coupon)
// Water Analyses
export const createWaterAnalysis = async (newItem: typeof waterAnalyses[number]): Promise<typeof waterAnalyses[number]> => {
  await simulateDelay(300);
  waterAnalyses.push(newItem);
  return newItem;
};
export const updateWaterAnalysis = async (id: string, updatedData: Partial<typeof waterAnalyses[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = waterAnalyses.findIndex(item => item.id === id);
  if (idx === -1) return false;
  waterAnalyses[idx] = { ...waterAnalyses[idx], ...updatedData };
  return true;
};
export const deleteWaterAnalysis = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = waterAnalyses.findIndex(item => item.id === id);
  if (idx === -1) return false;
  waterAnalyses.splice(idx, 1);
  return true;
};
// Oil Analyses
export const createOilAnalysis = async (newItem: typeof oilAnalyses[number]): Promise<typeof oilAnalyses[number]> => {
  await simulateDelay(300);
  oilAnalyses.push(newItem);
  return newItem;
};
export const updateOilAnalysis = async (id: string, updatedData: Partial<typeof oilAnalyses[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = oilAnalyses.findIndex(item => item.id === id);
  if (idx === -1) return false;
  oilAnalyses[idx] = { ...oilAnalyses[idx], ...updatedData };
  return true;
};
export const deleteOilAnalysis = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = oilAnalyses.findIndex(item => item.id === id);
  if (idx === -1) return false;
  oilAnalyses.splice(idx, 1);
  return true;
};
// Bacteria Analyses
export const createBacteriaAnalysis = async (newItem: typeof bacteriaAnalyses[number]): Promise<typeof bacteriaAnalyses[number]> => {
  await simulateDelay(300);
  bacteriaAnalyses.push(newItem);
  return newItem;
};
export const updateBacteriaAnalysis = async (id: string, updatedData: Partial<typeof bacteriaAnalyses[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = bacteriaAnalyses.findIndex(item => item.id === id);
  if (idx === -1) return false;
  bacteriaAnalyses[idx] = { ...bacteriaAnalyses[idx], ...updatedData };
  return true;
};
export const deleteBacteriaAnalysis = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = bacteriaAnalyses.findIndex(item => item.id === id);
  if (idx === -1) return false;
  bacteriaAnalyses.splice(idx, 1);
  return true;
};
// ATP Bacteria Analyses
export const createAtpBacteriaAnalysis = async (newItem: typeof atpBacteriaAnalyses[number]): Promise<typeof atpBacteriaAnalyses[number]> => {
  await simulateDelay(300);
  atpBacteriaAnalyses.push(newItem);
  return newItem;
};
export const updateAtpBacteriaAnalysis = async (id: string, updatedData: Partial<typeof atpBacteriaAnalyses[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = atpBacteriaAnalyses.findIndex(item => item.id === id);
  if (idx === -1) return false;
  atpBacteriaAnalyses[idx] = { ...atpBacteriaAnalyses[idx], ...updatedData };
  return true;
};
export const deleteAtpBacteriaAnalysis = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = atpBacteriaAnalyses.findIndex(item => item.id === id);
  if (idx === -1) return false;
  atpBacteriaAnalyses.splice(idx, 1);
  return true;
};
// Millipore Analyses
export const createMillipore = async (newItem: typeof millipores[number]): Promise<typeof millipores[number]> => {
  await simulateDelay(300);
  millipores.push(newItem);
  return newItem;
};
export const updateMillipore = async (id: string, updatedData: Partial<typeof millipores[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = millipores.findIndex(item => item.id === id);
  if (idx === -1) return false;
  millipores[idx] = { ...millipores[idx], ...updatedData };
  return true;
};
export const deleteMillipore = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = millipores.findIndex(item => item.id === id);
  if (idx === -1) return false;
  millipores.splice(idx, 1);
  return true;
};
// Corrosion Inhibitor Residuals
export const createCorrosionInhibitorResidual = async (newItem: typeof corrosionInhibitorResiduals[number]): Promise<typeof corrosionInhibitorResiduals[number]> => {
  await simulateDelay(300);
  corrosionInhibitorResiduals.push(newItem);
  return newItem;
};
export const updateCorrosionInhibitorResidual = async (id: string, updatedData: Partial<typeof corrosionInhibitorResiduals[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = corrosionInhibitorResiduals.findIndex(item => item.id === id);
  if (idx === -1) return false;
  corrosionInhibitorResiduals[idx] = { ...corrosionInhibitorResiduals[idx], ...updatedData };
  return true;
};
export const deleteCorrosionInhibitorResidual = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = corrosionInhibitorResiduals.findIndex(item => item.id === id);
  if (idx === -1) return false;
  corrosionInhibitorResiduals.splice(idx, 1);
  return true;
};
// Scale Inhibitor Residuals
export const createScaleInhibitorResidual = async (newItem: typeof scaleInhibitorResiduals[number]): Promise<typeof scaleInhibitorResiduals[number]> => {
  await simulateDelay(300);
  scaleInhibitorResiduals.push(newItem);
  return newItem;
};
export const updateScaleInhibitorResidual = async (id: string, updatedData: Partial<typeof scaleInhibitorResiduals[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = scaleInhibitorResiduals.findIndex(item => item.id === id);
  if (idx === -1) return false;
  scaleInhibitorResiduals[idx] = { ...scaleInhibitorResiduals[idx], ...updatedData };
  return true;
};
export const deleteScaleInhibitorResidual = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = scaleInhibitorResiduals.findIndex(item => item.id === id);
  if (idx === -1) return false;
  scaleInhibitorResiduals.splice(idx, 1);
  return true;
};
// Coupon Analyses
export const createCouponAnalysis = async (newItem: typeof couponAnalyses[number]): Promise<typeof couponAnalyses[number]> => {
  await simulateDelay(300);
  couponAnalyses.push(newItem);
  return newItem;
};
export const updateCouponAnalysis = async (id: string, updatedData: Partial<typeof couponAnalyses[number]>): Promise<boolean> => {
  await simulateDelay(300);
  const idx = couponAnalyses.findIndex(item => String(item.id) === id);
  if (idx === -1) return false;
  couponAnalyses[idx] = { ...couponAnalyses[idx], ...updatedData };
  return true;
};
export const deleteCouponAnalysis = async (id: string): Promise<boolean> => {
  await simulateDelay(300);
  const idx = couponAnalyses.findIndex(item => String(item.id) === id);
  if (idx === -1) return false;
  couponAnalyses.splice(idx, 1);
  return true;
};