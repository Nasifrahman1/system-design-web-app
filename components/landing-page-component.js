export default {
  name: 'landing-page-component',
  template: /* html */ `
    <section class="container py-5">
      <div class="row align-items-center g-4">
        <div class="col-12 col-md-7">
          <img src="assets/logo.png" alt="MOTW Coffee & Pastries" class="mb-4" style="max-width: 240px; height: auto;" />
          <h1 class="mb-3">MOTW Performance Directory</h1>
          <p class="lead">Find location details, contact information, and performance comparisons in one place.</p>
          <router-link to="/items" class="btn btn-primary">
            <i class="bi bi-list-check me-1" aria-hidden="true"></i>Browse Locations
          </router-link>
        </div>
      </div>
    </div>
  `,
};
