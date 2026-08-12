// Fetch shared components immediately; inject once the DOM is ready.
const headerHtml = fetch('headerContainer.html').then(response => response.text());
const footerHtml = fetch('footerContainer.html').then(response => response.text());

function injectSharedComponents() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerHtml.then(html => {
            headerPlaceholder.innerHTML += html;

            // Mark the current page in the navigation for styling and accessibility.
            const current = window.location.pathname.split('/').pop() || 'index.html';
            headerPlaceholder.querySelectorAll('.nav-buttons a').forEach(link => {
                if (link.getAttribute('href') === current) {
                    link.setAttribute('aria-current', 'page');
                }
            });
        });
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerHtml.then(html => {
            footerPlaceholder.innerHTML += html;
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSharedComponents);
} else {
    injectSharedComponents();
}