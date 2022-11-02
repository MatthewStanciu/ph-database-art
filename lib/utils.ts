export function toHex(str: string): string {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16)
  }
  return result
}

export function toRgb(hex: string): number[] {
  let R = parseInt(hex.slice(0, 2), 16) || 0
  let G = parseInt(hex.slice(2, 4), 16) || 0
  let B = parseInt(hex.slice(4, 6), 16) || 0
  R = R * (R > G && R > B ? 1.5 : 0.7)
  G = G * (G > R && G > B ? 1.5 : 0.7)
  B = B * (B > R && B > G ? 1.5 : 0.7)
  return [R, G, B]
}
