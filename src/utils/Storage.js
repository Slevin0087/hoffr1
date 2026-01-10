class LocalStorage {
  getItem(key) {
    try {
      const state = JSON.parse(localStorage.getItem(key));
      return state || null;
    } catch (e) {
      console.error(`Error loading ${key}:`, e);
      return null;
    }
  }

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

const storage = new LocalStorage();

export default storage;
