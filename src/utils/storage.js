// LocalStorage helper & seed data for SVS Youth Tirupati Ganesh Utsav Memories

const STORAGE_KEY = 'svs_youth_tirupati_memories_v4';

const SEED_MEMORIES = [
  {
    id: 'mem-1',
    name: 'SVS Youth Team',
    caption: 'Grand SVS Youth Tirupati Ganesh Chaturthi Sthapana Pooja! Unity • Faith • Service 🙏✨',
    photoUrl: '/logo.jpg',
    tag: 'SVS Youth',
    frame: 'gold',
    likes: 88,
    createdAt: '2026-09-04T18:30:00.000Z'
  },
  {
    id: 'mem-2',
    name: 'SVS Devotees Family',
    caption: 'Divine Blessings of Lord Ganesha at SVS Youth Mandap Tirupati 🌺🌿',
    photoUrl: '/logo.jpg',
    tag: 'Pooja',
    frame: 'garland',
    likes: 54,
    createdAt: '2026-09-05T09:15:00.000Z'
  },
  {
    id: 'mem-3',
    name: 'SVS Volunteers',
    caption: 'Evening Maha Aarti & Dhol Tasha Pathak with SVS Youth Tirupati! 🥁🔥',
    photoUrl: '/logo.jpg',
    tag: 'SVS Youth',
    frame: 'sparkle',
    likes: 72,
    createdAt: '2026-09-05T10:45:00.000Z'
  }
];

export function getStoredMemories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MEMORIES));
      return SEED_MEMORIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading memories:', e);
    return SEED_MEMORIES;
  }
}

export function saveMemory(newMem) {
  try {
    const memories = getStoredMemories();
    const updated = [newMem, ...memories];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving memory:', e);
    return getStoredMemories();
  }
}

export function deleteMemory(memoryId) {
  try {
    const memories = getStoredMemories();
    const updated = memories.filter(m => m.id !== memoryId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting memory:', e);
    return getStoredMemories();
  }
}

export function toggleLikeMemory(memoryId) {
  try {
    const memories = getStoredMemories();
    const updated = memories.map(m => {
      if (m.id === memoryId) {
        const isLiked = m.userLiked;
        return {
          ...m,
          likes: isLiked ? m.likes - 1 : m.likes + 1,
          userLiked: !isLiked
        };
      }
      return m;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error updating likes:', e);
    return getStoredMemories();
  }
}
