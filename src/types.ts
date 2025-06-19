export interface Account {
  id: string;
  name: string;
}

export interface Contact {
    id: string;
    name: string;
    accountId: string;
    accountName: string;
}

export interface Facility {
    id: string;
    name: string;
}

export interface SamplePoint {
  id: string;
  name: string;
  facilityId: string;
  facilityName: string;
  wellVessel: string | null;
  location: string | null;
}

export interface Sample {
  id: string;
  sampleId: string;
  facilityId: string;
  facilityName: string;
  samplePointId: string;
  samplePointName: string;
  ownerId: string;
  facilitatorId: string | null;
  facilitatorName: string | null;
  collectionDate: string | null;
  collectedById: string | null;
  collectedByName: string | null;
  dateReceivedByLab: string | null;
  completionDate: string | null; 
}

// types.ts
export interface WaterAnalysis {
  id: string;
  sampleFk: string;           // Foreign key to sample.id
  sampleName: string;         // sample.sampleId (human-readable)
  dateAnalyzed: string | null;
  bwpd: number | null;
  mcfd: number | null;
  ph: number | null;
  dissolvedCO2: number | null;
  dissolvedH2S: number | null;
  gasCO2: number | null;
  gasH2S: number | null;
  totalDissolvedSolids: number | null;
  chlorides: number | null;
  bicarbonates: number | null;
  ironTotal: number | null;
  manganese: number | null;
  barium: number | null;
  calcium: number | null;
  potassium: number | null;
  lithium: number | null;
  magnesium: number | null;
  sodium: number | null;
  phosphates: number | null;
  strontium: number | null;
  zinc: number | null;
  sulfates: number | null;
  specificGravity: number | null;
}
