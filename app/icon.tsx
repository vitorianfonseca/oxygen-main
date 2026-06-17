import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#050505',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          border: '1px solid rgba(0,159,223,0.4)',
        }}
      >
        <div
          style={{
            fontFamily: 'sans-serif',
            fontWeight: 900,
            fontSize: 18,
            color: '#009FDF',
            lineHeight: 1,
          }}
        >
          O
        </div>
      </div>
    ),
    { ...size }
  )
}
