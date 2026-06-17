import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Oxygen Gym & Fitness — Caldas da Rainha'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#050505',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow center */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 500,
            background:
              'radial-gradient(ellipse at center, rgba(0,159,223,0.12) 0%, transparent 65%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Top corner accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 120,
            height: 2,
            background: 'linear-gradient(to right, #009FDF, transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 2,
            height: 120,
            background: 'linear-gradient(to bottom, #009FDF, transparent)',
          }}
        />

        {/* Bottom right corner */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 120,
            height: 2,
            background: 'linear-gradient(to left, #009FDF, transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 2,
            height: 120,
            background: 'linear-gradient(to top, #009FDF, transparent)',
          }}
        />

        {/* Label */}
        <div
          style={{
            fontSize: 13,
            letterSpacing: 6,
            color: 'rgba(0,159,223,0.6)',
            marginBottom: 24,
            textTransform: 'uppercase',
          }}
        >
          CALDAS DA RAINHA · PORTUGAL
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: '#F8F8F8',
            letterSpacing: -5,
            lineHeight: 1,
            textAlign: 'center',
          }}
        >
          OXYGEN
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: '#009FDF',
            letterSpacing: 14,
            marginTop: 16,
            textTransform: 'uppercase',
          }}
        >
          GYM & FITNESS
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 1,
            background: 'rgba(0,159,223,0.3)',
            marginTop: 40,
            marginBottom: 40,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 17,
            color: 'rgba(248,248,248,0.35)',
            letterSpacing: 5,
            textTransform: 'uppercase',
          }}
        >
          RESPIRA · TRANSPIRA · EVOLUI
        </div>
      </div>
    ),
    { ...size }
  )
}
