import {
  fetchAccounts,
  fetchFacilities,
  fetchSamplePoints,
  fetchContacts,
  fetchSamples,
  fetchWaterAnalyses,
  fetchOilAnalyses,
  fetchBacteriaAnalyses,
  fetchAtpBacteriaAnalyses,
  fetchMillipores,
  fetchCorrosionInhibitorResiduals,
  fetchScaleInhibitorResiduals,
  fetchCouponAnalyses
  ,
  createAccount, updateAccount, deleteAccount,
  createFacility, updateFacility, deleteFacility,
  createSamplePoint, updateSamplePoint, deleteSamplePoint,
  createContact, updateContact, deleteContact,
  createSample, updateSample, deleteSample,
  createWaterAnalysis, updateWaterAnalysis, deleteWaterAnalysis,
  createOilAnalysis, updateOilAnalysis, deleteOilAnalysis,
  createBacteriaAnalysis, updateBacteriaAnalysis, deleteBacteriaAnalysis,
  createAtpBacteriaAnalysis, updateAtpBacteriaAnalysis, deleteAtpBacteriaAnalysis,
  createMillipore, updateMillipore, deleteMillipore,
  createCorrosionInhibitorResidual, updateCorrosionInhibitorResidual, deleteCorrosionInhibitorResidual,
  createScaleInhibitorResidual, updateScaleInhibitorResidual, deleteScaleInhibitorResidual,
  createCouponAnalysis, updateCouponAnalysis, deleteCouponAnalysis
} from './api';

export interface MenuConfig {
  buttonName: string;
  parentDropdown?: string;
}
export interface ListViewConfig {
  fields: string[];
}
export interface FieldConfig {
  name: string;
  label: string;
  type?: 'text' | 'date' | 'checkbox' | 'foreignKey' | 'integer' | 'decimal';
  optionsKey?: string; // for related object selects, reference key in mockData
}
export interface FormGroupConfig {
  groupLabel: string;
  fields: FieldConfig[];
}

// Generic form config item for a specific entity type
export interface FormConfigItem<T = any> {
  menu: MenuConfig;
  listView: ListViewConfig;
  formLayout: FormGroupConfig[];
  fetcher?: () => Promise<T[]>;
  // CRUD operations for the entity
  create?: (newItem: T) => Promise<T>;
  update?: (id: string, updatedData: Partial<T>) => Promise<boolean>;
  delete?: (id: string) => Promise<boolean>;
}

