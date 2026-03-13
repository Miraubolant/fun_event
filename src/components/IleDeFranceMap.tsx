import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  slug: string;
  cities: number;
  path: string;
  fill: string;
  fillHover: string;
}

const departments: Department[] = [
  {
    id: '95',
    name: "Val-d'Oise",
    slug: 'val-d-oise',
    cities: 99,
    fill: '#06b6d4',
    fillHover: '#0891b2',
    path: 'm 285.98408,120.40159 0.41,-0.58 1.09,1.06 -1.05,1.12 1.12,1.61 2.57,-0.27 0.36,0.75 1.02,-0.21 -0.06,0.8 4.8,-0.39 1.04,-0.84 1.08,0.49 3.28,-2.18 0.64,1.28 1.35,-0.23 0.31,0.93 0.48,-0.6 0.94,1.58 1.99,-1 0.36,1.75 2.42,-0.51 1.17,-1.69 1.82,2.43 0.72,-0.74 2.7,0.83 -0.24,0.82 1.07,-0.47 1.82,1.46 -0.56,0.72 1.74,0.41 0.91,-1.54 0.16,1.62 1.34,1.17 0,0 -0.88,1.2 1.03,0.86 -2.01,1.51 0.22,0.74 0,0 -2.51,2.73 -2.11,0.92 -3.04,-1.21 -1.29,1.01 -1.55,-0.55 -0.66,1.02 0,0 -3.36,2.61 0,0 0.16,-2.71 -1.27,-0.14 -0.39,-1.93 -1.86,-0.49 0.02,-1.61 -4.04,1.23 -1.29,-1.49 -2.26,-0.01 -1.24,-1.65 -1.32,1.93 -1.03,-1 0.61,-1.51 -1.47,-1.22 -4.45,2 -2.08,-2.11 -2.68,0.04 0,0 2.03,-3.42 0.69,-5.04 z',
  },
  {
    id: '78',
    name: 'Yvelines',
    slug: 'yvelines',
    cities: 143,
    fill: '#22c55e',
    fillHover: '#16a34a',
    path: 'm 277.59408,138.79159 -0.36,-1.69 1.1,-0.72 -2.02,0.17 0.34,-2.41 -1.26,-2.49 0.6,-0.66 1.07,0.84 0.88,-2.2 0.53,1.11 3.56,-0.59 0,0 2.68,-0.04 2.08,2.11 4.45,-2 1.47,1.22 -0.61,1.51 1.03,1 1.32,-1.93 1.24,1.65 2.26,0.01 1.29,1.49 4.04,-1.23 -0.02,1.61 1.86,0.49 0.39,1.93 1.27,0.14 -0.16,2.71 0,0 -1.36,0.88 -0.86,1.52 0.53,1.41 -0.7,0.31 0.74,3.84 1.33,1 0,0 -3.78,1.77 -0.25,2.57 -0.67,0.8 -1.48,-0.18 -0.66,1.92 -0.73,-0.2 2.12,2.73 -1.22,0.63 -0.63,3.04 -3.4,-0.19 1.78,2.15 -1.35,0.54 -0.99,3.7 0,0 -0.62,1.12 -1.55,-0.02 -1.09,-0.39 -0.32,-1.28 -1.42,0.03 -1.07,-2.91 0.47,-2.52 -1.24,-1.3 -2,-0.17 0.25,-2.34 -2.03,0.02 -0.98,-2.24 -1.58,-0.76 0.33,-1.68 -1.46,-0.88 2.07,-2.76 -1.88,-0.9 -0.09,-4.39 0.79,-0.54 -0.89,-0.33 0.32,-0.96 -1.61,-0.65 0.72,-1.27 z',
  },
  {
    id: '93',
    name: 'Seine-Saint-Denis',
    slug: 'seine-saint-denis',
    cities: 40,
    fill: '#6366f1',
    fillHover: '#4f46e5',
    path: 'm 321.14408,134.29159 0.74,-0.06 0.56,2.01 -0.81,0.09 1.68,2.83 -0.7,2.43 -1.13,0.57 1.03,1.05 -0.44,1.26 0.91,2.76 0,0 -2.58,-2.99 -5.04,-0.22 0,0 -0.78,-2.62 -2.92,-0.04 0,0 0.55,-2.55 -2.23,-0.6 0,0 0.66,-1.02 1.55,0.55 1.29,-1.01 3.04,1.21 2.11,-0.92 z',
  },
  {
    id: '92',
    name: 'Hauts-de-Seine',
    slug: 'hauts-de-seine',
    cities: 36,
    fill: '#ec4899',
    fillHover: '#db2777',
    path: 'm 309.98408,138.21159 2.23,0.6 -0.55,2.55 0,0 -2.13,2.15 -1.08,-0.63 -0.83,1.32 4.41,2.24 0,0 -1.07,4.84 0,0 -0.91,0.44 -0.52,-1.6 -1.66,-0.76 -1.57,0.42 0,0 -1.33,-1 -0.74,-3.84 0.7,-0.31 -0.53,-1.41 0.86,-1.52 1.36,-0.88 0,0 z',
  },
  {
    id: '75',
    name: 'Paris',
    slug: 'paris',
    cities: 1,
    fill: '#3b82f6',
    fillHover: '#2563eb',
    path: 'm 311.66408,141.36159 2.92,0.04 0.78,2.62 0,0 0.04,1.49 2.23,-0.38 -0.34,1.18 -2.46,-0.74 -2.8,0.87 0,0 -4.41,-2.24 0.83,-1.32 1.08,0.63 z',
  },
  {
    id: '94',
    name: 'Val-de-Marne',
    slug: 'val-de-marne',
    cities: 47,
    fill: '#14b8a6',
    fillHover: '#0d9488',
    path: 'm 315.36408,144.02159 5.04,0.22 2.58,2.99 0,0 -0.34,2.04 1.12,0.69 -1.19,1.34 -0.55,3.11 0,0 -1.09,0.01 -1.28,-2.97 -4.17,1.35 -1.72,-0.11 -0.14,-1.14 -1.6,-0.66 -1.06,0.39 0,0 1.07,-4.84 0,0 2.8,-0.87 2.46,0.74 0.34,-1.18 -2.23,0.38 z',
  },
  {
    id: '91',
    name: 'Essonne',
    slug: 'essonne',
    cities: 131,
    fill: '#a855f7',
    fillHover: '#9333ea',
    path: 'm 306.30408,149.78159 1.57,-0.42 1.66,0.76 0.52,1.6 0.91,-0.44 0,0 1.06,-0.39 1.6,0.66 0.14,1.14 1.72,0.11 4.17,-1.35 1.28,2.97 1.09,-0.01 0,0 0.53,0.9 -2.26,1.02 0.51,1.71 -1.2,0.3 1.26,1.67 -1.88,3.53 0.69,2.52 -0.49,4.73 1.8,1.75 -3.01,0.72 0.43,0.41 -2.27,1.32 0.6,0.3 -0.44,1.41 -1.71,-0.02 0.48,1.21 0,0 -1.88,0.49 -1.24,-1.55 -0.76,0.25 0,0 -0.46,1.06 0,0 -1.37,-0.22 -0.9,1.04 0.02,-2.08 -1.77,-0.76 -0.9,2.04 -1.23,-0.29 0.49,1.09 -2.44,-0.52 -2.65,1.4 -1.95,-0.13 0,0 -1.5,-1.46 0.91,-0.47 -0.09,-5.2 -2.06,-0.28 0.6,-2.2 -0.84,-1.04 0,0 0.99,-3.7 1.35,-0.54 -1.78,-2.15 3.4,0.19 0.63,-3.04 1.22,-0.63 -2.12,-2.73 0.73,0.2 0.66,-1.92 1.48,0.18 0.67,-0.8 0.25,-2.57 z',
  },
  {
    id: '77',
    name: 'Seine-et-Marne',
    slug: 'seine-et-marne',
    cities: 229,
    fill: '#f97316',
    fillHover: '#ea580c',
    path: 'm 342.79408,127.66159 3.83,1.13 -0.47,1.02 1.55,2.05 -0.97,2.39 3.48,2.51 0.55,2.12 1.67,-0.62 1,2.56 1.6,-1.28 0.64,3.55 2.6,0.73 0.64,1.43 1,-0.92 0,0 0.08,2.4 -3.48,0.33 1.58,0.35 0.08,0.8 -1.43,0.4 -0.6,1.6 3.06,1.27 0.35,2.49 -1.52,2.16 0.81,0.7 -0.35,1.09 3.45,-0.7 -0.58,0.84 1.63,1.02 0,0 -2.41,0.74 0.51,0.93 -2.04,1.21 0.67,1.8 -3.09,0.86 1.3,2.34 -2.26,0.67 0.94,1.65 -0.59,1.79 1.27,0.57 -0.31,1.6 0,0 -1.6,-0.61 -0.46,1.72 -1.2,0.16 -2.22,-0.74 -1.16,1.06 -4.72,-0.5 -1.54,1.48 -2.33,-0.65 -1.33,3.38 1.33,3.44 -1.78,2.66 -2.78,1.46 -0.01,1.26 0,0 -2.94,0.43 -1.94,1.63 -0.76,-0.11 -0.09,-2.3 -1.5,0.95 -1.1,-0.83 0.74,1.33 -2.02,1.36 -6.07,-1.09 -1.57,1.04 -3.23,0.02 1.64,-2.53 0.97,0.51 0.68,-2.7 -0.71,-2.36 -3.41,-1.34 -0.81,-3.48 0,0 -0.48,-1.21 1.71,0.02 0.44,-1.41 -0.6,-0.3 2.27,-1.32 -0.43,-0.41 3.01,-0.72 -1.8,-1.75 0.49,-4.73 -0.69,-2.52 1.88,-3.53 -1.26,-1.67 1.2,-0.3 -0.51,-1.71 2.26,-1.02 -0.53,-0.9 0,0 0.55,-3.11 1.19,-1.34 -1.12,-0.69 0.34,-2.04 0,0 -0.91,-2.76 0.44,-1.26 -1.03,-1.05 1.13,-0.57 0.7,-2.43 -1.68,-2.83 0.81,-0.09 -0.56,-2.01 -0.74,0.06 0,0 -0.22,-0.74 2.01,-1.51 -1.03,-0.86 0.88,-1.2 0,0 1.77,-1.8 2.64,2.78 0.99,-0.71 1.32,0.91 2.33,-2.25 1.81,1.67 2.02,-0.87 1.69,0.44 1.15,-0.91 0.78,1.29 0.89,-1.29 2.39,0.4 z',
  },
];

