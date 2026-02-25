export default function Logo() {
  return (
   <><svg width="120" height="35" viewBox="0 0 260 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lux1" x1="0" y1="0" x2="60" y2="60">
      <stop offset="0%" stop-color="#0A84FF"/>
      <stop offset="50%" stop-color="#007AFF"/>
      <stop offset="100%" stop-color="#00D8B4"/>
    </linearGradient>
    <linearGradient id="lux2" x1="0" y1="0" x2="40" y2="40">
      <stop offset="0%" stop-color="#00D8B4"/>
      <stop offset="100%" stop-color="#0A84FF"/>
    </linearGradient>
  </defs>

  <ellipse cx="35" cy="35" rx="30" ry="22" fill="url(#lux1)" opacity="0.18"/>

  <rect x="15" y="15" width="50" height="35" rx="10" fill="url(#lux1)" stroke="rgba(255, 255, 255, 0.82)" stroke-width="2"/>
  
  <path d="M65 25H42C36 25 32 29 32 34C32 38 36 41 42 41H65" stroke="url(#lux2)" stroke-width="4" stroke-linecap="round"/>

  <circle cx="42" cy="34" r="4" fill="white" opacity="0.95"/>

  <text x="90" y="42" font-size="32" font-family="Poppins, Inter, sans-serif" font-weight="700" fill="#27f777af" letter-spacing="0.5">
    Pocket<tspan fill="url(#lux1)">BD</tspan>
  </text>
</svg>
</>
  );
}
