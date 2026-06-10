import { doc, getDoc, updateDoc, increment, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

const statsRef = doc(db, "stats", "dashboard");

// ============================================
// DASHBOARD STATS - Single document reads
// ============================================

export const getDashboardStats = async () => {
  try {
    const docSnap = await getDoc(statsRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    // Return default stats if document doesn't exist
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      processingOrders: 0,
      completedOrders: 0,
      totalUsers: 0,
      lastUpdated: null,
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
    };
  }
};

// ============================================
// UPDATE STATS - Call these when data changes
// ============================================

// Update product count
export const incrementProductCount = async (delta = 1) => {
  try {
    await updateDoc(statsRef, {
      totalProducts: increment(delta),
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating product count:", error);
  }
};

// Update order stats
export const updateOrderStats = async (orderData, action = "create") => {
  try {
    const updates = {
      lastUpdated: serverTimestamp(),
    };

    if (action === "create") {
      updates.totalOrders = increment(1);
      updates.totalRevenue = increment(orderData.totalPrice || 0);
      updates.pendingOrders = increment(1);
    } else if (action === "update_status") {
      // Decrease old status count, increase new status count
      // This should be called with the old and new status
    }

    await updateDoc(statsRef, updates);
  } catch (error) {
    console.error("Error updating order stats:", error);
  }
};

// ============================================
// INITIALIZE STATS - Call once when setting up
// ============================================

export const initializeStats = async (initialData = {}) => {
  try {
    const docSnap = await getDoc(statsRef);

    if (!docSnap.exists()) {
      await setDoc(statsRef, {
        totalProducts: initialData.totalProducts || 0,
        totalOrders: initialData.totalOrders || 0,
        totalRevenue: initialData.totalRevenue || 0,
        pendingOrders: initialData.pendingOrders || 0,
        processingOrders: initialData.processingOrders || 0,
        completedOrders: initialData.completedOrders || 0,
        totalUsers: initialData.totalUsers || 0,
        lastUpdated: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error initializing stats:", error);
  }
};

// ============================================
// RECALCULATE STATS - For syncing stats with actual data
// ============================================

export const recalculateStats = async (counts) => {
  try {
    await setDoc(statsRef, {
      totalProducts: counts.totalProducts || 0,
      totalOrders: counts.totalOrders || 0,
      totalRevenue: counts.totalRevenue || 0,
      pendingOrders: counts.pendingOrders || 0,
      processingOrders: counts.processingOrders || 0,
      completedOrders: counts.completedOrders || 0,
      totalUsers: counts.totalUsers || 0,
      lastUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error recalculating stats:", error);
  }
};
