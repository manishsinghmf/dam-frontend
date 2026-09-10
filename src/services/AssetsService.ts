import type { Asset } from "../types/Assets";

const mockAllAssets: Asset[] = [
  {
    id: 1,
    name: "product-banner.jpg",
    type: "image",
    size: 2457600,
    status: "READY",
    thumbnailUrl: "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg",
    createdAt: "2026-08-31T10:30:00Z",
  },
  {
    id: 2,
    name: "marketing-video.mp4",
    type: "video",
    size: 125829120,
    status: "PROCESSING",
    createdAt: "2026-08-31T11:00:00Z",
  },
];

export const AssetsService = {

  async fetchAllAssets(): Promise<Asset[]> {
    try {
      // UNCOMMENT THIS WHEN BACKEND IS READY:
      // const response = await fetch("/api/assets");
      // if (!response.ok) {
      //   throw new Error("Failed to fetch assets");
      // }
      // return await response.json();

      // --- MOCK MODE ---
      // Instructor Tip: We use a short Promise timeout to simulate a real loading delay (500ms)
      // This helps you test your UI loading spinners accurately!
      await new Promise((resolve) => setTimeout(resolve, 500));

      return mockAllAssets;
    } catch (error) {
      console.error("Error fetching assets:", error);
      throw error;
    }
  }
}