export default {
  name: 'passcode-prompt-component',
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const passcode = Vue.ref('');

    const submitPasscode = () => {
      emit('submit', passcode.value);
    };

    return {
      passcode,
      submitPasscode,
    };
  },
  template: /* html */ `
    <form class="border rounded p-4" @submit.prevent="submitPasscode">
      <div class="mb-3">
        <label for="passcode-input" class="form-label">Passcode</label>
        <input
          id="passcode-input"
          v-model="passcode"
          type="password"
          class="form-control"
          autocomplete="current-password"
          aria-describedby="passcode-error"
          required />
        <div v-if="errorMessage" id="passcode-error" class="text-danger mt-2" role="alert">
          {{ errorMessage }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Continue</button>
    </form>
  `,
};
