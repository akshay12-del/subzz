import { useTheme } from '../context/ThemeContext'
import { useFontScale } from '../context/FontScaleContext'

function ThemeDemo() {
  const { theme, actualTheme, setTheme } = useTheme()
  const { fontScale, setFontScale } = useFontScale()

  return (
    <div style={{ padding: '20px', border: '1px solid var(--border-color)' }}>
      <h2>Theme & Font Scale Demo</h2>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Theme Selection</h3>
        <p>Current theme: {theme} (actual: {actualTheme})</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={() => setTheme('light')}>Light</button>
          <button onClick={() => setTheme('dark')}>Dark</button>
          <button onClick={() => setTheme('system')}>System</button>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Font Scale</h3>
        <p>Current scale: {fontScale}%</p>
        <input
          type="range"
          min="50"
          max="200"
          value={fontScale}
          onChange={(e) => setFontScale(parseInt(e.target.value))}
          style={{ width: '100%', marginTop: '10px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '5px' }}>
          <span>50%</span>
          <span>100%</span>
          <span>200%</span>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
        <p style={{ color: 'var(--text-primary)' }}>This text uses CSS variables</p>
        <p style={{ color: 'var(--text-secondary)' }}>Secondary text color</p>
        <p style={{ color: 'var(--text-tertiary)' }}>Tertiary text color</p>
      </div>
    </div>
  )
}

export default ThemeDemo

