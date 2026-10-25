import { ResourceItem } from "./types";
import { loadLocalCatalogue } from "../services/resourceCatalogueService";

// Verified Google Drive Repositories
export const STUDY_FOLDER_URL = "https://drive.google.com/file/d/1vGGEvJ8QRYKOjwKYJAucaW15VdL6kCAv/view?usp=drive_link";
export const QUIZ_FOLDER_URL = "https://drive.google.com/file/d/1kkqie4Q6MGuTWuCZDA-jIMb-AlFX4eAt/view?usp=drive_link";

export const starterResources: ResourceItem[] = loadLocalCatalogue();
