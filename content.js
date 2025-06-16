// Function to remove existing stylesheets
function removeStylesheets() {
    const selectors = [
        'link[href*="bootstrap.min.css"]',
        'link[href*="font-awesome.min.css"]',
        'link[href*="ionicons.min.css"]',
        'link[href*="bootstrap-datepicker.min.css"]',
        'link[href*="AdminLTE.min.css"]',
        'link[href*="_all-skins.css"]',
        'link[href*="bootstrap3-wysihtml5.min.css"]',
        'link[href*="simple.css"]',
        'link[href*="fullcalendar.min.css"]',
        'link[href*="modalbox.css"]',
        'link[href*="iziToast.min.css"]',
        'link[href*="dataTables.bootstrap.min.css"]'
    ];

    document.querySelectorAll(selectors.join(',')).forEach(el => el.remove());
}

// Function to remove existing scripts
function removeScripts() {
    const selectors = [
        'script[src*="jquery.min.js"]',
        'script[src*="bootstrap.min.js"]',
        'script[src*="jquery.slimscroll.min.js"]',
        'script[src*="fastclick.js"]',
        'script[src*="adminlte.js"]',
        'script[src*="demo.js"]',
        'script[src*="bootstrap-datepicker.min.js"]',
        'script[src*="datepicker-simple.js"]',
        'script[src*="moment.js"]',
        'script[src*="fullcalendar.min.js"]',
        'script[src*="locale-all.js"]',
        'script[src*="own.js"]',
        'script[src*="iziToast.min.js"]',
        'script[src*="jquery.dataTables.min.js"]',
        'script[src*="dataTables.bootstrap.min.js"]'
    ];

    document.querySelectorAll(selectors.join(',')).forEach(el => el.remove());
}


