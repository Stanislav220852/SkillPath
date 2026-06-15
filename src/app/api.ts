// src/app/api.ts — API клиент для SkillPath Backend

export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/+$/, "");
const TOKEN_KEY = "skillpath_token";
const USER_KEY = "skillpath_user";

// === Token management ===
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); };
export const isLoggedIn = (): boolean => !!getToken();

export const getSavedUser = (): any | null => {
  try { return JSON.parse(localStorage.getItem(USER_KEY) || "null"); } catch { return null; }
};
export const setSavedUser = (user: any) => localStorage.setItem(USER_KEY, JSON.stringify(user));

// === Base fetch ===
const api = async (path: string, options: RequestInit = {}) => {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    removeToken();
    throw { status: 401, detail: "Unauthorized" };
  }

  const data = await res.json();
  if (!res.ok) throw { status: res.status, ...data };
  return data;
};

// === Auth ===
export const register = async (email: string, password: string, name: string, lang: string = "RU") => {
  const data = await api("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name, lang }),
  });
  setToken(data.access_token);
  setSavedUser(data.user);
  return data;
};

export const login = async (email: string, password: string) => {
  const data = await api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(data.access_token);
  setSavedUser(data.user);
  return data;
};

export const getMe = async () => {
  const data = await api("/api/auth/me");
  setSavedUser(data);
  return data;
};

export const logout = () => {
  removeToken();
};

// === Quiz ===
export const submitQuiz = (quizType: string, topRole: string, scores: Record<string, number>) =>
  api("/api/quiz/submit", {
    method: "POST",
    body: JSON.stringify({ quiz_type: quizType, top_role: topRole, scores }),
  });

export const getQuizHistory = () => api("/api/quiz/history");

// === Progress ===
export const getRoadmapProgress = (roadmapKey: string) =>
  api(`/api/progress/roadmap/${roadmapKey}`);

export const toggleSkill = (roadmapKey: string, skillId: string) =>
  api("/api/progress/roadmap/toggle", {
    method: "POST",
    body: JSON.stringify({ roadmap_key: roadmapKey, skill_id: skillId }),
  });

export const resetRoadmap = (roadmapKey: string) =>
  api(`/api/progress/roadmap/${roadmapKey}/reset`, { method: "DELETE" });

export const getLessonProgress = (skillId: string) =>
  api(`/api/progress/lessons/${skillId}`);

export const completeLesson = (skillId: string, lessonId: string) =>
  api("/api/progress/lessons/complete", {
    method: "POST",
    body: JSON.stringify({ skill_id: skillId, lesson_id: lessonId }),
  });

// === Mentors ===
export const getMentors = () => api("/api/mentors");

export const bookMentor = (mentorId: number, date: string, time: string) =>
  api("/api/mentors/book", {
    method: "POST",
    body: JSON.stringify({ mentor_id: mentorId, date, time }),
  });

export const getBookings = () => api("/api/mentors/bookings");

export const cancelBooking = (bookingId: number) =>
  api(`/api/mentors/bookings/${bookingId}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "cancelled" }),
  });

// === Chat ===
export const sendChatMessage = (mentorId: number, text: string) =>
  api(`/api/chat/${mentorId}`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });

export const getChatHistory = (mentorId: number) =>
  api(`/api/chat/${mentorId}`);

export const clearChat = (mentorId: number) =>
  api(`/api/chat/${mentorId}`, { method: "DELETE" });

// === Profile ===
export const getProfileStats = () => api("/api/profile/stats");

// === Avatar ===
export const uploadAvatar = async (file: File): Promise<any> => {
  const token = getToken();
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/api/auth/avatar`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (res.status === 401) {
    removeToken();
    throw { status: 401, detail: "Unauthorized" };
  }

  const data = await res.json();
  if (!res.ok) throw { status: res.status, ...data };
  setSavedUser(data);
  return data;
};

// === Chat (mentor) ===
export const getMentorInbox = () => api("/api/chat/mentor/inbox");
export const markChatAsRead = (mentorId: number) =>
  api(`/api/chat/${mentorId}/read`, { method: "PATCH" });

// === Chat (general) ===
export const getGeneralChatHistory = () => api("/api/chat/general/history");
export const sendGeneralMessage = (text: string) =>
  api("/api/chat/general", { method: "POST", body: JSON.stringify({ text }) });

// === Chat (direct) ===
export const getDirectConversations = () => api("/api/chat/direct/conversations");
export const getDirectHistory = (userId: number) => api(`/api/chat/direct/${userId}`);
export const sendDirectMessage = (userId: number, text: string) =>
  api(`/api/chat/direct/${userId}`, { method: "POST", body: JSON.stringify({ text }) });
export const markDirectRead = (userId: number) =>
  api(`/api/chat/direct/${userId}/read`, { method: "PATCH" });

// === Chat (user search) ===
export const searchUsers = (query: string) =>
  api(`/api/chat/users/search?q=${encodeURIComponent(query)}`);

// === Chat (mentor users from users table) ===
export const getMentorUsers = () => api("/api/chat/mentors/list");

// === Admin ===
export const getAdminDashboard = () => api("/api/admin/dashboard");

export const getAdminUsers = (search = "", page = 1, perPage = 20) =>
  api(`/api/admin/users?search=${encodeURIComponent(search)}&page=${page}&per_page=${perPage}`);

export const getAdminUser = (userId: number) =>
  api(`/api/admin/users/${userId}`);

export const getAdminUserStats = (userId: number) =>
  api(`/api/admin/users/${userId}/stats`);

export const getAdminUserQuizHistory = (userId: number) =>
  api(`/api/admin/users/${userId}/quiz-history`);

export const getAdminUserBookings = (userId: number) =>
  api(`/api/admin/users/${userId}/bookings`);

export const updateAdminUser = (userId: number, data: { role?: string; is_active?: boolean }) =>
  api(`/api/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteAdminUser = (userId: number) =>
  api(`/api/admin/users/${userId}`, { method: "DELETE" });

export const hardDeleteAdminUser = (userId: number) =>
  api(`/api/admin/users/${userId}/permanent`, { method: "DELETE" });

export const resetAdminPassword = (userId: number, newPassword: string) =>
  api(`/api/admin/users/${userId}/reset-password`, {
    method: "POST",
    body: JSON.stringify({ new_password: newPassword }),
  });

export const getAdminMentors = () => api("/api/admin/mentors");

export const createAdminMentor = (data: any) =>
  api("/api/admin/mentors", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateAdminMentor = (mentorId: number, data: any) =>
  api(`/api/admin/mentors/${mentorId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteAdminMentor = (mentorId: number) =>
  api(`/api/admin/mentors/${mentorId}`, { method: "DELETE" });

export const getAdminBookings = () => api("/api/admin/bookings");

export const updateAdminBooking = (bookingId: number, status: string) =>
  api(`/api/admin/bookings/${bookingId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const getAdminSettings = () => api("/api/admin/settings");

export const updateAdminSettings = (key: string, value: any) =>
  api("/api/admin/settings", {
    method: "PATCH",
    body: JSON.stringify({ key, value }),
  });
