import { apiRequest } from "./queryClient";

// Function to translate text
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    const response = await apiRequest("POST", "/api/translate", {
      text,
      targetLanguage
    });
    
    const data = await response.json();
    return data.translation || text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

// Function to get content recommendations
export async function getRecommendations(
  userId: number,
  watchedSkillIds: number[] = [],
  interests: string[] = []
) {
  try {
    const response = await apiRequest("POST", "/api/recommend", {
      userId,
      skillIds: watchedSkillIds,
      interests
    });
    
    return await response.json();
  } catch (error) {
    console.error("Recommendation error:", error);
    return [];
  }
}
