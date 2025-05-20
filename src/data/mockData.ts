// Mock data for all database tables
// Account data
export const accounts = [{
  id: "acc1",
  name: "Petrochem Inc."
}, {
  id: "acc2",
  name: "Gulf Solutions"
}, {
  id: "acc3",
  name: "Oceanic Energy"
}, {
  id: "acc4",
  name: "TechWell Systems"
}, {
  id: "acc5",
  name: "Global Extraction Ltd."
}];
// Facility data
export const facilities = [{
  id: "fac1",
  name: "North Platform"
}, {
  id: "fac2",
  name: "South Field Processing"
}, {
  id: "fac3",
  name: "West Terminal"
}, {
  id: "fac4",
  name: "East Refinery"
}, {
  id: "fac5",
  name: "Central Operations"
}];
// Sample point data
export const samplePoints = [{
  id: "sp1",
  name: "Wellhead A",
  facilityId: "fac1",
  wellVessel: "Well-123",
  location: "Block 4N"
}, {
  id: "sp2",
  name: "Separator Outlet",
  facilityId: "fac1",
  wellVessel: "SEP-01",
  location: "Processing Area"
}, {
  id: "sp3",
  name: "Storage Tank 2",
  facilityId: "fac2",
  wellVessel: "TK-002",
  location: "Tank Farm"
}, {
  id: "sp4",
  name: "Pipeline Inlet",
  facilityId: "fac3",
  wellVessel: "PL-IN-01",
  location: "Manifold 3"
}, {
  id: "sp5",
  name: "Export Line",
  facilityId: "fac4",
  wellVessel: "EXP-01",
  location: "Terminal 2"
}];
// Contact data
export const contacts = [{
  id: "con1",
  name: "John Smith",
  accountId: "acc1"
}, {
  id: "con2",
  name: "Maria Rodriguez",
  accountId: "acc2"
}, {
  id: "con3",
  name: "Ahmed Hassan",
  accountId: "acc3"
}, {
  id: "con4",
  name: "Sarah Johnson",
  accountId: "acc1"
}, {
  id: "con5",
  name: "David Chen",
  accountId: "acc4"
}];
// Sample data
export const samples = [{
  id: "sam1",
  sampleId: "S-2023-001",
  facilityId: "fac1",
  samplePointId: "sp1",
  ownerId: "acc1",
  facilitatorId: null,
  collectionDate: "2023-10-15T09:30:00.000Z",
  collectedById: "con1",
  dateReceivedByLab: "2023-10-16T14:20:00.000Z",
  completionDate: "2023-10-18T16:45:00.000Z"
}, {
  id: "sam2",
  sampleId: "S-2023-002",
  facilityId: "fac2",
  samplePointId: "sp3",
  ownerId: "acc2",
  facilitatorId: null,
  collectionDate: "2023-10-17T10:15:00.000Z",
  collectedById: "con2",
  dateReceivedByLab: "2023-10-18T11:30:00.000Z",
  completionDate: "2023-10-20T15:20:00.000Z"
}, {
  id: "sam3",
  sampleId: "S-2023-003",
  facilityId: "fac3",
  samplePointId: "sp4",
  ownerId: "acc3",
  facilitatorId: null,
  collectionDate: "2023-10-19T08:45:00.000Z",
  collectedById: "con3",
  dateReceivedByLab: "2023-10-20T09:15:00.000Z",
  completionDate: "2023-10-22T14:30:00.000Z"
}, {
  id: "sam4",
  sampleId: "S-2023-004",
  facilityId: "fac1",
  samplePointId: "sp2",
  ownerId: "acc1",
  facilitatorId: null,
  collectionDate: "2023-10-22T11:00:00.000Z",
  collectedById: "con4",
  dateReceivedByLab: "2023-10-23T10:45:00.000Z",
  completionDate: "2023-10-25T16:30:00.000Z"
}, {
  id: "sam5",
  sampleId: "S-2023-005",
  facilityId: "fac4",
  samplePointId: "sp5",
  ownerId: "acc4",
  facilitatorId: null,
  collectionDate: "2023-10-24T09:20:00.000Z",
  collectedById: "con5",
  dateReceivedByLab: "2023-10-25T14:10:00.000Z",
  completionDate: "2023-10-27T15:40:00.000Z"
}];
// Water Analysis data
export const waterAnalyses = [{
  id: "wa1",
  sampleId: "sam1",
  dateAnalyzed: "2023-10-17T11:30:00.000Z",
  bwpd: 1250.5,
  mcfd: 3500.2,
  ph: 6.8,
  dissolvedCO2: 45.2,
  dissolvedH2S: 0.5,
  gasCO2: 2.1,
  gasH2S: 0.3,
  totalDissolvedSolids: 35000,
  chlorides: 19500,
  bicarbonates: 850,
  ironTotal: 25.3,
  manganese: 1.2,
  barium: 8.5,
  calcium: 1250,
  potassium: 380,
  lithium: 5.2,
  magnesium: 420,
  sodium: 11500,
  phosphates: 0.8,
  strontium: 42,
  zinc: 0.9,
  sulfates: 250,
  specificGravity: 1.03
}, {
  id: "wa2",
  sampleId: "sam2",
  dateAnalyzed: "2023-10-19T10:45:00.000Z",
  bwpd: 980.3,
  mcfd: 2800.5,
  ph: 7.2,
  dissolvedCO2: 38.6,
  dissolvedH2S: 0.3,
  gasCO2: 1.8,
  gasH2S: 0.2,
  totalDissolvedSolids: 32000,
  chlorides: 18200,
  bicarbonates: 780,
  ironTotal: 22.1,
  manganese: 0.9,
  barium: 7.2,
  calcium: 1150,
  potassium: 350,
  lithium: 4.8,
  magnesium: 390,
  sodium: 10800,
  phosphates: 0.7,
  strontium: 38,
  zinc: 0.7,
  sulfates: 220,
  specificGravity: 1.025
}];
// Oil Analysis data
export const oilAnalyses = [{
  id: "oa1",
  sampleId: "sam1",
  dateAnalyzed: "2023-10-17T13:45:00.000Z",
  apiGravity: 35.2,
  asphalteneContent: 2.3,
  solidsContent: 0.5,
  flowingTemperature: 85.4,
  totalWaxContent: 3.1,
  waxAppearanceTemp: 65.2,
  c16C120: 78.5,
  appearance: "Dark Brown",
  pourPoint: 45,
  analysisCost: 250.00
}, {
  id: "oa2",
  sampleId: "sam3",
  dateAnalyzed: "2023-10-21T09:30:00.000Z",
  apiGravity: 32.8,
  asphalteneContent: 2.7,
  solidsContent: 0.6,
  flowingTemperature: 82.1,
  totalWaxContent: 3.5,
  waxAppearanceTemp: 63.8,
  c16C120: 76.2,
  appearance: "Black",
  pourPoint: 48,
  analysisCost: 250.00
}];
// Bacteria Analysis data
export const bacteriaAnalyses = [{
  id: "ba1",
  sampleId: "sam2",
  apbReadingDate: "2023-10-19T14:30:00.000Z",
  srbReadingDate: "2023-10-19T14:45:00.000Z",
  apbIncubationPeriod: 48.5,
  srbIncubationPeriod: 72.0,
  apbPositiveBottles: 2,
  srbPositiveBottles: 1
}, {
  id: "ba2",
  sampleId: "sam4",
  apbReadingDate: "2023-10-24T13:15:00.000Z",
  srbReadingDate: "2023-10-24T13:30:00.000Z",
  apbIncubationPeriod: 48.0,
  srbIncubationPeriod: 72.0,
  apbPositiveBottles: 1,
  srbPositiveBottles: 0
}];
// ATP Bacteria Analysis data
export const atpBacteriaAnalyses = [{
  id: "atpba1",
  sampleId: "sam2",
  dateAnalyzed: "2023-10-19T15:30:00.000Z",
  atpType: "Total",
  sampleSize: 1.0,
  rluStandard: 12500,
  rluBlank: 120,
  rluSample: 3450,
  atpM: 0.276,
  microbialEquivalent: 138000
}, {
  id: "atpba2",
  sampleId: "sam4",
  dateAnalyzed: "2023-10-24T14:15:00.000Z",
  atpType: "Total",
  sampleSize: 1.0,
  rluStandard: 12300,
  rluBlank: 110,
  rluSample: 2980,
  atpM: 0.242,
  microbialEquivalent: 121000
}];
// Millipore data
export const millipores = [{
  id: "mp1",
  sampleId: "sam3",
  dateAnalyzed: "2023-10-21T11:30:00.000Z",
  volume: 500,
  time: 15.5,
  pressure: 30.2,
  milliporeSize: 0.45,
  pluggingFactor: 1.8,
  totalSuspendedSolids: 120.5,
  paraffinsOils: 45.2,
  asphaltenesAromatics: 32.6,
  carbonates: 18.3,
  ironCompounds: 12.5,
  acidInsolubles: 9.8
}, {
  id: "mp2",
  sampleId: "sam5",
  dateAnalyzed: "2023-10-26T10:45:00.000Z",
  volume: 500,
  time: 14.8,
  pressure: 29.5,
  milliporeSize: 0.45,
  pluggingFactor: 1.6,
  totalSuspendedSolids: 115.8,
  paraffinsOils: 42.8,
  asphaltenesAromatics: 30.5,
  carbonates: 17.2,
  ironCompounds: 11.8,
  acidInsolubles: 9.2
}];
// Corrosion Inhibitor Residual data
export const corrosionInhibitorResiduals = [{
  id: "cir1",
  sampleId: "sam1",
  dateAnalyzed: "2023-10-17T15:30:00.000Z",
  corrosionInhibitorUsed: "CI-2000",
  corrosionInhibitorResidual: 18.5
}, {
  id: "cir2",
  sampleId: "sam4",
  dateAnalyzed: "2023-10-24T16:15:00.000Z",
  corrosionInhibitorUsed: "CI-3500",
  corrosionInhibitorResidual: 22.3
}];
// Scale Inhibitor Residual data
export const scaleInhibitorResiduals = [{
  id: "sir1",
  sampleId: "sam1",
  dateAnalyzed: "2023-10-17T16:00:00.000Z",
  scaleInhibitorUsed: "SI-1000",
  scaleInhibitorResidual: 15.2
}, {
  id: "sir2",
  sampleId: "sam4",
  dateAnalyzed: "2023-10-24T16:45:00.000Z",
  scaleInhibitorUsed: "SI-2500",
  scaleInhibitorResidual: 17.8
}];
// Coupon Analysis data
export const couponAnalyses = [{
  sampleId: 'sam1',
  id: 1,
  dateAnalyzed: "2023-10-20T09:30:00.000",
  dateIn: "2023-09-20T08:00:00.000",
  dateOut: "2023-10-20T08:00:00.000",
  daysExposed: 30,
  couponType: "Carbon Steel",
  initialWeight: 25000,
  finalWeight: 24850,
  receivedWeight: 24900,
  weightAfterXyleneWash: 24880,
  couponCorrosionFactor: 2,
  couponSurfaceArea: 4500,
  weightLossAfterXyleneWash: 120,
  weightLossAfterHydrochloricWash: 150,
  overallWeightLoss: 150,
  pitDepth1: 12,
  pitDepth2: 15,
  pitDepth3: 10,
  avgPitDepth: 12,
  maxPitDepth: 15,
  avgPittingRate: 4,
  maxPittingRate: 5,
  crMpy: 3,
  hydrocarbonDeposition: 20,
  inorganicScaleDeposition: 30,
  calciumCarbonate: true,
  iron2Oxide: true,
  hydrocarbon: false,
  silicates: false,
  hydrogenSulfide: true,
  parrafin: false,
  ironSulfide: true,
  scale: true,
  mechanicalAbrasion: false,
  erosion: false,
  generalCorrosion: true,
  localizedCorrosion: true,
  oxygenCorrosion: false,
  slightPitting: true,
  mildPitting: false,
  severePitting: false,
  carbonDioxideCorrosion: true,
  hydrogenSulfideCorrosion: true,
  physicalDamage: false
}, {
  sampleId: 'sam2',
  id: 2,
  dateAnalyzed: "2023-10-25T10:15:00.000",
  dateIn: "2023-09-25T08:30:00.000",
  dateOut: "2023-10-25T08:30:00.000",
  daysExposed: 30,
  couponType: "Stainless Steel",
  initialWeight: 27500,
  finalWeight: 27480,
  receivedWeight: 27490,
  weightAfterXyleneWash: 27485,
  couponCorrosionFactor: 1,
  couponSurfaceArea: 4500,
  weightLossAfterXyleneWash: 15,
  weightLossAfterHydrochloricWash: 20,
  overallWeightLoss: 20,
  pitDepth1: 5,
  pitDepth2: 7,
  pitDepth3: 4,
  avgPitDepth: 5,
  maxPitDepth: 7,
  avgPittingRate: 2,
  maxPittingRate: 2,
  crMpy: 1,
  hydrocarbonDeposition: 10,
  inorganicScaleDeposition: 15,
  calciumCarbonate: true,
  iron2Oxide: false,
  hydrocarbon: false,
  silicates: false,
  hydrogenSulfide: false,
  parrafin: false,
  ironSulfide: false,
  scale: true,
  mechanicalAbrasion: false,
  erosion: false,
  generalCorrosion: false,
  localizedCorrosion: false,
  oxygenCorrosion: false,
  slightPitting: false,
  mildPitting: false,
  severePitting: false,
  carbonDioxideCorrosion: false,
  hydrogenSulfideCorrosion: false,
  physicalDamage: false
}]; // end couponAnalyses

