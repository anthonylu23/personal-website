import { describe, expect, it } from 'vitest'
import { splitDescription } from './description'

describe('splitDescription', () => {
  it('returns the whole string when there are no links', () => {
    expect(splitDescription('Plain text.')).toEqual([{ text: 'Plain text.' }])
  })

  it('links matched text and keeps the surrounding text', () => {
    expect(
      splitDescription('Pipelines for the Access Project at scale.', [
        { text: 'Access Project', href: 'https://example.org' },
      ]),
    ).toEqual([
      { text: 'Pipelines for the ' },
      { text: 'Access Project', href: 'https://example.org' },
      { text: ' at scale.' },
    ])
  })

  it('skips links whose text is missing', () => {
    expect(
      splitDescription('Hello world', [{ text: 'nope', href: 'https://example.org' }]),
    ).toEqual([{ text: 'Hello world' }])
  })
})
