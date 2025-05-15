import {
  users, User, InsertUser,
  categories, Category, InsertCategory,
  skills, Skill, InsertSkill,
  savedSkills, SavedSkill, InsertSavedSkill,
  userProgress, UserProgress, InsertUserProgress
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Skill operations
  getSkills(): Promise<Skill[]>;
  getSkillById(id: number): Promise<Skill | undefined>;
  getSkillsByCategory(categoryId: number): Promise<Skill[]>;
  getTrendingSkills(limit?: number): Promise<Skill[]>;
  getFeaturedSkill(): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  incrementSkillViews(skillId: number): Promise<void>;
  updateSkillRating(skillId: number, rating: number): Promise<void>;
  searchSkills(query: string): Promise<Skill[]>;
  
  // SavedSkill operations
  getSavedSkills(userId: number): Promise<Skill[]>;
  saveSkill(savedSkill: InsertSavedSkill): Promise<SavedSkill>;
  unsaveSkill(userId: number, skillId: number): Promise<void>;
  
  // UserProgress operations
  getUserProgress(userId: number): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private skills: Map<number, Skill>;
  private savedSkills: Map<number, SavedSkill>;
  private userProgress: Map<number, UserProgress>;
  
  private currentUserId: number = 1;
  private currentCategoryId: number = 1;
  private currentSkillId: number = 1;
  private currentSavedSkillId: number = 1;
  private currentUserProgressId: number = 1;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.skills = new Map();
    this.savedSkills = new Map();
    this.userProgress = new Map();
    
    // Initialize with some demo categories
    this.initializeCategories();
  }
  
  private initializeCategories() {
    const demoCategories: InsertCategory[] = [
      { name: "Programming", icon: "laptop-code", color: "#0066CC" },
      { name: "Video Editing", icon: "film", color: "#00A86B" },
      { name: "Cooking", icon: "utensils", color: "#FF5722" },
      { name: "Design", icon: "paint-brush", color: "#8B5CF6" },
      { name: "Languages", icon: "language", color: "#22C55E" },
      { name: "Marketing", icon: "bullhorn", color: "#EAB308" }
    ];
    
    demoCategories.forEach(category => {
      this.createCategory(category);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Skill operations
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }
  
  async getSkillById(id: number): Promise<Skill | undefined> {
    return this.skills.get(id);
  }
  
  async getSkillsByCategory(categoryId: number): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(
      skill => skill.categoryId === categoryId
    );
  }
  
  async getTrendingSkills(limit: number = 8): Promise<Skill[]> {
    return Array.from(this.skills.values())
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  }
  
  async getFeaturedSkill(): Promise<Skill | undefined> {
    const skills = Array.from(this.skills.values());
    if (skills.length === 0) return undefined;
    
    // Simple logic: featured skill is the one with highest rating
    return skills.sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];
  }
  
  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const now = new Date();
    const skill: Skill = { 
      ...insertSkill, 
      id, 
      createdAt: now,
      views: 0,
      rating: 0,
      languages: {}
    };
    this.skills.set(id, skill);
    return skill;
  }
  
  async incrementSkillViews(skillId: number): Promise<void> {
    const skill = this.skills.get(skillId);
    if (skill) {
      skill.views = (skill.views || 0) + 1;
      this.skills.set(skillId, skill);
    }
  }
  
  async updateSkillRating(skillId: number, rating: number): Promise<void> {
    const skill = this.skills.get(skillId);
    if (skill) {
      skill.rating = rating;
      this.skills.set(skillId, skill);
    }
  }
  
  async searchSkills(query: string): Promise<Skill[]> {
    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    return Array.from(this.skills.values()).filter(skill => {
      const content = `${skill.title} ${skill.description} ${skill.tags?.join(' ') || ''}`.toLowerCase();
      return searchTerms.some(term => content.includes(term));
    });
  }
  
  // SavedSkill operations
  async getSavedSkills(userId: number): Promise<Skill[]> {
    const savedSkillIds = Array.from(this.savedSkills.values())
      .filter(saved => saved.userId === userId)
      .map(saved => saved.skillId);
      
    return Array.from(this.skills.values())
      .filter(skill => savedSkillIds.includes(skill.id));
  }
  
  async saveSkill(insertSavedSkill: InsertSavedSkill): Promise<SavedSkill> {
    const id = this.currentSavedSkillId++;
    const now = new Date();
    const savedSkill: SavedSkill = { ...insertSavedSkill, id, savedAt: now };
    this.savedSkills.set(id, savedSkill);
    return savedSkill;
  }
  
  async unsaveSkill(userId: number, skillId: number): Promise<void> {
    const savedSkillEntry = Array.from(this.savedSkills.entries()).find(
      ([_, saved]) => saved.userId === userId && saved.skillId === skillId
    );
    
    if (savedSkillEntry) {
      this.savedSkills.delete(savedSkillEntry[0]);
    }
  }
  
  // UserProgress operations
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId);
  }
  
  async updateUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    // Check if there's existing progress
    const existingProgress = Array.from(this.userProgress.values()).find(
      progress => progress.userId === insertProgress.userId && progress.skillId === insertProgress.skillId
    );
    
    if (existingProgress) {
      existingProgress.completed = insertProgress.completed || existingProgress.completed;
      existingProgress.lastWatched = new Date();
      this.userProgress.set(existingProgress.id, existingProgress);
      return existingProgress;
    }
    
    // Create new progress
    const id = this.currentUserProgressId++;
    const now = new Date();
    const progress: UserProgress = { ...insertProgress, id, lastWatched: now };
    this.userProgress.set(id, progress);
    return progress;
  }
}

export const storage = new MemStorage();