// Define the structure for the object types
export const objectTypes = [{
  id: "accounts",
  label: "Accounts",
  data: accounts
}, {
  id: "facilities",
  label: "Facilities",
  data: facilities
}, {
  id: "samplePoints",
  label: "Sample Points",
  data: samplePoints
}, {
  id: "contacts",
  label: "Contacts",
  data: contacts
}, {
  id: "samples",
  label: "Samples",
  data: samples
}, {
  id: "waterAnalyses",
  label: "Water Analyses",
  data: waterAnalyses
}, {
  id: "oilAnalyses",
  label: "Oil Analyses",
  data: oilAnalyses
}, {
  id: "bacteriaAnalyses",
  label: "Bacteria Analyses",
  data: bacteriaAnalyses
}, {
  id: "atpBacteriaAnalyses",
  label: "ATP Bacteria Analyses",
  data: atpBacteriaAnalyses
}, {
  id: "millipores",
  label: "Millipore Tests",
  data: millipores
}, {
  id: "corrosionInhibitorResiduals",
  label: "Corrosion Inhibitor Residuals",
  data: corrosionInhibitorResiduals
}, {
  id: "scaleInhibitorResiduals",
  label: "Scale Inhibitor Residuals",
  data: scaleInhibitorResiduals
}, {
  id: "couponAnalyses",
  label: "Coupon Analyses",
  data: couponAnalyses
}];
// Helper function to get related object name
export const getRelatedObjectName = (objectId: string, relatedId: string): string => {
  const objectType = objectTypes.find(type => type.id === objectId);
  if (!objectType) return "Unknown";
  const items = objectType.data as Record<string, unknown>[];
  const relatedObject = items.find(item => item.id === relatedId) as Record<string, unknown> | undefined;
  if (!relatedObject) return "Unknown";
  const name = relatedObject["name"];
  return typeof name === 'string' ? name : String(relatedId);
};
// Helper function to format dates
export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString();
};