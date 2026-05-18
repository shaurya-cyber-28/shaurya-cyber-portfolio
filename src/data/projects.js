export const projects = [
  {
    id: 'neuroshield-ids',
    slug: 'neuroshield-ids',
    title: 'NeuroShield IDS',
    subtitle: 'AI-Powered Intrusion Detection System',
    shortDesc: 'Real-time neural network threat detection with sub-millisecond response and 99.7% accuracy.',
    description: `NeuroShield IDS is a next-generation intrusion detection system that leverages deep learning 
    to identify and neutralize cyber threats in real time. Built on a custom LSTM + CNN hybrid architecture, 
    it processes network packets at wire speed while maintaining near-zero false positives.`,
    category: 'AI / Network Security',
    status: 'ACTIVE',
    year: '2024',
    color: '#a855f7',
    accentColor: 'rgba(168,85,247,0.15)',
    borderColor: 'rgba(168,85,247,0.4)',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Redis', 'Scapy', 'Docker'],
    stats: [
      { label: 'Accuracy', value: '99.7%' },
      { label: 'Latency', value: '<1ms' },
      { label: 'Threats Blocked', value: '2.4M+' },
      { label: 'Uptime', value: '99.99%' },
    ],
    challenges: [
      'Processing network traffic at wire speed without packet loss',
      'Reducing false positive rate below 0.1% threshold',
      'Adapting to zero-day attack patterns using unsupervised learning',
    ],
    architecture: 'Packet capture → Feature extraction → LSTM encoder → Threat classifier → Response engine → Logging',
    impact: 'Deployed across 3 enterprise networks, protecting 50,000+ endpoints.',
    demo: 'neuroshield',
    icon: '🛡️',
    links: {
      sourceCode: 'https://github.com/shaurya-cyber-28/Neuroshield-IDS',
      websiteCode: 'https://neuroshield-ids.onrender.com'
    }
  },
  {
    id: 'darkweb-sentinel',
    slug: 'darkweb-sentinel',
    title: 'DarkWeb Sentinel',
    subtitle: 'Dark Web Intelligence & Leak Monitor',
    shortDesc: 'Automated OSINT crawler scanning dark web markets, forums, and paste sites for data leaks.',
    description: `DarkWeb Sentinel is a threat intelligence platform that continuously monitors dark web 
    marketplaces, forums, Telegram channels, and paste sites for leaked credentials, corporate data, and 
    emerging threat actors. Features NLP-powered threat scoring and automated alerting.`,
    category: 'OSINT / Threat Intel',
    status: 'ACTIVE',
    year: '2024',
    color: '#ec4899',
    accentColor: 'rgba(236,72,153,0.12)',
    borderColor: 'rgba(236,72,153,0.4)',
    tags: ['Python', 'Tor', 'NLP', 'Elasticsearch', 'Scrapy', 'PostgreSQL'],
    stats: [
      { label: 'Sources Monitored', value: '1,200+' },
      { label: 'Leaks Detected', value: '48K+' },
      { label: 'Response Time', value: '<5min' },
      { label: 'Accuracy', value: '97.3%' },
    ],
    challenges: [
      'Maintaining anonymity while scraping hostile networks',
      'NLP processing of multilingual threat data',
      'Correlating fragmented intelligence across disconnected sources',
    ],
    architecture: 'Tor network → Scrapy crawlers → NLP pipeline → Threat scoring → Alert engine → Dashboard',
    impact: 'Identified 3 major corporate data breaches before public disclosure.',
    demo: 'darkweb',
    icon: '🕸️',
    links: {
      sourceCode: 'https://github.com/shaurya-cyber-28/DarkWeb-Sentinel',
      websiteCode: 'https://shaurya-cyber-28.github.io/DarkWeb-Sentinel'
    }
  },
  {
    id: 'cyberdefense-x',
    slug: 'cyberdefense-x',
    title: 'CyberDefense-X',
    subtitle: 'Autonomous Security Operations Platform',
    shortDesc: 'Self-healing network defense platform with automated incident response and threat hunting.',
    description: `CyberDefense-X is an autonomous security operations platform that combines SIEM, SOAR, and 
    AI-driven threat hunting into a unified command center. It auto-responds to incidents, orchestrates 
    playbooks, and continuously hunts for hidden adversaries across the network.`,
    category: 'SOC Automation',
    status: 'BETA',
    year: '2025',
    color: '#ef4444',
    accentColor: 'rgba(239,68,68,0.12)',
    borderColor: 'rgba(239,68,68,0.4)',
    tags: ['Go', 'Rust', 'Kafka', 'ClickHouse', 'React', 'gRPC'],
    stats: [
      { label: 'MTTR', value: '90% ↓' },
      { label: 'Events/sec', value: '500K+' },
      { label: 'Auto-resolved', value: '89%' },
      { label: 'Coverage', value: '360°' },
    ],
    challenges: [
      'Building a real-time event correlation engine at massive scale',
      'Designing playbooks that adapt to novel attack chains',
      'Minimizing analyst fatigue while maximizing signal quality',
    ],
    architecture: 'Log ingestion → Correlation engine → Threat hunter → Playbook executor → Analyst dashboard',
    impact: 'Reduced mean time to respond by 90% in pilot deployments.',
    demo: 'cyberdefense',
    icon: '⚔️',
    links: {
      sourceCode: 'https://github.com/shaurya-cyber-28/CyberDefense-X',
      websiteCode: 'https://cyberdefense-x.onrender.com'
    }
  },
  {
    id: 'browser-malware-detector',
    slug: 'browser-malware-detector',
    title: 'Browser Extension Malware Detector',
    subtitle: 'AI-Assisted Extension Analysis Platform',
    shortDesc: 'AI-assisted platform to detect malicious, privacy-invasive, and suspicious browser extensions.',
    description: `An AI-assisted browser extension analysis platform designed to detect malicious, privacy-invasive, 
    and suspicious browser extensions. It scans extension permissions, analyzes scripts and behavioral patterns, 
    identifies tracking or malicious activities, and generates threat intelligence reports with risk scoring.`,
    category: 'AI / Browser Security',
    status: 'DEVELOPMENT',
    year: '2026',
    color: '#06b6d4',
    accentColor: 'rgba(6,182,212,0.12)',
    borderColor: 'rgba(6,182,212,0.4)',
    tags: ['Python', 'JavaScript', 'Chrome Extension APIs', 'FastAPI', 'Machine Learning', 'VirusTotal API', 'SQLite'],
    stats: [
      { label: 'Risk Scoring', value: 'Real-time' },
      { label: 'Detection Rate', value: '94%+' },
      { label: 'Analysis Time', value: '<2s' },
      { label: 'Target', value: 'Chromium' },
    ],
    challenges: [
      'Analyzing obfuscated JavaScript payloads dynamically without browser crashing',
      'Classifying permission-risk vs. legitimate usage to reduce false positives',
      'Real-time behavioral monitoring without degrading user browser performance',
    ],
    architecture: 'Extension Parsing → Permission Extraction → Script Analysis → AI Classification → Risk Scoring & Reporting',
    impact: 'Currently under active development to protect endpoints from stealthy supply-chain attacks via browser add-ons.',
    demo: 'browser-malware',
    icon: '🧩',
    links: {
      sourceCode: 'https://github.com/shaurya-cyber-28/Browser-extension-Malware-Detector',
      websiteCode: 'https://browserextensionmalwaredetector.vercel.app/'
    }
  },
]