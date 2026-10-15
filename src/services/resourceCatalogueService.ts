import { ResourceItem } from "../data/types";
import localCatalogue from "../data/resourceCatalogue.json";

export type SortOption = "recent" | "title-asc" | "title-desc" | "category";

/**
 * Specification for automated future Telegram exporters/importers.
 * An automated script or Telegram bot exporting channel messages can produce
 * objects conforming to this schema to replace or update the local JSON file.
 */
export interface AutomatedImporterResourceSchema {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: "pdf" | "doc" | "folder" | "presentation" | "other" | string;
  sourceUrl: string;
  driveUrl?: string;
  dateAdded?: string;
  code?: string;
  size?: string;
  pages?: number;
  featured?: boolean;
  telegramMessageId?: number | string;
}

/**
 * Normalizes a raw resource into a guaranteed ResourceItem structure.
 */
export function normalizeResource(raw: Partial<ResourceItem>): ResourceItem {
  const category = raw.category || raw.module || "General & Languages";
  const fileType = raw.fileType || raw.type || "pdf";
  const sourceUrl = raw.sourceUrl || raw.url || raw.driveUrl || "https://drive.google.com";

  return {
    id: raw.id || `res-${Math.random().toString(36).slice(2, 9)}`,
    title: raw.title || "Untitled Resource",
    description: raw.description || "Official study and administrative reference document.",
    category,
    fileType,
    sourceUrl,
    driveUrl: raw.driveUrl,
    dateAdded: raw.dateAdded || new Date().toISOString().split("T")[0],
    code: raw.code,
    size: raw.size,
    pages: raw.pages,
    featured: Boolean(raw.featured),
    // Backward compatibility aliases
    type: fileType as ResourceItem["type"],
    module: category as ResourceItem["module"],
    url: sourceUrl
  };
}

/**
 * Loads the initial resource catalogue from the local JSON file.
 * Replaceable by an async API or database importer in future iterations.
 */
export function loadLocalCatalogue(): ResourceItem[] {
  try {
    if (!Array.isArray(localCatalogue)) return [];
    return (localCatalogue as Partial<ResourceItem>[]).map(normalizeResource);
  } catch (err) {
    console.error("Failed to load local catalogue JSON:", err);
    return [];
  }
}

/**
 * Extracts unique categories in alphabetical order while placing 'All' at index 0.
 */
export function getUniqueCategories(items: ResourceItem[]): string[] {
  const set = new Set<string>();
  items.forEach((item) => {
    if (item.category) set.add(item.category);
  });
  return ["All", ...Array.from(set).sort()];
}

/**
 * Extracts unique file types.
 */
export function getUniqueFileTypes(items: ResourceItem[]): string[] {
  const set = new Set<string>();
  items.forEach((item) => {
    if (item.fileType) set.add(item.fileType.toLowerCase());
  });
  return ["All", ...Array.from(set).sort()];
}

/**
 * Gets the most recently added resources for the spotlight section.
 */
export function getRecentlyAdded(items: ResourceItem[], limit = 4): ResourceItem[] {
  return [...items]
    .sort((a, b) => {
      const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
      const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);
}

/**
 * Filters and sorts resources according to user criteria.
 */
export function filterAndSortResources(
  items: ResourceItem[],
  query: string,
  selectedCategory: string,
  selectedType: string,
  sortBy: SortOption,
  savedOnly: boolean,
  savedIds: string[]
): ResourceItem[] {
  const cleanQuery = query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    // 1. Saved filter
    if (savedOnly && !savedIds.includes(item.id)) {
      return false;
    }

    // 2. Category filter
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    }

    // 3. File type filter
    if (selectedType !== "All" && item.fileType.toLowerCase() !== selectedType.toLowerCase()) {
      return false;
    }

    // 4. Keyword search
    if (cleanQuery) {
      const matchTitle = item.title.toLowerCase().includes(cleanQuery);
      const matchDesc = item.description?.toLowerCase().includes(cleanQuery);
      const matchCategory = item.category?.toLowerCase().includes(cleanQuery);
      const matchCode = item.code?.toLowerCase().includes(cleanQuery);

      if (!matchTitle && !matchDesc && !matchCategory && !matchCode) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  return filtered.sort((a, b) => {
    if (sortBy === "recent") {
      const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
      const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
      if (dateB !== dateA) return dateB - dateA;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
    if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    if (sortBy === "category") {
      return (a.category || "").localeCompare(b.category || "");
    }
    return 0;
  });
}
