export default {
  name: 'item-detail-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const route = VueRouter.useRoute();

    const selectedItem = Vue.computed(() => {
      return itemsStore.items.find((item) => item.id === route.params.id);
    });

    return {
      itemsStore,
      selectedItem,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <router-link to="/items" class="btn btn-link ps-0 mb-3">← Back to collection</router-link>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading item details...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="!selectedItem" class="alert alert-warning" role="alert">
        Item not found.
      </div>

      <article v-else class="card shadow-sm border-0 overflow-hidden">
        <div class="card-body p-4">
          <h1 class="h3 mb-1">{{ selectedItem.name }}</h1>
          <p class="text-muted mb-4">{{ selectedItem.city }}, {{ selectedItem.state }}</p>

          <dl class="row mb-0">
            <dt class="col-sm-4">Address</dt>
            <dd class="col-sm-8">{{ selectedItem.address }}</dd>

            <dt class="col-sm-4">Hours</dt>
            <dd class="col-sm-8">{{ selectedItem.hours }}</dd>

            <dt class="col-sm-4">Manager</dt>
            <dd class="col-sm-8">
              {{ selectedItem.managerName }}<br />
              {{ selectedItem.managerContact }}
            </dd>

            <dt class="col-sm-4">Franchisee/owner</dt>
            <dd class="col-sm-8">
              {{ selectedItem.franchiseeOwner }}<br />
              {{ selectedItem.franchiseeContact }}
            </dd>
          </dl>
        </div>
      </article>
    </section>
  `,
};
