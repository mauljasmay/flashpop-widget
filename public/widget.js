// FlashPop Widget Loader
(function() {
  // Get token from script src query parameter
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  const urlParams = new URLSearchParams(currentScript.src.split('?')[1]);
  const token = urlParams.get('token');

  if (!token) {
    console.error('FlashPop: Token is required');
    return;
  }

  // Load widget settings from localStorage
  let widgetSettings = {
    widgetPosition: 'bottom-right',
    widgetTheme: 'purple',
    widgetAnimation: 'slide'
  };
  
  try {
    const savedSettings = localStorage.getItem('flashpop_widget_settings');
    if (savedSettings) {
      widgetSettings = { ...widgetSettings, ...JSON.parse(savedSettings) };
    }
  } catch (e) {
    console.warn('FlashPop: Could not load widget settings');
  }

  // Helper functions for settings
  function getPositionStyles(position) {
    const positions = {
      'bottom-right': { bottom: '20px', right: '20px', top: 'auto', left: 'auto' },
      'bottom-left': { bottom: '20px', left: '20px', top: 'auto', right: 'auto' },
      'top-right': { top: '20px', right: '20px', bottom: 'auto', left: 'auto' },
      'top-left': { top: '20px', left: '20px', bottom: 'auto', right: 'auto' }
    };
    return positions[position] || positions['bottom-right'];
  }

  function getThemeStyles(theme) {
    const themes = {
      purple: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      blue: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      green: 'linear-gradient(135deg, #10b981, #34d399)',
      orange: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    };
    return themes[theme] || themes.purple;
  }

  function getAnimationClass(animation) {
    const animations = {
      slide: 'slide-in',
      fade: 'fade-in',
      bounce: 'bounce-in'
    };
    return animations[animation] || animations.slide;
  }

  // Create widget container
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'flashpop-widget-container';
  const positionStyles = getPositionStyles(widgetSettings.widgetPosition);
  widgetContainer.style.cssText = `
    position: fixed;
    ${Object.entries(positionStyles).map(([key, value]) => `${key}: ${value};`).join(' ')}
    z-index: 9999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  document.body.appendChild(widgetContainer);

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slide-in {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes bounce-in {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); opacity: 1; }
    }
    .flashpop-notification.slide-in {
      animation: slide-in 0.5s ease-out;
    }
    .flashpop-notification.fade-in {
      animation: fade-in 0.5s ease-out;
    }
    .flashpop-notification.bounce-in {
      animation: bounce-in 0.6s ease-out;
    }
  `;
  document.head.appendChild(style);

  // Create badge
  const badge = document.createElement('div');
  const themeGradient = getThemeStyles(widgetSettings.widgetTheme);
  badge.style.cssText = `
    width: 60px;
    height: 60px;
    background: ${themeGradient};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    transition: all 0.3s ease;
  `;
  badge.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  `;
  widgetContainer.appendChild(badge);

  // Create notification count badge
  const countBadge = document.createElement('div');
  countBadge.id = 'flashpop-count-badge';
  countBadge.style.cssText = `
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    border: 2px solid white;
  `;
  badge.appendChild(countBadge);

  // Create modal
  const modal = document.createElement('div');
  modal.id = 'flashpop-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 10000;
    align-items: center;
    justify-content: center;
  `;
  document.body.appendChild(modal);

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  `;
  modal.appendChild(modalContent);

  // Fetch widget data
  async function loadWidgetData() {
    try {
      const response = await fetch(`/api/widget?token=${token}`);
      const data = await response.json();

      if (data.success) {
        const { settings, notifications } = data.data;
        renderWidget(settings, notifications);
      } else {
        console.error('FlashPop: Failed to load widget data', data.error);
      }
    } catch (error) {
      console.error('FlashPop: Error loading widget data', error);
    }
  }

  function renderWidget(settings, notifications) {
    // Update badge count
    const unreadCount = notifications.filter(n => !n.read).length;
    countBadge.textContent = unreadCount > 0 ? unreadCount.toString() : '';

    // Update position
    widgetContainer.style.bottom = settings.position.includes('top') ? 'auto' : '20px';
    widgetContainer.style.top = settings.position.includes('top') ? '20px' : 'auto';
    widgetContainer.style.left = settings.position.includes('right') ? 'auto' : '20px';
    widgetContainer.style.right = settings.position.includes('right') ? '20px' : 'auto';

    // Update theme
    const themeColors = getThemeColors(settings.theme);
    badge.style.background = themeColors.gradient;

    // Update modal position based on widget position
    updateModalPosition(settings.position);

    // Create modal content
    modalContent.innerHTML = `
      <div style="padding: 24px; border-bottom: 1px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2 style="font-size: 20px; font-weight: 600; color: #111827;">FlashPop Notifications</h2>
          <button id="flashpop-close" style="background: none; border: none; cursor: pointer; color: #6b7280;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div style="max-height: 400px; overflow-y: auto;">
        ${notifications.length === 0 ?
          '<div style="padding: 24px; text-align: center; color: #6b7280;">No notifications</div>' :
          notifications.map(notification => `
            <div style="padding: 16px; border-bottom: 1px solid #f3f4f6; ${!notification.read ? 'background: #fef3c7;' : ''}">
              <div style="display: flex; align-items: start; gap: 12px;">
                <div style="flex-shrink: 0; width: 8px; height: 8px; border-radius: 50%; background: ${getTypeColor(notification.type)}; margin-top: 6px;"></div>
                <div style="flex: 1;">
                  <h3 style="font-weight: 600; color: #111827; margin-bottom: 4px;">${notification.title}</h3>
                  <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">${notification.message}</p>
                  <p style="color: #9ca3af; font-size: 12px;">${new Date(notification.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          `).join('')
        }
      </div>
    `;

    // Add event listeners
    document.getElementById('flashpop-close').onclick = () => {
      modal.style.display = 'none';
    };

    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  function getThemeColors(theme) {
    switch (theme) {
      case 'purple':
        return {
          gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          primary: '#8b5cf6'
        };
      case 'blue':
        return {
          gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          primary: '#3b82f6'
        };
      case 'green':
        return {
          gradient: 'linear-gradient(135deg, #10b981, #34d399)',
          primary: '#10b981'
        };
      default:
        return {
          gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          primary: '#8b5cf6'
        };
    }
  }

  function updateModalPosition(position) {
    // Reset modal styles
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.background = 'rgba(0, 0, 0, 0.5)';
    
    modalContent.style.position = 'relative';
    modalContent.style.maxWidth = '400px';
    modalContent.style.width = '90%';
    modalContent.style.margin = '0';
    
    // For now, keep centered. Could be enhanced to position near badge
  }

  function getTypeColor(type) {
    switch (type) {
      case 'update': return '#3b82f6';
      case 'announcement': return '#f59e0b';
      case 'promotion': return '#10b981';
      default: return '#6b7280';
    }
  }

  // Event listeners
  badge.onclick = () => {
    modal.style.display = 'flex';
  };

  // Load data on script load
  loadWidgetData();

  // Auto-refresh every 5 minutes
  setInterval(loadWidgetData, 5 * 60 * 1000);
})();