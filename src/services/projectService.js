// // ============================================
// // PROJECT SERVICE - Portfolio/Case Studies
// // ============================================
// import { fetchWithFallback } from "./fallbackService";

// // Cache key
// const CACHE_KEY = "projects";

// export const getProjects = async () => {
//   const { data, source } = await fetchWithFallback({
//     cacheKey: CACHE_KEY,
//     firestoreFetch: async () => {
//       // If you have projects in Firestore, implement here
//       // For now, use JSON backup
//       return null;
//     },
//     jsonFile: "projects.json",
//   });

//   return { data: data || [], source };
// };

// export const getProjectById = async (projectId) => {
//   const { data } = await getProjects();
//   return data.find((p) => p.id === projectId) || null;
// };

// export const getProjectsByCategory = async (category) => {
//   const { data } = await getProjects();
//   return data.filter((p) => p.category === category);
// };
