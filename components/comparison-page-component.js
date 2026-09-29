import PasscodePromptComponent from './passcode-prompt-component.js';

export default {
  name: 'comparison-page-component',
  components: {
    PasscodePromptComponent,
  },
  setup() {
    const sortMetric = Vue.ref('name');
    const isUnlocked = Vue.ref(sessionStorage.getItem('motw-passcode-unlocked') === 'true');
    const passcodeError = Vue.ref('');
    const itemsStore = Vue.inject('itemsStore');

    const comparisonRows = Vue.computed(() => {
      return itemsStore.items.map((item) => {
        const priorMonthActual = item.salesActual[item.salesActual.length - 2];
        const actual = item.salesActual[item.salesActual.length - 1];
        const projected = priorMonthActual * 1.03;

        return {
          ...item,
          actual,
          projected,
          variance: actual - projected,
          variancePercentage: (actual - projected) / projected,
        };
      });
    });
    const sortedRows = Vue.computed(() => {
      return [...comparisonRows.value].sort((first, second) => {
        if (sortMetric.value === 'name') {
          return first.name.localeCompare(second.name);
        }

        return second[sortMetric.value] - first[sortMetric.value];
      });
    });
    const submitPasscode = (enteredPasscode) => {
      if (enteredPasscode === 'motw2024') {
        passcodeError.value = '';
        isUnlocked.value = true;
        sessionStorage.setItem('motw-passcode-unlocked', 'true');
        return;
      }

      passcodeError.value = 'Incorrect passcode. Try again.';
    };

    return {
      itemsStore,
      sortMetric,
      isUnlocked,
      passcodeError,
      sortedRows,
      submitPasscode,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <h1 class="h3 mb-4">Comparison View</h1>

      <section v-if="!isUnlocked" class="border border-danger rounded p-4">
        <h2 class="h5 text-danger"><i class="bi-lock-fill" aria-hidden="true"></i> Comparison locked</h2>
        <p class="text-muted">Enter the shared passcode to view sales comparisons.</p>
        <passcode-prompt-component :error-message="passcodeError" @submit="submitPasscode" />
      </section>

      <section v-else>
        <div class="mb-3">
          <label for="comparison-sort" class="form-label">Sort by</label>
          <select id="comparison-sort" v-model="sortMetric" class="form-select">
            <option value="name">Location name</option>
            <option value="actual">Actual sales</option>
            <option value="projected">Projected sales</option>
            <option value="variance">Variance</option>
          </select>
        </div>

        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th scope="col">Location</th>
                <th scope="col">Actual sales</th>
                <th scope="col">Projected sales</th>
                <th scope="col">Variance</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in sortedRows"
                :key="row.id"
                :class="row.variancePercentage <= -0.05 ? 'table-danger' : ''">
                <th scope="row">{{ row.name }}</th>
                <td>{{ row.actual.toFixed(2) }}</td>
                <td>{{ row.projected.toFixed(2) }}</td>
                <td>{{ row.variance.toFixed(2) }}</td>
                <td>
                  <span v-if="row.variancePercentage <= -0.05" class="text-danger fw-semibold">
                    Underperforming
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `,
};
