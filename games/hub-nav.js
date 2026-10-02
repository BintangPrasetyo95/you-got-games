/**
 * YOU GOT GAMES — Universal In-Game Navigation & Pause Overlay Helper
 * Renders the custom icon.svg with game-specific color gradients and handles:
 * - Floating Back-to-Menu button
 * - Pause overlay featuring the gradient hero icon + spread-out background star icons
 * - Keyboard listeners and state toggles
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.HubNav = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Exact path extracted from icon.svg
  const STAR_PATH = 'M 33.2608789622268,149.7963776520648 A 25.17052382335184,103.73843372983761 59.891247 0,1 49.965078540340485,134.8178692216952 L 44.834624047034,134.8178692216952 L 33.2608789622268,149.7963776520648 M 50.659657478899916,127.27944069740559 L 44.834624047034,134.8178692216952 L 49.965078540340485,134.8178692216952 A 25.17052382335184,103.73843372983761 59.891247 0,1 52.54925836464416,132.755650750632 L 50.659657478899916,127.27944069740559 L 52.54925836464416,132.755650750632 A 25.17052382335184,103.73843372983761 59.891247 0,1 65.95421071044913,122.7667239656696 L 58.560741824553446,117.0533551703264 L 50.659657478899916,127.27944069740559 M 99.99981811713519,1.3965582468244975e-06 L 92.85580501989439,20.706222533318318 L 84.72268157144127,44.27988476201336 L 75.22601231950279,71.8033165093536 L 45.80785310857736,71.8033165093536 L 31.518798030143916,71.8033165093536 L 18.5384813560156,71.8033165093536 L -4.2095665619967804e-08,71.8033165093536 L 17.7737271793652,85.5371231624168 L 42.9767797933216,105.01143815090157 L 58.560741824553446,117.05335517032637 L 65.95421071044913,122.76672396566957 A 25.17052382335184,103.73843372983761 59.891247 0,1 71.42222339346192,118.97625799646556 A 25.17052382335184,103.73843372983761 59.891247 0,1 81.40089603152472,112.41105655128399 A 25.17052382335184,103.73843372983761 59.891247 0,1 81.98073656753577,112.04276962227996 A 25.17052382335184,103.73843372983761 59.891247 0,1 84.83639604612625,110.24741668720316 L 77.63757257605216,106.07328009060157 L 52.62762899051337,91.57063544404639 L 42.22278330215225,85.5371231624168 L 50.54594300421496,85.5371231624168 L 70.48792242386521,85.5371231624168 L 84.72319403098184,85.5371231624168 L 89.46128392661944,71.8033165093536 L 95.9614287818096,52.96416290681831 L 99.97318409807359,41.33561042283086 L 106.9025787432408,61.41844782211519 L 110.4855927641976,71.80331650935358 L 115.22368265983519,85.53712316241678 L 129.51223419968719,85.53712316241678 L 130.6150530782784,85.53712316241678 A 25.17052382335184,103.73843372983761 59.891247 0,1 135.363897685744,83.41035659603199 A 25.17052382335184,103.73843372983761 59.891247 0,1 152.57007864232241,76.50453310729517 A 25.17052382335184,103.73843372983761 59.891247 0,1 167.3882675251288,71.80331650935358 L 154.19229558523358,71.80331650935358 L 124.7741443040496,71.80331650935358 L 107.117712628508,20.628876826530245 L 99.99981811713519,1.3965582468244975e-06 M 156.60853,128.49552 A 95.595317,53.673533 88.408395 0,0 160.88217,147.06699 A 43.958293,16.620079 0.21703807 0,1 162.21077,150.55205 A 43.958293,16.620079 0.21703807 0,1 161.98546,150.57635000000002 A 95.595317,53.673533 88.408395 0,0 162.29344999999998,151.49877 A 95.595317,53.673533 88.408395 0,0 162.31824999999998,151.57267000000002 A 95.595317,53.673533 88.408395 0,0 169.15968999999998,167.80992 A 108.99035,60.91247 1.5775816 0,1 169.29043,167.91276 A 16.620079,43.958293 0.21703807 0,1 169.23872999999998,167.96186 A 95.595317,53.673533 88.408395 0,1 169.15962999999996,167.80993 A 108.99035,60.91247 1.5775816 0,0 156.52163999999996,159.47297 A 108.99035,60.91247 1.5775816 0,0 153.28772999999995,157.74491 A 108.99035,60.91247 1.5775816 0,0 151.66560999999996,156.92688 A 108.99035,60.91247 1.5775816 0,0 149.11640999999995,155.70266 A 108.99035,60.91247 1.5775816 0,0 145.89644999999996,154.25624000000002 A 108.99035,60.91247 1.5775816 0,0 131.15419999999995,148.83796 A 43.958293,16.620079 0.21703807 0,1 123.71072999999994,146.86909 A 43.958293,16.620079 0.21703807 0,1 122.25241999999994,146.37093 A 108.99035,60.91247 1.5775816 0,0 113.21316999999995,144.39121 A 108.99035,60.91247 1.5775816 0,0 86.63236799999996,141.25548 A 24.965841,95.405174 64.039403 0,1 84.24956799999995,142.22390000000001 A 24.965841,95.405174 64.039403 0,1 77.47013699999995,144.86146000000002 A 24.965841,95.405174 64.039403 0,1 37.45552499999995,156.04941000000002 A 122.7887,49.846216 4.5754829 0,1 75.97617099999995,155.41172000000003 A 122.7887,49.846216 4.5754829 0,1 84.19013999999996,155.93779000000004 A 122.7887,49.846216 4.5754829 0,1 114.37227999999996,159.83833000000004 A 122.7887,49.846216 4.5754829 0,1 127.03868999999996,162.46349000000004 A 122.7887,49.846216 4.5754829 0,1 139.58778999999996,165.73202000000003 A 122.7887,49.846216 4.5754829 0,1 143.76686999999995,166.98621000000003 A 122.7887,49.846216 4.5754829 0,1 149.24766999999994,168.77215000000004 A 122.7887,49.846216 4.5754829 0,1 178.08104999999995,181.75688000000005 A 122.7887,49.846216 4.5754829 0,1 185.56585999999996,186.72196000000005 A 122.7887,49.846216 4.5754829 0,1 190.03742999999997,190.29590000000005 A 53.673533,95.595317 6.6074741 0,1 174.65748999999997,159.55979000000005 A 53.673533,95.595317 6.6074741 0,1 172.26021999999998,149.20538000000005 A 53.673533,95.595317 6.6074741 0,1 171.39101999999997,143.99950000000004 A 53.673533,95.595317 6.6074741 0,1 170.52646999999996,136.87642000000005 A 43.958293,16.620079 0.21703807 0,0 156.60845999999995,128.49554000000006 L 156.60853,128.49552 M 172.33057,88.672107 A 24.965841,95.405174 64.039403 0,1 154.40091,103.99468999999999 A 95.595317,53.673533 88.408395 0,0 154.56473,109.11064999999999 A 95.595317,53.673533 88.408395 0,0 155.19362999999998,117.75974 A 95.595317,53.673533 88.408395 0,0 155.29491,118.75605999999999 A 16.620079,43.958293 0.21703807 0,1 155.64011,121.78119999999998 A 95.595317,53.673533 88.408395 0,0 156.60853,128.49551999999997 A 43.958293,16.620079 0.21703807 0,1 170.52654,136.87639999999996 A 53.673533,95.595317 6.6074741 0,1 169.83873,119.15241999999996 A 53.673533,95.595317 6.6074741 0,1 170.5932,105.81317999999996 A 53.673533,95.595317 6.6074741 0,1 172.93672999999998,89.66739499999996 A 16.620079,43.958293 0.21703807 0,0 172.33057,88.67210699999995 L 172.33057,88.672107 M 160.88217,147.06699 A 95.595317,53.673533 88.408395 0,0 161.98546,150.57634000000002 A 43.958293,16.620079 0.21703807 0,0 162.21077,150.55204 A 43.958293,16.620079 0.21703807 0,0 160.88217,147.06698 L 160.88217,147.06699 M 134.1205,102.51519 A 11.175629,10.942781 0.0 0,1 127.71261999999999,111.78698 A 13.971375,13.350425 0.0 0,0 132.69733,110.15865 A 13.971375,13.350425 0.0 0,0 130.79253,112.68200999999999 A 13.971375,13.350425 0.0 0,0 129.74402,114.95629 A 11.175629,10.942781 0.0 0,1 134.13445000000002,122.96355 A 11.175629,10.942781 0.0 0,1 136.61233000000001,116.70347 A 11.175629,10.942781 0.0 0,1 144.22582000000003,112.70474999999999 A 11.175629,10.942781 0.0 0,1 135.89558000000002,107.76292999999998 A 11.175629,10.942781 0.0 0,1 135.85628000000003,107.70352999999999 A 11.175629,10.942781 0.0 0,1 134.12047000000004,102.51521999999999 L 134.1205,102.51519 M 132.69733,110.15865 A 13.971375,13.350425 0.0 0,1 127.71261999999999,111.78698 A 11.175629,10.942781 0.0 0,1 127.47180999999999,111.89446 A 11.175629,10.942781 0.0 0,1 126.91008,112.11873999999999 A 11.175629,10.942781 0.0 0,1 124.02911999999999,112.77398999999998 A 11.175629,10.942781 0.0 0,1 127.86868,113.82767999999999 A 11.175629,10.942781 0.0 0,1 129.74402,114.95628999999998 A 13.971375,13.350425 0.0 0,1 130.79253,112.68200999999998 A 13.971375,13.350425 0.0 0,1 132.69733,110.15864999999998 L 132.69733,110.15865 M 105.23538,86.803516 A 19.923979,18.957594 0.0 0,1 100.03483,98.511373 A 19.923979,18.957594 0.0 0,1 95.22706,102.16645000000001 A 19.923979,18.957594 0.0 0,0 92.51072099999999,105.74962000000001 A 19.923979,18.957594 0.0 0,1 105.21546999999998,121.68934 A 15.937085,15.538741 0.0 0,1 105.20846999999998,121.22705 A 15.937085,15.538741 0.0 0,1 115.79012999999998,106.59204000000001 A 19.923979,18.957594 0.0 0,1 118.19180999999998,105.56325000000001 A 19.923979,18.957594 0.0 0,1 123.25085999999997,104.45593000000001 A 19.923979,18.957594 0.0 0,1 108.51509999999998,96.06267000000001 A 19.923979,18.957594 0.0 0,1 105.35586999999998,87.997414 A 19.923979,18.957594 0.0 0,1 105.23507999999998,86.803516 L 105.23538,86.803516 M 121.48212,116.9646 A 13.971375,13.350425 0.0 0,1 108.88288,129.47908 A 11.175629,10.942781 0.0 0,0 108.88788,129.48308 A 13.971375,13.350425 0.0 0,1 115.09938,131.53412 A 13.971375,13.350425 0.0 0,1 119.19991,135.39176 A 13.971375,13.350425 0.0 0,1 121.50003000000001,141.91178 A 13.971375,13.350425 0.0 0,1 125.14683000000001,133.6668 A 13.971375,13.350425 0.0 0,1 128.5182,131.09332 A 13.971375,13.350425 0.0 0,1 131.78984,129.80089 A 13.971375,13.350425 0.0 0,1 134.11631,129.39626 A 13.971375,13.350425 0.0 0,1 130.42299,128.56996 A 13.971375,13.350425 0.0 0,1 129.94137,128.38341 A 13.971375,13.350425 0.0 0,1 125.43208000000001,125.43475 A 13.971375,13.350425 0.0 0,1 121.48246000000002,116.96498 L 121.48212,116.9646 M 95.22706,102.16645 A 19.923979,18.957594 0.0 0,1 87.244574,104.57628 A 19.923979,18.957594 0.0 0,1 92.510721,105.74962 A 19.923979,18.957594 0.0 0,1 95.22706000000001,102.16645 L 95.22706,102.16645';

  // Game color signatures (used for icon gradient stops and glow)
  const GAME_CONFIGS = {
    'pong': {
      title: 'Pong — Neon Edition',
      subtitle: 'Arcade Classic · Retro Synthwave',
      stops: [
        { offset: '0%', color: '#ff4ecb' },
        { offset: '50%', color: '#a44eff' },
        { offset: '100%', color: '#4ee0ff' }
      ],
      glow: 'rgba(255, 78, 203, 0.65)',
      c1: '#ff4ecb',
      c2: '#4ee0ff'
    },
    'hell-arena': {
      title: 'Hell Arena',
      subtitle: 'Retro Raycasting FPS · Wave Shooter',
      stops: [
        { offset: '0%', color: '#ff5a3a' },
        { offset: '50%', color: '#d3241a' },
        { offset: '100%', color: '#e8b85a' }
      ],
      glow: 'rgba(211, 36, 26, 0.75)',
      c1: '#ff3a2b',
      c2: '#e8b85a'
    },
    'pico': {
      title: 'Stack Park',
      subtitle: '4-Player Co-op Puzzle Platformer',
      stops: [
        { offset: '0%', color: '#e53935' },
        { offset: '33%', color: '#fdd835' },
        { offset: '66%', color: '#43a047' },
        { offset: '100%', color: '#1e88e5' }
      ],
      glow: 'rgba(67, 160, 71, 0.7)',
      c1: '#e53935',
      c2: '#1e88e5'
    },
    'poolrooms': {
      title: 'The Poolrooms',
      subtitle: 'Level 37 · Liminal Space Exploration',
      stops: [
        { offset: '0%', color: '#d9f6f4' },
        { offset: '45%', color: '#2dd4bf' },
        { offset: '100%', color: '#0b3a3f' }
      ],
      glow: 'rgba(45, 212, 191, 0.65)',
      c1: '#2dd4bf',
      c2: '#0b3a3f'
    },
    'slender': {
      title: 'Eight Pages',
      subtitle: 'Survival Horror · Midnight Forest',
      stops: [
        { offset: '0%', color: '#fff0d0' },
        { offset: '45%', color: '#52796f' },
        { offset: '100%', color: '#16211d' }
      ],
      glow: 'rgba(255, 240, 208, 0.55)',
      c1: '#fff0d0',
      c2: '#52796f'
    },
    'lighthouse': {
      title: 'Lighthouse · Particle Ocean',
      subtitle: 'Interactive 3D · 160K Particle Waves',
      stops: [
        { offset: '0%', color: '#ffbe5a' },
        { offset: '50%', color: '#38bdf8' },
        { offset: '100%', color: '#1e1b4b' }
      ],
      glow: 'rgba(255, 190, 90, 0.65)',
      c1: '#ffbe5a',
      c2: '#38bdf8'
    },
    'hand': {
      title: 'Articulated 3D Hand',
      subtitle: 'Procedural Kinematics & Poses',
      stops: [
        { offset: '0%', color: '#ff9a6b' },
        { offset: '50%', color: '#e8567a' },
        { offset: '100%', color: '#7928ca' }
      ],
      glow: 'rgba(232, 86, 122, 0.65)',
      c1: '#ff9a6b',
      c2: '#7928ca'
    }
  };

  /**
   * Generates inline SVG of icon.svg with a customized linearGradient.
   */
  function createStarSvg(gradientId, stops, className = '') {
    const stopsHtml = stops.map(s => `<stop offset="${s.offset}" stop-color="${s.color}" />`).join('');
    return `
      <svg class="${className}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(45)">
            ${stopsHtml}
          </linearGradient>
        </defs>
        <path fill="url(#${gradientId})" fill-rule="evenodd" d="${STAR_PATH}" />
      </svg>
    `.trim();
  }

  let instance = null;

  class HubNavigator {
    constructor(options = {}) {
      this.gameId = options.gameId || this.detectGameId();
      this.config = Object.assign({}, GAME_CONFIGS[this.gameId] || GAME_CONFIGS['pong'], options);
      this.isPaused = false;
      this.onPause = options.onPause || null;
      this.onResume = options.onResume || null;
      this.customPauseHandling = options.customPauseHandling || false;

      this.initTheme();
      this.injectBackButton();
      if (!options.disablePauseOverlay) {
        this.injectPauseOverlay();
      }
      this.bindKeyboard();
    }

    detectGameId() {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('hell-arena')) return 'hell-arena';
      if (path.includes('pong')) return 'pong';
      if (path.includes('pico')) return 'pico';
      if (path.includes('poolrooms')) return 'poolrooms';
      if (path.includes('slender')) return 'slender';
      if (path.includes('lighthouse')) return 'lighthouse';
      if (path.includes('hand')) return 'hand';
      return 'pong';
    }

    initTheme() {
      const rootEl = document.documentElement;
      rootEl.style.setProperty('--hub-glow', this.config.glow);
      rootEl.style.setProperty('--hub-c1', this.config.c1);
      rootEl.style.setProperty('--hub-c2', this.config.c2);
    }

    injectBackButton() {
      if (document.getElementById('hubBackBtn')) return;

      const miniIcon = createStarSvg(`miniStarGrad_${this.gameId}`, this.config.stops);
      const btn = document.createElement('a');
      btn.id = 'hubBackBtn';
      btn.className = 'hub-back-btn';
      btn.href = '../index.html';
      btn.title = 'Return to Game Hub Menu';
      btn.innerHTML = `
        <span class="hub-back-arrow">←</span>
        <span class="hub-back-icon">${miniIcon}</span>
        <span>Menu</span>
      `;

      // Safe navigation with pointer lock release
      btn.addEventListener('click', (e) => {
        if (document.pointerLockElement) {
          try { document.exitPointerLock(); } catch (_) {}
        }
      });

      document.body.appendChild(btn);
    }

    injectPauseOverlay() {
      if (document.getElementById('hubPauseOverlay')) return;

      const overlay = document.createElement('div');
      overlay.id = 'hubPauseOverlay';
      overlay.className = 'hub-pause-overlay';

      // Spread-out background stars using icon.svg with reduced opacity
      const spreadStarsHtml = Array.from({ length: 8 }, (_, i) => {
        const gradId = `spreadStarGrad_${this.gameId}_${i}`;
        const star = createStarSvg(gradId, this.config.stops);
        return `<div class="hub-spread-star">${star}</div>`;
      }).join('');

      // Hero Center Star Icon
      const heroStarHtml = createStarSvg(`heroStarGrad_${this.gameId}`, this.config.stops, 'hub-hero-star');

      overlay.innerHTML = `
        <div class="hub-spread-stars">${spreadStarsHtml}</div>
        <div class="hub-pause-card">
          <div class="hub-hero-star-wrapper">
            <div class="hub-hero-star-glow"></div>
            ${heroStarHtml}
          </div>
          <h2 class="hub-pause-title">Game Paused</h2>
          <p class="hub-game-subtitle">${this.config.title} · ${this.config.subtitle}</p>
          <div class="hub-btn-group">
            <button type="button" class="hub-btn hub-btn-primary" id="hubResumeBtn">
              Resume Game
            </button>
            <a href="../index.html" class="hub-btn hub-btn-secondary" id="hubExitToMenuBtn">
              ← Back to Hub
            </a>
          </div>
          <p class="hub-pause-hint">Press <kbd>Esc</kbd> or <kbd>P</kbd> to toggle pause</p>
        </div>
      `;

      document.body.appendChild(overlay);

      document.getElementById('hubResumeBtn').addEventListener('click', () => {
        this.resume();
      });

      document.getElementById('hubExitToMenuBtn').addEventListener('click', () => {
        if (document.pointerLockElement) {
          try { document.exitPointerLock(); } catch (_) {}
        }
      });
    }

    bindKeyboard() {
      if (this.customPauseHandling) return;

      window.addEventListener('keydown', (e) => {
        // Toggle pause on Escape or P (unless user is typing in an input)
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

        if (e.key === 'p' || e.key === 'P' || e.key === 'Pause') {
          e.preventDefault();
          this.togglePause();
        } else if (e.key === 'Escape' && !document.pointerLockElement) {
          // If pointer lock was already released or not used, toggle pause
          this.togglePause();
        }
      });
    }

    pause() {
      if (this.isPaused) return;
      this.isPaused = true;
      const overlay = document.getElementById('hubPauseOverlay');
      if (overlay) overlay.classList.add('active');
      if (typeof this.onPause === 'function') {
        this.onPause();
      }
    }

    resume() {
      if (!this.isPaused) return;
      this.isPaused = false;
      const overlay = document.getElementById('hubPauseOverlay');
      if (overlay) overlay.classList.remove('active');
      if (typeof this.onResume === 'function') {
        this.onResume();
      }
    }

    togglePause() {
      if (this.isPaused) {
        this.resume();
      } else {
        this.pause();
      }
    }
  }

  return {
    init: function (options) {
      instance = new HubNavigator(options);
      return instance;
    },
    getInstance: function () {
      return instance;
    },
    createStarSvg: createStarSvg,
    STAR_PATH: STAR_PATH,
    GAME_CONFIGS: GAME_CONFIGS
  };
});
