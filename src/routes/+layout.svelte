<script>
  import { page } from '$app/stores';
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">World Brand Adhesive</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        {#if $page.data.session}
          <li class="nav-item">
            {#if $page.data.session.user?.image}
              <span
                class="nav-link"
                style="background-image: url('{$page.data.session.user.image}'); width: 30px; height: 30px; background-size: cover; border-radius: 50%; display: inline-block;"
              ></span>
            {/if}
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Signed in as <strong>{$page.data.session.user?.email ?? $page.data.session.user?.name}</strong>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/auth/signout" data-sveltekit-preload-data="off">Sign out</a>
          </li>
        {:else}
          <li class="nav-item">
            <span class="nav-link">You are not signed in</span>
          </li>
          <li class="nav-item">
            <a class="nav-link btn btn-primary" href="/auth/signin" data-sveltekit-preload-data="off">Sign in</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
{#if $page.data.session }

  {#if $page.data.error }
  <div class="alert alert-danger" role="alert">
    {$page.data.error}
  </div>
  {:else}
  <slot></slot>
  {/if}

{:else}
  <div class="d-flex justify-content-center align-items-center vh-100">
  <div>
    Please sign in to enter a report.
    <hr/>
    <a class="btn btn-primary" href="/auth/signin" data-sveltekit-preload-data="off">Sign in</a>
  </div>
  </div>
{/if}
