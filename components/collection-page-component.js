import PasscodePromptComponent from './passcode-prompt-component.js';

export default {
  name: 'collection-page-component',
  components: {
    PasscodePromptComponent,
  },
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const showPasscodePrompt = Vue.ref(false);
    const selectedState = Vue.ref('');
    const searchTerm = Vue.ref('');
    const pinnedLocationIds = Vue.ref(
      JSON.parse(localStorage.getItem('motw-pinned-locations') || '[]'),
    );
    const states = Vue.computed(() => {
      return [...new Set(itemsStore.items.map((item) => item.state))].sort();
    });
    const filteredItems = Vue.computed(() => {
      const normalizedSearchTerm = searchTerm.value.trim().toLowerCase();

      return itemsStore.items.filter((item) => {
        const matchesState = !selectedState.value || item.state === selectedState.value;
        const searchableText = `${item.name} ${item.city} ${item.address}`.toLowerCase();
        const matchesSearch = !normalizedSearchTerm || searchableText.includes(normalizedSearchTerm);

        return matchesState && matchesSearch;
      });
    });
    const isPinned = (locationId) => pinnedLocationIds.value.includes(locationId);
    const togglePin = (locationId) => {
      if (isPinned(locationId)) {
        pinnedLocationIds.value = pinnedLocationIds.value.filter((id) => id !== locationId);
      } else {
        pinnedLocationIds.value = [...pinnedLocationIds.value, locationId];
      }

      localStorage.setItem('motw-pinned-locations', JSON.stringify(pinnedLocationIds.value));
    };

    return {
      itemsStore,
      showPasscodePrompt,
      selectedState,
      searchTerm,
      states,
      filteredItems,
      isPinned,
      togglePin,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 mb-0">Collection</h1>
        <div class="d-flex align-items-center gap-2">
          <span class="badge text-bg-light border">{{ filteredItems.length }} shown</span>
          <button type="button" class="btn btn-primary" @click="showPasscodePrompt = true">
            Compare Locations
          </button>
        </div>
      </div>

      <p class="text-muted">Browse a simple dataset loaded from a CSV file.</p>

      <passcode-prompt-component v-if="showPasscodePrompt" />

      <div class="mb-4">
        <label for="state-filter" class="form-label">Filter by state</label>
        <select id="state-filter" v-model="selectedState" class="form-select">
          <option value="">All states</option>
          <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="location-search" class="form-label">Search locations</label>
        <input
          id="location-search"
          v-model="searchTerm"
          type="search"
          class="form-control"
          placeholder="Search by name, city, or address" />
      </div>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading items...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="itemsStore.items.length === 0" class="alert alert-warning" role="alert">
        No items found in the dataset.
      </div>

      <div v-else class="row g-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="item in filteredItems" :key="item.id">
          <article class="card h-100 shadow-sm border-0">
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h2 class="h5 card-title mb-0">{{ item.name }}</h2>
                  <p class="text-muted mb-0">{{ item.city }}, {{ item.state }}</p>
                </div>
                <button
                  type="button"
                  class="btn btn-link p-0 ms-2"
                  :class="isPinned(item.id) ? 'text-warning' : 'text-muted'"
                  :aria-label="isPinned(item.id) ? 'Unpin ' + item.name : 'Pin ' + item.name"
                  :aria-pressed="isPinned(item.id)"
                  :title="isPinned(item.id) ? 'Unpin location' : 'Pin location'"
                  @click="togglePin(item.id)">
                  <i :class="isPinned(item.id) ? 'bi-star-fill' : 'bi-star'" aria-hidden="true"></i>
                </button>
              </div>

              <p class="small mb-2"><strong>Address:</strong> {{ item.address }}</p>
              <p class="small text-muted flex-grow-1 mb-3"><strong>Hours:</strong> {{ item.hours }}</p>

              <div class="d-grid">
                <router-link :to="'/items/' + item.id" class="btn btn-outline-secondary btn-sm">
                  View details
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
};
