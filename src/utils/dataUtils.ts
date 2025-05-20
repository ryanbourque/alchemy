import { objectTypes } from "../data/mockData";
// Get the fields for a specific object type
export const getObjectFields = (objectTypeId: string) => {
  const objectType = objectTypes.find(type => type.id === objectTypeId);
  if (!objectType || objectType.data.length === 0) return [];
  const sampleObject = objectType.data[0];
  return Object.keys(sampleObject).map(key => ({
    id: key,
    label: formatFieldLabel(key),
    type: inferFieldType(sampleObject[key], key)
  }));
};
// Format a field name into a human-readable label
export const formatFieldLabel = (fieldName: string) => {
  // Handle special cases
  if (fieldName === "id") return "ID";
  // Convert camelCase to Title Case with spaces
  return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
};
// Infer the field type from the value and field name
export const inferFieldType = (value: any, fieldName: string) => {
  // Check for foreign key fields first
  if (fieldName.endsWith('Id')) {
    return "foreignKey";
  }
  if (value === null || value === undefined) return "text";
  switch (typeof value) {
    case "boolean":
      return "checkbox";
    case "number":
      return Number.isInteger(value) ? "integer" : "decimal";
    case "string":
      if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
        return "date";
      }
      return "text";
    default:
      return "text";
  }
};
// Get an object by its ID from a specific object type
export const getObjectById = (objectTypeId: string, objectId: string) => {
  const objectType = objectTypes.find(type => type.id === objectTypeId);
  if (!objectType) return null;
  return objectType.data.find((item: any) => item.id === objectId) || null;
};
// Get the related object options for a foreign key field
export const getRelatedObjectOptions = (objectTypeId: string) => {
  const objectType = objectTypes.find(type => type.id === objectTypeId);
  if (!objectType) return [];
  return objectType.data.map((item: any) => ({
    value: item.id,
    label: item.name || item.id
  }));
};
// Update an object in the mock data
export const updateObject = (objectTypeId: string, objectId: string, updatedData: any) => {
  const objectTypeIndex = objectTypes.findIndex(type => type.id === objectTypeId);
  if (objectTypeIndex === -1) return false;
  const objectIndex = objectTypes[objectTypeIndex].data.findIndex((item: any) => item.id === objectId);
  if (objectIndex === -1) return false;
  objectTypes[objectTypeIndex].data[objectIndex] = {
    ...objectTypes[objectTypeIndex].data[objectIndex],
    ...updatedData
  };
  return true;
};
// Get related object name (moved from mockData.ts)
export const getRelatedObjectName = (objectId: string, relatedId: string) => {
  const objectType = objectTypes.find(type => type.id === objectId);
  if (!objectType) return "Unknown";
  const relatedObject = objectType.data.find((item: any) => item.id === relatedId);
  return relatedObject ? relatedObject.name : "Unknown";
};