import PasscodePromptComponent from './passcode-prompt-component.js';

export default {
  name: 'item-detail-page-component',
  components: {
    PasscodePromptComponent,
  },
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const route = VueRouter.useRoute();
    const showSalesTrend = Vue.ref(false);

    const selectedItem = Vue.computed(() => {
      return itemsStore.items.find((item) => item.id === route.params.id);
    });
    const revealSalesTrend = (enteredPasscode) => {
      if (enteredPasscode === 'motw2024') {
        showSalesTrend.value = true;
      }
    };

    return {
      itemsStore,
      selectedItem,
      showSalesTrend,
      revealSalesTrend,
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

          <section v-if="!showSalesTrend" class="border border-danger rounded p-4 mt-4">
            <h2 class="h5 text-danger"><i class="bi-lock-fill" aria-hidden="true"></i> Sales trend locked</h2>
            <p class="text-muted">Enter the shared passcode to view the three-month sales trend.</p>
            <passcode-prompt-component @submit="revealSalesTrend" />
          </section>

          <section v-else class="mt-4">
            <h2 class="h5">Three-month sales trend</h2>
            <div class="list-group">
              <div v-for="(sales, index) in selectedItem.salesActual" :key="index" class="list-group-item d-flex justify-content-between">
                <span>Month {{ index + 1 }}</span>
                <strong>{{ sales }}</strong>
              </div>
            </div>
          </section>
        </div>
      </article>
    </section>
  `,
};
