import { ResourceItem } from "./types";
import { loadLocalCatalogue } from "../services/resourceCatalogueService";

export const STUDY_FOLDER_URL = "https://drive.google.com/drive/folders/1QNlxdw-gPrm4K9Uqtm8xNA5ceUDcB71q";
export const QUIZ_FOLDER_URL = "https://drive.google.com/drive/folders/1oH8zZgHRKkkpDhHbXAg7H9sfyq1KpJFl";

export const starterResources: ResourceItem[] = loadLocalCatalogue();
