// ==============================================================================
// SAHIL RAMJAN PATHAN - ULTRA STYLISH TERMINAL LOGGING SUITE
// ==============================================================================

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',

  // Foreground Colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',

  // Bright Foreground Colors
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',

  // Background Colors
  bgCyan: '\x1b[46m',
  bgMagenta: '\x1b[45m',
  bgBlue: '\x1b[44m',
  bgGreen: '\x1b[42m'
};

export const printStartupBanner = ({ port, env = 'development', clientUrl = 'http://localhost:5173' }) => {
  const line = '═'.repeat(66);
  const thinLine = '─'.repeat(66);

  console.log('\n');
  console.log(`${colors.brightCyan}  ╔${line}╗${colors.reset}`);
  console.log(`${colors.brightCyan}  ║                                                                  ║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║   ${colors.bold}${colors.brightWhite}⚡ SAHIL RAMJAN PATHAN — MERN FULL-STACK CORE BACKEND ⚡${colors.reset}${colors.brightCyan}        ║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║   ${colors.dim}Production-Grade REST API & Dynamic Portfolio Engine (v2.0.0)${colors.reset}${colors.brightCyan}  ║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║                                                                  ║${colors.reset}`);
  console.log(`${colors.brightCyan}  ╠${line}╣${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}                                                                  ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}   ${colors.bold}● Server Status:${colors.reset}   ${colors.brightGreen}ONLINE & LISTENING${colors.reset}                         ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}   ${colors.bold}➜ API Base URL:${colors.reset}    ${colors.brightCyan}http://localhost:${port}${colors.reset}                           ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}   ${colors.bold}➜ Client WebApp:${colors.reset}   ${colors.brightMagenta}${clientUrl}${colors.reset}                           ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}   ${colors.bold}➜ Environment:${colors.reset}     ${colors.yellow}${env.toUpperCase()}${colors.reset}                                  ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}   ${colors.bold}➜ Database:${colors.reset}        ${colors.brightGreen}MongoDB Atlas (Portfoliodb Connected)${colors.reset}      ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}                                                                  ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ╠${thinLine}╣${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}   ${colors.bold}${colors.brightYellow}📌 REGISTERED API MODULES:${colors.reset}                                     ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}      ${colors.brightGreen}✔${colors.reset} /api/portfolio     ${colors.dim}→ Aggregated live public portfolio data${colors.reset}    ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}      ${colors.brightGreen}✔${colors.reset} /api/projects      ${colors.dim}→ 100+ projects showcase & CRUD${colors.reset}            ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}      ${colors.brightGreen}✔${colors.reset} /api/skills        ${colors.dim}→ Full-stack capabilities matrix${colors.reset}           ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}      ${colors.brightGreen}✔${colors.reset} /api/certifications${colors.dim}→ 15+ verified credentials & 3D cards${colors.reset}      ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}      ${colors.brightGreen}✔${colors.reset} /api/experience    ${colors.dim}→ Professional software engineer timeline${colors.reset}  ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}      ${colors.brightGreen}✔${colors.reset} /api/publication   ${colors.dim}→ IJIRT Published research spotlight${colors.reset}       ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}      ${colors.brightGreen}✔${colors.reset} /api/messages      ${colors.dim}→ Contact form submissions & inbox${colors.reset}         ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}      ${colors.brightGreen}✔${colors.reset} /api/auth          ${colors.dim}→ Secure JWT admin authentication${colors.reset}          ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ║${colors.reset}                                                                  ${colors.brightCyan}║${colors.reset}`);
  console.log(`${colors.brightCyan}  ╚${line}╝${colors.reset}`);
  console.log(`  ${colors.dim}🚀 Server ready to handle ultra-fast async queries & client requests!${colors.reset}\n`);
};

// HTTP Request Logger Middleware
export const requestLoggerMiddleware = (req, res, next) => {
  // Ignore noise like static images or favicon in request logs
  if (req.url.startsWith('/images') || req.url.startsWith('/assets') || req.url.includes('favicon')) {
    return next();
  }

  const start = Date.now();
  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    // Colorize HTTP Method
    let methodColor = colors.brightCyan;
    if (req.method === 'POST') methodColor = colors.brightGreen;
    if (req.method === 'PUT' || req.method === 'PATCH') methodColor = colors.brightYellow;
    if (req.method === 'DELETE') methodColor = colors.brightRed;

    // Colorize Status Code
    let statusColor = colors.brightGreen;
    if (statusCode >= 400 && statusCode < 500) statusColor = colors.brightYellow;
    if (statusCode >= 500) statusColor = colors.brightRed;

    console.log(
      `  ${colors.dim}[${timeStr}]${colors.reset} ${colors.bold}${methodColor}${req.method.padEnd(6)}${colors.reset} ${req.originalUrl.padEnd(25)} ${colors.bold}${statusColor}${statusCode}${colors.reset} ${colors.dim}(${duration}ms)${colors.reset}`
    );
  });

  next();
};

export const logInfo = (msg) => {
  console.log(`  ${colors.brightCyan}ℹ${colors.reset} ${colors.dim}[INFO]${colors.reset} ${msg}`);
};

export const logSuccess = (msg) => {
  console.log(`  ${colors.brightGreen}✔${colors.reset} ${colors.bold}${colors.brightGreen}[SUCCESS]${colors.reset} ${msg}`);
};

export const logWarn = (msg) => {
  console.log(`  ${colors.brightYellow}⚠${colors.reset} ${colors.bold}${colors.brightYellow}[WARN]${colors.reset} ${msg}`);
};

export const logError = (msg, err = '') => {
  console.error(`  ${colors.brightRed}✖${colors.reset} ${colors.bold}${colors.brightRed}[ERROR]${colors.reset} ${msg}`, err);
};

export default {
  colors,
  printStartupBanner,
  requestLoggerMiddleware,
  logInfo,
  logSuccess,
  logWarn,
  logError
};