// Pre-calculated label positions (center of each department)
const labelPositions: Record<string, { x: number; y: number }> = {
  '75': { x: 312, y: 143 },
  '77': { x: 345, y: 162 },
  '78': { x: 282, y: 147 },
  '91': { x: 302, y: 166 },
  '92': { x: 306, y: 144 },
  '93': { x: 318, y: 139 },
  '94': { x: 318, y: 149 },
  '95': { x: 300, y: 127 },
};

interface IleDeFranceMapProps {
  onHover?: (dept: Department | null) => void;
  activeDept?: string | null;
}

const IleDeFranceMap: React.FC<IleDeFranceMapProps> = ({ onHover, activeDept }) => {
  const navigate = useNavigate();
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (dept: Department, e: React.MouseEvent) => {
    setHoveredDept(dept.id);
    onHover?.(dept);
    const svg = (e.target as SVGElement).closest('svg');
    if (svg) {
      const rect = svg.getBoundingClientRect();
      const pos = labelPositions[dept.id];
      // Convert SVG coordinates to screen position
      const scaleX = rect.width / 130;
      const scaleY = rect.height / 100;
      setTooltipPos({
        x: (pos.x - 265) * scaleX,
        y: (pos.y - 115) * scaleY,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredDept(null);
    onHover?.(null);
  };

  const handleClick = (dept: Department) => {
    navigate(`/location/${dept.slug}`);
  };

  const active = activeDept || hoveredDept;
  const activeDeptData = departments.find(d => d.id === active);

  return (
    <div className="relative">
      <svg
        viewBox="265 115 130 100"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Carte interactive de l'Île-de-France"
      >
        <defs>
          {/* Ombre portée pour les départements survolés */}
          <filter id="dept-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
          </filter>
          <filter id="dept-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#3b82f6" floodOpacity="0.3" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Départements */}
        {departments.map((dept) => {
          const isActive = active === dept.id;
          return (
            <g key={dept.id}>
              <path
                d={dept.path}
                fill={isActive ? dept.fillHover : dept.fill}
                stroke="white"
                strokeWidth={isActive ? 1.2 : 0.6}
                strokeLinejoin="round"
                className="transition-all duration-300 cursor-pointer"
                style={{
                  filter: isActive ? 'url(#dept-glow)' : 'none',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: `${labelPositions[dept.id].x}px ${labelPositions[dept.id].y}px`,
                  opacity: active && !isActive ? 0.55 : 1,
                }}
                onMouseEnter={(e) => handleMouseEnter(dept, e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(dept)}
                role="button"
                aria-label={`${dept.name} - ${dept.cities} villes`}
              />
              {/* Code du département */}
              <text
                x={labelPositions[dept.id].x}
                y={labelPositions[dept.id].y}
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none select-none"
                fill="white"
                fontWeight="bold"
                fontSize={dept.id === '75' || dept.id === '92' || dept.id === '93' || dept.id === '94' ? 3 : 4.5}
                style={{
                  textShadow: '0 0.5px 1px rgba(0,0,0,0.3)',
                }}
              >
                {dept.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredDept && activeDeptData && (
        <div
          className="absolute pointer-events-none z-20 animate-fade-in"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 20}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 px-4 py-3 min-w-[160px]">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: activeDeptData.fill }}
              />
              <span className="font-bold text-gray-900 text-sm">{activeDeptData.name}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{activeDeptData.cities} ville{activeDeptData.cities > 1 ? 's' : ''} desservie{activeDeptData.cities > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mt-1">
              <span>Voir les villes</span>
              <ChevronRight className="w-3 h-3" />
            </div>
            {/* Flèche du tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
};

export default IleDeFranceMap;