export const formConfig: Record<string, FormConfigItem<any>> = {
  accounts: {
    menu: { buttonName: 'Accounts' },
    listView: { fields: ['name'] },
    formLayout: [
      {
        groupLabel: 'Account Details',
        fields: [
          { name: 'name', label: 'Account Name' }
        ]
      }
    ],
    fetcher: fetchAccounts,
    create: createAccount,
    update: updateAccount,
    delete: deleteAccount
  },
  facilities: {
    menu: { buttonName: 'Facilities' },
    listView: { fields: ['name'] },
    formLayout: [
      {
        groupLabel: 'Facility Details',
        fields: [
          { name: 'name', label: 'Facility Name' }
        ]
      }
    ],
    fetcher: fetchFacilities,
    create: createFacility,
    update: updateFacility,
    delete: deleteFacility
  },
  samplePoints: {
    menu: { buttonName: 'Sample Points' },
    listView: { fields: ['name', 'facilityId', 'location'] },
    formLayout: [
      {
        groupLabel: 'Sample Point Details',
        fields: [
          { name: 'name', label: 'Point Name' }
        ]
      },
      {
        groupLabel: 'Location Information',
        fields: [
          { name: 'facilityId', label: 'Facility', type: 'foreignKey', optionsKey: 'facilities' },
          { name: 'location', label: 'Location' }
        ]
      }
    ],
    fetcher: fetchSamplePoints,
    create: createSamplePoint,
    update: updateSamplePoint,
    delete: deleteSamplePoint
  },
  contacts: {
    menu: { buttonName: 'Contacts' },
    listView: { fields: ['name', 'accountId'] },
    formLayout: [
      {
        groupLabel: 'Contact Information',
        fields: [
          { name: 'name', label: 'Contact Name' }
        ]
      },
      {
        groupLabel: 'Account Association',
        fields: [
          { name: 'accountId', label: 'Account', type: 'foreignKey', optionsKey: 'accounts' }
        ]
      }
    ],
    fetcher: fetchContacts,
    create: createContact,
    update: updateContact,
    delete: deleteContact
  },
  samples: {
    menu: { buttonName: 'Samples' },
    listView: { fields: ['sampleId', 'facilityId', 'samplePointId', 'collectionDate'] },
    formLayout: [
      {
        groupLabel: 'Sample Identification',
        fields: [
          { name: 'sampleId', label: 'Sample ID' }
        ]
      },
      {
        groupLabel: 'Associations',
        fields: [
          { name: 'facilityId', label: 'Facility', type: 'foreignKey', optionsKey: 'facilities' },
          { name: 'samplePointId', label: 'Sample Point', type: 'foreignKey', optionsKey: 'samplePoints' },
          { name: 'ownerId', label: 'Owner', type: 'foreignKey', optionsKey: 'accounts' }
        ]
      },
      {
        groupLabel: 'Collection Information',
        fields: [
          { name: 'collectionDate', label: 'Collection Date', type: 'date' }
        ]
      }
    ],
    fetcher: fetchSamples,
    create: createSample,
    update: updateSample,
    delete: deleteSample
  },
  waterAnalyses: {
    menu: { buttonName: 'Water Analyses', parentDropdown: 'Analyses' },
    listView: { fields: ['sampleId', 'dateAnalyzed', 'ph', 'totalDissolvedSolids'] },
    formLayout: [
      {
        groupLabel: 'Analysis Information',
        fields: [
          { name: 'sampleId', label: 'Sample ID', type: 'foreignKey', optionsKey: 'samples' },
          { name: 'dateAnalyzed', label: 'Date Analyzed', type: 'date' }
        ]
      },
      {
        groupLabel: 'Measurements',
        fields: [
          { name: 'ph', label: 'pH', type: 'decimal' },
          { name: 'totalDissolvedSolids', label: 'Total Dissolved Solids', type: 'integer' }
        ]
      }
    ],
    fetcher: fetchWaterAnalyses,
    create: createWaterAnalysis,
    update: updateWaterAnalysis,
    delete: deleteWaterAnalysis
  },
  oilAnalyses: {
    menu: { buttonName: 'Oil Analyses', parentDropdown: 'Analyses' },
    listView: { fields: ['sampleId', 'dateAnalyzed', 'apiGravity', 'analysisCost'] },
    formLayout: [
      {
        groupLabel: 'Analysis Information',
        fields: [
          { name: 'sampleId', label: 'Sample ID', type: 'foreignKey', optionsKey: 'samples' },
          { name: 'dateAnalyzed', label: 'Date Analyzed', type: 'date' }
        ]
      },
      {
        groupLabel: 'Oil Properties',
        fields: [
          { name: 'apiGravity', label: 'API Gravity', type: 'decimal' },
          { name: 'asphalteneContent', label: 'Asphaltene Content', type: 'decimal' },
          { name: 'solidsContent', label: 'Solids Content', type: 'decimal' },
          { name: 'flowingTemperature', label: 'Flowing Temperature', type: 'decimal' },
          { name: 'totalWaxContent', label: 'Total Wax Content', type: 'decimal' },
          { name: 'waxAppearanceTemp', label: 'Wax Appearance Temp', type: 'decimal' },
          { name: 'c16C120', label: 'C16-C120', type: 'decimal' },
          { name: 'appearance', label: 'Appearance' },
          { name: 'pourPoint', label: 'Pour Point', type: 'integer' }
        ]
      },
      {
        groupLabel: 'Cost Details',
        fields: [
          { name: 'analysisCost', label: 'Analysis Cost', type: 'decimal' }
        ]
      }
    ],
    fetcher: fetchOilAnalyses,
    create: createOilAnalysis,
    update: updateOilAnalysis,
    delete: deleteOilAnalysis
  },
  bacteriaAnalyses: {
    menu: { buttonName: 'Bacteria Analyses', parentDropdown: 'Analyses' },
    listView: { fields: ['sampleId', 'apbReadingDate', 'srbReadingDate', 'apbPositiveBottles'] },
    formLayout: [
      {
        groupLabel: 'Analysis Information',
        fields: [
          { name: 'sampleId', label: 'Sample ID', type: 'foreignKey', optionsKey: 'samples' },
          { name: 'apbReadingDate', label: 'APB Reading Date', type: 'date' },
          { name: 'srbReadingDate', label: 'SRB Reading Date', type: 'date' }
        ]
      },
      {
        groupLabel: 'Incubation Periods',
        fields: [
          { name: 'apbIncubationPeriod', label: 'APB Incubation Period', type: 'decimal' },
          { name: 'srbIncubationPeriod', label: 'SRB Incubation Period', type: 'decimal' }
        ]
      },
      {
        groupLabel: 'Results',
        fields: [
          { name: 'apbPositiveBottles', label: 'APB Positive Bottles', type: 'integer' },
          { name: 'srbPositiveBottles', label: 'SRB Positive Bottles', type: 'integer' }
        ]
      }
    ],
    fetcher: fetchBacteriaAnalyses,
    create: createBacteriaAnalysis,
    update: updateBacteriaAnalysis,
    delete: deleteBacteriaAnalysis
  },
  atpBacteriaAnalyses: {
    menu: { buttonName: 'ATP Bacteria Analyses', parentDropdown: 'Analyses' },
    listView: { fields: ['sampleId', 'dateAnalyzed', 'atpType', 'microbialEquivalent'] },
    formLayout: [
      {
        groupLabel: 'Analysis Information',
        fields: [
          { name: 'sampleId', label: 'Sample ID', type: 'foreignKey', optionsKey: 'samples' },
          { name: 'dateAnalyzed', label: 'Date Analyzed', type: 'date' },
          { name: 'atpType', label: 'ATP Type' }
        ]
      },
      {
        groupLabel: 'ATP Measurements',
        fields: [
          { name: 'sampleSize', label: 'Sample Size', type: 'decimal' },
          { name: 'rluStandard', label: 'RLU Standard', type: 'integer' },
          { name: 'rluBlank', label: 'RLU Blank', type: 'integer' },
          { name: 'rluSample', label: 'RLU Sample', type: 'integer' },
          { name: 'atpM', label: 'ATP M', type: 'decimal' }
        ]
      },
      {
        groupLabel: 'Microbial Equivalent',
        fields: [
          { name: 'microbialEquivalent', label: 'Microbial Equivalent', type: 'integer' }
        ]
      }
    ],
    fetcher: fetchAtpBacteriaAnalyses,
    create: createAtpBacteriaAnalysis,
    update: updateAtpBacteriaAnalysis,
    delete: deleteAtpBacteriaAnalysis
  },
  millipores: {
    menu: { buttonName: 'Millipore Analyses', parentDropdown: 'Analyses' },
    listView: { fields: ['sampleId', 'dateAnalyzed', 'volume', 'pressure'] },
    formLayout: [
      {
        groupLabel: 'Analysis Information',
        fields: [
          { name: 'sampleId', label: 'Sample ID', type: 'foreignKey', optionsKey: 'samples' },
          { name: 'dateAnalyzed', label: 'Date Analyzed', type: 'date' }
        ]
      },
      {
        groupLabel: 'Filtration Details',
        fields: [
          { name: 'volume', label: 'Volume', type: 'integer' },
          { name: 'time', label: 'Time', type: 'decimal' },
          { name: 'pressure', label: 'Pressure', type: 'decimal' },
          { name: 'milliporeSize', label: 'Millipore Size', type: 'decimal' },
          { name: 'pluggingFactor', label: 'Plugging Factor', type: 'decimal' }
        ]
      },
      {
        groupLabel: 'Results',
        fields: [
          { name: 'totalSuspendedSolids', label: 'Total Suspended Solids', type: 'decimal' }
        ]
      }
    ],
    fetcher: fetchMillipores,
    create: createMillipore,
    update: updateMillipore,
    delete: deleteMillipore
  },
  corrosionInhibitorResiduals: {
    menu: { buttonName: 'Corrosion Inhibitor Residuals', parentDropdown: 'Analyses' },
    listView: { fields: ['sampleId', 'dateAnalyzed', 'corrosionInhibitorResidual'] },
    formLayout: [
      {
        groupLabel: 'Analysis Information',
        fields: [
          { name: 'sampleId', label: 'Sample ID', type: 'foreignKey', optionsKey: 'samples' },
          { name: 'dateAnalyzed', label: 'Date Analyzed', type: 'date' }
        ]
      },
      {
        groupLabel: 'Inhibitor Details',
        fields: [
          { name: 'corrosionInhibitorUsed', label: 'Inhibitor Used' }
        ]
      },
      {
        groupLabel: 'Residual Measurements',
        fields: [
          { name: 'corrosionInhibitorResidual', label: 'Residual', type: 'decimal' }
        ]
      }
    ],
    fetcher: fetchCorrosionInhibitorResiduals,
    create: createCorrosionInhibitorResidual,
    update: updateCorrosionInhibitorResidual,
    delete: deleteCorrosionInhibitorResidual
  },
  scaleInhibitorResiduals: {
    menu: { buttonName: 'Scale Inhibitor Residuals', parentDropdown: 'Analyses' },
    listView: { fields: ['sampleId', 'dateAnalyzed', 'scaleInhibitorResidual'] },
    formLayout: [
      {
        groupLabel: 'Analysis Information',
        fields: [
          { name: 'sampleId', label: 'Sample ID', type: 'foreignKey', optionsKey: 'samples' },
          { name: 'dateAnalyzed', label: 'Date Analyzed', type: 'date' }
        ]
      },
      {
        groupLabel: 'Inhibitor Details',
        fields: [
          { name: 'scaleInhibitorUsed', label: 'Inhibitor Used' }
        ]
      },
      {
        groupLabel: 'Residual Measurements',
        fields: [
          { name: 'scaleInhibitorResidual', label: 'Residual', type: 'decimal' }
        ]
      }
    ],
    fetcher: fetchScaleInhibitorResiduals,
    create: createScaleInhibitorResidual,
    update: updateScaleInhibitorResidual,
    delete: deleteScaleInhibitorResidual
  },
  couponAnalyses: {
    menu: { buttonName: 'Coupon Analyses', parentDropdown: 'Analyses' },
    listView: { fields: ['sampleId', 'dateAnalyzed', 'daysExposed'] },
    formLayout: [
      {
        groupLabel: 'Coupon Identification',
        fields: [
          { name: 'sampleId', label: 'Sample ID', type: 'foreignKey', optionsKey: 'samples' },
          { name: 'dateIn', label: 'Date In', type: 'date' },
          { name: 'dateOut', label: 'Date Out', type: 'date' },
          { name: 'couponType', label: 'Coupon Type' }
        ]
      },
      {
        groupLabel: 'Exposure Details',
        fields: [
          { name: 'daysExposed', label: 'Days Exposed', type: 'integer' },
          { name: 'couponSurfaceArea', label: 'Surface Area', type: 'integer' }
        ]
      },
      {
        groupLabel: 'Weight Measurements',
        fields: [
          { name: 'initialWeight', label: 'Initial Weight', type: 'integer' },
          { name: 'finalWeight', label: 'Final Weight', type: 'integer' },
          { name: 'receivedWeight', label: 'Received Weight', type: 'integer' },
          { name: 'weightAfterXyleneWash', label: 'Weight After Wash', type: 'integer' }
        ]
      },
      {
        groupLabel: 'Corrosion Metrics',
        fields: [
          { name: 'couponCorrosionFactor', label: 'Corrosion Factor', type: 'integer' }
        ]
      }
    ],
    fetcher: fetchCouponAnalyses,
    create: createCouponAnalysis,
    update: updateCouponAnalysis,
    delete: deleteCouponAnalysis
  }
};
