import { objectTypes } from "../data/mockData";

export const getObjectFields = (objectTypeId: string) => {
  const objectType = objectTypes.find(type => type.id === objectTypeId);
  if (!objectType || objectType.data.length === 0) return [];
  const sampleObject = objectType.data[0];
  return Object.keys(sampleObject).map(key => ({
    id: key,
    label: formatFieldLabel(key),
    type: inferFieldType((sampleObject as any)[key], key)
  }));
};

export const formatFieldLabel = (fieldName: string) => {
  if (fieldName === "id") return "ID";
  return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
};

export const inferFieldType = (value: any, fieldName: string) => {
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

export const getObjectById = (objectTypeId: string, objectId: string) => {
  const objectType = objectTypes.find(type => type.id === objectTypeId);
  if (!objectType) return null;
  return objectType.data.find((item: any) => item.id === objectId) || null;
};

export const getRelatedObjectOptions = (objectTypeId: string) => {
  const objectType = objectTypes.find(type => type.id === objectTypeId);
  if (!objectType) return [];
  return objectType.data.map((item: any) => ({
    value: item.id,
    label: item.name || item.id
  }));
};

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

export const getRelatedObjectName = (objectId: string, relatedId: string) => {
  const objectType = objectTypes.find(type => type.id === objectId);
  if (!objectType) return "Unknown";
  const relatedObject = objectType.data.find((item: any) => item.id === relatedId);
  return relatedObject ? relatedObject.name : "Unknown";
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().slice(0, 10); // Returns YYYY-MM-DD in UTC
};