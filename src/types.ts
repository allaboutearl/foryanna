export interface MemoryItem {
  id: string;
  image: string;
  message: string;
  caption?: string;
  date?: string;
}

export interface SurpriseConfig {
  herName: string;
  yourName: string;
  musicUrl: string;
  // Page 1
  welcomeTitle: string;
  welcomeSubtitle: string;
  startButtonText: string;
  // Page 2
  sceneText: string;
  scenePhoto: string;
  sceneButtonText: string;
  journeyVaultMessage?: string;
  journeyButtonText?: string;
  // Page 3
  memoriesTitle: string;
  memories: MemoryItem[];
  memoriesButtonText: string;
  // Page 4
  finalTitle: string;
  favoritePhoto: string;
  loveLetter: string;
}
