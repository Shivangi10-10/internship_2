import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertSkillSchema, insertSavedSkillSchema, insertUserProgressSchema } from "@shared/schema";
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.use("/api", (req, res, next) => {
    next();
  });

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Don't return the password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  // Category routes
  app.get("/api/categories", async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get("/api/categories/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    
    const category = await storage.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.json(category);
  });

  // Skill routes
  app.get("/api/skills", async (req, res) => {
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
    const trending = req.query.trending === 'true';
    const search = req.query.q as string | undefined;
    
    let skills;
    
    if (search) {
      skills = await storage.searchSkills(search);
    } else if (categoryId) {
      skills = await storage.getSkillsByCategory(categoryId);
    } else if (trending) {
      skills = await storage.getTrendingSkills();
    } else {
      skills = await storage.getSkills();
    }
    
    res.json(skills);
  });

  app.get("/api/skills/featured", async (req, res) => {
    const featuredSkill = await storage.getFeaturedSkill();
    if (!featuredSkill) {
      return res.status(404).json({ message: "No featured skill found" });
    }
    
    res.json(featuredSkill);
  });

  app.get("/api/skills/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid skill ID" });
    }
    
    const skill = await storage.getSkillById(id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    
    // Increment view count
    await storage.incrementSkillViews(id);
    
    res.json(skill);
  });

  app.post("/api/skills", async (req, res) => {
    try {
      const skillData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(skillData);
      res.status(201).json(skill);
    } catch (error) {
      res.status(400).json({ message: "Invalid skill data", error: error.message });
    }
  });

  // Saved Skills routes
  app.get("/api/users/:userId/saved-skills", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const savedSkills = await storage.getSavedSkills(userId);
    res.json(savedSkills);
  });

  app.post("/api/saved-skills", async (req, res) => {
    try {
      const savedSkillData = insertSavedSkillSchema.parse(req.body);
      const savedSkill = await storage.saveSkill(savedSkillData);
      res.status(201).json(savedSkill);
    } catch (error) {
      res.status(400).json({ message: "Invalid saved skill data", error: error.message });
    }
  });

  app.delete("/api/users/:userId/saved-skills/:skillId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const skillId = parseInt(req.params.skillId);
    
    if (isNaN(userId) || isNaN(skillId)) {
      return res.status(400).json({ message: "Invalid IDs" });
    }
    
    await storage.unsaveSkill(userId, skillId);
    res.status(204).end();
  });

  // User Progress routes
  app.get("/api/users/:userId/progress", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const progress = await storage.getUserProgress(userId);
    res.json(progress);
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const progressData = insertUserProgressSchema.parse(req.body);
      const progress = await storage.updateUserProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data", error: error.message });
    }
  });

  // AI Translation endpoint
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, targetLanguage } = req.body;
      
      if (!text || !targetLanguage) {
        return res.status(400).json({ message: "Text and target language are required" });
      }
      
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following text to ${targetLanguage}. Provide only the translation with no additional explanation.`
          },
          {
            role: "user",
            content: text
          }
        ]
      });
      
      const translation = response.choices[0].message.content;
      res.json({ translation });
    } catch (error) {
      res.status(500).json({ message: "Translation failed", error: error.message });
    }
  });

  // AI Content Recommendation endpoint
  app.post("/api/recommend", async (req, res) => {
    try {
      const { userId, skillIds, interests } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      // Get all skills
      const allSkills = await storage.getSkills();
      
      if (allSkills.length === 0) {
        return res.json([]);
      }
      
      // If we have no watched skills or interests, return trending skills
      if ((!skillIds || skillIds.length === 0) && (!interests || interests.length === 0)) {
        const trendingSkills = await storage.getTrendingSkills(5);
        return res.json(trendingSkills);
      }
      
      // Prepare prompt for AI recommendation
      let prompt = "Based on the user's watched skills and interests, recommend the most relevant skills from the following list:";
      
      if (skillIds && skillIds.length > 0) {
        const watchedSkills = allSkills.filter(skill => skillIds.includes(skill.id));
        prompt += "\n\nWatched Skills:";
        watchedSkills.forEach(skill => {
          prompt += `\n- ${skill.title} (${skill.description})`;
        });
      }
      
      if (interests && interests.length > 0) {
        prompt += "\n\nInterests:";
        interests.forEach(interest => {
          prompt += `\n- ${interest}`;
        });
      }
      
      prompt += "\n\nAvailable Skills:";
      allSkills.forEach(skill => {
        if (!skillIds || !skillIds.includes(skill.id)) {
          prompt += `\n- ID: ${skill.id}, Title: ${skill.title}, Description: ${skill.description}`;
        }
      });
      
      prompt += "\n\nReturn a JSON array of skill IDs that you recommend, in order of relevance. Format: [1, 5, 3]";
      
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a content recommendation engine that analyzes user preferences and recommends relevant content."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const result = JSON.parse(response.choices[0].message.content);
      const recommendedIds = result.recommendedSkills || [];
      
      // Return the recommended skills
      const recommendedSkills = allSkills.filter(skill => recommendedIds.includes(skill.id));
      
      res.json(recommendedSkills);
    } catch (error) {
      res.status(500).json({ message: "Recommendation failed", error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