// Function to apply new modern look
function applyModernLook() {
    // 1. Fix the layout width and base theme
    if (document.body) {
        document.body.classList.remove('layout-boxed', 'skin-blue', 'sidebar-mini', 'black-color');
        document.body.style.width = '100%';
        document.body.style.maxWidth = '100%';
        document.body.classList.add('dark-mode', 'font-sans', 'bg-gray-900', 'text-gray-200');
    }
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
        wrapper.style.maxWidth = '100%';
        wrapper.style.minHeight = '100vh';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
    }
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.style.flexGrow = '1';
    }

    // 2. Explicitly hide the theme-switcher sidebar
    const controlSidebar = document.querySelector('.control-sidebar');
    if (controlSidebar) {
        controlSidebar.remove();
    }
    const controlSidebarBg = document.querySelector('.control-sidebar-bg');
    if (controlSidebarBg) {
        controlSidebarBg.remove();
    }

    // 3. Aggressively clean up inline styles and legacy tags
    document.querySelectorAll('[bgcolor]').forEach(el => el.removeAttribute('bgcolor'));

    // Remove problematic inline styles from various tags
    document.querySelectorAll('table, tr, td, th, div, span, p, li, b, i, font').forEach(el => {
        el.style.color = '';
        el.style.backgroundColor = '';
        el.style.border = '';
        el.style.padding = '';
        el.style.margin = '';
        el.style.fontSize = '';
        el.style.fontWeight = '';
        el.style.textDecoration = '';
    });

    // Replace <font> tags with <span> and map colors to classes
    document.querySelectorAll('font').forEach(font => {
        const span = document.createElement('span');
        while (font.firstChild) {
            span.appendChild(font.firstChild);
        }

        const color = font.getAttribute('color');
        if (color) {
            switch (color.toLowerCase()) {
                case '#0000cc': span.classList.add('status-required'); break;
                case '#ff9900': span.classList.add('status-inprogress'); break;
                case '#ff0000': span.classList.add('status-failed'); break;
                case '#009900': span.classList.add('status-completed'); break;
                case 'black': span.classList.add('text-primary-override'); break;
                case 'red': span.classList.add('status-failed'); break;
                default: span.style.color = 'inherit';
            }
        }

        if (font.parentNode) {
            font.parentNode.replaceChild(span, font);
        }
    });

    // Map inline row colors to classes
    document.querySelectorAll('tr[style*="color"]').forEach(tr => {
        const color = tr.style.color;
        if (color) {
            let statusClass = '';
            switch (color) {
                case 'rgb(0, 0, 204)': statusClass = 'status-required'; break;
                case 'rgb(255, 153, 0)': statusClass = 'status-inprogress'; break;
                case 'rgb(255, 0, 0)': statusClass = 'status-failed'; break;
                case 'rgb(0, 153, 0)': statusClass = 'status-completed'; break;
            }
            if (statusClass) {
                tr.classList.add(statusClass);
                tr.style.color = '';
            }
        }
    });

    // Modernize the main header
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        mainHeader.classList.add('bg-gray-800', 'border-b', 'border-gray-700', 'shadow-md');
        const logo = mainHeader.querySelector('.logo');
        if (logo) {
            logo.classList.add('text-white', 'hover:bg-gray-700');
        }
        const navbar = mainHeader.querySelector('.navbar');
        if (navbar) {
            navbar.classList.add('bg-gray-800');
        }
    }

    // Modernize the sidebar
    const mainSidebar = document.querySelector('.main-sidebar');
    if (mainSidebar) {
        mainSidebar.classList.add('bg-gray-800', 'shadow-lg');
        const sidebarMenu = mainSidebar.querySelector('.sidebar-menu');
        if (sidebarMenu) {
            sidebarMenu.querySelectorAll('li a').forEach(link => {
                link.classList.add('text-gray-300', 'hover:bg-gray-700', 'hover:text-white', 'rounded-lg', 'm-1');
            });
        }
    }

    // Modernize the content wrapper
    if (contentWrapper) {
        contentWrapper.style.backgroundColor = '';
        contentWrapper.classList.add('bg-gray-900', 'p-4');
    }

    // Modernize boxes
    document.querySelectorAll('.box').forEach(box => {
        box.classList.add('bg-gray-800', 'border', 'border-gray-700', 'rounded-lg', 'shadow-lg', 'p-4');
        const boxHeader = box.querySelector('.box-header');
        if (boxHeader) {
            boxHeader.classList.add('border-b', 'border-gray-700', 'pb-3', 'mb-3');
        }
    });

    // Modernize tables
    document.querySelectorAll('.table, .simple-table').forEach(table => {
        table.classList.add('w-full', 'text-left', 'border-collapse');
        table.querySelectorAll('th').forEach(th => {
            th.classList.add('bg-gray-700', 'p-3', 'border-b', 'border-gray-600');
        });
        table.querySelectorAll('td').forEach(td => {
            td.classList.add('p-3', 'border-b', 'border-gray-700');
        });
        table.querySelectorAll('tbody tr:nth-child(even)').forEach(tr => {
            tr.style.backgroundColor = 'var(--bg-dark-secondary)';
        });
        table.querySelectorAll('tbody tr:nth-child(odd)').forEach(tr => {
            tr.style.backgroundColor = 'var(--bg-dark-primary)';
        });
    });

    // Modernize buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('bg-blue-600', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded-lg', 'transition', 'duration-300');
        btn.classList.remove('btn-default');
    });

    // Modernize form controls
    document.querySelectorAll('.form-control').forEach(fc => {
        fc.classList.add('bg-gray-700', 'border', 'border-gray-600', 'text-white', 'rounded-lg', 'p-2', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
    });
}

// Function to add a toggle button for the sidebar
function addSidebarToggle() {
    if (document.getElementById('modernizer-sidebar-toggle')) return;

    const toggleButton = document.createElement('button');
    toggleButton.id = 'modernizer-sidebar-toggle';
    toggleButton.innerHTML = '☰';
    toggleButton.classList.add('fixed', 'top-4', 'left-4', 'z-50', 'bg-gray-800', 'text-white', 'p-2', 'rounded-md', 'lg:hidden');
    toggleButton.onclick = () => {
        const sidebar = document.querySelector('.main-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('toggled');
        }
    };
    if (document.body) document.body.appendChild(toggleButton);

    const mainSidebar = document.querySelector('.main-sidebar');
    if (mainSidebar) {
        mainSidebar.classList.add('transform', 'transition-transform', 'duration-300', 'ease-in-out');
    }
}

// Run the initial cleanup as soon as possible
removeStylesheets();
removeScripts();

// Defer DOM manipulation until the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    applyModernLook();
    addSidebarToggle();

    // A fallback for pages that might load content dynamically
    const observer = new MutationObserver((mutations) => {
        let needsUpdate = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                needsUpdate = true;
                break;
            }
        }
        if (needsUpdate) {
            applyModernLook();
        }
    });

    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});
  