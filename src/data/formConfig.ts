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
  fetchCouponAnalyses,
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
  type?: 'text' | 'date' | 'checkbox' | 'foreignKey' | 'integer' | 'decimal' | 'hidden';
  optionsKey?: string;
}
export interface FormGroupConfig {
  groupLabel: string;
  fields: FieldConfig[];
}

export interface FormConfigItem<T = any> {
  menu: MenuConfig;
  listView: ListViewConfig;
  formLayout: FormGroupConfig[];
  fetcher?: () => Promise<T[]>;
  create?: (newItem: T) => Promise<T>;
  update?: (id: string, updatedData: Partial<T>) => Promise<boolean>;
  delete?: (id: string) => Promise<boolean>;
}

export const formConfig: Record<string, FormConfigItem<any>> = {
  accounts: {
    menu: { buttonName: 'Accounts' },
    listView: { fields: ['id','name'] },
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

  contacts: {
    menu: { buttonName: 'Contacts' },
    listView: { fields: ['id','name','accountId'] },
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

  facilities: {
    menu: { buttonName: 'Facilities' },
    listView: { fields: ['id','name'] },
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
    listView: { fields: ['name','wellVessel','location','facilityId'] },
    formLayout: [
      {
        groupLabel: 'Sample Point Details',
        fields: [
          { name: 'name', label: 'Point Name' }
        ]
      },
      {
        groupLabel: 'Location',
        fields: [
          { name: 'wellVessel', label: 'Well/Vessel' },
          { name: 'location', label: 'Location' }
        ]
      },
      {
        groupLabel: 'Facility',
        fields: [
          { name: 'facilityId', label: 'Facility', type: 'foreignKey', optionsKey: 'facilities' }
        ]
      }
    ],
    fetcher: fetchSamplePoints,
    create: createSamplePoint,
    update: updateSamplePoint,
    delete: deleteSamplePoint
  },

  samples: {
    menu: { buttonName: 'Samples' },
    listView: { fields: ['id','sampleId','facilityId','samplePointId','ownerId','facilitatorId','collectionDate','collectedById','dateReceivedByLab','completionDate'] },
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
          { name: 'ownerId', label: 'Owner', type: 'foreignKey', optionsKey: 'accounts' },
          { name: 'facilitatorId', label: 'Facilitator', type: 'foreignKey', optionsKey: 'accounts' },
          { name: 'collectedById', label: 'Collected By', type: 'foreignKey', optionsKey: 'contacts' }
        ]
      },
      {
        groupLabel: 'Dates',
        fields: [
          { name: 'collectionDate', label: 'Collection Date', type: 'date' },
          { name: 'dateReceivedByLab', label: 'Received by Lab', type: 'date' },
          { name: 'completionDate', label: 'Completion Date', type: 'date' }
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
    listView: {
      fields: [
        'id','sampleId','dateAnalyzed','bwpd','mcfd','ph','dissolvedCO2','dissolvedH2S',
        'gasCO2','gasH2S','totalDissolvedSolids','chlorides','bicarbonates','ironTotal',
        'manganese','barium','calcium','potassium','lithium','magnesium','sodium',
        'phosphates','strontium','zinc','sulfates','specificGravity'
      ]
    },
    formLayout: [
      {
        groupLabel: 'Identifiers',
        fields: [{ name: 'id', label: 'ID', type: 'text' }]
      },
      {
        groupLabel: 'Analysis Info',
        fields: [
          { name: 'sampleId', label: 'Sample ID', type: 'foreignKey', optionsKey: 'samples' },
          { name: 'dateAnalyzed', label: 'Date Analyzed', type: 'date' }
        ]
      },
      {
        groupLabel: 'Basic Metrics',
        fields: [
          { name: 'bwpd', label: 'BWPD', type: 'decimal' },
          { name: 'mcfd', label: 'MCFD', type: 'decimal' },
          { name: 'ph', label: 'pH', type: 'decimal' },
          { name: 'specificGravity', label: 'Specific Gravity', type: 'decimal' }
        ]
      },
      {
        groupLabel: 'Gas & Dissolved Gases',
        fields: [
          { name: 'dissolvedCO2', label: 'Dissolved CO₂', type: 'decimal' },
          { name: 'dissolvedH2S', label: 'Dissolved H₂S', type: 'decimal' },
          { name: 'gasCO2', label: 'Gas CO₂', type: 'decimal' },
          { name: 'gasH2S', label: 'Gas H₂S', type: 'decimal' }
        ]
      },
      {
        groupLabel: 'Ions & Salts',
        fields: [
          { name: 'chlorides', label: 'Chlorides', type: 'decimal' },
          { name: 'bicarbonates', label: 'Bicarbonates', type: 'decimal' },
          { name: 'ironTotal', label: 'Iron Total', type: 'decimal' },
          { name: 'manganese', label: 'Manganese', type: 'decimal' },
          { name: 'barium', label: 'Barium', type: 'decimal' },
          { name: 'calcium', label: 'Calcium', type: 'decimal' },
          { name: 'potassium', label: 'Potassium', type: 'decimal' },
          { name: 'lithium', label: 'Lithium', type: 'decimal' },
          { name: 'magnesium', label: 'Magnesium', type: 'decimal' },
          { name: 'sodium', label: 'Sodium', type: 'decimal' },
          { name: 'phosphates', label: 'Phosphates', type: 'decimal' },
          { name: 'strontium', label: 'Strontium', type: 'decimal' },
          { name: 'zinc', label: 'Zinc', type: 'decimal' },
          { name: 'sulfates', label: 'Sulfates', type: 'decimal' }
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
    listView: { fields: ['sampleId','dateAnalyzed','apiGravity','pourPoint'] },
    formLayout: [
      {
        groupLabel: 'Analysis Info',
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
          { name: 'c16C120', label: 'C16–C120', type: 'decimal' },
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
    listView: { fields: ['sampleId','apbReadingDate','srbReadingDate','apbPositiveBottles'] },
    formLayout: [
      {
        groupLabel: 'Analysis Info',
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
    listView: { fields: ['sampleId','dateAnalyzed','atpType','microbialEquivalent'] },
    formLayout: [
      {
        groupLabel: 'Analysis Info',
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
          { name: 'microbialEquivalent', label: 'Microbial Equivalent', type: 'decimal' }
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
    listView: { fields: ['sampleId','dateAnalyzed','volume','pressure'] },
    formLayout: [
      {
        groupLabel: 'Analysis Info',
        fields: [
          { name: 'sampleId', label: 'Sample ID', type: 'foreignKey', optionsKey: 'samples' },
          { name: 'dateAnalyzed', label: 'Date Analyzed', type: 'date' }
        ]
      },
      {
        groupLabel: 'Filtration Details',
        fields: [
          { name: 'volume', label: 'Volume', type: 'decimal' },
          { name: 'time', label: 'Time', type: 'decimal' },
          { name: 'pressure', label: 'Pressure', type: 'decimal' },
          { name: 'milliporeSize', label: 'Millipore Size', type: 'decimal' },
          { name: 'pluggingFactor', label: 'Plugging Factor', type: 'decimal' }
        ]
      },
      {
        groupLabel: 'Suspended Solids & Compositions',
        fields: [
          { name: 'totalSuspendedSolids', label: 'Total Suspended Solids', type: 'decimal' },
          { name: 'paraffinsOils', label: 'Paraffins & Oils', type: 'decimal' },
          { name: 'asphaltenesAromatics', label: 'Asphaltenes & Aromatics', type: 'decimal' },
          { name: 'carbonates', label: 'Carbonates', type: 'decimal' },
          { name: 'ironCompounds', label: 'Iron Compounds', type: 'decimal' },
          { name: 'acidInsolubles', label: 'Acid Insolubles', type: 'decimal' }
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
    listView: { fields: ['sampleId','dateAnalyzed','corrosionInhibitorResidual'] },
    formLayout: [
      {
        groupLabel: 'Analysis Info',
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
        groupLabel: 'Residual Measurement',
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
    listView: { fields: ['sampleId','dateAnalyzed','scaleInhibitorResidual'] },
    formLayout: [
      {
        groupLabel: 'Analysis Info',
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
        groupLabel: 'Residual Measurement',
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
    listView: { fields: ['dateAnalyzed','couponType','daysExposed'] },
    formLayout: [
      {
        groupLabel: 'Identification & Dates',
        fields: [
          { name: 'dateAnalyzed', label: 'Date Analyzed', type: 'date' },
          { name: 'dateIn', label: 'Date In', type: 'date' },
          { name: 'dateOut', label: 'Date Out', type: 'date' },
          { name: 'couponType', label: 'Coupon Type' }
        ]
      },
      {
        groupLabel: 'Exposure Metrics',
        fields: [
          { name: 'daysExposed', label: 'Days Exposed', type: 'integer' },
          { name: 'couponSurfaceArea', label: 'Surface Area', type: 'decimal' }
        ]
      },
      {
        groupLabel: 'Weight Measurements',
        fields: [
          { name: 'initialWeight', label: 'Initial Weight', type: 'decimal' },
          { name: 'finalWeight', label: 'Final Weight', type: 'decimal' },
          { name: 'receivedWeight', label: 'Received Weight', type: 'decimal' },
          { name: 'weightAfterXyleneWash', label: 'Weight After Xylene Wash', type: 'decimal' },
          { name: 'weightLossAfterXyleneWash', label: 'Weight Loss After Xylene Wash', type: 'decimal' },
          { name: 'weightLossAfterHydrochloricWash', label: 'Weight Loss After HCl Wash', type: 'decimal' },
          { name: 'overallWeightLoss', label: 'Overall Weight Loss', type: 'decimal' }
        ]
      },
      {
        groupLabel: 'Pit Depth Metrics',
        fields: [
          { name: 'pitDepth1', label: 'Pit Depth 1', type: 'decimal' },
          { name: 'pitDepth2', label: 'Pit Depth 2', type: 'decimal' },
          { name: 'pitDepth3', label: 'Pit Depth 3', type: 'decimal' },
          { name: 'avgPitDepth', label: 'Avg Pit Depth', type: 'decimal' },
          { name: 'maxPitDepth', label: 'Max Pit Depth', type: 'decimal' }
        ]
      },
      {
        groupLabel: 'Pitting Rates & Corrosion',
        fields: [
          { name: 'avgPittingRate', label: 'Avg Pitting Rate', type: 'decimal' },
          { name: 'maxPittingRate', label: 'Max Pitting Rate', type: 'decimal' },
          { name: 'crMpy', label: 'Corrosion Rate (mpy)', type: 'decimal' }
        ]
      },
      {
        groupLabel: 'Deposition & Composition',
        fields: [
          { name: 'hydrocarbonDeposition', label: 'Hydrocarbon Deposition', type: 'decimal' },
          { name: 'inorganicScaleDeposition', label: 'Inorganic Scale Deposition', type: 'decimal' },
          { name: 'calciumCarbonate', label: 'Calcium Carbonate Present', type: 'checkbox' },
          { name: 'iron2Oxide', label: 'Iron(II) Oxide Present', type: 'checkbox' },
          { name: 'hydrocarbon', label: 'Hydrocarbon Present', type: 'checkbox' },
          { name: 'silicates', label: 'Silicates Present', type: 'checkbox' },
          { name: 'hydrogenSulfide', label: 'H₂S Present', type: 'checkbox' },
          { name: 'parrafin', label: 'Paraffin Present', type: 'checkbox' },
          { name: 'ironSulfide', label: 'Iron Sulfide Present', type: 'checkbox' },
          { name: 'scale', label: 'Scale Present', type: 'checkbox' },
          { name: 'mechanicalAbrasion', label: 'Mechanical Abrasion', type: 'checkbox' },
          { name: 'erosion', label: 'Erosion', type: 'checkbox' }
        ]
      },
      {
        groupLabel: 'Localized Corrosion Modes',
        fields: [
          { name: 'generalCorrosion', label: 'General Corrosion', type: 'checkbox' },
          { name: 'localizedCorrosion', label: 'Localized Corrosion', type: 'checkbox' },
          { name: 'oxygenCorrosion', label: 'Oxygen Corrosion', type: 'checkbox' },
          { name: 'slightPitting', label: 'Slight Pitting', type: 'checkbox' },
          { name: 'mildPitting', label: 'Mild Pitting', type: 'checkbox' },
          { name: 'severePitting', label: 'Severe Pitting', type: 'checkbox' },
          { name: 'carbonDioxideCorrosion', label: 'CO₂ Corrosion', type: 'checkbox' },
          { name: 'hydrogenSulfideCorrosion', label: 'H₂S Corrosion', type: 'checkbox' },
          { name: 'physicalDamage', label: 'Physical Damage', type: 'checkbox' }
        ]
      }
    ],
    fetcher: fetchCouponAnalyses,
    create: createCouponAnalysis,
    update: updateCouponAnalysis,
    delete: deleteCouponAnalysis
  }
};
